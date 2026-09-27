import { useRef, useState } from "react";
import { X, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NAVFIT,
  NAVFIT_PRICING,
  NAVFIT_LEAD_WEBHOOK_URL,
  NAVFIT_STORAGE_KEY,
  buildNavFitPaymentUrl,
  type NavFitTier,
} from "@/config/navfit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** "offer" when opened from the ₹100-off popup. */
  tier: NavFitTier;
}

const GOALS = [
  "Lose 2–5 kg",
  "Lose 5–10 kg",
  "Lose 10 kg or more",
  "Improve a health condition",
];

const CONDITION_OPTIONS = [
  "PCOS / PCOD",
  "Thyroid",
  "Type 2 Diabetes",
  "High BP",
  "Fatty Liver",
  "High Cholesterol",
  "Joint Pain",
  "None of these",
];

type FieldErrors = {
  name?: string;
  phone?: string;
  email?: string;
  goal?: string;
};

/** Meta Pixel is loaded in index.html; guard in case it is blocked. */
function trackPixel(event: string, data?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", event, data);
  } catch {
    /* tracking must never block the user */
  }
}

export const NavFitRegistrationModal = ({ isOpen, onClose, tier }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const pricing = NAVFIT_PRICING[tier];

  const toggleCondition = (value: string) => {
    setConditions((prev) => {
      if (value === "None of these") return prev.includes(value) ? [] : [value];
      const next = prev.filter((c) => c !== "None of these");
      return next.includes(value)
        ? next.filter((c) => c !== value)
        : [...next, value];
    });
  };

  /** Clear a field's error the moment the person starts fixing it. */
  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const digits = phone.replace(/\D/g, "");

    const found: FieldErrors = {};
    if (!cleanName) found.name = "Please enter your name";
    else if (cleanName.length < 2) found.name = "That name looks too short";

    if (!digits) found.phone = "Please enter your WhatsApp number";
    else if (digits.length !== 10)
      found.phone = `Needs 10 digits — you've entered ${digits.length}`;

    if (!cleanEmail) found.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
      found.email = "That email doesn't look right";

    if (!goal) found.goal = "Please pick one so we can help you better";

    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Take them straight to the first thing that needs fixing.
      const target = found.name
        ? nameRef.current
        : found.phone
          ? phoneRef.current
          : found.email
            ? emailRef.current
            : goalRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (target instanceof HTMLInputElement) setTimeout(() => target.focus(), 300);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Capture the lead before the payment page, so the team has a name and a
    // WhatsApp number even if the person drops off at Razorpay.
    try {
      const now = new Date();
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      await fetch(NAVFIT_LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        signal: ctrl.signal,
        body: JSON.stringify({
          event: "navfit_lead",
          source: "navfit-landing",
          program: NAVFIT.name,
          orientation_date: NAVFIT.orientationAt,
          name: cleanName,
          email: cleanEmail,
          phone: digits,
          goal,
          conditions,
          price_tier: tier,
          amount: pricing.amount,
          paid: false,
          submitted_date: now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata",
          }),
          submitted_time: now.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          }),
          page_url: window.location.href,
        }),
      });
      clearTimeout(timer);
    } catch {
      // Webhook failure must never block the user from paying.
    }

    try {
      localStorage.setItem(
        NAVFIT_STORAGE_KEY,
        JSON.stringify({ name: cleanName, tier }),
      );
    } catch {
      /* private mode — the confirmation page copes without it */
    }

    trackPixel("Lead", { content_name: "Nav Fit Challenge Registration" });
    trackPixel("InitiateCheckout", {
      value: pricing.amount,
      currency: "INR",
      content_name: "Nav Fit Challenge",
    });

    // Same-tab navigation: window.open is blocked by mobile browsers often
    // enough that it silently loses registrations.
    window.location.href = buildNavFitPaymentUrl(tier, {
      name: cleanName,
      email: cleanEmail,
      phone: digits,
    });
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border-2 px-3.5 py-2.5 text-base text-gray-900 outline-none transition-colors ${hasError
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-gray-200 focus:border-rose-500"
    }`;

  const ErrorText = ({ children }: { children: React.ReactNode }) => (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      {children}
    </p>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-3 md:items-center md:p-4">
      <div className="relative my-4 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="no-heartbeat absolute right-3 top-3 z-10 text-gray-500 transition-colors hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="px-5 py-6 md:px-7 md:py-7">
          <div className="mb-5 text-center">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-rose-600">
              Join the challenge
            </p>
            <h2 className="text-xl font-extrabold leading-snug text-gray-900 md:text-2xl">
              {NAVFIT.name}
            </h2>
            <p className="text-sm font-semibold text-gray-600">{NAVFIT.tagline}</p>
            <p className="mt-2 text-sm text-gray-600">
              {NAVFIT.datesShort} · Orientation {NAVFIT.orientationDateLabel}, {NAVFIT.orientationTimeLabel}
            </p>
            {tier === "offer" && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 ring-1 ring-rose-200">
                <span className="line-through opacity-70">{NAVFIT_PRICING.offer.was}</span>
                {NAVFIT_PRICING.offer.price} — {NAVFIT_PRICING.offer.saving} off applied
              </p>
            )}
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-3.5 py-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
              <p className="text-xs font-medium text-red-700">
                Please complete the highlighted {Object.keys(errors).length === 1 ? "field" : "fields"} below.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="nf-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="nf-name"
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                autoComplete="name"
                placeholder="Full name"
                aria-invalid={!!errors.name}
                className={fieldClass(!!errors.name)}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </div>

            <div>
              <label htmlFor="nf-phone" className="mb-1.5 block text-xs font-semibold text-gray-700">
                WhatsApp number <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-stretch overflow-hidden rounded-xl border-2 transition-colors ${errors.phone
                  ? "border-red-400 bg-red-50 focus-within:border-red-500"
                  : "border-gray-200 focus-within:border-rose-500"
                  }`}
              >
                <span
                  className={`flex items-center border-r-2 px-3 text-base font-medium text-gray-600 ${errors.phone ? "border-red-400 bg-red-100/60" : "border-gray-200 bg-gray-50"
                    }`}
                >
                  🇮🇳 +91
                </span>
                <input
                  id="nf-phone"
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    clearError("phone");
                  }}
                  autoComplete="tel"
                  placeholder="10-digit number"
                  aria-invalid={!!errors.phone}
                  className="w-full bg-transparent px-3.5 py-2.5 text-base text-gray-900 outline-none"
                />
              </div>
              {errors.phone ? (
                <ErrorText>{errors.phone}</ErrorText>
              ) : (
                <p className="mt-1 text-[11px] text-gray-500">
                  Your plan and daily guidance come on WhatsApp — please use your WhatsApp number.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nf-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="nf-email"
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                className={fieldClass(!!errors.email)}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </div>

            <div ref={goalRef}>
              <p className="mb-2 block text-xs font-semibold text-gray-700">
                What do you want to achieve? <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setGoal(goal === option ? "" : option);
                      clearError("goal");
                    }}
                    className={`no-heartbeat rounded-xl border-2 px-2.5 py-2 text-xs font-medium transition-all ${goal === option
                      ? "border-rose-500 bg-rose-50 text-rose-800"
                      : errors.goal
                        ? "border-red-300 bg-red-50 text-gray-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.goal && <ErrorText>{errors.goal}</ErrorText>}
            </div>

            <div>
              <p className="mb-2 block text-xs font-semibold text-gray-700">
                Anything we should know about?{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CONDITION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleCondition(option)}
                    className={`no-heartbeat rounded-full border-2 px-3 py-1.5 text-xs font-medium transition-all ${conditions.includes(option)
                      ? "border-rose-500 bg-rose-50 text-rose-800"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="no-heartbeat w-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500 py-6 text-base font-bold text-white shadow-lg transition-all hover:from-rose-700 hover:to-orange-600 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Taking you to payment…
                </span>
              ) : (
                <>Pay {pricing.price} &amp; Join the Challenge</>
              )}
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Secure payment via Razorpay. Your details carry over — no retyping.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
