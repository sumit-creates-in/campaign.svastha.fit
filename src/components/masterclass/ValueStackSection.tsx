import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { MASTERCLASS, PRICING, DAILY_PRACTICE } from "@/config/masterclass";

interface Props {
  onRegister: () => void;
}

const INCLUDED = [
  {
    title: "The 90-minute live Master Class",
    body: "With Sumit, live on Zoom. Not a replay, not a bot — a real session with a real Q&A.",
  },
  {
    title: "Your daily live practice",
    body: `Live yoga and fat-burn classes at ${DAILY_PRACTICE.morning} and ${DAILY_PRACTICE.evening}, ${DAILY_PRACTICE.days}, with Svastha's own teachers.`,
  },
  {
    title: "The 21-Day Indian Diet & Fasting Starter Plan",
    body: "Sent to your WhatsApp the moment you register, so you can begin before the session even starts.",
  },
  {
    title: "The recording",
    body: "Can't make 7:30 PM? Register anyway. The recording comes to you.",
  },
];

export const ValueStackSection = ({ onRegister }: Props) => (
  <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-3xl">
      <div style={{ height: '3rem' }} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
          What {PRICING.price} gets you
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-5 text-center text-white">
          <h3 className="text-lg font-bold leading-tight">
            {MASTERCLASS.name}
          </h3>
          <p className="text-sm font-semibold opacity-95">
            {MASTERCLASS.subtitle}
          </p>
          <p className="mt-1.5 text-xs opacity-90">
            {MASTERCLASS.dateLabel} · {MASTERCLASS.timeLabel}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="space-y-4">
            {INCLUDED.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 md:text-base">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t-2 border-dashed border-gray-200 pt-6">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-xl font-medium text-gray-400 line-through">
                {PRICING.anchor}
              </span>
              <span className="text-4xl font-extrabold text-gray-900">
                {PRICING.price}
              </span>
            </div>

            <Button
              onClick={onRegister}
              className="no-heartbeat mt-5 w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-7 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:from-green-700 hover:to-lime-600"
            >
              Reserve My Seat — {PRICING.price}
            </Button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Takes about 40 seconds. Your Zoom link arrives on WhatsApp
              straight away.
            </p>
          </div>
        </div>
      </motion.div>

      <div style={{ height: '3rem' }} />
    </div>
  </section>
);
