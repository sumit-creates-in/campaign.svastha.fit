import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Flower2,
  HeartPulse,
  PhoneCall,
  Sparkles,
  Users,
} from "lucide-react";
import ConsultationModal from "@/components/consultation/ConsultationModal";
import { BeforeAfterDashboardCard } from "@/components/gamification/BeforeAfterDashboardCard";
import sumitSharmaImage from "@/assets/sumit sharma.png";
import svasthaLogo from "@/assets/svastha.png";
import { NAVFIT, NAVFIT_PRICING } from "@/config/navfit";

/**
 * Link-in-bio hub — campaign.svastha.fit/healthy-life-by-sumit
 *
 * Shared from Instagram, Facebook and other profiles, so every visitor is new
 * and on a phone. The page answers three questions in order:
 *   1. Who is this?            → header
 *   2. What should I do now?   → one featured programme + a clear second option
 *   3. Can I trust it?         → transformations + review video
 * WhatsApp chat (bot number) is pinned at the bottom.
 */

const WHATSAPP_NUMBER = "15557533653"; // +1 555-753-3653
const WHATSAPP_TEXT = "Hi, I want to know more about Svastha programs.";

/** Nav Fit registrations stay open until the challenge starts. */
const NAVFIT_CLOSES_AT = "2026-10-11T00:00:00+05:30";

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

function useDaysUntil(iso: string) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const ms = new Date(iso).getTime() - Date.now();
    setDays(ms > 0 ? Math.ceil(ms / 86_400_000) : 0);
  }, [iso]);
  return days;
}

const NAVFIT_POINTS = [
  "Guided Navratri fasting diet plan — all 9 days",
  `The ${NAVFIT.goldenHabits} Ultimate Golden Habits`,
  "Daily live yoga classes from home",
  `Live orientation with Sumit — ${NAVFIT.orientationDateLabel.replace("Friday, ", "Fri, ")}, ${NAVFIT.orientationTimeLabel}`,
];

const CHALLENGE_POINTS = [
  "21 day diet plan — simple home-cooked food",
  "Intermittent fasting plan & daily guidance",
  "Daily live yoga classes from home",
];

