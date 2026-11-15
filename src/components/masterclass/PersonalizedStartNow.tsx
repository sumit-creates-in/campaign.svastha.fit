import { motion } from "framer-motion";
import { CalendarCheck, UserRound, MessageCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MASTERCLASS, PRICING, PERSONALIZED_START_NOW as P } from "@/config/masterclass";
import { Overlay } from "./leadFormBits";

/**
 * "Don't want to wait for the class?" — Sumit, 15 Nov 2026.
 * The ₹49 Master Class stays the main action on the page; this is the second
 * path for visitors who would rather start the Personalized plan now.
 */

const POINTS = [
  { icon: UserRound, text: "Your own dietitian builds the plan around your body, routine and home food" },
  { icon: CalendarCheck, text: "Start within 24–48 hours — no waiting for the batch" },
  { icon: MessageCircle, text: "Direct WhatsApp access to your dietitian for all 21 days" },
];

export const PersonalizedStartNowSection = ({ onStart }: { onStart: () => void }) => (
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
        want help — or a live class doesn&apos;t fit your week — you can begin
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
          onClick={onStart}
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

const OFFER_POINTS = [
  "Start any day (priority onboarding)",
  "Your own dedicated dietitian",
  "Personalized diet plan with home food",
  "Personalized intermittent fasting",
  "Call & WhatsApp support",
  "Root-cause analysis of your weight gain",
  "Higher chances of results",
];

/**
 * The one-time ₹500-off offer, shown once per visitor after 60% of the page
 * (Sumit, 15 Nov: "more urgency and FOMO", modelled on his app's upsell).
 * Every urgency line is true: it really is shown only once, and after it is
 * closed the page only offers the ₹2,490 price. No countdown, no fake deadline.
 */
export const PersonalizedOfferPopup = ({
  onClose,
  onAccept,
  onMasterClass,
}: {
  onClose: () => void;
  onAccept: () => void;
  onMasterClass: () => void;
}) => (
  <Overlay onClose={onClose} labelledBy="pers-popup-title">
    <div className="px-5 pb-6 pt-7 text-center md:px-8">
      <div className="text-5xl leading-none" aria-hidden="true">🚨</div>
      <p className="mt-3 text-xl font-extrabold text-red-600 md:text-2xl">
        If You Close It, You Will Lose It!
      </p>
      <h2 id="pers-popup-title" className="mt-2 text-2xl font-extrabold text-gray-900 md:text-3xl">
        🎉 Discount Unlocked 🥳
      </h2>
      <p className="mt-3 text-base font-bold text-gray-900 md:text-lg">
        Start your Personalized 21-Day Plan today and get:
      </p>
      <ul className="mx-auto mt-3 inline-block space-y-1.5 text-left">
        {OFFER_POINTS.map((t) => (
          <li key={t} className="flex items-center gap-2 text-[15px] text-gray-800">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
            </span>
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className="text-lg font-extrabold text-red-500">{P.popupDiscount} — only on this screen</p>
        <p className="mt-0.5 text-sm text-gray-600">
          <span className="line-through">{P.price}</span>{" "}
          <span className="font-extrabold text-gray-900">{P.popupPrice}</span> · Start today or tomorrow
        </p>
      </div>

      <button
        type="button"
        onClick={onAccept}
        className="mt-3 w-full rounded-full bg-gradient-to-r from-green-600 to-lime-400 px-4 py-3.5 text-lg font-extrabold leading-tight text-white shadow-lg transition-transform hover:scale-[1.02]"
      >
        Claim ₹500 Off — Start My Plan
        <span className="block text-base">{P.popupPrice}</span>
      </button>

      <button
        type="button"
        onClick={onClose}
        className="no-heartbeat mt-4 inline-flex items-center gap-2 text-base font-bold text-gray-900 hover:underline"
      >
        <X className="h-5 w-5 text-red-500" strokeWidth={3} /> No, I don&apos;t want ₹500 off
      </button>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600">
          Prefer to learn first? Live Master Class · {MASTERCLASS.dateLabel}
        </p>
        <button
          type="button"
          onClick={onMasterClass}
          className="no-heartbeat mt-2 w-full rounded-full border-2 border-emerald-600 bg-white px-4 py-3 text-base font-bold text-emerald-700 hover:bg-emerald-50"
        >
          Join the Master Class — {PRICING.price}
        </button>
      </div>
      <p className="mt-3 text-[11px] text-gray-400">This offer is shown only once on this page.</p>
    </div>
  </Overlay>
);
