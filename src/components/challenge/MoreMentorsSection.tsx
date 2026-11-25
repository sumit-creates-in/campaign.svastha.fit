import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useEffect, useRef } from "react";
import venikaImage from "@/assets/venika agarwal.jpeg";
import muskanImage from "@/assets/muskan lalwani.jpeg";
import ankitImage from "@/assets/ankit sharma.webp";
import anishaImage from "@/assets/Anisha.jpeg";

export const MoreMentorsSection = ({ clean = false }: { clean?: boolean } = {}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Duplicate mentors array multiple times for infinite scroll effect
  const infiniteMentors = [...mentors, ...mentors, ...mentors, ...mentors];

  // Auto-scroll horizontally with infinite loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollStep = 1; // pixels per frame
    const scrollDelay = 30; // milliseconds between frames
    const cardWidth = 220; // card width + gap
    const resetPoint = cardWidth * mentors.length; // Reset after one full cycle

    const autoScroll = () => {
      if (!container) return;
      
      scrollAmount += scrollStep;
      container.scrollLeft = scrollAmount;

      // Reset to beginning seamlessly when one cycle completes
      if (scrollAmount >= resetPoint) {
        scrollAmount = 0;
        container.scrollLeft = 0;
      }
    };

    const interval = setInterval(autoScroll, scrollDelay);

    return () => clearInterval(interval);
  }, [mentors.length]);

  // Ultimate page (Sumit, 25 Nov 2026): a still grid instead of the sliding
  // strip (it cut names off on phones). Venika no longer works with us.
  if (clean) {
    const team = mentors.filter((m) => m.name !== "Venika Agarwal");
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle
            eyebrow="Your support team"
            title="The dietitians and trainers behind your plan"
          />
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {team.map((mentor) => (
              <div key={mentor.name} className="text-center">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl shadow-md">
                  <img src={mentor.image} alt={mentor.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-2 text-[13px] font-bold leading-tight text-gray-900 md:text-base">{mentor.name}</p>
                <p className="text-[11px] text-emerald-700 md:text-sm">{mentor.title.replace(/[()]/g, "")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-5xl">
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

        {/* Horizontal Scrolling Container - Shows 3 cards at a time */}
        <div className="overflow-hidden max-w-4xl mx-auto">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}>
            {infiniteMentors.map((mentor, idx) => (
              <div
                key={`${mentor.name}-${idx}`}
                className="flex flex-col items-center flex-shrink-0 w-[calc(33.333%-16px)] min-w-[240px]">
                {/* Mentor Image */}
                <div className="w-full aspect-[3/4] mb-3 overflow-hidden rounded-lg shadow-lg">
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
                  <p className="text-xs font-normal text-gray-600 italic">
                    {mentor.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
