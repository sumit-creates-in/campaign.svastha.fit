import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronRight, Clock, PhoneCall, Video } from "lucide-react";
import ConsultationModal from "@/components/consultation/ConsultationModal";
import { BeforeAfterDashboardCard } from "@/components/gamification/BeforeAfterDashboardCard";
import sumitSharmaImage from "@/assets/sumit sharma.png";
import svasthaLogo from "@/assets/svastha.png";
import { MASTERCLASS, PRICING, PROOF, currentSession } from "@/config/masterclass";

/**
 * Link-in-bio hub — campaign.svastha.fit/healthy-life-by-sumit
 *
 * Shared from Instagram, Facebook and other profiles, so every visitor is new
 * and on a phone. Kept deliberately simple:
 *   1. Who is this?          → photo, name, one line
 *   2. What should I do?     → ONE featured action: the ₹49 Master Class
 *   3. Other ways in         → consultation call, WhatsApp (as quiet link rows)
 *   4. Can I trust it?       → transformations, then the Master Class button again
 *
 * Master Class date/time come from src/config/masterclass.ts (SESSIONS), so the
 * card rolls over to the next session by itself — same as the Master Class page.
 */

const WHATSAPP_NUMBER = "15557533653"; // +1 555-753-3653 (bot number)
const WHATSAPP_TEXT = "Hi, I want to know more about Svastha programs.";

/** A session still counts as "now" for 60 min after it starts (matches the Master Class page). */
const LIVE_WINDOW_MS = 60 * 60 * 1000;

function trackPixel(event: string, data?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", event, data);
  } catch {
    /* never block the visitor */
  }
}

/** Carry the bio link's UTM tags (and fbclid) on to the programme page. */
function withTracking(path: string): string {
  try {
    const here = new URLSearchParams(window.location.search);
    const keep = new URLSearchParams();
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((k) => {
      const v = here.get(k);
      if (v) keep.set(k, v);
    });
    if (!keep.get("utm_content")) keep.set("utm_content", "bio_hub");
    const qs = keep.toString();
    return qs ? `${path}?${qs}` : path;
  } catch {
    return path;
  }
}

const IST: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata" };

function istDayKey(ms: number) {
  return new Date(ms).toLocaleDateString("en-CA", IST); // YYYY-MM-DD
}

/** "Today", "Tomorrow", "In 4 days", "Live now" — or null once the run is over. */
function whenLabel(startIso: string, now: number): string | null {
  const start = new Date(startIso).getTime();
  if (now >= start + LIVE_WINDOW_MS) return null;
  if (now >= start) return "Live now";
  const today = istDayKey(now);
  if (istDayKey(start) === today) return "Today";
  if (istDayKey(start) === istDayKey(now + 86_400_000)) return "Tomorrow";
  return `In ${Math.ceil((start - now) / 86_400_000)} days`;
}

function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

