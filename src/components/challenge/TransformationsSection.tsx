import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useEffect, useRef, useState } from "react";
import transformation2 from "@/assets/tranformation2.jpeg";
import transformation4 from "@/assets/tranformation4.jpeg";
import transformation5 from "@/assets/tranformation5.jpeg";
import transformation8 from "@/assets/tranformation8.jpeg";
import transformation9 from "@/assets/tranformation9.jpeg";

export type Transformation = {
  beforeImage?: string;
  afterImage?: string;
  image?: string;        // legacy single-image support
  name?: string;
  beforeWeight?: number;
  afterWeight?: number;
  /** Member's own words. Leave empty when they gave none — never invent a quote. */
  text: string;
  /** Kept off the women-only pages. */
  male?: boolean;
};

const APP = "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations";

const ALL_TRANSFORMATIONS: Transformation[] = [
  // ── Before/After cards (real user data) ──
  // Only members who ticked "allow social media sharing" in the Svastha app
  // (user_transformations.allows_social_media_sharing), refreshed 28 Nov 2026.
  {
    // Clean crops of the photos he sent (his app upload is a phone screenshot);
    // weights as he said them in his video review on 27 Nov 2026.
    beforeImage: "/transformations/sushil-before.webp",
    afterImage: "/transformations/sushil-after.webp",
    name: "Sushil Kumar",
    beforeWeight: 128.7,
    afterWeight: 88,
    text: "Koi restriction nahi. Ghar ka khaana — bas cheeni aur packet food band.",
    male: true,
  },
  {
    beforeImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/c8698136-28bd-4563-a793-1aac42b13d16/before-1769677959334.webp",
    afterImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/c8698136-28bd-4563-a793-1aac42b13d16/after-1769677959334.webp",
    name: "Rashmi Aghor",
    beforeWeight: 99.4,
    afterWeight: 88.0,
    text: "11.4 kg lost! My confidence is back and I feel like a completely new person.",
  },
  {
    beforeImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/434bc3d9-0114-4504-bef4-9b0e2e073688/before-1786875100668.webp",
    afterImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/434bc3d9-0114-4504-bef4-9b0e2e073688/after-1786875100668.webp",
    name: "Jigna Hitesh Dave",
    beforeWeight: 75.6,
    afterWeight: 67.6,
    text: "Lost 8 kg and feeling amazing! This program truly changed my life.",
  },
  {
    beforeImage: `${APP}/a613cd2e-eb9a-4481-9e18-cc5c0a61e257/before-1767622004350.webp`,
    afterImage: `${APP}/a613cd2e-eb9a-4481-9e18-cc5c0a61e257/after-1767622004350.webp`,
    name: "Manila Bishnoi",
    beforeWeight: 107,
    afterWeight: 101,
    text: "",
  },
  {
    beforeImage: `${APP}/4f8d9591-ccd3-4ea3-81e6-eba537e54206/before-1767616748860.webp`,
    afterImage: `${APP}/4f8d9591-ccd3-4ea3-81e6-eba537e54206/after-1767616748860.webp`,
    name: "Sweety",
    beforeWeight: 78,
    afterWeight: 73,
    text: "",
  },
  {
    beforeImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/6e457f21-d0b3-4f7e-b316-c890bccb3c22/before-1782009050871.webp",
    afterImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/6e457f21-d0b3-4f7e-b316-c890bccb3c22/after-1782009050871.webp",
    name: "Dr. Smriti Verma",
    beforeWeight: 70.3,
    afterWeight: 65.6,
    text: "As a doctor I was skeptical, but the results speak for themselves. Lost 4.7 kg the healthy way.",
  },
  {
    beforeImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/7deb74f1-346b-4a1c-ac83-e6937fa1a4b9/before-1780832025705.webp",
    afterImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/7deb74f1-346b-4a1c-ac83-e6937fa1a4b9/after-1780832025705.webp",
    name: "Shweta Patil",
    beforeWeight: 60.0,
    afterWeight: 52.0,
    text: "8 kg down! I followed the golden rules and ate my regular daal-roti. No gym, no starving.",
  },
  {
    beforeImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/0a2f89e1-d209-4d41-ae31-fb6e65af91bf/before-1775895236525.webp",
    afterImage:
      "https://swcubveqtvjhqwawgcks.supabase.co/storage/v1/object/public/transformations/0a2f89e1-d209-4d41-ae31-fb6e65af91bf/after-1775895236525.webp",
    name: "Poonam Mathur",
    beforeWeight: 85.0,
    afterWeight: 81.8,
    text: "Steady progress without any strict diet. Thank you Sumit Sir for this simple approach!",
  },
  // ── Legacy single-image cards ──
  {
    image: transformation2,
    beforeWeight: 95,
    afterWeight: 80,
    text: "Lost 15 kilos without following any strict diet, just ate well and enjoyed life. Thank you Sumit Sir. - Vijay",
  },
  {
    image: transformation4,
    beforeWeight: 72,
    afterWeight: 65,
    text: "Got the results in just 21 days. So happy to have joined this program. - Aditi",
  },
  {
    image: transformation5,
    beforeWeight: 88,
    afterWeight: 72,
    text: "Now I can eat without any tension and enjoy my life. My fatty liver and hypertension are also cured now. Amazing experience. - Ravikant",
  },
  {
    image: transformation8,
    beforeWeight: 90,
    afterWeight: 70,
    text: "With Sir's guidance, I have lost 20 kg so far and have been maintaining it for the last 6 months. Thank you Sumit Sir. - Sumit",
  },
  {
    image: transformation9,
    beforeWeight: 75,
    afterWeight: 63,
    text: "Lost 12 kg's with the help of Sumit's teachings. Best decision ever. - Rabiya",
  },
];

