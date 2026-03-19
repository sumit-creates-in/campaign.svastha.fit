import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface HeroSectionProps {
  scrollToRegistration: () => void;
}

export const HeroSection = ({ scrollToRegistration }: HeroSectionProps) => {
  return (
    <section className="relative py-4 md:py-6 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-500 text-white px-8 py-2 rounded-full text-xl md:text-xl font-bold tracking-wide">
            SVASTHA.FIT
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-emerald-500 text-2xl md:text-3xl">✦</span>
            <h1 className="text-2xl md:text-3xl text-emerald-600 tracking-wider">
              ULTIMATE
            </h1>
            <span className="text-emerald-500 text-2xl md:text-3xl">✦</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-600 mb-2">
            21 Day
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold text-emerald-600">
            Weight Loss Challenge
          </h3>
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
              <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">With Natural Food Like</span> Daal, Rice, Roti, Sabji 🌾
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
                className="w-full md:w-auto bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Register Now
              </Button>
              <p className="text-center md:text-left mt-3 text-lg font-semibold text-gray-700 md:pl-2">
                Fee: Rs. 990/- only
              </p>
              <p className="text-center md:text-left mt-1 text-sm text-emerald-600 font-medium flex items-center justify-center md:justify-start gap-2 md:pl-2">
                <Users className="w-4 h-4" />
                6733 people joined
              </p>
            </div>
          </motion.div>

          {/* Right Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full order-first lg:order-last">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-100" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/0zkAOy4AP38"
                title="Ultimate 21 Day Weight Loss Challenge"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
