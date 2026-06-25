import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useAutoIncrementCounter } from "@/hooks/useAutoIncrementCounter";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  scrollToRegistration: () => void;
  feeText?: string;
  isGlobal?: boolean;
  locationText?: string;
  videoId?: string;
  showLanguageToggle?: boolean;
}

export const HeroSection = ({ scrollToRegistration, feeText = "Rs. 990/-", isGlobal = false, locationText, videoId = "0zkAOy4AP38", showLanguageToggle = false }: HeroSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"select-language" | "play-video">("select-language");
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const peopleCount = useAutoIncrementCounter({
    initialCount: 67833,
    incrementAmount: 8,
    intervalHours: 1,
    startDate: '2026-03-30T18:00:00Z',
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = isGlobal 
        ? new Date('2026-06-21T23:59:59') 
        : new Date('2026-06-08T12:00:00');

      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        // Calculate total days and round up if there are remaining hours
        const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        setTimeLeft({ days: totalDays });
      } else {
        setTimeLeft({ days: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [isGlobal]);

  return (
    <section className="relative px-4 bg-white" style={{ paddingTop: '2rem' }}>
      <div style={{ paddingTop: '2rem', paddingBottom: '75px' }}>
        <div className="container mx-auto max-w-7xl">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6 md:mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-emerald-500 text-3xl md:text-4xl">✦</span>
              <h1 className="text-3xl md:text-4xl text-emerald-600 tracking-wider">
                ULTIMATE
              </h1>
              <span className="text-emerald-500 text-3xl md:text-4xl">✦</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-600 mb-2">
              21 Day
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-emerald-600">
              Weight Loss Challenge
            </h3>
            {isGlobal && (
              <p className="text-red-600 font-normal text-base md:text-lg mt-4 md:mt-6 mb-2 px-4">
                {locationText || "🌍 For Indians living in UAE, Saudi Arabia, Qatar, Oman, Bahrain & Kuwait"}
              </p>
            )}
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6">
              {/* Main Headline */}
              <div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 whitespace-nowrap">
                  Lose up to 10 Kg's 🔥
                </h4>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  In Just 21 Days!
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                {isGlobal && (
                  <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                    <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">Suitable for</span> Indians living abroad 🌍
                    </p>
                  </div>
                )}
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">{isGlobal ? 'With Natural Food' : 'With Natural Food Like'}</span> {isGlobal ? '🌾' : 'Daal, Rice, Roti, Sabji 🌾'}
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Start Burning Fat For</span> Energy 🔥
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Learn 5 Ultimate</span> Golden Habits 🌟
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Learn The</span> Right Way of Fasting 🍽️
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Join Live</span> Yoga Classes from Home 🧘
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 md:pl-8">
                <Button
                  onClick={scrollToRegistration}
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-xl px-12 md:px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Register Now
                </Button>
                {timeLeft.days > 0 && (
                  <p className="text-center md:text-left text-sm text-red-600 font-medium flex items-center justify-center md:justify-start gap-2 md:pl-2" style={{ marginTop: "15px" }}>
                    Limited Time Offer:
                    <span className="ml-2 font-bold text-red-600">
                      {timeLeft.days} {timeLeft.days === 1 ? 'Day' : 'Days'} Left
                    </span>
                  </p>
                )}
                <p className="text-center md:text-left mt-3 text-lg font-semibold text-gray-700 md:pl-2">
                  Fee: {feeText} only
                </p>
                <p className="text-center md:text-left text-sm text-emerald-600 font-medium flex items-center justify-center md:justify-start gap-2 md:pl-2" style={{ marginTop: "15px" }}>
                  <Users className="w-4 h-4" />
                  {peopleCount.toLocaleString()} people joined
                </p>
              </div>
            </motion.div>

            {/* Right Column - Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full order-first lg:order-last"
            >
              {showLanguageToggle ? (
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-100" style={{ paddingBottom: '56.25%' }}>
                  {/* Transparent overlay to intercept clicks and trigger modal */}
                  <div 
                    onClick={() => {
                      setModalStep("select-language");
                      setModalVideoId(null);
                      setIsModalOpen(true);
                    }}
                    className="absolute inset-0 z-10 cursor-pointer"
                  />
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Ultimate 21 Day Weight Loss Challenge"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-100" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Ultimate 21 Day Weight Loss Challenge"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl overflow-hidden bg-white rounded-2xl shadow-2xl border border-emerald-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-900 bg-white/80 rounded-full hover:bg-gray-100 transition-colors shadow-sm no-heartbeat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {modalStep === "select-language" ? (
                <div className="p-8 text-center md:p-12">
                  <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button
                      onClick={() => {
                        setModalVideoId("0zkAOy4AP38");
                        setModalStep("play-video");
                      }}
                      className="no-heartbeat p-6 rounded-2xl border-2 border-emerald-100 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-center transition-all duration-300 group hover:shadow-lg flex flex-col items-center justify-center min-h-[110px]"
                    >
                      <span className="text-lg sm:text-xl font-bold text-emerald-950 block font-poppins">
                        वीडियो हिन्दी में देखें
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setModalVideoId("f8-22hN40CY");
                        setModalStep("play-video");
                      }}
                      className="no-heartbeat p-6 rounded-2xl border-2 border-emerald-100 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-center transition-all duration-300 group hover:shadow-lg flex flex-col items-center justify-center min-h-[110px]"
                    >
                      <span className="text-lg sm:text-xl font-bold text-emerald-950 block font-poppins">
                        Watch video in English
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full aspect-video bg-black">
                  {modalVideoId && (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0`}
                      title="Ultimate 21 Day Weight Loss Challenge"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
