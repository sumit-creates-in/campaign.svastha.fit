import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Video, Sparkles } from "lucide-react";
import {
  US_MASTERCLASS,
  US_PRICING,
  US_PERSONAL_PRICING,
  isUsTestMode,
  type UsPlan,
} from "@/config/usMasterclass";

interface Props {
  /**
   * Claim an offer — opens the registration form for that option at the offer
   * price. Called with no argument by older pages (= the Master Class seat).
   */
  onClaim: (plan?: Extract<UsPlan, "masterclass" | "personalized">) => void;
  /**
   * True once the visitor has opened the registration form. Anyone who got
   * that far was ready to pay full price, so they never see the discount.
   */
  suppressed: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  /** Also offer $10 off the 21-Day Personalized Plan (women page, 24 Nov 2026). */
  withPersonal?: boolean;
}

const SEEN_KEY = "svastha_us_mc_offer_seen";

/**
 * One-time scroll offer for people who have read most of the page without
 * registering: $5 off the Master Class seat ($14) and — on the women page —
 * $10 off the 21-Day Personalized Plan ($49). Shown once per browser, never to
 * someone already in the form. Same pattern as the India 21-day challenge page.
 */
export const UsOfferPopup = ({ onClaim, suppressed, onVisibilityChange, withPersonal = false }: Props) => {
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
  const pOffer = US_PERSONAL_PRICING.offer;

  const claim = (plan: "masterclass" | "personalized") => {
    setOpen(false);
    onClaim(plan);
  };

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
                {withPersonal ? "A little extra to help you start" : <>Here&apos;s {offer.saving} off your seat</>}
              </p>
            </div>

            {withPersonal ? (
              <div className="space-y-3 px-5 pb-6 pt-5">
                <button
                  onClick={() => claim("masterclass")}
                  className="no-heartbeat w-full rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-4 text-left transition-transform hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-6 w-6 flex-shrink-0 text-emerald-600" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900">Live Master Class</p>
                      <p className="text-[11px] text-gray-600">
                        {US_MASTERCLASS.dateLabel} · {US_MASTERCLASS.timeLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-400 line-through">{offer.was}</p>
                      <p className="text-2xl font-extrabold text-gray-950">{offer.price}</p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-2.5 text-center text-sm font-extrabold text-white">
                    Claim My {offer.price} Seat
                  </p>
                </button>

                <button
                  onClick={() => claim("personalized")}
                  className="no-heartbeat w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-emerald-400"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 flex-shrink-0 text-amber-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900">21-Day Personalized Plan</p>
                      <p className="text-[11px] text-gray-600">Your own coach · start today</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-400 line-through">{pOffer.was}</p>
                      <p className="text-2xl font-extrabold text-gray-950">{pOffer.price}</p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-full bg-gray-900 py-2.5 text-center text-sm font-extrabold text-white">
                    Start My Plan for {pOffer.price}
                  </p>
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setOpen(false)}
                    className="no-heartbeat mt-1 text-xs font-medium text-gray-400 underline-offset-2 hover:underline"
                  >
                    No thanks
                  </button>
                  <p className="mt-2 text-[11px] text-gray-400">This offer is only shown once.</p>
                </div>
              </div>
            ) : (
              <div className="px-6 pb-6 pt-5 text-center">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-xl font-semibold text-gray-400 line-through">{offer.was}</span>
                  <span className="text-5xl font-extrabold tracking-tight text-gray-950">{offer.price}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {US_MASTERCLASS.subtitle} · {US_MASTERCLASS.dateLabel}
                  <br />
                  {US_MASTERCLASS.timeLabel}
                </p>

                <button
                  onClick={() => claim("masterclass")}
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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
