import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import RegistrationModal from "@/components/RegistrationModal";

interface StickyCTAProps {
  priceText?: string;
  intlModal?: boolean;
}

const StickyCTA = ({ priceText = "Only ₹99", intlModal = false }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 500) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm md:text-xl">
                    14 Day Weight Loss & Yoga Camp
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex flex-col items-center gap-1">
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
                        onClick={() => {
                          if (intlModal) {
                            window.open('https://wa.me/15557533653?text=Join%20FREE%2014%20Weight%20Loss%20%26%20Yoga%20Camp', '_blank');
                          } else {
                            setIsModalOpen(true);
                          }
                        }}
                        size="lg"
                        className="bg-white text-green-700 hover:bg-gray-100 font-bold shadow-lg"
                      >
                        {intlModal ? "JOIN for FREE" : "Register Now"}
                      </Button>
                    </motion.div>
                    {!intlModal && (
                      <p className="text-white/90 text-sm md:text-base">
                        {priceText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default StickyCTA;