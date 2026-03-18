import { motion } from "framer-motion";
import { useRef, useState } from "react";
import venikaImage from "@/assets/venika agarwal.jpeg";
import muskanImage from "@/assets/muskan lalwani.jpeg";
import ankitImage from "@/assets/ankit sharma.webp";
import anishaImage from "@/assets/Anisha.jpeg";

export const MoreMentorsSection = () => {
  const mentors = [
    {
      name: "Venika Agarwal",
      title: "(Dietitian)",
      image: venikaImage
    },
    {
      name: "Muskan Lalwani",
      title: "(Dietitian)",
      image: muskanImage
    },
    {
      name: "Ankit Sharma",
      title: "(Fitness Trainer)",
      image: ankitImage
    },
    {
      name: "Anisha Ghosh",
      title: "(Dietitian)",
      image: anishaImage
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            More Mentors are here...
          </h2>
        </motion.div>

        {/* Mentors Carousel */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          <div className="flex gap-6">
            {/* Duplicate mentors for infinite scroll effect */}
            <div 
              className={`flex gap-6 ${isPaused ? '' : 'animate-scroll-rtl'}`}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
              {[...mentors, ...mentors, ...mentors].map((mentor, idx) => (
                <motion.div
                  key={`mentor-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % mentors.length) * 0.1 }}
                  className="flex-shrink-0 w-[200px] md:w-[240px] flex flex-col items-center">
                  {/* Mentor Image */}
                  <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Mentor Info */}
                  <div className="text-center">
                    <p className="text-sm font-normal text-gray-700 italic">
                      {mentor.name}
                    </p>
                    <p className="text-sm font-normal text-gray-600 italic">
                      {mentor.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 italic">Hover to pause scrolling</p>
        </div>
      </div>
    </section>
  );
};
