import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, CalendarDays, Gift, ShieldCheck, Siren } from "lucide-react";

/**
 * The "when do you want to start?" window on /Ultimate-21-day-weight-loss-challenge
 * (Sumit, 25 Nov 2026). The landing page shows no start date; people find it
 * here, as two clear choices:
 *
 *   Start now            → Personalized Plan (own dietitian, starts within 48 h)
 *   Start on <batch day> → Group Plan (joins the next batch)
 *
 * Two modes:
 *   mode="register" — opened by every Register button, page prices.
 *   mode="offer"    — the one-time scroll offer (after the Transformations
 *                     section), lower popup prices.
 */

export interface PlanChoice {
  /** Price on the page, e.g. "₹2,990". */
  price: string;
  /** Lower price in the scroll offer, e.g. "₹2,790". Same as price if none. */
  offerPrice: string;
  /** e.g. "₹200 off". Empty if there is no offer saving. */
  offerSaving: string;
  /** Razorpay page for the register mode. */
  url: string;
  /** Razorpay page for the offer mode. */
  offerUrl: string;
}

interface Props {
  mode: "register" | "offer";
  /** register mode: controlled by the page. */
  isOpen?: boolean;
  onClose?: () => void;
  personal: PlanChoice;
  group: PlanChoice;
  /** e.g. "6th December" — the batch start, only shown in this window. */
  batchStartLabel: string;
  /** e.g. "Sunday · live orientation 9:30 AM IST" */
  batchStartDetail: string;
  /** e.g. "New Year batch" */
  batchName?: string;
  /** offer mode: tell the page when the window is up (hides the chat button). */
  onVisibilityChange?: (visible: boolean) => void;
  /** offer mode: open after the section with this heading has been scrolled past. */
  triggerHeading?: string;
}

const PERSONAL_POINTS = [
  "Your own dietitian, one to one",
  "Diet + fasting plan made for your body",
  "Call + WhatsApp support, daily live yoga",
];

const GROUP_POINTS = [
  "Live orientation + weekly sessions with Sumit",
  "21-day diet + intermittent fasting plan",
  "Daily live yoga + WhatsApp group",
];

function go(url: string) {
  window.open(url, "_blank");
}

