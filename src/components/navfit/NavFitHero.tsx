import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Video, Languages, Flower2, Sparkles } from "lucide-react";
import { NAVFIT, NAVFIT_PRICING, NAVFIT_VIDEO_ID } from "@/config/navfit";

interface Props {
  onRegister: () => void;
  /** Price shown on the button — switches to the offer price once claimed. */
  priceLabel?: string;
}

function useCountdown(targetIso: string) {
  const [left, setLeft] = useState(() => new Date(targetIso).getTime() - Date.now());
  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  if (left <= 0) return null;
  return {
    days: Math.floor(left / 86_400_000),
    hours: Math.floor((left % 86_400_000) / 3_600_000),
    minutes: Math.floor((left % 3_600_000) / 60_000),
    seconds: Math.floor((left % 60_000) / 1000),
  };
}

const DETAILS = [
  { icon: CalendarDays, label: `${NAVFIT.datesShort} · 9 days` },
  { icon: Clock, label: `Orientation: ${NAVFIT.orientationDateLabel}, ${NAVFIT.orientationTimeLabel}` },
  { icon: Video, label: `${NAVFIT.platformLabel} with Sumit Sharma` },
  { icon: Flower2, label: "Daily live yoga classes" },
  { icon: Languages, label: NAVFIT.languageLabel },
  { icon: Sparkles, label: `${NAVFIT.goldenHabits} Ultimate Golden Habits` },
];

export const NavFitHero = ({ onRegister, priceLabel = NAVFIT_PRICING.standard.price }: Props) => {
  const countdown = useCountdown(NAVFIT.orientationAt);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50/40 to-white px-4 pb-16 pt-9 md:pb-24 md:pt-12">
      {/* Toran-style festive strip */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,#f59e0b_0_18px,#e11d48_18px_36px,#16a34a_36px_54px)]"
      />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 shadow-sm">
            🪔 Navratri 2026 · {NAVFIT.datesShort}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600 md:text-base">
            9 Day Weight Loss Challenge
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-rose-800 via-rose-600 to-orange-500 bg-clip-text text-5xl font-extrabold leading-[1.05] text-transparent sm:text-6xl md:text-7xl">
            {NAVFIT.name}
          </h1>
        </motion.div>

        {/* The result — the first thing people should read after the name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-5 text-center"
        >
          <span className="inline-block rounded-full bg-yellow-300 px-7 py-2.5 text-2xl font-extrabold uppercase tracking-wide text-gray-900 shadow-xl ring-4 ring-white md:px-10 md:py-3 md:text-4xl">
            Lose up to 5 Kg
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-5 max-w-3xl text-center"
        >
          <p className="text-lg font-semibold text-gray-800 md:text-2xl">
            A 9-day weight loss plan that works — with or without the Navratri vrat
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Want to lose weight but never manage to stick to a diet? These 9 days
            are your fresh start. Keep the vrat or don&apos;t — you get a simple
            plan, 9 Golden Habits, daily live yoga and Sumit Sharma guiding you
            from the orientation to the last day.
          </p>
        </motion.div>

        {/* Two ways to follow it — answers "what if I don't fast?" up front */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-7 max-w-3xl"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
            Pick the plan that suits you
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-amber-200 bg-white px-4 py-3.5 text-left shadow-sm">
              <p className="font-extrabold text-gray-900">🪔 Keeping the Navratri vrat?</p>
              <p className="mt-1 text-sm text-gray-600">
                Follow the Navratri fasting plan — simple vrat food, planned for weight loss.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-emerald-200 bg-white px-4 py-3.5 text-left shadow-sm">
              <p className="font-extrabold text-gray-900">🍽️ Not fasting for Navratri?</p>
              <p className="mt-1 text-sm text-gray-600">
                Follow the regular diet &amp; fasting plan — everyday home food, planned for weight loss.
              </p>
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-medium text-gray-700">
            Same 9 Golden Habits · same daily yoga · same guidance
          </p>
        </motion.div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Video first on mobile — it does the selling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-first w-full lg:order-last"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border-4 border-amber-200 shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src={`https://www.youtube.com/embed/${NAVFIT_VIDEO_ID}`}
                title="Nav Fit Challenge — Introduction by Sumit Sharma"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {DETAILS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border-2 border-amber-100 bg-white px-3.5 py-2.5"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-rose-600" />
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-baseline justify-center gap-2 lg:justify-start">
              <span className="text-4xl font-extrabold text-gray-900">{priceLabel}</span>
              <span className="text-sm font-medium text-gray-500">for all 9 days</span>
            </div>

            <button
              type="button"
              onClick={onRegister}
              className="no-heartbeat mt-5 w-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-5 text-lg font-extrabold text-white shadow-xl shadow-rose-600/25 transition-transform hover:scale-[1.02]"
            >
              Join the Nav Fit Challenge — {priceLabel}
            </button>

            {countdown ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Orientation starts in
                </span>
                <span className="font-mono text-sm font-bold text-rose-600">
                  {countdown.days}d {String(countdown.hours).padStart(2, "0")}h{" "}
                  {String(countdown.minutes).padStart(2, "0")}m{" "}
                  {String(countdown.seconds).padStart(2, "0")}s
                </span>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
