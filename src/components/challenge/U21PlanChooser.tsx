import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, CalendarDays, Gift, ShieldCheck, Siren, PhoneCall, ArrowLeft, Lock } from "lucide-react";
import { FreeConsultationModal } from "@/components/masterclass/FreeConsultationModal";
import { ErrorText, PhoneInput, fieldClass, validateName, validatePhone } from "@/components/masterclass/leadFormBits";
import { applyMetaUserData, getStoredMetaUser, saveMetaUserData } from "@/lib/metaUserData";
import { sendCrmLead } from "@/lib/crmLead";
import { openWhatsApp } from "@/lib/whatsapp";

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

/** Razorpay payment pages prefill name / mobile from the URL, so nobody types them twice. */
function withPrefill(url: string, name: string, phone: string) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${new URLSearchParams({ name: name.trim(), mobile: phone }).toString()}`;
}

/** Call is due 30 minutes after checkout starts; a payment in between closes it in the CRM. */
function callDueIso() {
  return new Date(Date.now() + 30 * 60 * 1000).toISOString();
}

export const CONSULT_SOURCE_21DAY = "21day-free-consultation";
export const CHECKOUT_SOURCE_21DAY = "21day-checkout";

/**
 * "Started checkout" signal for Meta (Sumit, 25 Nov 2026): fired when someone
 * taps a plan button, so the ads learn from people about to pay, not only from
 * the few who finish. Never blocks the click.
 */
function trackCheckout(plan: "personal" | "group", price: string, mode: "register" | "offer") {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return;
    const value = Number(price.replace(/[^\d]/g, "")) || undefined;
    fbq(
      "track",
      "InitiateCheckout",
      {
        value,
        currency: "INR",
        content_name: plan === "personal" ? "21 Day Challenge - Personalized (India)" : "21 Day Challenge - Group (India)",
        content_category: mode === "offer" ? "scroll_offer" : "register_window",
        num_items: 1,
      },
      { eventID: `ic_${plan}_${Date.now()}` },
    );
  } catch {
    /* tracking must never break the page */
  }
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

  // Step 2 (Sumit, 26 Nov 2026): name + WhatsApp before payment, so the sales team can call anyone who
  // leaves at checkout. The same details prefill Razorpay.
  type Pending = { plan: "personal" | "group"; planName: string; price: string; url: string };
  const [pending, setPending] = useState<Pending | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setPending(null);
      setErrors({});
      return;
    }
    const u = getStoredMetaUser();
    if (u.name) setName((n) => n || u.name || "");
    if (u.phone) setPhone((p) => p || u.phone || "");
  }, [open]);

  const continueToPay = () => {
    if (!pending) return;
    const found = { name: validateName(name), phone: validatePhone(phone) };
    if (found.name || found.phone) {
      setErrors(found);
      (found.name ? nameRef.current : phoneRef.current)?.focus();
      return;
    }
    saveMetaUserData({ name: name.trim(), phone });
    applyMetaUserData();
    trackCheckout(pending.plan, pending.price, mode);
    // Not awaited: the payment page must open inside the tap, or browsers block it.
    void sendCrmLead({
      name: name.trim(),
      phone,
      source: CHECKOUT_SOURCE_21DAY,
      crmEvent: "checkout_abandoned",
      details: `21 Day Challenge: opened the ${pending.planName} payment (${pending.price}, ${
        mode === "offer" ? "scroll offer" : "register window"
      }) but had not paid 30 minutes later. If they paid, this call closes by itself.`,
      callDate: callDueIso(),
      callTime: "",
    });
    const url = withPrefill(pending.url, name, phone);
    close();
    go(url);
  };

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
  // Same saving on both plans → say it once, big, in the header (Sumit, 25 Nov 2026).
  const sharedSaving =
    isOffer && personal.offerSaving && personal.offerSaving === group.offerSaving ? personal.offerSaving : "";

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
    <>
    {consultOpen && (
      <FreeConsultationModal
        onClose={() => setConsultOpen(false)}
        source={CONSULT_SOURCE_21DAY}
        fromLabel={`the 21 Day Challenge ${isOffer ? "scroll offer" : "plan window"} ("Get Consultation Call")`}
        pixelName="Free consultation - 21 day plan window"
      />
    )}
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
                  {hasOffer ? "If you close it, you will lose it." : "Ready to begin?"}
                </p>
                {sharedSaving && (
                  <div className="mx-auto mt-2.5 inline-flex items-baseline gap-2 rounded-2xl bg-yellow-300 px-5 py-1.5 text-gray-900 shadow-lg ring-4 ring-white/30">
                    <span className="text-[28px] font-black uppercase leading-none tracking-tight">{sharedSaving}</span>
                    <span className="text-xs font-bold uppercase">on both plans</span>
                  </div>
                )}
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

            {pending ? (
              /* Step 2: where to send the confirmation */
              <div className="px-5 pb-2 pt-4">
                <button
                  type="button"
                  onClick={() => setPending(null)}
                  className="no-heartbeat mb-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to plans
                </button>
                <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Last step</p>
                  <p className="mt-0.5 text-base font-extrabold text-gray-900">
                    {pending.planName} · {pending.price}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600">
                    Where should we send your confirmation and joining details?
                  </p>
                </div>
                <form
                  className="mt-4 space-y-3.5"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    continueToPay();
                  }}
                >
                  <div>
                    <label htmlFor="u21-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Your name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="u21-name"
                      ref={nameRef}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((x) => ({ ...x, name: undefined }));
                      }}
                      autoComplete="name"
                      placeholder="Full name"
                      className={fieldClass(!!errors.name)}
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                  </div>
                  <PhoneInput
                    id="u21-phone"
                    ref={phoneRef}
                    value={phone}
                    onChange={(d) => {
                      setPhone(d);
                      setErrors((x) => ({ ...x, phone: undefined }));
                    }}
                    error={errors.phone}
                    hint="Your joining details come on this WhatsApp number."
                  />
                  <button
                    type="submit"
                    className="no-heartbeat w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3.5 text-base font-extrabold text-white shadow-lg hover:from-green-700 hover:to-lime-600"
                  >
                    Continue to payment →
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                    <Lock className="h-3 w-3" /> Used only for your joining details. No spam.
                  </p>
                </form>
              </div>
            ) : (
            /* The two choices */
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
                      {showOffer && !sharedSaving && (
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
                          onClick={() =>
                            setPending({
                              plan: c.key === "personal" ? "personal" : "group",
                              planName: c.plan,
                              price,
                              url,
                            })
                          }
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
            )}

            {/* Not sure yet? (Sumit, 26 Nov 2026) */}
            {!pending && (
              <div className="mx-4 mb-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-center text-xs font-semibold text-gray-700">Not sure which plan suits you?</p>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      setConsultOpen(true);
                    }}
                    className="no-heartbeat flex items-center justify-center gap-1.5 rounded-xl border-2 border-emerald-500 bg-white px-2 py-2.5 text-[13px] font-bold text-emerald-700 hover:bg-emerald-50"
                  >
                    <PhoneCall className="h-4 w-4" /> Get Consultation Call
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        "Hi, I have a question about the Ultimate 21 Day Weight Loss Challenge before I join.",
                        `WhatsApp - 21 day ${isOffer ? "scroll offer" : "register window"}`,
                      )
                    }
                    className="no-heartbeat flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2.5 text-[13px] font-bold text-white hover:bg-[#1ebe5b]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" />
                    </svg>
                    Ask on WhatsApp first
                  </button>
                </div>
              </div>
            )}

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
    </>
  );
};