const kgLost = (t: Transformation) => (t.beforeWeight ?? 0) - (t.afterWeight ?? 0);

/** Member photo cards first, biggest result first; the older single-image cards after. */
export const defaultTransformations: Transformation[] = [
  ...ALL_TRANSFORMATIONS.filter((t) => t.beforeImage).sort((a, b) => kgLost(b) - kgLost(a)),
  ...ALL_TRANSFORMATIONS.filter((t) => !t.beforeImage),
];

/** Just the member photo cards (before + after), for pages that keep their own list. */
export const memberPhotoTransformations = defaultTransformations.filter((t) => t.beforeImage);

type TransformationsSectionProps = {
  transformations?: Transformation[];
  heading?: string;
  subHeading?: string;
  /** Master Class-style heading, no emoji (Ultimate page). */
  clean?: boolean;
};

type Props = TransformationsSectionProps;

/**
 * Ultimate page (`clean`, Sumit 26 Nov 2026): no time frame next to a result
 * and no "cured" claims in the member quotes.
 */
const CLAIM_SAFE_TEXT: Record<string, string> = {
  "Got the results in just 21 days. So happy to have joined this program. - Aditi":
    "So happy to have joined this program. - Aditi",
  "Now I can eat without any tension and enjoy my life. My fatty liver and hypertension are also cured now. Amazing experience. - Ravikant":
    "Now I can eat without any tension and enjoy my life. Amazing experience. - Ravikant",
};

