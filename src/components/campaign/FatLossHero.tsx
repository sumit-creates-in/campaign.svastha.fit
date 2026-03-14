import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Flame, Leaf, Check, BadgeCheck } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import RegistrationModal from "@/components/RegistrationModal";
import svasthaLogo from "@/assets/svastha.png";

interface FatLossHeroProps {
  badgeText?: string;
  showGuarantees?: boolean;
  commitmentFeeText?: string;
  intlModal?: boolean;
}

const FatLossHero = ({ badgeText = "Guaranteed Weight Loss", showGuarantees = true, commitmentFeeText = "Only ₹99 Commitment Fee", intlModal = false }: FatLossHeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>





      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 px-4 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="w-full relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-row py-4 items-center justify-center gap-3">
                <img src={svasthaLogo} alt="Svastha" className="w-8 h-8" />
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">Svastha</span>
              </div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg mb-8">
                <BadgeCheck className="w-5 h-5" />
                <span className="font-bold text-sm">{badgeText}</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <div className="text-purple-600">✦ 14 Day✦</div>
                <div className="text-purple-600">Weight Loss</div>
                <div className="text-teal-600">&</div>
                <div className="text-teal-600">Yoga Camp</div>
              </h1>

              {/* YouTube Video */}
              <div className="max-w-3xl mx-auto mb-8">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                    src="https://www.youtube.com/embed/m9fPoVvUlfA"
                    title="14 Day Yoga & Fat Loss Camp"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <p className="text-2xl md:text-3xl text-green-700 font-semibold mb-4">
                Lose up to 7 Kg 🔥 in Just 14 Days
              </p>
              {showGuarantees && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg mb-6">
                  <BadgeCheck className="w-5 h-5" />
                  <span className="font-bold text-sm">100% Money Back Guarantee</span>
                </div>
              )}

              {/* <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Lose Weight Naturally With Yoga & Simple Habits
              </p> */}

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 font-medium">🥗 Eat simple home food like Daal, Roti, Sabji & Rice
                  </span>
                </div>
                <div className="flex items-center gap-2">

                  <span className="text-gray-800 font-medium">🔥 Train your body to burn fat for energy</span>
                </div>
                <div className="flex items-center gap-2">

                  <span className="text-gray-800 font-medium">🌟 Learn powerful weight loss habits</span>
                </div>
                <div className="flex items-center gap-2">

                  <span className="text-gray-800 font-medium">✅ Learn the right way of intermittent fasting
                  </span>
                </div>
                <div className="flex items-center gap-2">

                  <span className="text-gray-800 font-medium">🧘‍♀️ Join daily live yoga classes from home
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-800">{commitmentFeeText}</span>
                </div>
                {showGuarantees && (
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                    <Check className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold text-sm text-gray-800">Lose Weight or Get Full Refund</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-800">Camp Starts: 22 March</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">Orientation: 9:00 AM</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <motion.div
                  animate={{
                    scale: [1.15, 1.05, 1.15],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    size="lg"
                    className="relative bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group"
                  >
                    <span className="relative z-10">Register Now</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  </Button>
                </motion.div>
              </div>

              {/* Countdown Timer */}
              <div className="max-w-2xl mx-auto">
                <CountdownTimer />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        hideNameEmail={intlModal} 
        defaultCountryCode={intlModal ? "+1" : "+91"} 
        phoneLabel={intlModal ? "Whatsapp Number" : "Phone Number"} 
        buttonText={intlModal ? "Get Instructions on Whatsapp" : "Proceed to Payment - ₹99"}
        modalTitle={intlModal ? "Free Weight Loss&Yoga Camp" : "Registration Details"}
        isInternational={intlModal}
      />
    </>
  );
};

export default FatLossHero;
