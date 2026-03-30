import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";

interface RegistrationSectionProps {
  isInternational?: boolean;
}

const RegistrationSection = ({ isInternational = false }: RegistrationSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <section
        id="register"
        className="py-20 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="w-full px-8 bg-green-700 hover:bg-primary text-primary-foreground text-sm py-6 shadow-hover transition-all duration-300 hover:scale-105"
              >
                {isInternational ? "Complete Registration" : "Complete Registration"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section> */}

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

      {/* Separate Chat Section */}
      <div style={{ paddingTop: '4rem', paddingBottom: '6rem' }} className="px-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center px-4"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our team is here to help! Chat with us on WhatsApp for any queries about the program.
          </p>
          <Button
            type="button"
            size="lg"
            onClick={() => window.open('https://api.whatsapp.com/send/?phone=917208683034&text&type=phone_number&app_absent=0', '_blank')}
            className="bg-green-700 hover:bg-green-600 text-white text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Chat with us
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default RegistrationSection;
