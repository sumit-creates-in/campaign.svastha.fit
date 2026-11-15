import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, UserRound, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PERSONALIZED_START_NOW as P,
  PERSONALIZED_VALUE_KEY,
} from "@/config/masterclass";

/**
 * "Don't want to wait for the class?" — Sumit, 15 Nov 2026.
 * The ₹49 Master Class stays the main action on the page; this is the second
 * path for visitors who would rather start the Personalized plan now.
 */

const POPUP_SEEN_KEY = "svastha_pers_popup_seen";

function rememberValue(value: number) {
  try {
    localStorage.setItem(
      PERSONALIZED_VALUE_KEY,
      JSON.stringify({ value, at: Date.now() }),
    );
  } catch {
    /* storage blocked: Meta gets the page's default value */
  }
}

function trackCheckout(value: number, source: string) {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  try {
    w.fbq?.("track", "InitiateCheckout", {
      value,
      currency: "INR",
      content_name: `21 Day Personalized - ${source}`,
    });
  } catch {
    /* tracking must never block the payment */
  }
}

function goToPayment(url: string, value: number, source: string) {
  rememberValue(value);
  trackCheckout(value, source);
  window.location.href = url;
}

const POINTS = [
  { icon: UserRound, text: "Your own dietitian builds the plan around your body, routine and home food" },
  { icon: CalendarCheck, text: "Start within 24–48 hours — no waiting for the batch" },
  { icon: MessageCircle, text: "Direct WhatsApp access to your dietitian for all 21 days" },
];

export const PersonalizedStartNowSection = () => (
  <section className="bg-white px-4 py-10 md:py-14">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-3xl rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm md:p-10"
    >
      <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 shadow-sm">
        Don&apos;t want to wait for the class?
      </span>
      <h2 className="mt-4 text-2xl font-extrabold text-gray-900 md:text-3xl">
        Start your Personalized 21-day plan now
      </h2>
      <p className="mt-3 text-base leading-relaxed text-gray-700">
        The Master Class is the best place to start. But if you already know you
        want help — or a 2-hour class doesn&apos;t fit your week — you can begin
        the Ultimate 21 Day Weight Loss Challenge with your own dietitian.
      </p>
      <ul className="mt-5 space-y-3">
        {POINTS.map((p) => (
          <li key={p.text} className="flex gap-3 text-sm text-gray-800 md:text-base">
            <p.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
            <span>{p.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="flex items-baseline gap-2">
          <span className="text-lg text-gray-400 line-through">{P.regularPrice}</span>
          <span className="text-3xl font-extrabold text-gray-900">{P.price}</span>
        </div>
        <Button
          size="lg"
          className="w-full bg-teal-600 font-bold text-white hover:bg-teal-700 sm:w-auto"
          onClick={() => goToPayment(P.url, P.priceNumeric, "start-now section")}
        >
          Start my Personalized plan — {P.price}
        </Button>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Payments are handled by Razorpay. Our team reaches out on WhatsApp the same day.
      </p>
    </motion.div>
  </section>
);

/**
 * Once per visitor, when they have scrolled past 60% of the page, offer ₹500 off
 * the Personalized plan. Not shown while the ₹49 registration form is open.
 * No countdown and no deadline (Sumit removed fake urgency on 2 Nov).
 */
export const PersonalizedStartNowPopup = ({ suppressed }: { suppressed: boolean }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(POPUP_SEEN_KEY);
    } catch {
      seen = false;
    }
    if (seen) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= P.popupAtScroll) {
        window.removeEventListener("scroll", onScroll);
        try {
          localStorage.setItem(POPUP_SEEN_KEY, String(Date.now()));
        } catch {
          /* ignore */
        }
        setOpen(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!open || suppressed) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-3 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pers-popup-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
          {P.popupDiscount} · Personalized plan
        </span>
        <h2 id="pers-popup-title" className="mt-3 text-xl font-extrabold text-gray-900">
          Start with your own dietitian — no need to wait
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Your Personalized 21-day plan, built around your body and home food.
          Your dietitian starts within 24–48 hours.
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg text-gray-400 line-through">{P.price}</span>
          <span className="text-3xl font-extrabold text-gray-900">{P.popupPrice}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Same price as the live Master Class offer.
        </p>
        <Button
          size="lg"
          className="mt-5 w-full bg-teal-600 font-bold text-white hover:bg-teal-700"
          onClick={() => goToPayment(P.popupUrl, P.popupPriceNumeric, "60% popup")}
        >
          Start my plan — {P.popupPrice}
        </Button>
        <button
          type="button"
          className="mt-3 w-full text-center text-sm font-semibold text-gray-500 underline-offset-2 hover:underline"
          onClick={() => setOpen(false)}
        >
          No thanks, I&apos;ll join the Master Class first
        </button>
      </div>
    </div>
  );
};
