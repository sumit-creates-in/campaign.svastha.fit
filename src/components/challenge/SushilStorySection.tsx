import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

/**
 * Sushil's 40 kg story (Sumit approved the video 28 Nov 2026).
 * - Before anyone presses play, a silent 6-second loop of the before | after
 *   side-by-side runs (loads only when the section is near the screen), so the
 *   result is visible even to people who never start the video.
 * - One tap plays the full 79-second review with sound.
 * - His own words under the video, then the page's own button.
 */

const PREVIEW = "/videos/sushil-40kg-preview.mp4";
const FULL = "/videos/sushil-40kg.mp4";
const POSTER = "/videos/sushil-40kg-poster.jpg";

const QUOTES = [
  "Koi restriction nahi",
  "Ghar ka khaana — bas cheeni aur packet food band",
  "Bahut aasaan hai, koi bhi kar sakta hai",
];

function trackCustom(event: string, data?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("trackCustom", event, data);
  } catch {
    /* tracking must never block the user */
  }
}

interface Props {
  /** Where this sits, for the video-play tracking event. */
  page: string;
  ctaText: string;
  onCta: () => void;
  ctaNote?: string;
  eyebrow?: string;
}

export const SushilStorySection = ({ page, ctaText, onCta, ctaNote, eyebrow = "Member story" }: Props) => {
  const [full, setFull] = useState(false);
  const [near, setNear] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const halfSent = useRef(false);

  useEffect(() => {
    try {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      /* ignore */
    }
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const startFull = () => {
    setFull(true);
    trackCustom("SushilVideoPlay", { page });
  };

  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <SectionTitle
          eyebrow={eyebrow}
          title={
            <>
              Sushil lost <span className="text-red-600">40 kg</span>
            </>
          }
          sub="Sales job, no fixed meal times — and he still did it with home food. Hear it in his own words."
          className="mb-6 md:mb-8"
        />

        {/* The numbers, readable before the video even loads */}
        <div className="mx-auto mb-6 flex max-w-xl flex-nowrap items-center justify-center gap-1.5 md:gap-3">
          <span className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[13px] font-bold sm:px-4 sm:py-2 sm:text-sm text-gray-800 shadow md:text-base">
            Pehle 128.7 kg
          </span>
          <span className="text-xl font-extrabold text-amber-500" aria-hidden="true">
            →
          </span>
          <span className="whitespace-nowrap rounded-full bg-amber-300 px-3 py-1.5 text-[13px] font-bold sm:px-4 sm:py-2 sm:text-sm text-gray-900 shadow md:text-base">
            Ab 88 kg
          </span>
          <span className="whitespace-nowrap rounded-full bg-red-600 px-3 py-1.5 text-[13px] font-extrabold sm:px-4 sm:py-2 sm:text-sm text-white shadow md:text-base">
            −40 kg
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div
            ref={boxRef}
            className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-4 ring-amber-300"
            style={{ paddingBottom: "56.25%" }}
          >
            {full ? (
              <video
                className="absolute left-0 top-0 h-full w-full bg-black"
                src={FULL}
                poster={POSTER}
                title="Sushil lost 40 kg – member review"
                controls
                autoPlay
                playsInline
                preload="auto"
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (!halfSent.current && v.duration && v.currentTime / v.duration > 0.5) {
                    halfSent.current = true;
                    trackCustom("SushilVideoHalf", { page });
                  }
                }}
                onEnded={() => trackCustom("SushilVideoComplete", { page })}
              />
            ) : (
              <button
                type="button"
                onClick={startFull}
                aria-label="Play Sushil's story with sound"
                className="no-heartbeat group absolute left-0 top-0 block h-full w-full cursor-pointer"
              >
                {near && !reduceMotion ? (
                  <video
                    className="absolute left-0 top-0 h-full w-full object-cover"
                    src={PREVIEW}
                    poster={POSTER}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                  />
                ) : (
                  <img src={POSTER} alt="Sushil before (128.7 kg) and after (88 kg)" className="absolute left-0 top-0 h-full w-full object-cover" loading="lazy" />
                )}
                                <span className="absolute left-1/2 top-[40%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 shadow-2xl ring-8 ring-white/40 transition-transform group-hover:scale-110 md:h-24 md:w-24 sm:h-20 sm:w-20">
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-600/40" />
                  <Play className="relative ml-1 h-7 w-7 fill-white text-white sm:h-9 sm:w-9 md:h-11 md:w-11" />
                </span>
              </button>
            )}
          </div>
          {!full && (
            <button
              type="button"
              onClick={startFull}
              className="no-heartbeat mx-auto mt-3 block text-sm font-bold text-emerald-800 underline-offset-4 hover:underline md:text-base"
            >
              ▶ Sushil ki kahani suniye · 1:19 🔊
            </button>
          )}
        </motion.div>

        {/* His own words */}
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 md:grid-cols-3">
          {QUOTES.map((q) => (
            <div key={q} className="rounded-xl border-l-4 border-emerald-500 bg-white px-4 py-3 text-left shadow-sm">
              <p className="text-sm font-semibold italic text-gray-800 md:text-base">“{q}”</p>
              <p className="mt-1 text-xs text-gray-500">— Sushil, 42, Delhi</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="mb-3 text-base font-bold text-gray-900 md:text-lg">Sushil ne kar dikhaya. Aap bhi kar sakte hain.</p>
          <button
            type="button"
            onClick={onCta}
            className="no-heartbeat rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:from-green-700 hover:to-lime-600 md:px-10"
          >
            {ctaText}
          </button>
          {ctaNote && <p className="mt-2 text-xs text-gray-500">{ctaNote}</p>}
        </div>
      </div>
    </section>
  );
};
