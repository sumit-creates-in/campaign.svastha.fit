import { useEffect, useRef, useState } from "react";
import { X, Loader2, ShieldCheck, AlertCircle, ArrowLeft, Video, Sparkles, PhoneCall, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  US_MASTERCLASS,
  US_PRICING,
  US_PERSONAL_PRICING,
  US_CALL_WINDOWS,
  US_LEAD_WEBHOOK_URL,
  US_LEAD_STORAGE_KEY,
  PHONE_COUNTRIES,
  buildStripeUrl,
  isUsTestMode,
  type UsPriceTier,
  type UsPlan,
} from "@/config/usMasterclass";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Master Class price tier — "offer" once the $5-off popup was claimed. */
  tier: UsPriceTier;
  /** Personalized Plan price tier — "offer" once the $10-off popup was claimed. */
  personalTier?: UsPriceTier;
  /**
   * Show the three choices first (Master Class / start a personal plan today /
   * free call). Off by default so older pages keep the plain seat form.
   */
  withChoices?: boolean;
  /** Skip the choice screen and open straight on this option (from the offer popup). */
  initialPlan?: UsPlan;
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
  callDay?: string;
  callWindow?: string;
};

function trackPixel(event: string, data?: Record<string, unknown>, custom = false) {
  // Test runs (?test=1) must not reach Meta — they'd pollute ad reporting.
  if (isUsTestMode()) return;
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq(custom ? "trackCustom" : "track", event, data);
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

/** Today, tomorrow and the day after, in the visitor's own calendar. */
function callDays(): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const nice = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    out.push({ id: nice, label: i === 0 ? `Today · ${nice}` : i === 1 ? `Tomorrow · ${nice}` : nice });
  }
  return out;
}

export const UsRegistrationModal = ({
  isOpen,
  onClose,
  tier,
  personalTier = "standard",
  withChoices = false,
  initialPlan,
}: Props) => {
  const [plan, setPlan] = useState<UsPlan | null>(withChoices ? initialPlan ?? null : "masterclass");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<string>(PHONE_COUNTRIES[0].code);
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [callDay, setCallDay] = useState("");
  const [callWindow, setCallWindow] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callBooked, setCallBooked] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<HTMLDivElement>(null);

  // Each time the modal opens: start on the right screen and count the click.
  useEffect(() => {
    if (!isOpen) return;
    setPlan(withChoices ? initialPlan ?? null : "masterclass");
    setCallBooked(false);
    setErrors({});
    trackPixel("RegisterClick", { page: "us-masterclass" }, true);
  }, [isOpen, withChoices, initialPlan]);

  if (!isOpen) return null;

  const mcPricing = US_PRICING[tier];
  const pPricing = US_PERSONAL_PRICING[personalTier];
  const country = PHONE_COUNTRIES.find((c) => c.code === countryCode) ?? PHONE_COUNTRIES[0];
  const days = callDays();

  const choose = (next: UsPlan) => {
    setPlan(next);
    setErrors({});
    trackPixel("ChoosePlan", { plan: next }, true);
  };

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
    if (!plan) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const digits = phone.replace(/\D/g, "");
    const expected: readonly number[] = country.digits;
    const isCall = plan === "call";

    const found: FieldErrors = {};
    if (!cleanName) found.name = "Please enter your name";
    else if (cleanName.length < 2) found.name = "That name looks too short";

    if (!digits) found.phone = "Please enter your WhatsApp number";
    else if (!expected.includes(digits.length))
      found.phone = `${country.label} numbers have ${expected.join(" or ")} digits — you've entered ${digits.length}`;

    // Email is needed for Stripe; for a free call it is optional.
    if (!cleanEmail) {
      if (!isCall) found.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) found.email = "That email doesn't look right";

    if (!goal) found.goal = "Please pick one so we can help you better";
    if (isCall && !callDay) found.callDay = "Please pick a day";
    if (isCall && !callWindow) found.callWindow = "Please pick a time";

    if (Object.keys(found).length > 0) {
      setErrors(found);
      const target = found.name
        ? nameRef.current
        : found.phone
          ? phoneRef.current
          : found.email
            ? emailRef.current
            : found.goal
              ? goalRef.current
              : callRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (target instanceof HTMLInputElement) setTimeout(() => target.focus(), 300);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const leadId = makeLeadId();
    const fullPhone = `${country.code}${digits}`;
    const now = new Date();
    const testMode = isUsTestMode();
    const win = US_CALL_WINDOWS.find((w) => w.id === callWindow);
    const amount = plan === "personalized" ? pPricing.amount : plan === "masterclass" ? mcPricing.amount : 0;
    const priceTier = plan === "personalized" ? personalTier : tier;

    const what =
      plan === "masterclass"
        ? `MASTER CLASS ${mcPricing.price} (Sun Nov 29) — clicked to pay`
        : plan === "personalized"
          ? `PERSONALIZED 21-DAY PLAN ${pPricing.price} (start now) — clicked to pay`
          : `FREE CALL requested — ${callDay}, ${win?.label} (${win?.us} = ${win?.ist})`;
    const summary = [
      what,
      goal,
      conditions.length ? conditions.join(", ") : "",
      (() => {
        try {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
          return "";
        }
      })(),
    ]
      .filter(Boolean)
      .join(" / ");

    const lead = {
      event: plan === "call" ? "us_free_call_request" : plan === "personalized" ? "us_personal_plan_lead" : "us_masterclass_lead",
      plan,
      summary,
      source: testMode ? "us-masterclass-landing-TEST" : "us-masterclass-landing",
      test: testMode,
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
      price_tier: priceTier,
      amount,
      currency: "USD",
      paid: false,
      call_day: isCall ? callDay : "",
      call_window: isCall ? `${win?.label} — ${win?.us} (${win?.ist})` : "",
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

    // 1. Send the lead to the automator (sheet + CRM for Samiksha). Capped at
    //    4 seconds so a slow webhook can never stand between someone and payment.
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
      /* never block on the webhook */
    }

    if (isCall) {
      trackPixel("Lead", { content_name: "US Free Consultation Call" });
      trackPixel("Schedule", { content_name: "US Free Consultation Call" });
      setIsSubmitting(false);
      setCallBooked(true);
      return;
    }

    // 2. Keep the lead in this browser so the success page can greet them by
    //    name and report the right purchase value.
    try {
      localStorage.setItem(
        US_LEAD_STORAGE_KEY,
        JSON.stringify({
          leadId,
          name: cleanName,
          email: cleanEmail,
          phone: fullPhone,
          tier: priceTier,
          plan,
          goal,
          conditions,
        }),
      );
    } catch {
      /* private mode etc. — the success page copes without it */
    }

    trackPixel("Lead", {
      content_name: plan === "personalized" ? "US Personalized Plan" : "US Master Class Registration",
    });
    trackPixel("InitiateCheckout", { value: amount, currency: "USD" });

    // The personalized plan has no Stripe sandbox — stop here in test mode.
    if (testMode && plan === "personalized") {
      setIsSubmitting(false);
      window.alert("TEST MODE: the lead was sent. Real visitors now go to the $" + amount + " Stripe page.");
      return;
    }

    // 3. Same-tab redirect to Stripe with the email prefilled.
    window.location.href = buildStripeUrl(
      priceTier,
      { email: cleanEmail, leadId, phone: fullPhone, name: cleanName },
      plan === "personalized" ? "personalized" : "masterclass",
    );
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

  const chip = (active: boolean, error?: boolean) =>
    `no-heartbeat rounded-xl border-2 px-2.5 py-2 text-xs font-medium transition-all ${
      active
        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
        : error
          ? "border-red-300 bg-red-50 text-gray-600"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
    }`;

  // ─── Screen 1: the three choices ──────────────────────────────────────────
  const ChoiceScreen = (
    <div className="px-5 py-6 md:px-7 md:py-7">
      <div className="mb-5 text-center">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
          How would you like to start?
        </p>
        <h2 className="text-lg font-bold leading-snug text-gray-900 md:text-xl">
          Pick what suits you best
        </h2>
      </div>

      <button
        type="button"
        onClick={() => choose("masterclass")}
        className="no-heartbeat relative w-full rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-4 text-left shadow-sm transition-transform hover:scale-[1.01]"
      >
        <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Most popular
        </span>
        <div className="flex items-start gap-3">
          <Video className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-gray-900">Join the Live Master Class</p>
            <p className="mt-0.5 text-xs text-gray-600">
              {US_MASTERCLASS.dateLabel} · {US_MASTERCLASS.timeLabel} · 90 min on Zoom
            </p>
            <p className="mt-1 text-xs text-gray-600">Can&apos;t join live? You get the recording.</p>
          </div>
          <div className="text-right">
            {tier === "offer" && (
              <p className="text-xs font-semibold text-gray-400 line-through">{US_PRICING.offer.was}</p>
            )}
            <p className="text-xl font-extrabold text-gray-900">{mcPricing.price}</p>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => choose("personalized")}
        className="no-heartbeat mt-3 w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-emerald-400"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-500" />
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-gray-900">Start today: 21-Day Personalized Plan</p>
            <p className="mt-0.5 text-xs text-gray-600">
              Your own SVASTHA coach builds the plan around your body, routine and food. Starts
              within 24 hours — no need to wait for Sunday.
            </p>
          </div>
          <div className="text-right">
            {personalTier === "offer" && (
              <p className="text-xs font-semibold text-gray-400 line-through">
                {US_PERSONAL_PRICING.offer.was}
              </p>
            )}
            <p className="text-xl font-extrabold text-gray-900">{pPricing.price}</p>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => choose("call")}
        className="no-heartbeat mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
      >
        <PhoneCall className="h-4 w-4" />
        Not sure yet? Book a free 15-minute call
      </button>
    </div>
  );

  // ─── Screen 3: free call requested ─────────────────────────────────────────
  const CallDone = (
    <div className="px-6 py-10 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
      <h2 className="mt-4 text-xl font-bold text-gray-900">Your free call is requested</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm text-gray-600">
        Our SVASTHA coach will WhatsApp you to confirm the exact time, then call you on {callDay}{" "}
        ({US_CALL_WINDOWS.find((w) => w.id === callWindow)?.label.toLowerCase()}).
      </p>
      <Button
        onClick={onClose}
        className="no-heartbeat mt-6 rounded-full bg-gray-900 px-8 py-5 text-sm font-bold text-white"
      >
        Done
      </Button>
    </div>
  );

  const isCall = plan === "call";
  const headerTitle =
    plan === "personalized"
      ? "21-Day Personalized Plan"
      : plan === "call"
        ? "Book a free 15-minute call"
        : US_MASTERCLASS.name;
  const headerKicker =
    plan === "personalized" ? "Start within 24 hours" : plan === "call" ? "No payment needed" : "Reserve your seat";

  // ─── Screen 2: the form ──────────────────────────────────────────────────
  const FormScreen = (
    <div className="px-5 py-6 md:px-7 md:py-7">
      {withChoices && (
        <button
          type="button"
          onClick={() => setPlan(null)}
          className="no-heartbeat mb-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Other options
        </button>
      )}
      <div className="mb-5 text-center">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">{headerKicker}</p>
        <h2 className="text-lg font-bold leading-snug text-gray-900 md:text-xl">{headerTitle}</h2>
        {plan === "masterclass" && (
          <>
            <p className="text-sm font-semibold text-gray-600">{US_MASTERCLASS.subtitle}</p>
            <p className="mt-2 text-sm text-gray-600">
              {US_MASTERCLASS.dateLabel} · {US_MASTERCLASS.timeLabel}
            </p>
          </>
        )}
        {plan === "personalized" && (
          <p className="mt-2 text-sm text-gray-600">
            Your own coach · a plan built around you · WhatsApp support for 21 days
          </p>
        )}
        {plan === "call" && (
          <p className="mt-2 text-sm text-gray-600">
            A SVASTHA coach calls you on WhatsApp to understand your goal and suggest the right plan.
          </p>
        )}
        {plan === "masterclass" && tier === "offer" && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 ring-1 ring-red-200">
            <span className="line-through opacity-70">{US_PRICING.offer.was}</span>
            {US_PRICING.offer.price} — {US_PRICING.offer.saving} off applied
          </p>
        )}
        {plan === "personalized" && personalTier === "offer" && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 ring-1 ring-red-200">
            <span className="line-through opacity-70">{US_PERSONAL_PRICING.offer.was}</span>
            {US_PERSONAL_PRICING.offer.price} — {US_PERSONAL_PRICING.offer.saving} off applied
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
              {plan === "masterclass"
                ? "Your Zoom link is shared in our WhatsApp group — use the number WhatsApp is on."
                : "We contact you on WhatsApp — use the number WhatsApp is on."}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="us-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
            Email {isCall ? <span className="font-normal text-gray-400">(optional)</span> : <span className="text-red-500">*</span>}
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
                className={chip(goal === option, !!errors.goal)}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.goal && <ErrorText>{errors.goal}</ErrorText>}
        </div>

        <div>
          <p className="mb-2 block text-xs font-semibold text-gray-700">
            Anything we should know about? <span className="font-normal text-gray-400">(optional)</span>
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

        {isCall && (
          <div ref={callRef} className="space-y-3">
            <div>
              <p className="mb-2 block text-xs font-semibold text-gray-700">
                Which day? <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {days.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setCallDay(d.id);
                      clearError("callDay");
                    }}
                    className={chip(callDay === d.id, !!errors.callDay)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {errors.callDay && <ErrorText>{errors.callDay}</ErrorText>}
            </div>
            <div>
              <p className="mb-2 block text-xs font-semibold text-gray-700">
                What time suits you? <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-1 gap-2">
                {US_CALL_WINDOWS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      setCallWindow(w.id);
                      clearError("callWindow");
                    }}
                    className={`${chip(callWindow === w.id, !!errors.callWindow)} text-left`}
                  >
                    <span className="font-bold">{w.label}</span> · {w.us}
                  </button>
                ))}
              </div>
              {errors.callWindow && <ErrorText>{errors.callWindow}</ErrorText>}
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="no-heartbeat w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-6 text-base font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-lime-600 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {isCall ? "Sending…" : "Taking you to secure payment…"}
            </span>
          ) : plan === "personalized" ? (
            <>Pay {pPricing.price} &amp; Start My Plan</>
          ) : isCall ? (
            <>Request My Free Call</>
          ) : (
            <>Pay {mcPricing.price} &amp; Confirm My Seat</>
          )}
        </Button>

        {!isCall && (
          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
            Secure checkout by Stripe. Your email carries over — no retyping.
          </p>
        )}
      </form>
    </div>
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
        {callBooked ? CallDone : plan === null ? ChoiceScreen : FormScreen}
      </div>
    </div>
  );
};
