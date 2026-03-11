import { motion } from "framer-motion";

const BenefitsSection = () => {
  const benefits = [
    { emoji: "🌟", text: "Learn powerful weight loss habits", bgColor: "bg-yellow-100" },
    { emoji: "🥗", text: "Eat simple home food like Daal, Roti, Sabji & Rice", bgColor: "bg-green-100" },
    { emoji: "🔥", text: "Train your body to burn fat for energy", bgColor: "bg-orange-100" },
    { emoji: "✅", text: "Learn the right way of intermittent fasting", bgColor: "bg-blue-100" },
    { emoji: "🧘‍♀️", text: "Join daily live yoga classes from home", bgColor: "bg-purple-100" }
  ];

  return (
    <section className="py-20 px-0 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What You Will Experience in 14 Days
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`${benefit.bgColor} p-4 rounded-full mb-4`}>
                <span className="text-4xl">{benefit.emoji}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.text}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-green-700 font-semibold italic">
            No gym required. No extreme dieting. Just simple yoga & healthy habits.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
