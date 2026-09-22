import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Hourglass, Video, Languages, MapPin } from "lucide-react";
import { US_MASTERCLASS, US_PRICING, localStartLabel } from "@/config/usMasterclass";

interface Props {
  onRegister: () => void;
  videoId?: string;
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

const BULLETS: [string, string, string][] = [
  ["With Natural", "Indian Food", "🌾"],
  ["Learn 5 Ultimate", "Golden Habits", "🌟"],
  ["Learn The Right Way of Fasting", "— around a US work day", "🍽️"],
  ["Join Live", "Yoga Classes from Home", "🧘"],
  ["Ask Sumit Your Question", "Live on Zoom", "💬"],
];

export const UsMasterClassHero = ({ onRegister, videoId = "0NBiGEJodyc" }: Props) => {
  const countdown = useCountdown(US_MASTERCLASS.startsAt);
  const [yourTime, setYourTime] = useState<string | null>(null);

  // Worked out in the browser so each visitor sees their own clock.
  useEffect(() => setYourTime(localStartLabel()), []);

  const details = [
    { icon: Calendar, label: US_MASTERCLASS.dateLabel },
    { icon: Clock, label: US_MASTERCLASS.timeLabel },
    { icon: Hourglass, label: US_MASTERCLASS.durationLabel },
    { icon: Video, label: US_MASTERCLASS.platformLabel },
    { icon: Languages, label: US_MASTERCLASS.languageLabel },
  ];

  return (
    <section className="relative bg-white px-4" style={{ paddingTop: "2rem" }}>
      <div style={{ paddingTop: "2rem", paddingBottom: "75px" }}>
        <div className="container mx-auto max-w-7xl">
          {/* Title block — kept from the challenge page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-center md:mb-12"
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-3xl text-emerald-500 md:text-4xl">✦</span>
              <h1 className="text-3xl tracking-wider text-emerald-600 md:text-4xl">ULTIMATE</h1>
              <span className="text-3xl text-emerald-500 md:text-4xl">✦</span>
            </div>
            <h2 className="mb-2 text-4xl font-bold text-emerald-600 md:text-6xl">21 Day</h2>
            <h3 className="text-4xl font-bold text-emerald-600 md:text-6xl">Weight Loss Challenge</h3>

            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-white md:text-base">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              {US_MASTERCLASS.eventName}
            </div>

            <p className="mt-4 px-4 text-base font-normal text-red-600 md:text-lg">
              🌍 For Indians living in USA &amp; Canada
            </p>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left — the pitch */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                  The 21-Day Plan Built for Indians Living in America 🔥
                </h4>
                <p className="mt-3 text-lg text-gray-600">
                  90 minutes, live with Sumit Sharma. The same plan behind thousands of
                  transformations — adapted for American schedules, American groceries
                  and the food you still cook at home.
                </p>
              </div>

              <div className="space-y-3">
                {BULLETS.map(([bold, rest, emoji]) => (
                  <div key={bold} className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                    <span className="flex-shrink-0 text-xl text-emerald-600">✦</span>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">{bold}</span> {rest} {emoji}
                    </p>
                  </div>
                ))}
              </div>

              {/* Session details */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {details.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border-2 border-gray-100 bg-gray-50/60 px-3.5 py-2.5"
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-gray-800">{label}</span>
                  </div>
                ))}
                {yourTime && (
                  <div className="flex items-center gap-2.5 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3.5 py-2.5">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">
                      Your time: {yourTime}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 md:pl-2">
                <Button
                  onClick={onRegister}
                  size="lg"
                  className="w-full transform rounded-full bg-gradient-to-r from-green-600 to-lime-400 px-12 py-6 text-xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-lime-500 hover:shadow-2xl md:w-auto md:px-10"
                >
                  Reserve My Seat — {US_PRICING.standard.price}
                </Button>
                <p className="mt-3 text-center text-sm text-gray-500 md:text-left">
                  A small fee keeps the room serious — only people who genuinely want
                  to change turn up.
                </p>
                {countdown && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-red-600 md:justify-start">
                    Starts in
                    <span className="font-mono font-bold">
                      {countdown.days}d {String(countdown.hours).padStart(2, "0")}h{" "}
                      {String(countdown.minutes).padStart(2, "0")}m{" "}
                      {String(countdown.seconds).padStart(2, "0")}s
                    </span>
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right — intro video, first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="order-first w-full lg:order-last"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border-4 border-emerald-100 shadow-2xl"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Ultimate 21 Day Weight Loss Challenge — Master Class"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
