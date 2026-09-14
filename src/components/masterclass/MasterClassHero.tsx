import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Languages, Hourglass } from "lucide-react";
import { MASTERCLASS, PRICING } from "@/config/masterclass";

interface Props {
  onRegister: () => void;
}

function useCountdown(targetIso: string) {
  const [left, setLeft] = useState(() => new Date(targetIso).getTime() - Date.now());

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
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
  { icon: Calendar, label: MASTERCLASS.dateLabel },
  { icon: Clock, label: MASTERCLASS.timeLabel },
  { icon: Hourglass, label: MASTERCLASS.durationLabel },
  { icon: Video, label: MASTERCLASS.platformLabel },
  { icon: Languages, label: MASTERCLASS.languageLabel },
];

export const MasterClassHero = ({ onRegister }: Props) => {
  const countdown = useCountdown(MASTERCLASS.startsAt);

  return (
    <section className="bg-white px-4 pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="container mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            {MASTERCLASS.platformLabel} · {MASTERCLASS.subtitle}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-3xl text-center"
        >
          <h1 className="text-[28px] leading-[1.15] font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            You&apos;ve Fasted Before.{" "}
            <span className="text-emerald-600">
              So Why Did the Weight Come Back?
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            In 90 minutes I&apos;ll walk you through the exact 21-day plan
            behind thousands of transformations — built on daal, chawal, roti
            and sabji. No supplements. No starving. No gym.
          </p>
        </motion.div>

        {/* Event name — the thing they are actually registering for */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border-2 border-emerald-500 bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-4 text-center shadow-lg"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100 md:text-sm">
            {MASTERCLASS.eventName}
          </p>
          <p className="mt-1 text-lg font-extrabold leading-tight text-white md:text-2xl">
            {MASTERCLASS.name}
          </p>
        </motion.div>

        {/* Session details + CTA + video */}
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Video first on mobile — it does the selling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-first w-full lg:order-last"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border-4 border-emerald-100 shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src="https://www.youtube.com/embed/0zkAOy4AP38"
                title="Ultimate 21 Day Weight Loss Challenge Master Class"
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
            {/* Details grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {DETAILS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border-2 border-gray-100 bg-gray-50/60 px-3.5 py-2.5"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline justify-center gap-3 lg:justify-start">
              <span className="text-xl font-medium text-gray-400 line-through">
                {PRICING.anchor}
              </span>
              <span className="text-4xl font-extrabold text-gray-900">
                {PRICING.price}
              </span>
              <span className="text-sm font-medium text-gray-500">only</span>
            </div>
            <p className="mt-1.5 text-center text-xs text-gray-500 lg:text-left">
              A token fee keeps the room serious. Only people who genuinely want
              to change turn up — and that is who you want to be sitting with.
            </p>

            {/* CTA */}
            <Button
              onClick={onRegister}
              size="lg"
              className="no-heartbeat mt-5 w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-7 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:from-green-700 hover:to-lime-600"
            >
              Reserve My Seat — {PRICING.price}
            </Button>

            {/* Countdown */}
            {countdown && (
              <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Registration closes in
                </span>
                <span className="font-mono text-sm font-bold text-red-600">
                  {countdown.days}d {String(countdown.hours).padStart(2, "0")}h{" "}
                  {String(countdown.minutes).padStart(2, "0")}m{" "}
                  {String(countdown.seconds).padStart(2, "0")}s
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
