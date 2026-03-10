import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import RegistrationSection from "@/components/RegistrationSection";

const FinalCTASection = () => {
  return (
    <section id="register" className="py-20 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Start Your Transformation Today
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold text-lg">Feel lighter</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold text-lg">Feel stronger</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold text-lg">Feel more energetic</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-3xl md:text-4xl font-bold text-white mb-2">
              Join the 14 Day Weight Loss & Yoga Camp
            </p>
            <p className="text-2xl text-white/90 mb-8">Only ₹99</p>
          </motion.div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <RegistrationSection />
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
