import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, CalendarDays, Clock, Video, Languages, ArrowDown, Sparkles } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import {
  NAVFIT,
  NAVFIT_PRICING,
  NAVFIT_STORAGE_KEY,
  NAVFIT_WHATSAPP_GROUP_URL,
} from "@/config/navfit";

function readLead(): { name?: string; tier?: "standard" | "offer" } | null {
  try {
    const raw = localStorage.getItem(NAVFIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/**
 * Fires the Meta Pixel Purchase event once per browser session. Razorpay only
 * sends people here after a successful payment; the session guard stops a
 * refresh from counting the same sale twice.
 */
function trackPurchaseOnce(amount: number) {
  const key = "svastha_navfit_purchase_tracked";
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* storage blocked — still send it for this page load */
  }
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "Purchase", {
        value: amount,
        currency: "INR",
        content_name: "Nav Fit Challenge Registration",
      });
    }
  } catch {
    /* tracking must never break the page */
  }
}

/** Google Calendar link so the session lands in their calendar in one tap. */
function calendarUrl() {
  const start = new Date(NAVFIT.orientationAt);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${NAVFIT.name} — Live Orientation with Sumit Sharma`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details:
      "Live on Zoom with Sumit Sharma. The joining link is shared in the Nav Fit WhatsApp group.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const DETAILS = [
  { icon: Video, label: "Orientation", value: `${NAVFIT.orientationDateLabel}, ${NAVFIT.orientationTimeLabel}` },
  { icon: Clock, label: "Preparation day", value: NAVFIT.prepDayLabel },
  { icon: CalendarDays, label: "Challenge", value: `${NAVFIT.datesShort} · 9 days` },
  { icon: Sparkles, label: "You'll learn", value: `${NAVFIT.goldenHabits} Ultimate Golden Habits` },
  { icon: Languages, label: "Language", value: NAVFIT.languageLabel },
];

const NavFitChallengeConfirmed = () => {
  const lead = useMemo(readLead, []);
  const amount = useMemo(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get("amount"));
    if (fromUrl === NAVFIT_PRICING.standard.amount || fromUrl === NAVFIT_PRICING.offer.amount) return fromUrl;
    return lead?.tier === "offer" ? NAVFIT_PRICING.offer.amount : NAVFIT_PRICING.standard.amount;
  }, [lead]);
  const firstName = lead?.name?.trim().split(/\s+/)[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPurchaseOnce(amount);
  }, [amount]);

  useMeta({
    title: `You're in — ${NAVFIT.name}`,
    description: `Your spot in the ${NAVFIT.name} (${NAVFIT.datesShort}) is confirmed. Join the WhatsApp group for your orientation link and plan.`,
  });

  return (
    <>
      {/* Pulsing halo so the one thing that matters cannot be missed. */}
      <style>{`
        @keyframes joinPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,.55), 0 10px 30px rgba(0,0,0,.18); }
          70%  { box-shadow: 0 0 0 22px rgba(37,211,102,0),  0 10px 30px rgba(0,0,0,.18); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0),     0 10px 30px rgba(0,0,0,.18); }
        }
        @keyframes nudge {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(6px); }
        }
        .join-btn { animation: joinPulse 2s infinite; }
        .join-btn:hover { transform: scale(1.03); }
        .nudge { animation: nudge 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .join-btn, .nudge { animation: none; }
        }
      `}</style>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-white to-white px-5 py-14">
        <div className="w-full max-w-lg">
          {/* Success */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/30">
              <Check className="h-11 w-11 text-white" strokeWidth={3.5} />
            </div>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              {firstName ? `You're in, ${firstName}.` : "You're in."}
            </h1>
            <p className="mt-3 text-base text-gray-600 md:text-lg">
              Your spot in the{" "}
              <span className="font-bold text-gray-900">{NAVFIT.name}</span>{" "}
              is confirmed. 🪔
            </p>
          </motion.div>

          {/* The one action that matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 rounded-3xl border-2 border-emerald-200 bg-white p-6 text-center shadow-lg md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              One last step
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-snug text-gray-900 md:text-3xl">
              Join the WhatsApp group
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-600 md:text-base">
              Your <strong>orientation Zoom link</strong>, the Navratri diet
              plan, the yoga class links and your daily guidance are all shared
              there. If you don&apos;t join, you won&apos;t receive them.
            </p>

            <ArrowDown className="nudge mx-auto mt-5 h-6 w-6 text-emerald-600" />

            <a
              href={NAVFIT_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="join-btn mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-5 text-lg font-extrabold text-white transition-transform duration-200 md:text-xl"
            >
              <WhatsAppIcon className="h-7 w-7" />
              Join the Group Now
            </a>

            <p className="mt-4 text-xs text-gray-500">
              Takes one tap. Please join from the phone WhatsApp is on.
            </p>
          </motion.div>

          {/* Session info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-sm"
          >
            <div className="bg-gradient-to-r from-rose-800 to-orange-600 px-5 py-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-100">
                {NAVFIT.eventName}
              </p>
              <p className="mt-0.5 text-base font-bold text-white md:text-lg">
                {NAVFIT.name}
              </p>
            </div>

            <dl className="divide-y divide-gray-100">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <dt className="flex items-center gap-2.5 text-sm text-gray-500">
                    <d.icon className="h-4 w-4 text-emerald-600" />
                    {d.label}
                  </dt>
                  <dd className="text-right text-sm font-bold text-gray-900">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <a
              href={calendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-900"
            >
              Add the orientation to my calendar
            </a>
            <p className="mt-6 text-sm text-gray-400">
              See you on {NAVFIT.orientationDateLabel.split(",")[1]?.trim()} — Sumit
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NavFitChallengeConfirmed;
