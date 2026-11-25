import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Languages, MessageCircle, MonitorPlay, Mic, UtensilsCrossed, Video } from "lucide-react";
import { CHALLENGE_PLANS, EARLY_BIRD, isEarlyBird } from "@/config/challengeOffer";

/**
 * Top of /Ultimate-21-day-weight-loss-challenge, in the Master Class page's
 * style (Sumit approved 25 Nov 2026): eyebrow, headline, programme box with the
 * "Lose up to 10 Kg" pill, video, what's-included chips, price, one button.
 * No start date and no countdown here (Sumit, 25 Nov 2026): people see
 * "Start now" vs "Start on <batch day>" only in the Register window.
 *
 * Prices come from config (CHALLENGE_PLANS, EARLY_BIRD).
 */

interface Props {
  onRegister: () => void;
  videoId?: string;
}

const VIDEO_HINDI = "0zkAOy4AP38";
const VIDEO_ENGLISH = "0NBiGEJodyc";

export const UltimateHero = ({ onRegister, videoId = VIDEO_HINDI }: Props) => {
  const early = isEarlyBird();
  const group = CHALLENGE_PLANS.find((p) => p.id === "group")!;
  const price = early ? group.earlyPrice : group.regularPrice;

  const [videoModal, setVideoModal] = useState(false);
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  const details = [
    { icon: Video, label: "Daily live yoga on Zoom" },
    { icon: UtensilsCrossed, label: "Diet + fasting plan, home food" },
    { icon: Mic, label: "Weekly live sessions with Sumit" },
    { icon: MessageCircle, label: "WhatsApp support" },
    { icon: MonitorPlay, label: "Recordings of every class" },
    { icon: Languages, label: "Hindi + English" },
  ];

  return (
    <section className="bg-white px-4 pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="container mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            {early ? `${EARLY_BIRD.name} · enrolling now` : "Enrolling now"}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-3xl text-center"
        >
          <h1 className="text-[28px] font-extrabold leading-[1.15] text-gray-900 sm:text-4xl md:text-5xl">
            {early ? "Start the New Year lighter — " : "Lose weight the natural way — "}
            <span className="text-emerald-600">with the food you already eat.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            21 days of daal, chawal, roti and sabji, the right fasting window and daily live
            yoga — with Sumit and the SVASTHA team. No supplements. No starving. No gym.
          </p>
        </motion.div>

        {/* Programme box + result pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border-2 border-emerald-500 bg-gradient-to-r from-emerald-600 to-green-600 px-5 pb-9 pt-4 text-center shadow-lg md:pb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100 md:text-base">
            The Ultimate
          </p>
          <p className="mt-1 text-2xl font-extrabold leading-tight text-white md:text-3xl">
            21 Day Weight Loss Challenge
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative z-10 -mt-5 text-center"
        >
          <span className="inline-block rounded-full bg-yellow-300 px-7 py-2.5 text-2xl font-extrabold uppercase tracking-wide text-gray-900 shadow-xl ring-4 ring-white md:px-10 md:py-3 md:text-4xl">
            Lose up to 10 Kg
          </span>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 [&>*]:min-w-0">
          {/* Video — first on mobile; tap opens the Hindi / English choice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-first w-full lg:order-last"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border-4 border-emerald-100 shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              <div
                onClick={() => {
                  setModalVideoId(null);
                  setVideoModal(true);
                }}
                className="absolute inset-0 z-10 cursor-pointer"
              />
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Ultimate 21 Day Weight Loss Challenge"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {details.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border-2 border-gray-100 bg-gray-50/60 px-3.5 py-2.5"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline justify-center gap-3 lg:justify-start">
              {early && group.regularPrice !== price && (
                <span className="text-xl font-medium text-gray-400 line-through">{group.regularPrice}</span>
              )}
              <span className="text-4xl font-extrabold text-gray-900">{price}</span>
              <span className="text-sm font-medium text-gray-500">only</span>
            </div>
            <p className="mt-1.5 text-center text-xs text-gray-500 lg:text-left">
              {early ? `${EARLY_BIRD.name} · ` : ""}starting price · all 21 days included
            </p>

            <Button
              onClick={onRegister}
              size="lg"
              className="no-heartbeat mt-5 w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-7 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:from-green-700 hover:to-lime-600"
            >
              Register Now
            </Button>

          </motion.div>
        </div>
      </div>

      {/* Hindi / English video choice */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModal(false)}
                className="no-heartbeat absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 text-gray-500 shadow-sm hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {modalVideoId ? (
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    className="absolute left-0 top-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0`}
                    title="Ultimate 21 Day Weight Loss Challenge"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-8 text-center md:p-12">
                  <div className="mx-auto grid max-w-lg gap-4 md:grid-cols-2">
                    {[
                      { id: VIDEO_HINDI, label: "वीडियो हिन्दी में देखें" },
                      { id: VIDEO_ENGLISH, label: "Watch video in English" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setModalVideoId(v.id)}
                        className="no-heartbeat flex min-h-[110px] flex-col items-center justify-center rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-6 text-center transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg"
                      >
                        <span className="block text-lg font-bold text-emerald-950 sm:text-xl">{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
