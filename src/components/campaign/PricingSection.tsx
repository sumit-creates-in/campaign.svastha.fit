import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Users } from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";

interface PricingSectionProps {
  isInternational?: boolean;
}

const PricingSection = ({ isInternational = false }: PricingSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const includes = [
    "Orientation session",
    "14 days live yoga classes",
    "WhatsApp guidance",
    "Community support",
    "Class recordings"
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="w-full px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join the 14 Day Weight Loss & Yoga Camp
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
            <p className="text-lg mb-2 opacity-90">{isInternational ? "Free Community camp" : "Commitment Fee"}</p>
            {!isInternational && (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl md:text-7xl font-bold">₹99</span>
                </div>
                <p className="text-lg mt-2 opacity-90">One-time payment</p>
              </>
            )}
          </div>

          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What's Included:
            </h3>

            <div className="space-y-4 mb-8">
              {includes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-md"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-lg text-gray-800 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <Clock className="w-6 h-6" />
                <p className="text-lg font-bold">Limited Seats Available</p>
              </div>
              <p className="text-center text-red-600 mt-2">
                Camp starts on 22 March - Don't miss out!
              </p>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {isInternational ? "REGISTER for FREE" : "Register Now for ₹99"}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <p className="text-sm">Join hundreds of others on this journey</p>
            </div>
          </div>
        </motion.div>
      </div>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        hideNameEmail={isInternational}
        defaultCountryCode={isInternational ? "+1" : "+91"}
        phoneLabel={isInternational ? "Whatsapp Number" : "Phone Number"}
        buttonText={isInternational ? "Get Instructions on Whatsapp" : "Proceed to Payment - ₹99"}
        modalTitle={isInternational ? "Free Weight Loss&Yoga Camp" : "Registration Details"}
        isInternational={isInternational}
      />
    </section>
  );
};

export default PricingSection;
