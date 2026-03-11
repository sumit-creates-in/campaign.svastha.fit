import { motion } from "framer-motion";
import { X } from "lucide-react";

const WhyPeopleFailSection = () => {
  const failedMethods = [
    "Dieting",
    "Gym memberships",
    "Calorie counting",
    "Weight loss supplements"
  ];

  const successFactors = [
    { emoji: "🧘", text: "Yoga" },
    { emoji: "🥗", text: "Simple natural food" },
    { emoji: "⏰", text: "Intermittent fasting" },
    { emoji: "💡", text: "Powerful habits" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="w-full px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Why Most People Fail To Lose Weight
          </h2>

          <p className="text-xl text-gray-700 mb-6">You may have tried:</p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {failedMethods.map((method, index) => (
              <motion.div
                key={method}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md border-2 border-red-200"
              >
                <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">{method}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-8 shadow-xl mb-8 border-2 border-red-300"
          >
            <p className="text-2xl font-bold mb-4">
              <span className="text-red-600">But the weight always comes back.</span>{" "}
              <span className="text-gray-900">Why?</span>
            </p>
            <p className="text-lg text-gray-700 mb-2">
              Because weight loss is not about eating less.
            </p>
            <p className="text-xl font-bold text-green-700">
              It's about fixing your lifestyle habits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 shadow-xl border-2 border-green-300"
          >
            <p className="text-xl font-semibold text-gray-900 mb-6">When you combine:</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {successFactors.map((factor, index) => (
                <motion.div
                  key={factor.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-lg shadow-md text-center border-2 border-green-200"
                >
                  <span className="text-4xl">{factor.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{factor.text}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-xl font-bold text-gray-900 mb-4">
              Your body naturally starts burning fat for energy.
            </p>
            <p className="text-2xl font-bold text-green-700">
              This is exactly what we will teach you in this camp.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPeopleFailSection;
