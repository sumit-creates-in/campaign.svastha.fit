import { motion } from "framer-motion";
import saumyaImage from "@/assets/saumya gangwar.webp";
import jayshreeImage from "@/assets/jayshree.webp";
import amritaImage from "@/assets/Amrita.webp";

export const YogaTeachersSection = () => {
  const teachers = [
    {
      name: "Saumya Gangwar",
      title: "Yoga & Workout Expert",
      image: saumyaImage,
    },
    {
      name: "Jayshree Rathi",
      title: "Yoga Teacher",
      image: jayshreeImage,
    },
    {
      name: "Amrita Bhade",
      title: "Yoga Teacher",
      image: amritaImage,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">🧘‍♀️</span>
              <span>Meet Your</span>
            </div>
            <div>Yoga</div>
            <div>Teachers</div>
          </h2>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {teachers.map((teacher, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center">
              {/* Teacher Image */}
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl mb-6 bg-white border-4 border-white">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Teacher Info */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                  {teacher.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {teacher.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
