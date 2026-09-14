import { useState } from "react";
import { X, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

const CONDITIONS = [
  "PCOS / PCOD",
  "Thyroid",
  "Diabetes",
  "High BP",
  "Fatty Liver",
  "High Cholesterol",
  "Joint Pain",
  "None of these",
];

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const digits = phone.replace(/\D/g, "").slice(-10);

    if (cleanName.length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (digits.length !== 10) {
      toast.error("Please enter your 10-digit WhatsApp number.");
      return;
    }

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

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-3 md:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md my-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="px-5 py-6 md:px-7 md:py-7">
          <div className="mb-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
              Reserve your seat
            </p>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
              {MASTERCLASS.name}
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              {MASTERCLASS.subtitle}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {MASTERCLASS.dateLabel} · {MASTERCLASS.timeLabel}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="mc-name"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                Your name
              </label>
              <input
                id="mc-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Full name"
                className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-base text-gray-900 outline-none transition-colors focus:border-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="mc-phone"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                WhatsApp number
              </label>
              <div className="flex items-stretch rounded-xl border-2 border-gray-200 transition-colors focus-within:border-emerald-500 overflow-hidden">
                <span className="flex items-center bg-gray-50 px-3 text-base font-medium text-gray-600 border-r-2 border-gray-200">
                  🇮🇳 +91
                </span>
                <input
                  id="mc-phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  autoComplete="tel"
                  placeholder="10-digit number"
                  className="w-full px-3.5 py-2.5 text-base text-gray-900 outline-none"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-500">
                The Zoom link is sent here — please use your WhatsApp number.
              </p>
            </div>

            <div>
              <label
                htmlFor="mc-email"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="mc-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-base text-gray-900 outline-none transition-colors focus:border-emerald-500"
              />
            </div>

            <div>
              <p className="block text-xs font-semibold text-gray-700 mb-2">
                What do you want to achieve?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGoal(goal === option ? "" : option)}
                    className={`no-heartbeat rounded-xl border-2 px-2.5 py-2 text-xs font-medium transition-all ${
                      goal === option
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="block text-xs font-semibold text-gray-700 mb-2">
                Anything we should know about?{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CONDITIONS.map((option) => (
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