const BioLinkHub = () => {
  const navigate = useNavigate();
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  const navFitOpen = useMemo(() => Date.now() < new Date(NAVFIT_CLOSES_AT).getTime(), []);
  const daysToStart = useDaysUntil(NAVFIT_CLOSES_AT);

  const goToProgramme = (path: string, name: string) => {
    trackPixel("ViewContent", { content_name: name, content_category: "bio_link" });
    navigate(withTracking(path));
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50/40 pb-28">
      <div className="mx-auto max-w-md px-4 pt-8">
        {/* ── 1. Who is this ─────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <div className="relative mx-auto h-24 w-24">
            <img
              src={sumitSharmaImage}
              alt="Sumit Sharma"
              className="h-24 w-24 rounded-full bg-orange-300 object-cover shadow-lg ring-4 ring-white"
            />
            <img
              src={svasthaLogo}
              alt="Svastha"
              className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-white object-contain p-1 shadow ring-2 ring-white"
            />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Sumit Sharma</h1>
          <p className="mt-1 text-sm font-medium text-emerald-700">
            Certified Dietitian · Yoga Teacher · Founder, Svastha
          </p>
          <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-gray-600">
            Lose weight naturally with home-cooked Indian food, the right way to fast, and
            daily live yoga.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              { icon: Users, label: "Thousands of transformations" },
              { icon: Flower2, label: "Live yoga, Mon–Fri" },
              { icon: HeartPulse, label: "Thyroid · PCOS · Diabetes" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-gray-700 shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-600" />
                {label}
              </span>
            ))}
          </div>
        </motion.header>

        {/* ── 2. What should I do now ────────────────────────────────────── */}
        <p className="mb-3 mt-9 text-center text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
          Start here
        </p>

        {navFitOpen ? (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="overflow-hidden rounded-3xl bg-white shadow-xl ring-2 ring-rose-200"
          >
            <button
              type="button"
              onClick={() => goToProgramme("/nav-fit-challenge", "Nav Fit Challenge")}
              className="block w-full text-left"
              aria-label="Open the Nav Fit Challenge"
            >
              <div className="relative">
                <img
                  src="/ads/navfit/navfit-right-way.jpg"
                  alt="Nav Fit Challenge — 9 day guided Navratri fasting program"
                  className="aspect-square w-full object-cover"
                  loading="eager"
                />
                <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                  🪔 New · Navratri special
                </span>
                {daysToStart !== null && daysToStart > 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-rose-700 shadow">
                    Starts in {daysToStart} {daysToStart === 1 ? "day" : "days"}
                  </span>
                )}
              </div>
            </button>

            <div className="p-5">
              <h2 className="text-xl font-extrabold text-gray-900">{NAVFIT.name}</h2>
              <p className="mt-0.5 text-sm font-medium text-gray-600">{NAVFIT.tagline}</p>

              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-rose-700">
                <CalendarDays className="h-4 w-4" />
                {NAVFIT.datesShort} · 9 days
              </p>

              <ul className="mt-3 space-y-2">
                {NAVFIT_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
                    {p}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => goToProgramme("/nav-fit-challenge", "Nav Fit Challenge")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-rose-600/25 transition-transform active:scale-[0.98]"
              >
                Join the Nav Fit Challenge — {NAVFIT_PRICING.standard.price}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.article>
        ) : (
          /* After Navratri registrations close, the flagship programme takes the slot. */
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-5 shadow-xl ring-2 ring-emerald-200"
          >
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              Most popular
            </span>
            <h2 className="mt-3 text-xl font-extrabold text-gray-900">
              Ultimate 21 Day Weight Loss Challenge
            </h2>
            <ul className="mt-3 space-y-2">
              {CHALLENGE_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                goToProgramme("/Ultimate-21-day-weight-loss-challenge", "Ultimate 21 Day Weight Loss Challenge")
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-base font-extrabold text-white shadow-lg"
            >
              See the 21 Day Challenge <ArrowRight className="h-5 w-5" />
            </button>
          </motion.article>
        )}

        {/* Second option — for people who want one-to-one help */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-4 rounded-3xl border-2 border-emerald-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
              <PhoneCall className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">
                Not sure which plan suits you?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Book a call with our weight-loss expert. Especially useful if you have thyroid,
                PCOS, diabetes, BP or have tried before and stalled.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openConsult}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-600 bg-white px-6 py-3.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            Book a consultation call <ArrowRight className="h-4 w-4" />
          </button>
        </motion.article>

        {/* How it works — so first-time visitors know what happens next */}
        <section className="mt-9 rounded-3xl bg-white/70 p-5 ring-1 ring-gray-100">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
            <Sparkles className="h-4 w-4 text-amber-500" /> How it works
          </h2>
          <ol className="mt-4 space-y-4">
            {[
              ["Pick a programme", "Join a challenge, or book a call if you'd like advice first."],
              ["Join the WhatsApp group", "Your plan, class links and daily guidance come there."],
              ["Follow along from home", "Live yoga, simple food, and a group doing it with you."],
            ].map(([title, desc], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* ── 3. Can I trust it ─────────────────────────────────────────────── */}
      <section className="mx-auto mt-10 max-w-4xl px-4">
        <h2 className="mb-4 text-center text-xl font-extrabold text-gray-900">
          Real people. Real results.
        </h2>
        <BeforeAfterDashboardCard />
      </section>

      <section className="mx-auto mt-8 max-w-md px-4">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute left-0 top-0 h-full w-full"
            src="https://www.youtube.com/embed/fpMH8JTzD6s"
            title="Client review"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Repeat the main action at the end of the scroll */}
        {navFitOpen && (
          <button
            type="button"
            onClick={() => goToProgramme("/nav-fit-challenge", "Nav Fit Challenge")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-4 text-base font-extrabold text-white shadow-lg"
          >
            Join the Nav Fit Challenge — {NAVFIT_PRICING.standard.price}
          </button>
        )}
        <button
          type="button"
          onClick={openConsult}
          className="mt-3 w-full text-center text-sm font-semibold text-emerald-700 underline underline-offset-4"
        >
          Or book a consultation call
        </button>
      </section>

      {/* ── Pinned WhatsApp chat ─────────────────────────────────────────── */}
      {!isConsultOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-green-600/20 bg-[#25D366] px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
          <button
            type="button"
            onClick={openWhatsApp}
            className="mx-auto flex w-full max-w-md items-center justify-center gap-2.5 rounded-full bg-white py-3 text-base font-bold text-green-600 shadow"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat with Us on WhatsApp
          </button>
        </div>
      )}

      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};

export default BioLinkHub;
