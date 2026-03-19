import { motion } from "framer-motion";
import { BeforeAfterDashboardCard } from "@/components/gamification/BeforeAfterDashboardCard";

export const TransformationsSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-3">
            <span>🔥</span>
            <span>We Deliver The Best Transformations</span>
            <span>🔥</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700">Are you ready for yours?</p>
        </motion.div>

        {/* Real Transformations Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12">
          <BeforeAfterDashboardCard />
        </motion.div>
      </div>
    </section>
  );
};
