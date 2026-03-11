import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2 } from "lucide-react";

const DailyGuidanceSection = () => {
  const guidanceTopics = [
    "Intermittent fasting",
    "Quitting sugar",
    "Avoiding processed foods",
    "Eating home-cooked food",
    "Building discipline"
  ];

  return (
    <section className="py-20 px-0 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Daily Guidance from Sumit Sharma
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-full">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">WhatsApp Voice Guidance</h3>
              <p className="text-gray-600">Daily personalized messages</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Receive daily voice guidance covering essential topics:
          </p>

          <div className="space-y-4">
            {guidanceTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 bg-green-50 rounded-lg p-4"
              >
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-lg text-gray-800 font-medium">{topic}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6">
            <p className="text-center text-gray-800 font-semibold">
              Get expert advice delivered directly to your phone every day
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyGuidanceSection;
