import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Flame, Leaf } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const FatLossHero = () => {
  const scrollToRegister = () => {
    const element = document.querySelector("#register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <div className="text-purple-600">14 Day Yoga</div>
              <div className="text-teal-600">& Fat Loss Camp</div>
            </h1>

            {/* YouTube Video */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                  src="https://www.youtube.com/embed/0zkAOy4AP38"
                  title="14 Day Yoga & Fat Loss Camp"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <p className="text-2xl md:text-3xl text-green-700 font-semibold mb-4">
              Transform Your Body, Energy & Mind in Just 14 Days
            </p>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Lose weight naturally, feel lighter, and build healthy habits with daily live yoga sessions from expert instructors.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-800">Only ₹99 Commitment Fee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-800">Camp Starts: 22 March</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800">Orientation: 9:00 AM</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Button
                onClick={scrollToRegister}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Reserve Your Spot Now
              </Button>
              <Button
                onClick={scrollToRegister}
                size="lg"
                variant="outline"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 text-lg font-semibold rounded-full shadow-lg"
              >
                Join the Camp for ₹99
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="max-w-2xl mx-auto">
              <CountdownTimer />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FatLossHero;
