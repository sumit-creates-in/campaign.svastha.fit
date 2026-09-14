import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MASTERCLASS, PRICING } from "@/config/masterclass";

interface Props {
  onRegister: () => void;
}

const AGENDA = [
  {
    title: "Why your last attempt failed",
    body: "The three mistakes almost every Indian dieter makes — and why losing the weight was never the hard part. Keeping it off was.",
  },
  {
    title: "The 5 Golden Rules",
    body: "The five habits behind every transformation you'll see on this page. Simple enough to start tomorrow, strong enough to hold for life.",
  },
  {
    title: "The right way to fast",
    body: "Intermittent fasting built around Indian meal timings and family routines — not against them. Why most people fast at the wrong hours and stall.",
  },
  {
    title: "Your 21-day diet & fasting plan",
    body: "The actual structure of the challenge. Daal, chawal, roti, sabji — food already in your kitchen. No supplements, no imported ingredients, no separate cooking.",
  },
  {
    title: `Fasting through ${MASTERCLASS.navratriLabel}`,
    body: `${MASTERCLASS.navratriLabel} starts ${MASTERCLASS.navratriStartLabel}. How to do all nine days without losing muscle or energy — and why so many people finish the festival heavier than they began.`,
  },
  {
    title: "Live Q&A with Sumit",
    body: "Bring your situation — your condition, your schedule, whatever has stopped you before. Ask it live and get a straight answer.",
  },
];

export const AgendaSection = ({ onRegister }: Props) => (
  <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
          What we&apos;ll cover in the 90 minutes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
          This is not a motivational talk. You leave with a plan you can start
          the next morning.
        </p>
      </motion.div>

      <div className="space-y-3">
        {AGENDA.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex gap-4 rounded-2xl border-2 border-emerald-100 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              {idx + 1}
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 md:text-lg">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 md:text-base">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button
          onClick={onRegister}
          size="lg"
          className="no-heartbeat rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-10 py-6 text-base font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:from-green-700 hover:to-lime-600"
        >
          Reserve My Seat — {PRICING.price}
        </Button>
      </div>
    </div>
  </section>
);
