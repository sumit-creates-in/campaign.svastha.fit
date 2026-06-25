import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import transformation1 from "@/assets/tranformation1.jpeg";
import transformation2 from "@/assets/tranformation2.jpeg";
import transformation3 from "@/assets/tranformation3.jpeg";
import transformation4 from "@/assets/tranformation4.jpeg";
import transformation5 from "@/assets/tranformation5.jpeg";
import transformation6 from "@/assets/tranformation6.jpeg";
import transformation7 from "@/assets/tranformation7.jpeg";
import transformation8 from "@/assets/tranformation8.jpeg";
import transformation9 from "@/assets/tranformation9.jpeg";

export const TransformationsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5; // Pixels per frame

    const updateCurrentIndex = () => {
      if (scrollContainer) {
        const scrollPosition = scrollContainer.scrollLeft;
        const cardWidth = 256 + 24; // w-64 (256px) + gap-6 (24px)
        const index = Math.round(scrollPosition / cardWidth) % transformations.length;
        setCurrentIndex(index);
      }
    };

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Seamless loop: reset to start when reaching halfway through duplicated content
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= halfWidth) {
          scrollContainer.scrollLeft = 0;
        }
        
        updateCurrentIndex();
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    const handleInteractionStart = () => {
      setIsPaused(true);
    };

    const handleInteractionEnd = () => {
      setTimeout(() => {
        setIsPaused(false);
      }, 2000);
    };

    scrollContainer.addEventListener('mouseenter', handleInteractionStart);
    scrollContainer.addEventListener('mouseleave', handleInteractionEnd);
    scrollContainer.addEventListener('touchstart', handleInteractionStart);
    scrollContainer.addEventListener('touchend', handleInteractionEnd);

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleInteractionStart);
      scrollContainer.removeEventListener('mouseleave', handleInteractionEnd);
      scrollContainer.removeEventListener('touchstart', handleInteractionStart);
      scrollContainer.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isPaused]);

  const transformations = [
    {
      image: transformation1,
      text: "Explained very well and helped me follow through. I didn't even realize I was on a diet. Everyone is amazed that I lost weight while eating everything. This is a great program."
    },
    {
      image: transformation2,
      text: "Lost 15 kilos without following any strict diet, just ate well and enjoyed life. Thank you Sumit Sir. - Vijay"
    },
    {
      image: transformation3,
      text: "I lost 25 kg just by following the golden rules without any strict diet. Thank you Sumit Sir!!! - Namrata"
    },
    {
      image: transformation4,
      text: "Got the results in just 21 days. So happy to have joined this program. - Aditi"
    },
    {
      image: transformation5,
      text: "Now I can eat without any tension and enjoy my life. My fatty liver and hypertension are also cured now. Amazing experience. - Ravikant"
    },
    {
      image: transformation6,
      text: "The journey from 95 kg to 60 kg was not just weight loss for me, it was a complete life change."
    },
    {
      image: transformation8,
      text: "With Sir's guidance, I have lost 20 kg so far and have been maintaining it for the last 6 months. Thank you Sumit Sir. - Sumit"
    },
    {
      image: transformation9,
      text: "Lost 12 kg's with the help of Sumit's teachings. Best decision ever. - Rabiya"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-3">
            <span>🔥</span>
            <span>We Deliver The Best Transformations</span>
            <span>🔥</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700">Are you ready for yours?</p>
        </motion.div>

        {/* Transformations Horizontal Scroll */}
        <div 
          ref={scrollRef} 
          className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex gap-6 min-w-max">
            {/* Original transformations */}
            {transformations.map((transformation, idx) => (
              <motion.div
                key={`original-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-64 flex-shrink-0">
                {/* Image */}
                <div className="w-full h-64 rounded-xl overflow-hidden mb-3">
                  <img 
                    src={transformation.image} 
                    alt={`Transformation ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Text */}
                <p className="text-xs text-gray-800 text-center leading-relaxed italic px-2">
                  "{transformation.text}"
                </p>
              </motion.div>
            ))}
            {/* Duplicate transformations for seamless loop */}
            {transformations.map((transformation, idx) => (
              <motion.div
                key={`duplicate-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-64 flex-shrink-0">
                {/* Image */}
                <div className="w-full h-64 rounded-xl overflow-hidden mb-3">
                  <img 
                    src={transformation.image} 
                    alt={`Transformation ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Text */}
                <p className="text-xs text-gray-800 text-center leading-relaxed italic px-2">
                  "{transformation.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {transformations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = 256 + 24; // w-64 (256px) + gap-6 (24px)
                  scrollRef.current.scrollLeft = idx * cardWidth;
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-black w-8' : 'bg-gray-400'
              }`}
              aria-label={`Go to transformation ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
