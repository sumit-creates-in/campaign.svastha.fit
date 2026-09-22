import { useRef, useState } from "react";
import { X, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  US_MASTERCLASS,
  US_PRICING,
  US_LEAD_WEBHOOK_URL,
  US_LEAD_STORAGE_KEY,
  PHONE_COUNTRIES,
  buildStripeUrl,
  type UsPriceTier,
} from "@/config/usMasterclass";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** "offer" when opened from the $5-off popup. */
  tier: UsPriceTier;
}

const GOALS = [
  "Lose 10–20 lbs",
  "Lose 20–40 lbs",
  "Lose 40 lbs or more",
  "Improve a health condition",
];

const CONDITION_OPTIONS = [
  "PCOS / PCOD",
  "Thyroid",
  "Diabetes / Prediabetes",
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

function trackPixel(event: string, data?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", event, data);
  } catch {
    /* tracking must never block the user */
  }
}

/** Short, URL-safe ID that ties the webhook lead to the Stripe payment. */
function makeLeadId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `us-${Date.now().toString(36)}-${rand}`;
}

function utmParams(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const q = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(
      (k) => {
        const v = q.get(k);
        if (v) out[k] = v;
      },
    );
  } catch {
    /* ignore */
  }
  return out;
}

export const UsRegistrationModal = ({ isOpen, onClose, tier }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<string>(PHONE_COUNTRIES[0].code);
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

  const pricing = US_PRICING[tier];
  const country = PHONE_COUNTRIES.find((c) => c.code === countryCode) ?? PHONE_COUNTRIES[0];

  const toggleCondition = (value: string) => {
    setConditions((prev) => {
      if (value === "None of these") return prev.includes(value) ? [] : [value];
      const next = prev.filter((c) => c !== "None of these");
      return next.includes(value) ? next.filter((c) => c !== value) : [...next, value];
    });
  };

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
    const expected: readonly number[] = country.digits;

    const found: FieldErrors = {};
    if (!cleanName) found.name = "Please enter your name";
    else if (cleanName.length < 2) found.name = "That name looks too short";

    if (!digits) found.phone = "Please enter your WhatsApp number";
    else if (!expected.includes(digits.length))
      found.phone = `${country.label} numbers have ${expected.join(" or ")} digits — you've entered ${digits.length}`;

    if (!cleanEmail) found.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
      found.email = "That email doesn't look right";

    if (!goal) found.goal = "Please pick one so we can help you better";

    if (Object.keys(found).length > 0) {
      setErrors(found);
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

    const leadId = makeLeadId();
    const fullPhone = `${country.code}${digits}`;
    const now = new Date();

    const lead = {
      event: "us_masterclass_lead",
      source: "us-masterclass-landing",
      lead_id: leadId,
      webinar_date: US_MASTERCLASS.startsAt,
      webinar_label: `${US_MASTERCLASS.dateLabel} · ${US_MASTERCLASS.timeLabel}`,
      name: cleanName,
      email: cleanEmail,
      phone: fullPhone,
      country_code: country.code,
      phone_local: digits,
      goal,
      conditions,
      price_tier: tier,
      amount: pricing.amount,
      currency: "USD",
      paid: false,
      // Same two fields the India Master Class sends, so existing automations
      // can read both. Plus the visitor's own time zone and an ISO timestamp.
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
      submitted_at: now.toISOString(),
      visitor_timezone: (() => {
        try {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
          return "";
        }
      })(),
      page_url: window.location.href,
      ...utmParams(),
    };

    // 1. Send the lead to the automator. Capped at 4 seconds so a slow webhook
    //    can never stand between someone and the payment page.
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      await fetch(US_LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        keepalive: true,
        signal: ctrl.signal,
      });
      clearTimeout(timer);
    } catch {
      /* never block payment on the webhook */
    }

    // 2. Keep the lead in this browser so the success page can greet them by
    //    name and report the right purchase value.
    try {
      localStorage.setItem(
        US_LEAD_STORAGE_KEY,
        JSON.stringify({ leadId, name: cleanName, email: cleanEmail, phone: fullPhone, tier }),
      );
    } catch {
      /* private mode etc. — the success page copes without it */
    }

    trackPixel("Lead", { content_name: "US Master Class Registration" });
    trackPixel("InitiateCheckout", { value: pricing.amount, currency: "USD" });

    // 3. Same-tab redirect to Stripe with the email prefilled.
    window.location.href = buildStripeUrl(tier, {
      email: cleanEmail,
      leadId,
      phone: fullPhone,
      name: cleanName,
    });
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border-2 px-3.5 py-2.5 text-base text-gray-900 outline-none transition-colors ${
      hasError
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
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              Reserve your seat
            </p>
            <h2 className="text-lg font-bold leading-snug text-gray-900 md:text-xl">
              {US_MASTERCLASS.name}
            </h2>
            <p className="text-sm font-semibold text-gray-600">{US_MASTERCLASS.subtitle}</p>
            <p className="mt-2 text-sm text-gray-600">
              {US_MASTERCLASS.dateLabel} · {US_MASTERCLASS.timeLabel}
            </p>
            {tier === "offer" && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 ring-1 ring-red-200">
                <span className="line-through opacity-70">{US_PRICING.offer.was}</span>
                {US_PRICING.offer.price} — {US_PRICING.offer.saving} off applied
              </p>
            )}
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-3.5 py-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
              <p className="text-xs font-medium text-red-700">
                Please complete the highlighted{" "}
                {Object.keys(errors).length === 1 ? "field" : "fields"} below.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="us-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="us-name"
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
              <label htmlFor="us-phone" className="mb-1.5 block text-xs font-semibold text-gray-700">
                WhatsApp number <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-stretch overflow-hidden rounded-xl border-2 transition-colors ${
                  errors.phone
                    ? "border-red-400 bg-red-50 focus-within:border-red-500"
                    : "border-gray-200 focus-within:border-emerald-500"
                }`}
              >
                <select
                  aria-label="Country code"
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e.target.value);
                    clearError("phone");
                  }}
                  className={`border-r-2 px-2 text-base font-medium text-gray-700 outline-none ${
                    errors.phone ? "border-red-400 bg-red-100/60" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {PHONE_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  id="us-phone"
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 12));
                    clearError("phone");
                  }}
                  autoComplete="tel-national"
                  placeholder={country.code === "+1" ? "(555) 123-4567" : "Phone number"}
                  aria-invalid={!!errors.phone}
                  className="w-full bg-transparent px-3.5 py-2.5 text-base text-gray-900 outline-none"
                />
              </div>
              {errors.phone ? (
                <ErrorText>{errors.phone}</ErrorText>
              ) : (
                <p className="mt-1 text-[11px] text-gray-500">
                  Your Zoom link is shared in our WhatsApp group — use the number WhatsApp is on.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="us-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="us-email"
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
                    className={`no-heartbeat rounded-xl border-2 px-2.5 py-2 text-xs font-medium transition-all ${
                      goal === option
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
                    className={`no-heartbeat rounded-full border-2 px-3 py-1.5 text-xs font-medium transition-all ${
                      conditions.includes(option)
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
                  Taking you to secure payment…
                </span>
              ) : (
                <>Pay {pricing.price} &amp; Confirm My Seat</>
              )}
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
              Secure checkout by Stripe. Your email carries over — no retyping.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
