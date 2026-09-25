import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, Video, Languages, ArrowDown, MapPin } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { TestModeBar } from "@/components/us-masterclass/TestModeBar";
import {
  US_MASTERCLASS,
  US_PRICING,
  US_WHATSAPP_GROUP_URL,
  US_LEAD_STORAGE_KEY,
  localStartLabel,
} from "@/config/usMasterclass";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

type StoredLead = { leadId?: string; name?: string; tier?: "standard" | "offer" };

function readLead(): StoredLead | null {
  try {
    const raw = localStorage.getItem(US_LEAD_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredLead) : null;
  } catch {
    return null;
  }
}

/**
 * Fires the Meta Pixel Purchase event once per Stripe checkout session.
 * Stripe only sends people here after a successful payment, and the session
 * ID in the URL lets us ignore refreshes and back-button revisits.
 */
function trackPurchaseOnce(sessionId: string | null, amount: number) {
  if (!sessionId) return;
  const key = `svastha_us_mc_purchase_${sessionId}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {
    /* if storage is blocked we still send it once for this page load */
  }
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq(
        "track",
        "Purchase",
        { value: amount, currency: "USD", content_name: "US Master Class Registration" },
        { eventID: sessionId },
      );
    }
  } catch {
    /* tracking must never break the page */
  }
}

/** Times in Google's format: 20260927T160000Z */
function gcalStamp(d: Date) {
  return d.toISOString().replace(/[-:]|\.\d{3}/g, "");
}

function calendarUrls() {
  const start = new Date(US_MASTERCLASS.startsAt);
  const end = new Date(start.getTime() + US_MASTERCLASS.durationMinutes * 60 * 1000);
  const title = `${US_MASTERCLASS.name} — ${US_MASTERCLASS.subtitle}`;
  const details = "Live on Zoom with Sumit Sharma. The joining link is shared in the WhatsApp group.";

  const google = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${gcalStamp(start)}/${gcalStamp(end)}`,
    details,
  }).toString()}`;

  // Apple Calendar / Outlook — a tiny .ics file built on the fly.
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Svastha//Master Class//EN",
    "BEGIN:VEVENT",
    `UID:us-masterclass-${gcalStamp(start)}@svastha.fit`,
    `DTSTAMP:${gcalStamp(new Date())}`,
    `DTSTART:${gcalStamp(start)}`,
    `DTEND:${gcalStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const apple = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return { google, apple };
}

const UsMasterClassConfirmed = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const sessionId = params.get("session_id");
  // Sandbox payments (from ?test=1) come back with test=1 — never report them to Meta.
  const isTest = params.get("test") === "1";
  const lead = useMemo(readLead, []);
  const [yourTime, setYourTime] = useState<string | null>(null);

  const amount =
    Number(params.get("amount")) ||
    (lead?.tier === "offer" ? US_PRICING.offer.amount : US_PRICING.standard.amount);

  const firstName = lead?.name?.split(" ")[0];
  const cal = useMemo(calendarUrls, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setYourTime(localStartLabel());
    if (!isTest) trackPurchaseOnce(sessionId, amount);
  }, [sessionId, amount, isTest]);

  useMeta({
    title: `You're registered — ${US_MASTERCLASS.subtitle} | ${US_MASTERCLASS.dateLabel}`,
    description: `Your seat is confirmed for ${US_MASTERCLASS.dateLabel}, ${US_MASTERCLASS.timeLabel}. Join the WhatsApp group to get your Zoom link.`,
  });

  const details = [
    { icon: Calendar, label: "Date", value: US_MASTERCLASS.dateLabel },
    { icon: Clock, label: "Time", value: US_MASTERCLASS.timeLabel },
    ...(yourTime ? [{ icon: MapPin, label: "Your time", value: yourTime }] : []),
    { icon: Video, label: "Where", value: US_MASTERCLASS.platformLabel },
    { icon: Languages, label: "Language", value: US_MASTERCLASS.languageLabel },
  ];

  return (
    <>
      <style>{`
        @keyframes joinPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,.55), 0 10px 30px rgba(0,0,0,.18); }
          70%  { box-shadow: 0 0 0 22px rgba(37,211,102,0),  0 10px 30px rgba(0,0,0,.18); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0),     0 10px 30px rgba(0,0,0,.18); }
        }
        @keyframes nudge { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .join-btn { animation: joinPulse 2s infinite; }
        .join-btn:hover { transform: scale(1.03); }
        .nudge { animation: nudge 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .join-btn, .nudge { animation: none; } }
      `}</style>

      {isTest && <TestModeBar note="Sandbox payment — no money moved, nothing sent to Meta." />}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-white px-5 py-14">
        <div className="w-full max-w-lg">
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
              Your seat for the{" "}
              <span className="font-bold text-gray-900">{US_MASTERCLASS.subtitle}</span> is
              confirmed.
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
              Your <strong>Zoom link</strong>, the starter plan and your reminders are all sent
              there. If you don&apos;t join, you won&apos;t receive them.
            </p>

            <ArrowDown className="nudge mx-auto mt-5 h-6 w-6 text-emerald-600" />

            <a
              href={US_WHATSAPP_GROUP_URL}
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
            <div className="bg-gray-900 px-5 py-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                {US_MASTERCLASS.eventName}
              </p>
              <p className="mt-0.5 text-base font-bold text-white md:text-lg">
                {US_MASTERCLASS.name}
              </p>
            </div>
            <dl className="divide-y divide-gray-100">
              {details.map((d) => (
                <div key={d.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <dt className="flex items-center gap-2.5 text-sm text-gray-500">
                    <d.icon className="h-4 w-4 text-emerald-600" />
                    {d.label}
                  </dt>
                  <dd className="text-right text-sm font-bold text-gray-900">{d.value}</dd>
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
            <p className="text-sm font-semibold text-gray-500">
              Add to my calendar:{" "}
              <a
                href={cal.google}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-gray-900"
              >
                Google
              </a>
              {" · "}
              <a
                href={cal.apple}
                download="svastha-master-class.ics"
                className="underline underline-offset-4 transition-colors hover:text-gray-900"
              >
                Apple / Outlook
              </a>
            </p>
            <p className="mt-4 text-xs text-gray-400">
              A receipt from Stripe is on its way to your inbox.
            </p>
            <p className="mt-6 text-sm text-gray-400">
              See you on {US_MASTERCLASS.dateLabel.split(",")[0]} — Sumit
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UsMasterClassConfirmed;