export const TransformationsSection = ({
  heading = "We Deliver The Best Transformations",
  subHeading = "Are you ready for yours?",
  transformations = defaultTransformations,
  clean = false,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Card dimensions — all cards share the same width
  const CARD_W = 320;
  const GAP = 24;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5;

    const updateCurrentIndex = () => {
      const index =
        Math.round(scrollContainer.scrollLeft / (CARD_W + GAP)) %
        transformations.length;
      setCurrentIndex(index);
    };

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= halfWidth) {
          scrollContainer.scrollLeft = 0;
        }
        updateCurrentIndex();
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    const handleInteractionStart = () => setIsPaused(true);
    const handleInteractionEnd = () =>
      setTimeout(() => setIsPaused(false), 2000);

    scrollContainer.addEventListener("mouseenter", handleInteractionStart);
    scrollContainer.addEventListener("mouseleave", handleInteractionEnd);
    scrollContainer.addEventListener("touchstart", handleInteractionStart);
    scrollContainer.addEventListener("touchend", handleInteractionEnd);

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleInteractionStart);
      scrollContainer.removeEventListener("mouseleave", handleInteractionEnd);
      scrollContainer.removeEventListener("touchstart", handleInteractionStart);
      scrollContainer.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [isPaused, transformations.length]);

  const lostKg = (t: Transformation) =>
    t.beforeWeight && t.afterWeight
      ? (t.beforeWeight - t.afterWeight).toFixed(1)
      : null;

  const renderCard = (t: Transformation, key: string, idx: number) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (idx % transformations.length) * 0.08 }}
      className="flex-shrink-0 w-[80vw] sm:w-[320px] rounded-2xl shadow-lg border border-gray-100 bg-white flex flex-col overflow-hidden"
    >
      {t.beforeImage ? (
        <>
          {/* Before / After images — same fixed height, side by side */}
          <div className="grid grid-cols-2 h-64 flex-shrink-0">
            <div className="relative overflow-hidden">
              <img
                src={t.beforeImage}
                alt={`${t.name} before`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <span className="absolute bottom-0 left-0 right-0 text-center bg-black/50 text-white text-[10px] font-bold py-1">
                Before · {t.beforeWeight} kg
              </span>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={t.afterImage}
                alt={`${t.name} after`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <span className="absolute bottom-0 left-0 right-0 text-center bg-emerald-600/80 text-white text-[10px] font-bold py-1">
                After · {t.afterWeight} kg
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="px-3 py-3 flex flex-col gap-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">{t.name}</span>
              {lostKg(t) && (
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                  −{lostKg(t)} kg 🎉
                </span>
              )}
            </div>
            {t.text ? (
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "{clean ? CLAIM_SAFE_TEXT[t.text] ?? t.text : t.text}"
              </p>
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed">
                {t.beforeWeight} kg → {t.afterWeight} kg · photos shared by the member from the Svastha app
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Legacy single image — same fixed height */}
          <div className="h-64 flex-shrink-0 overflow-hidden relative">
            <img
              src={t.image}
              alt={`Transformation ${idx + 1}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            {t.beforeWeight && (
              <span className="absolute bottom-0 left-0 w-1/2 text-center bg-black/50 text-white text-[10px] font-bold py-1">
                Before · {t.beforeWeight} kg
              </span>
            )}
            {t.afterWeight && (
              <span className="absolute bottom-0 right-0 w-1/2 text-center bg-emerald-600/80 text-white text-[10px] font-bold py-1">
                After · {t.afterWeight} kg
              </span>
            )}
          </div>

          {/* Quote + badge */}
          <div className="px-3 py-3 flex flex-col gap-1 flex-1">
            {lostKg(t) && (
              <div className="flex justify-end">
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                  −{lostKg(t)} kg 🎉
                </span>
              </div>
            )}
            <p className="text-xs text-gray-800 text-center leading-relaxed italic w-full">
              "{clean ? CLAIM_SAFE_TEXT[t.text] ?? t.text : t.text}"
            </p>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        {clean ? (
          <SectionTitle eyebrow="Transformations" title={heading} sub={subHeading} />
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-3">
            <span>{heading}</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700">{subHeading}</p>
          <p className="mt-2 text-2xl">🔥🔥🔥</p>
        </motion.div>
        )}

        {/* Horizontal Scroll */}
        {/* Wrapper gives vertical room so card shadows/text don't clip */}
        <div className="py-2">
          <div
            ref={scrollRef}
            className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="flex gap-6 min-w-max">
              {transformations.map((t, idx) => renderCard(t, `original-${idx}`, idx))}
              {transformations.map((t, idx) => renderCard(t, `duplicate-${idx}`, idx))}
            </div>
          </div>

          {/* Scroll Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {transformations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollLeft = idx * (CARD_W + GAP);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-emerald-600 w-8" : "bg-gray-300 w-2"
                  }`}
                aria-label={`Go to transformation ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
