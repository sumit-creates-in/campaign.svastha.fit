import { motion } from "framer-motion";
import { Sunrise, Sunset, Video, Clock } from "lucide-react";

const BatchesSection = () => {
  const morningBatches = ["6:30 AM", "7:30 AM", "8:30 AM"];
  const eveningBatches = ["5:30 PM", "6:30 PM"];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Preferred Batch
          </h2>
          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold text-lg">
            <Video className="w-5 h-5" />
            <span>All classes are conducted LIVE on Zoom</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Morning Batches */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-full">
                <Sunrise className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Morning Batches</h3>
            </div>
            <div className="space-y-3">
              {morningBatches.map((time, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow"
                >
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="text-lg font-semibold text-gray-800">{time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Evening Batches */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <Sunset className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Evening Batches</h3>
            </div>
            <div className="space-y-3">
              {eveningBatches.map((time, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow"
                >
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-lg font-semibold text-gray-800">{time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center bg-green-100 rounded-xl p-6"
        >
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-green-700">Missed a class?</span> Recordings will be available.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BatchesSection;
