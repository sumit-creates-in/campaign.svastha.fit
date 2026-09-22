import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { US_MASTERCLASS, US_PRICING, isUsTestMode } from "@/config/usMasterclass";

interface Props {
  /** Claim the offer — opens the registration form at the offer price. */
  onClaim: () => void;
  /**
   * True once the visitor has opened the registration form. Anyone who got
   * that far was ready to pay $19, so they never see the discount.
   */
  suppressed: boolean;
  onVisibilityChange?: (visible: boolean) => void;
}

const SEEN_KEY = "svastha_us_mc_offer_seen";

/**
 * One-time $5-off offer for people who have read most of the page without
 * registering. Shown once per browser, never to someone already in the form.
 */
export const UsOfferPopup = ({ onClaim, suppressed, onVisibilityChange }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (suppressed) return;
    let seen = false;
    try {
      // In test mode the popup shows every visit, so it can be tried again.
      seen = !isUsTestMode() && localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;

    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.55) {
        setOpen(true);
        try {
          localStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* ignore */
        }
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [suppressed]);

  // If they open the form another way while the popup is up, close it.
  useEffect(() => {
    if (suppressed) setOpen(false);
  }, [suppressed]);

  useEffect(() => {
    onVisibilityChange?.(open);
  }, [open, onVisibilityChange]);

  const { offer } = US_PRICING;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 md:items-center"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="no-heartbeat absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-gray-500 hover:text-gray-900"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-red-600 px-6 pb-5 pt-7 text-center text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-100">
                Still thinking about it?
              </p>
              <p className="mt-2 text-2xl font-extrabold leading-tight">
                Here&apos;s {offer.saving} off your seat
              </p>
            </div>

            <div className="px-6 pb-6 pt-5 text-center">
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-xl font-semibold text-gray-400 line-through">{offer.was}</span>
                <span className="text-5xl font-extrabold tracking-tight text-gray-950">
                  {offer.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {US_MASTERCLASS.subtitle} · {US_MASTERCLASS.dateLabel}
                <br />
                {US_MASTERCLASS.timeLabel}
              </p>

              <button
                onClick={() => {
                  setOpen(false);
                  onClaim();
                }}
                className="no-heartbeat mt-5 w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-6 py-4 text-base font-extrabold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                Claim My {offer.price} Seat
              </button>
              <button
                onClick={() => setOpen(false)}
                className="no-heartbeat mt-3 text-xs font-medium text-gray-400 underline-offset-2 hover:underline"
              >
                No thanks
              </button>
              <p className="mt-3 text-[11px] text-gray-400">This offer is only shown once.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