export const U21PlanChooser = ({
  mode,
  isOpen: isOpenProp,
  onClose,
  personal,
  group,
  batchStartLabel,
  batchStartDetail,
  batchName = "Next batch",
  onVisibilityChange,
  triggerHeading = "We Deliver The Best Transformations",
}: Props) => {
  const isOffer = mode === "offer";
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerShown, setOfferShown] = useState(false);
  const open = isOffer ? offerOpen : !!isOpenProp;

  // Offer mode: open once, after the visitor has read past the transformations.
  useEffect(() => {
    if (!isOffer || offerShown) return;
    const onScroll = () => {
      const h2 = Array.from(document.querySelectorAll("h2")).find((h) =>
        h.textContent?.includes(triggerHeading),
      );
      const section = h2?.closest("section");
      if (!section) return;
      if (section.getBoundingClientRect().bottom < window.innerHeight * 0.5) {
        setOfferOpen(true);
        setOfferShown(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOffer, offerShown, triggerHeading]);

  useEffect(() => {
    if (isOffer) onVisibilityChange?.(offerOpen);
  }, [isOffer, offerOpen, onVisibilityChange]);

  const close = () => {
    if (isOffer) setOfferOpen(false);
    onClose?.();
  };

  const hasOffer = isOffer && (!!personal.offerSaving || !!group.offerSaving);

  const cards = [
    {
      key: "personal",
      icon: Zap,
      when: "Start now",
      whenNote: "Begin within 48 hours — no waiting",
      plan: "Personalized Plan",
      points: PERSONAL_POINTS,
      choice: personal,
      accent: {
        ring: "border-amber-300",
        tag: "bg-amber-400 text-gray-900",
        soft: "bg-amber-50",
        icon: "text-amber-500",
        btn: "bg-gray-900 hover:bg-gray-800",
      },
      cta: "Start now",
    },
    {
      key: "group",
      icon: CalendarDays,
      when: `Start on ${batchStartLabel}`,
      whenNote: `${batchName} · ${batchStartDetail}`,
      plan: "Group Plan",
      points: GROUP_POINTS,
      choice: group,
      accent: {
        ring: "border-emerald-400",
        tag: "bg-emerald-500 text-white",
        soft: "bg-emerald-50",
        icon: "text-emerald-600",
        btn: "bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600",
      },
      cta: "Join batch",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-2 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={close}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="no-heartbeat absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-gray-500 shadow-sm hover:text-gray-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            {isOffer ? (
              // Red, attention-grabbing header (Sumit, 25 Nov 2026).
              <div className="bg-gradient-to-br from-red-600 via-red-600 to-rose-600 px-6 pb-3.5 pt-4 text-center text-white">
                <style>{`
                  @keyframes u21-alarm { 0%,100% { transform: rotate(0) scale(1) } 10% { transform: rotate(-14deg) scale(1.08) } 20% { transform: rotate(12deg) scale(1.08) } 30% { transform: rotate(-10deg) scale(1.05) } 40% { transform: rotate(8deg) scale(1.05) } 50% { transform: rotate(0) scale(1) } }
                  .u21-alarm { animation: u21-alarm 1.2s ease-in-out infinite; transform-origin: 50% 70%; }
                `}</style>
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-yellow-300 opacity-60" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-yellow-300 shadow-lg ring-4 ring-white/40">
                    <Siren className="u21-alarm h-8 w-8 text-red-600" strokeWidth={2.4} />
                  </span>
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600">
                  <Gift className="h-3.5 w-3.5" /> Special offer unlocked
                </span>
                <p className="mt-2 text-xl font-extrabold leading-tight">
                  {hasOffer ? "Wait! Extra discount — just for you" : "Ready to begin?"}
                </p>
                <p className="mt-0.5 text-sm font-medium text-red-50">Only on this screen — pick when to start.</p>
              </div>
            ) : (
              <div className="px-6 pb-1 pt-6 text-center">
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Ultimate 21 Day Weight Loss Challenge
                </span>
                <p className="mt-2.5 text-[22px] font-extrabold leading-tight text-gray-900">
                  When would you like to start?
                </p>
                <p className="mt-1 text-sm text-gray-600">Both plans use home food — daal, chawal, roti, sabji.</p>
              </div>
            )}

            {/* The two choices */}
            <div className="space-y-3 px-4 pb-3 pt-3">
              {cards.map((c) => {
                const showOffer = isOffer && !!c.choice.offerSaving && c.choice.offerPrice !== c.choice.price;
                const price = isOffer ? c.choice.offerPrice : c.choice.price;
                const url = isOffer ? c.choice.offerUrl : c.choice.url;
                return (
                  <div key={c.key} className={`relative overflow-hidden rounded-2xl border-2 ${c.accent.ring} bg-white`}>
                    {/* When — the big, first thing */}
                    <div className={`flex items-center gap-3 px-4 py-2.5 ${c.accent.soft}`}>
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        <c.icon className={`h-5 w-5 ${c.accent.icon}`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-extrabold leading-tight text-gray-900">{c.when}</p>
                        <p className="text-xs font-medium text-gray-600">{c.whenNote}</p>
                      </div>
                      {showOffer && (
                        <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${c.accent.tag}`}>
                          {c.choice.offerSaving}
                        </span>
                      )}
                    </div>

                    <div className="px-4 pb-3.5 pt-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{c.plan}</p>
                      <ul className="mt-1.5 space-y-1">
                        {c.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-gray-800">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" strokeWidth={3} />
                            {p}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-baseline gap-2">
                        {showOffer && (
                          <span className="text-base font-semibold text-gray-400 line-through">{c.choice.price}</span>
                        )}
                        <span className="text-[28px] font-extrabold text-gray-900">{price}</span>
                        </div>
                        <button
                          onClick={() => {
                            close();
                            go(url);
                          }}
                          className={`no-heartbeat flex-shrink-0 rounded-full px-5 py-3 text-[15px] font-extrabold text-white shadow-md transition-transform active:scale-[0.98] ${c.accent.btn}`}
                        >
                          {c.cta} →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 pb-5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Secure payment by Razorpay · confirmation on WhatsApp
              </p>
              {isOffer && (
                <>
                  <button
                    onClick={close}
                    className="no-heartbeat mt-3 text-xs font-medium text-gray-400 underline-offset-2 hover:underline"
                  >
                    No thanks, maybe later
                  </button>
                  <p className="mt-1 text-[11px] text-gray-400">This offer is shown only once.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
