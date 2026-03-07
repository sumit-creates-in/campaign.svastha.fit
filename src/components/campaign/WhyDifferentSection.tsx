import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const WhyDifferentSection = () => {
  const problems = [
    "Lack of structure",
    "Lack of accountability",
    "No guidance",
    "No community support"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            This is Not Just a Yoga Camp
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-red-600 mb-6">Common Problems:</h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-lg text-gray-700">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 shadow-xl text-white flex flex-col justify-center"
          >
            <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Solution:</h3>
            <p className="text-lg leading-relaxed">
              This 14 Day Yoga & Fat Loss Camp provides daily guidance, structured sessions, and a supportive community to help you stay consistent.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
