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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let isScrolling = false;

    const updateCurrentIndex = () => {
      if (scrollContainer) {
        const scrollPosition = scrollContainer.scrollLeft;
        const cardWidth = 256 + 24; // w-64 (256px) + gap-6 (24px)
        const index = Math.round(scrollPosition / cardWidth);
        setCurrentIndex(index);
      }
    };

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isScrolling && scrollContainer) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;

          if (currentScroll >= maxScroll) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 2;
          }
          updateCurrentIndex();
        }
      }, 15);
    };

    const handleUserScroll = () => {
      isScrolling = true;
      clearInterval(scrollInterval);
      updateCurrentIndex();
      setTimeout(() => {
        isScrolling = false;
        startAutoScroll();
      }, 3000);
    };

    scrollContainer.addEventListener('scroll', handleUserScroll);
    scrollContainer.addEventListener('touchstart', handleUserScroll);
    scrollContainer.addEventListener('mousedown', handleUserScroll);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('scroll', handleUserScroll);
      scrollContainer.removeEventListener('touchstart', handleUserScroll);
      scrollContainer.removeEventListener('mousedown', handleUserScroll);
    };
  }, []);

  const transformations = [
    {
      image: transformation1,
      text: "Bahut ache se samjhaya or follow karne me bhi madad ki. Pata hi nahi chala k diet bhi kar rahe h. Sab log hairaan h k sab kuch khaate peete bhi weight loss ho gaya. Bahut acha program h."
    },
    {
      image: transformation2,
      text: "15 kilo vazan kam ho gaya or koi strict diet nahi follow karni padi bas jam kar khaya or life ko enjoy kiya. Thank you Sumit Sir. - Vijay"
    },
    {
      image: transformation3,
      text: "Maine sirf golden rules follow karke 25 kg's weight loss kiya vo bhi bina kisi strict diet k. Thank you Sumit Sirrrr!!! - Namrata"
    },
    {
      image: transformation4,
      text: "Got the results in just 21 days. So happy to have joined this program. - Aditi"
    },
    {
      image: transformation5,
      text: "Ab me bina kisi tension k khana kha sakta hu apni life enjoy kar sakta hu. mera fatty liver or hypertension bhi ab theek ho gaya hai. Amazing experience. - Ravikant"
    },
    {
      image: transformation6,
      text: "95 kg se 60 kg tak ka safar mere liye sirf weight loss nahi, ek complete life change tha."
    },
    {
      image: transformation7,
      text: "Har doctor ek hi cheez bolte the — 'weight kam karo', par kaise koi nahi batata tha. Mujhe intermiitent fassting seekhne ko mili, fasting ka sahi tareeka seekha, kya khaana h, kab khana h ye sab seekha. Ab bas healthy weight maintain karna hai. Thank you Sumit sir and team."
    },
    {
      image: transformation8,
      text: "Sir ki guidance me maine ab tak 20 kg vazan kam kar liya or pichle 6 maheene se ise maintain bhi kar raha hu. Thank you Sumit Sir. - Sumit"
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
          className="overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex gap-6 min-w-max">
            {transformations.map((transformation, idx) => (
              <motion.div
                key={idx}
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
