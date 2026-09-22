import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { US_MASTERCLASS, US_PRICING } from "@/config/usMasterclass";

const INCLUDED = [
  "90 minutes live with Sumit Sharma",
  "The 5 Golden Rules",
  "The right way to fast — around a US work day",
  "The full 21-day diet & fasting structure",
  "Live Q&A — ask about your own situation",
];

/** The "Register here" card near the bottom of the page. */
export const UsRegisterCard = ({ onRegister }: { onRegister: () => void }) => (
  <section
    id="registration"
    className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-20"
  >
    <div className="container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Reserve your seat</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-xs overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-6 text-center text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-50">
            {US_MASTERCLASS.eventName}
          </p>
          <h3 className="mt-1 text-lg font-bold">{US_MASTERCLASS.name}</h3>
          <p className="mt-2 text-sm font-semibold">{US_MASTERCLASS.dateLabel}</p>
          <p className="text-sm">{US_MASTERCLASS.timeLabel}</p>
        </div>

        <div className="p-6 py-8">
          <div className="mb-6 text-center">
            <span className="text-4xl font-bold text-gray-900">{US_PRICING.standard.price}</span>
            <span className="ml-1.5 font-medium text-gray-600">only</span>
          </div>

          <div className="mb-8 space-y-3">
            {INCLUDED.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" strokeWidth={2.5} />
                <p className="text-sm text-gray-800">{feature}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={onRegister}
            className="w-full transform rounded-full bg-gradient-to-r from-green-600 to-lime-400 px-6 py-6 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-lime-500"
          >
            Reserve My Seat
          </Button>
          <p className="mt-3 text-center text-[11px] text-gray-500">
            Secure checkout by Stripe · Instant confirmation
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

/** Mobile sticky bar — appears once the hero button has scrolled away. */
export const UsStickyBar = ({ onRegister, hidden }: { onRegister: () => void; hidden?: boolean }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{US_MASTERCLASS.subtitle} · {US_MASTERCLASS.dateLabel}</p>
          <p className="text-xs text-gray-600">{US_MASTERCLASS.timeLabel}</p>
        </div>
        <Button
          onClick={onRegister}
          className="no-heartbeat flex-shrink-0 rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-5 py-2 text-sm font-bold text-white shadow-md"
        >
          Reserve — {US_PRICING.standard.price}
        </Button>
      </div>
    </div>
  );
};
