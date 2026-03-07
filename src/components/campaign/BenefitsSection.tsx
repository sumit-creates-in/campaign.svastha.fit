import { motion } from "framer-motion";
import { Flame, Zap, Activity, TrendingUp, Target } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Flame,
      title: "Burn fat naturally through yoga",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Zap,
      title: "Feel lighter and more energetic",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Activity,
      title: "Improve flexibility and stamina",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TrendingUp,
      title: "Learn simple habits to lose weight faster",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Target,
      title: "Build discipline and consistency",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

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
            What You Will Experience in 14 Days
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`${benefit.bgColor} p-4 rounded-full mb-4`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
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