const WhatsAppGlyph = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const BioLinkHub = () => {
  const navigate = useNavigate();
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const now = useNow();

  const session = currentSession(now);
  const when = whenLabel(session.startsAt, now);
  const hasDate = when !== null;
  const start = new Date(session.startsAt);
  const dayLabel = start.toLocaleDateString("en-IN", { ...IST, weekday: "short", day: "numeric", month: "short" });

  const goToMasterClass = (placement: string) => {
    trackPixel("ViewContent", { content_name: "Master Class", content_category: `bio_link_${placement}` });
    navigate(withTracking("/masterclass"));
  };

  const openConsult = () => {
    trackPixel("ViewContent", { content_name: "Consultation form", content_category: "bio_link" });
    setIsConsultOpen(true);
  };

  const openWhatsApp = () => {
    trackPixel("Contact", { content_name: "WhatsApp — bio link" });
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-12">
      <div className="mx-auto max-w-md px-5 pt-10">
        {/* ── 1. Who is this ─────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="relative mx-auto h-24 w-24">
            <img
              src={sumitSharmaImage}
              alt="Sumit Sharma"
              className="h-24 w-24 rounded-full bg-orange-300 object-cover shadow-md ring-4 ring-white"
            />
            <img
              src={svasthaLogo}
              alt="Svastha"
              className="absolute -bottom-0.5 -right-0.5 h-8 w-8 rounded-full bg-white object-contain p-1 shadow ring-2 ring-white"
            />
          </div>
          <h1 className="mt-4 text-[22px] font-extrabold tracking-tight text-gray-900">Sumit Sharma</h1>
          <p className="mt-0.5 text-sm font-medium text-emerald-700">
            Yoga &amp; Nutrition Coach · Founder of SVASTHA
          </p>
          <p className="mx-auto mt-3 max-w-[19rem] text-[15px] leading-relaxed text-gray-600">
            Lose weight naturally with home-cooked Indian food, the right way to fast, and daily
            live yoga.
          </p>
          <p className="mt-3 text-xs font-semibold text-gray-400">
            {PROOF.transformations} transformations · {PROOF.instagramFollowers} on Instagram
          </p>
        </motion.header>

        {/* ── 2. The one thing to do: Master Class ───────────────────────── */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg shadow-emerald-900/5 ring-1 ring-gray-100"
        >
          <button
            type="button"
            onClick={() => goToMasterClass("card")}
            className="block w-full bg-gradient-to-br from-emerald-600 to-green-700 px-5 pb-6 pt-5 text-left"
            aria-label="Open the Master Class page"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
                </span>
                Live Master Class
              </span>
              {hasDate && (
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">
                  {when}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-[22px] font-extrabold leading-tight text-white">
              {MASTERCLASS.name}
            </h2>
            <span className="mt-3 inline-block rounded-full bg-yellow-300 px-3.5 py-1 text-sm font-extrabold uppercase tracking-wide text-gray-900">
              Lose up to 10 kg
            </span>
          </button>

          <div className="px-5 pb-5 pt-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-gray-800">
              {hasDate ? (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-emerald-600" />
                    {dayLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    {MASTERCLASS.timeLabel}
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-emerald-600" />
                  Next date coming soon
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Video className="h-4 w-4 text-emerald-600" />
                {MASTERCLASS.durationLabel.replace(" minutes", " min")} on Zoom
              </span>
            </div>

            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              The exact 21-day plan behind thousands of transformations — daal, chawal, roti and
              sabji. No supplements, no starving, no gym.
            </p>

            <button
              type="button"
              onClick={() => goToMasterClass("card")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-4 text-base font-bold text-white shadow-md transition-transform active:scale-[0.98]"
            >
              Reserve my seat ·
              <span className="text-sm font-medium text-gray-400 line-through">{PRICING.anchor}</span>
              {PRICING.price}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.article>

        {/* ── 3. Other ways in — quiet link rows ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          role="navigation" aria-label="Other options"
          className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-3xl bg-white ring-1 ring-gray-100"
        >
          <button
            type="button"
            onClick={openConsult}
            className="flex w-full items-center gap-3.5 px-5 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
              <PhoneCall className="h-[18px] w-[18px] text-emerald-700" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-gray-900">Book a consultation call</span>
              <span className="block text-[13px] text-gray-500">Thyroid, PCOS, diabetes or BP? Talk to us first.</span>
            </span>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-300" />
          </button>
          <button
            type="button"
            onClick={openWhatsApp}
            className="flex w-full items-center gap-3.5 px-5 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-[#25D366]">
              <WhatsAppGlyph className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-gray-900">Chat with us on WhatsApp</span>
              <span className="block text-[13px] text-gray-500">Ask anything about our programmes.</span>
            </span>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-300" />
          </button>
        </motion.div>
      </div>

      {/* ── 4. Can I trust it ─────────────────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-4xl px-4">
        <h2 className="mb-4 text-center text-lg font-extrabold text-gray-900">Real people. Real results.</h2>
        <BeforeAfterDashboardCard />
      </div>

      <div className="mx-auto mt-8 max-w-md px-5">
        <button
          type="button"
          onClick={() => goToMasterClass("bottom")}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-transform active:scale-[0.98]"
        >
          Join the Master Class — {PRICING.price}
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-8 text-center text-xs text-gray-400">© SVASTHA</p>
      </div>

      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};

export default BioLinkHub;
