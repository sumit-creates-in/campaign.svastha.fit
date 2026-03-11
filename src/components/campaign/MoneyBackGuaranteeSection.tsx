import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

const MoneyBackGuaranteeSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-600 p-6 rounded-full">
              <Shield className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Try The Camp Risk Free
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <p className="text-xl text-gray-700 mb-6">
              We want you to experience real results.
            </p>
            
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 mb-6">
              <p className="text-2xl font-bold text-gray-900 mb-4">
                So we are offering a 100% refund guarantee.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">
                  If you follow the program and don't lose weight, we will refund your ₹99.
                </p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">
                  No questions asked.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6"
            >
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                You literally have nothing to lose.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoneyBackGuaranteeSection;
