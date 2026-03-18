import { motion } from "framer-motion";
import { Frown, Scale, Cookie, Activity, Plus, Scale as Balance, Briefcase, Home, Users } from "lucide-react";

export const WhoIsThisForSection = () => {
  const audiences = [
    {
      icon: Frown,
      title: "Tried Losing Weight but Failed",
    },
    {
      icon: Scale,
      title: "Lost Weight but it Came Back",
    },
    {
      icon: Cookie,
      title: "Crave Sugar & Carbs",
    },
    {
      icon: Activity,
      title: "Gut Issues",
    },
    {
      icon: Plus,
      title: "Chronic Diseases",
    },
    {
      icon: Balance,
      title: "Hormonal Imbalance",
    },
    {
      icon: Briefcase,
      title: "Working Professionals",
    },
    {
      icon: Home,
      title: "Home Makers",
    },
    {
      icon: Users,
      title: "For Parents",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Who is this for?
          </h2>
        </motion.div>

        {/* Grid of Audience Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {audiences.map((audience, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <audience.icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
              </div>
              {/* Title */}
              <p className="text-base md:text-lg text-gray-700 font-normal">
                {audience.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
