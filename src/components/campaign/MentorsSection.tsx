import { motion } from "framer-motion";
import { Award } from "lucide-react";
import karishmaImg from "@/assets/Karishma.jpg";
import saumyaImg from "@/assets/Saumya.jpg";
import muditImg from "@/assets/Mudit.jpg";
import sumitImg from "@/assets/sumit sharma.png";

const MentorsSection = () => {
  const coaches = [
    {
      name: "Karishma",
      specialty: "Yoga alignment & fat-burning sequences",
      image: karishmaImg
    },
    {
      name: "Saumya",
      specialty: "Mobility, flexibility & strength",
      image: saumyaImg
    },
    {
      name: "Mudit",
      specialty: "Posture correction & beginner-friendly yoga",
      image: muditImg
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Your Mentors
          </h2>
        </motion.div>

        {/* Lead Mentor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={sumitImg}
                  alt="Sumit Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Sumit Sharma</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Certified Dietitian
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Yoga Teacher
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Wellness Coach
                </span>
              </div>
              <p className="text-lg text-gray-700 mb-3">
                <span className="font-semibold">Founder of Strong By Yoga</span>
              </p>
              <div className="flex items-start gap-2 text-gray-600">
                <Award className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-base">
                  Over 10 years of experience helping thousands transform their health naturally.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Yoga Coaches */}
        <div className="grid md:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h4>
                <p className="text-gray-600">{coach.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
