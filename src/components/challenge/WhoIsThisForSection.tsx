import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Frown, Scale, Cookie, Activity, Plus, Scale as Balance, Briefcase, Home, Users } from "lucide-react";

export const WhoIsThisForSection = ({ clean = false }: { clean?: boolean } = {}) => {
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
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        {clean ? (
          <SectionTitle eyebrow="Is this for you?" title="Who is this for?" />
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Who is this for?
          </h2>
        </motion.div>
        )}

        {/* Grid of Audience Types */}
        <div className={clean ? "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-12" : "grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"}>
          {audiences.map((audience, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className={clean ? "w-14 h-14 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-lg" : "w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg"}>
                <audience.icon className="w-7 h-7 md:w-10 md:h-10 text-white" strokeWidth={2} />
              </div>
              {/* Title */}
              <p className={clean ? "text-[15px] md:text-lg text-gray-800 font-medium leading-snug" : "text-base md:text-lg text-gray-700 font-normal"}>
                {audience.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
