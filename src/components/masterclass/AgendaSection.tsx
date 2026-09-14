import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  SearchX,
  Sparkles,
  Timer,
  UtensilsCrossed,
  HeartPulse,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { PRICING } from "@/config/masterclass";

interface Props {
  onRegister: () => void;
}

type Item = {
  icon: LucideIcon;
  minutes: string;
  title: string;
  body: string;
  takeaway: string;
  accent: string;
  chip: string;
};

const AGENDA: Item[] = [
  {
    icon: SearchX,
    minutes: "First 10 min",
    title: "Why your last attempt failed",
    body: "The three mistakes almost every Indian dieter makes. Losing the weight was never the hard part — keeping it off was.",
    takeaway: "You'll finally know what went wrong",
    accent: "from-rose-500 to-red-500",
    chip: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: Sparkles,
    minutes: "15 min",
    title: "The 5 Golden Rules",
    body: "The five habits behind every transformation you'll see on this page. Simple enough to start tomorrow, strong enough to hold for life.",
    takeaway: "All 5 rules, written down",
    accent: "from-amber-500 to-orange-500",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: Timer,
    minutes: "20 min",
    title: "The right way to fast",
    body: "Intermittent fasting built around Indian meal timings and family routines — not against them. Most people fast at the wrong hours and stall for weeks.",
    takeaway: "Your personal fasting window",
    accent: "from-emerald-500 to-teal-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: UtensilsCrossed,
    minutes: "20 min",
    title: "Your 21-day diet plan",
    body: "The actual structure of the challenge. Daal, chawal, roti, sabji — food already in your kitchen. No supplements, no imported ingredients, no cooking separately.",
    takeaway: "The full 21-day structure",
    accent: "from-sky-500 to-blue-500",
    chip: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    icon: HeartPulse,
    minutes: "10 min",
    title: "Daily yoga, done from home",
    body: "How the live classes fit around a working day, what a session actually looks like, and why the daily practice is what makes the diet hold.",
    takeaway: "Know exactly how it works",
    accent: "from-violet-500 to-purple-500",
    chip: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    icon: MessagesSquare,
    minutes: "Last 15 min",
    title: "Live Q&A with Sumit",
    body: "Bring your situation — your condition, your schedule, whatever has stopped you before. Ask it live and get a straight answer.",
    takeaway: "Your own question answered",
    accent: "from-fuchsia-500 to-pink-500",
    chip: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  },
];

export const AgendaSection = ({ onRegister }: Props) => (
  <section className="bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 px-4 py-20 md:py-28">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center md:mb-16"
      >
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
          90 minutes · 6 things
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900 md:text-4xl">
          What you&apos;ll walk away with
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 md:text-base">
          Not a motivational talk. You leave with a plan you can start the next
          morning.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {AGENDA.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (idx % 2) * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl"
          >
            {/* Coloured top edge */}
            <div
              className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.accent}`}
            />

            <div className="flex items-start justify-between gap-3 pt-2">
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-md`}
              >
                <item.icon className="h-6 w-6 text-white" strokeWidth={2.2} />
              </div>
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                {item.minutes}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold leading-snug text-gray-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {item.body}
            </p>

            <div
              className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${item.chip}`}
            >
              ✓ {item.takeaway}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center md:mt-16">
        <Button
          onClick={onRegister}
          size="lg"
          className="no-heartbeat rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-10 py-7 text-base font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:from-green-700 hover:to-lime-600"
        >
          Reserve My Seat — {PRICING.price}
        </Button>
      </div>
    </div>
  </section>
);
