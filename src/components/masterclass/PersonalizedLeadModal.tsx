import { useRef, useState } from "react";
import { ArrowLeft, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import {
  LEAD_SOURCES,
  PERSONALIZED_START_NOW as P,
  PERSONALIZED_VALUE_KEY,
} from "@/config/masterclass";
import { sendCrmLead, trackPixel } from "@/lib/crmLead";
import { applyMetaUserData, saveMetaUserData } from "@/lib/metaUserData";
import {
  ErrorText,
  Overlay,
  PhoneInput,
  chipClass,
  fieldClass,
  validateEmail,
  validateName,
  validatePhone,
} from "./leadFormBits";

/**
 * Details form for "Start now with your own dietitian". The lead goes to the
 * CRM before the payment page, so the sales team can help anyone who stops at
 * checkout. `offer` = "popup" is the one-time ₹500-off price.
 */
export type PersonalizedOffer = "regular" | "popup";

interface Props {
  offer: PersonalizedOffer;
  onClose: () => void;
  /** Shown as "← Back" when the visitor came from the choice screen. */
  onBack?: () => void;
}

const GOALS = ["Lose 5–10 kg", "Lose 10–20 kg", "Lose 20 kg or more", "Reverse a health condition"];

type Errors = { name?: string; phone?: string; email?: string; goal?: string };

function paymentUrl(base: string, name: string, email: string, phone: string) {
  const params = new URLSearchParams({ name: name.trim(), email: email.trim(), mobile: phone });
  return `${base}${base.includes("?") ? "&" : "?"}${params.toString()}`;
}

export const PersonalizedLeadModal = ({ offer, onClose, onBack }: Props) => {
  const isPopup = offer === "popup";
  const price = isPopup ? P.popupPrice : P.price;
  const value = isPopup ? P.popupPriceNumeric : P.priceNumeric;
  const struck = isPopup ? P.price : P.regularPrice;
  const url = isPopup ? P.popupUrl : P.url;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const clear = (k: keyof Errors) =>
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: Errors = {
      name: validateName(name),
      phone: validatePhone(phone),
      email: validateEmail(email),
      goal: goal ? undefined : "Please pick one so your dietitian is ready",
    };
    (Object.keys(found) as (keyof Errors)[]).forEach((k) => found[k] === undefined && delete found[k]);
    if (Object.keys(found).length) {
      setErrors(found);
      const t = found.name ? nameRef.current : found.phone ? phoneRef.current : found.email ? emailRef.current : null;
      t?.focus();
      return;
    }
    setBusy(true);

    saveMetaUserData({ name: name.trim(), email: email.trim(), phone });
    applyMetaUserData();
    trackPixel("Lead", { content_name: `21 Day Personalized - start now (${price})` });
    trackPixel("InitiateCheckout", { value, currency: "INR", content_name: "21 Day Personalized - start now" });
    try {
      localStorage.setItem(PERSONALIZED_VALUE_KEY, JSON.stringify({ value, at: Date.now() }));
    } catch {
      /* Meta then gets the page's default value */
    }

    await sendCrmLead({
      name: name.trim(),
      phone,
      email: email.trim(),
      source: LEAD_SOURCES.startNow,
      details: `Chose Personalized 21-day plan, start now (${price}${isPopup ? ", ₹500-off popup" : ""}) - sent to payment. Goal: ${goal}. If no payment in 1 hour, call to help.`,
    });

    window.location.href = paymentUrl(url, name, email, phone);
  };

  return (
    <Overlay onClose={onClose} labelledBy="pers-form-title" z="z-50">
      <div className="px-5 pb-6 pt-6 md:px-7 md:pb-7">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="no-heartbeat mb-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to options
          </button>
        )}
        <div className="mb-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            Personalized 21-Day Plan{isPopup ? " · ₹500 off" : ""}
          </p>
          <h2 id="pers-form-title" className="mt-1 text-xl font-extrabold leading-snug text-gray-900">
            Let's get your dietitian started
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Your plan starts within 24–48 hours. No need to wait for the class.
          </p>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <span className="text-sm text-gray-400 line-through">{struck}</span>
            <span className="text-2xl font-extrabold text-gray-900">{price}</span>
            <span className="text-xs font-semibold text-gray-500">incl. GST</span>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-3.5 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
            <p className="text-xs font-medium text-red-700">Please complete the highlighted fields.</p>
          </div>
        )}

        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label htmlFor="pl-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              id="pl-name"
              ref={nameRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name");
              }}
              autoComplete="name"
              placeholder="Full name"
              className={fieldClass(!!errors.name)}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </div>

          <PhoneInput
            id="pl-phone"
            ref={phoneRef}
            value={phone}
            onChange={(d) => {
              setPhone(d);
              clear("phone");
            }}
            error={errors.phone}
            hint="Your dietitian will reach you on this number."
          />

          <div>
            <label htmlFor="pl-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="pl-email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clear("email");
              }}
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass(!!errors.email)}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-700">
              What do you want to achieve? <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGoal(goal === g ? "" : g);
                    clear("goal");
                  }}
                  className={chipClass(goal === g, !!errors.goal)}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.goal && <ErrorText>{errors.goal}</ErrorText>}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-4 text-base font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-lime-600 disabled:opacity-70"
          >
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Taking you to payment…
              </span>
            ) : (
              <>Continue to payment — {price}</>
            )}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Secure payment via Razorpay. Our team messages you on WhatsApp the same day.
          </p>
        </form>
      </div>
    </Overlay>
  );
};
