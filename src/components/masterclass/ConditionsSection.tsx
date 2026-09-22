import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Droplets,
  HeartPulse,
  Gauge,
  Flower2,
  Stethoscope,
  ShieldCheck,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { PRICING } from "@/config/masterclass";

interface Props {
  onRegister: () => void;
  /** Button price label. Defaults to the India ₹ price; the US page passes "$19". */
  priceLabel?: string;
}

type Condition = {
  icon: LucideIcon;
  name: string;
  line: string;
};

const CONDITION_CARDS: Condition[] = [
  {
    icon: Droplets,
    name: "Fatty Liver",
    line: "Built around the eating and fasting patterns your liver gets a break from.",
  },
  {
    icon: Flower2,
    name: "PCOS / PCOD",
    line: "One of the most common reasons women join us — you will not be the only one.",
  },
  {
    icon: Activity,
    name: "Type 2 Diabetes",
    line: "Meal timing and food choices planned with your blood sugar in mind.",
  },
  {
    icon: Gauge,
    name: "Thyroid",
    line: "Slow progress is normal with thyroid. The plan expects it and works with it.",
  },
  {
    icon: HeartPulse,
    name: "Heart & BP Issues",
    line: "Low-intensity yoga and simple home food — nothing that spikes your system.",
  },
  {
    icon: Stethoscope,
    name: "High Cholesterol",
    line: "Home-cooked Indian meals, adjusted rather than replaced with strange food.",
  },
];

const PROMISES = [
  {
    icon: UserCog,
    title: "Tell us when you register",
    body: "The form asks what you're dealing with. That answer reaches our dietitian team before you ever join the session.",
  },
  {
    icon: ShieldCheck,
    title: "Your medication stays exactly as it is",
    body: "Nothing here asks you to stop or change any treatment. Keep taking what your doctor prescribed and keep them in the loop.",
  },
];

export const ConditionsSection = ({ onRegister, priceLabel = PRICING.price }: Props) => (
  <section className="bg-gradient-to-br from-teal-50 via-cyan-50/60 to-blue-50 px-4 py-20 md:py-28">
    <div className="container mx-auto max-w-5xl">
      <div style={{ height: '3rem' }} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 shadow-sm">
          You are not the exception
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900 md:text-4xl">
          &ldquo;Will this work for me? I have a condition.&rdquo;
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
          This is the question we&apos;re asked most — and here is the honest
          answer: people managing a health condition aren&apos;t a special case
          for us, they are <strong>most of who we work with</strong>. Sumit is a
          certified dietitian, and the plan was shaped around exactly these
          situations.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONDITION_CARDS.map((c, idx) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
            // No backdrop-blur here: it composites unreliably on mid-range
            // Android browsers and can paint over the card's own content.
            className="rounded-2xl border-2 border-white bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 shadow-md">
              <c.icon className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <h3 className="mt-3.5 text-base font-bold text-gray-900">
              {c.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
              {c.line}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {PROMISES.map((p) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 rounded-2xl border-2 border-teal-200 bg-white p-5"
          >
            <p.icon className="h-6 w-6 flex-shrink-0 text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 md:text-base">
                {p.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {p.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-gray-500">
        This is nutrition, fasting and yoga guidance — not medical treatment. If
        you are pregnant, or under care for a serious condition, please check
        with your doctor before starting. We would rather you asked them first.
      </p>

      <div className="mt-10 text-center">
        <Button
          onClick={onRegister}
          size="lg"
          className="no-heartbeat rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-10 py-7 text-base font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:from-green-700 hover:to-lime-600"
        >
          Reserve My Seat — {priceLabel}
        </Button>
      </div>

      <div style={{ height: '3rem' }} />
    </div>
  </section>
);
