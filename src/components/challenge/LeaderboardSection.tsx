import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export const LeaderboardSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-8 lg:gap-12 md:items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left w-full md:pr-4">
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center md:justify-start gap-3 mb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  LIVE Weight Loss
                </h2>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Leaderboard
              </h2>
            </div>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 md:ml-11">
              Track your progress & stay motivated to be #1!
            </p>
          </motion.div>

          {/* Right Side - Podium Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end w-full md:pl-4">
            <div className="relative max-w-xs w-full pt-20 md:pt-24">
              {/* Star on top */}
              <div className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-10">
                <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg md:w-20 md:h-20">
                  <polygon
                    points="50,10 61,40 92,40 67,60 78,90 50,70 22,90 33,60 8,40 39,40"
                    fill="#FCD34D"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Yellow vertical line connecting star to #1 podium */}
              <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 w-1.5 bg-yellow-400 z-0" style={{ height: 'calc(100% - 15rem)' }}></div>

              {/* Podium */}
              <div className="flex items-end gap-1 relative pb-2 mt-8 z-10">
                {/* 2nd Place */}
                <div className="bg-emerald-500 rounded-t-xl w-full h-28 md:h-36 flex items-center justify-center shadow-lg">
                  <span className="text-white text-4xl md:text-6xl font-bold">2</span>
                </div>

                {/* 1st Place - Taller */}
                <div className="bg-emerald-600 rounded-t-xl w-full h-36 md:h-48 flex items-center justify-center shadow-xl relative">
                  <span className="text-white text-4xl md:text-6xl font-bold">1</span>
                </div>

                {/* 3rd Place */}
                <div className="bg-emerald-500 rounded-t-xl w-full h-28 md:h-36 flex items-center justify-center shadow-lg">
                  <span className="text-white text-4xl md:text-6xl font-bold">3</span>
                </div>
              </div>

              {/* Base Platform */}
              <div className="w-full h-6 md:h-8 bg-gray-700 rounded-lg shadow-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
