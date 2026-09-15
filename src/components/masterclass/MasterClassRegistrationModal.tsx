import { useRef, useState } from "react";
import { X, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MASTERCLASS, PRICING, buildRazorpayUrl } from "@/config/masterclass";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GOALS = [
  "Lose 5–10 kg",
  "Lose 10–20 kg",
  "Lose 20 kg or more",
  "Reverse a health condition",
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

export const MasterClassRegistrationModal = ({ isOpen, onClose }: Props) => {
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

    // Capture the lead first. Whether or not they go on to pay, the sales team
    // now has a name and a WhatsApp number — this is the whole point of asking
    // before the payment page rather than after it.
    try {
      await fetch("/api/webinar-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: digits,
          goal,
          conditions,
          source: "masterclass-landing",
          webinarDate: MASTERCLASS.startsAt,
        }),
      });
    } catch {
      // Never strand a paying customer because the lead store hiccuped.
    }

    // Fire webhook directly from frontend — works in both local and production.
    // This ensures the automator receives the lead before the user hits payment.
    try {
      const now = new Date();
      const submitted_date = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
      const submitted_time = now.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

      await fetch(
        "https://svastha-automator-webhook-production.up.railway.app/api/webhooks/CKo-2kURHxxTwSetgm1n10",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "masterclass_lead",
            source: "masterclass-landing",
            webinar_date: MASTERCLASS.startsAt,
            name: cleanName,
            email: cleanEmail,
            phone: digits,
            goal,
            conditions,
            paid: false,
            submitted_date,
            submitted_time: `"${submitted_time}"`,
          }),
        }
      );
    } catch {
      // Webhook failure must never block the user from paying.
    }

    trackPixel("Lead", { content_name: "Master Class Registration" });
    trackPixel("InitiateCheckout", {
      value: PRICING.priceNumeric,
      currency: "INR",
    });

    // Same-tab navigation: window.open is blocked by mobile browsers often
    // enough that it silently loses registrations.
    window.location.href = buildRazorpayUrl({
      name: cleanName,
      email: cleanEmail,
      phone: digits,
    });
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border-2 px-3.5 py-2.5 text-base text-gray-900 outline-none transition-colors ${hasError
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-gray-200 focus:border-emerald-500"
    }`;

  const ErrorText = ({ children }: { children: React.ReactNode }) => (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      {children}
    </p>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm md:items-center md:p-4">
      <div className="relative my-4 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-gray-500 transition-colors hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="px-5 py-6 md:px-7 md:py-7">
          <div className="mb-5 text-center">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              Reserve your seat
            </p>
            <h2 className="text-lg font-bold leading-snug text-gray-900 md:text-xl">
              {MASTERCLASS.name}
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              {MASTERCLASS.subtitle}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {MASTERCLASS.dateLabel} · {MASTERCLASS.timeLabel}
            </p>
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
              <label htmlFor="mc-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="mc-name"
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
              <label htmlFor="mc-phone" className="mb-1.5 block text-xs font-semibold text-gray-700">
                WhatsApp number <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-stretch overflow-hidden rounded-xl border-2 transition-colors ${errors.phone
                    ? "border-red-400 bg-red-50 focus-within:border-red-500"
                    : "border-gray-200 focus-within:border-emerald-500"
                  }`}
              >
                <span
                  className={`flex items-center border-r-2 px-3 text-base font-medium text-gray-600 ${errors.phone ? "border-red-400 bg-red-100/60" : "border-gray-200 bg-gray-50"
                    }`}
                >
                  🇮🇳 +91
                </span>
                <input
                  id="mc-phone"
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
                  Your Zoom link is sent here — please use your WhatsApp number.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="mc-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="mc-email"
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
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
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
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
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
              className="no-heartbeat w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-6 text-base font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-lime-600 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Taking you to payment…
                </span>
              ) : (
                <>Pay {PRICING.price} &amp; Confirm My Seat</>
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
