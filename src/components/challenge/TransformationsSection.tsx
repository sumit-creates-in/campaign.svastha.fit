import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TransformationsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const transformations = [
    {
      beforeImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      testimonial: '"Got the results in just 21 days. So happy to have joined this program." - Aditi',
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=600&fit=crop",
      testimonial: '"15 Kilo vazan kam ho gaya or koi strict diet nahi follow karni padi bas jum kar khaya or life ko enjoy kiya. Thank you Sumit Sir." - Vijay',
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=400&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
      testimonial: '"95 kg se 60 kg tak ka safar mere liye sirf weight loss nahi ek complete life change tha."',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

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

        {/* Carousel */}
        <div className="relative mt-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 -ml-4 md:-ml-12"
            aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 -mr-4 md:-mr-12"
            aria-label="Next slide">
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Slides Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {transformations.map((transformation, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {/* Before Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center">
                      <div className="w-full max-w-xs aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                        <img
                          src={transformation.beforeImage}
                          alt="Before transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* After Image */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center">
                      <div className="w-full max-w-xs aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                        <img
                          src={transformation.afterImage}
                          alt="After transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Third Image (optional) */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-center">
                      <div className="w-full max-w-xs aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                        <img
                          src={transformation.afterImage}
                          alt="After transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-8">
                    <p className="text-sm md:text-base text-gray-700 italic max-w-3xl mx-auto">
                      {transformation.testimonial}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {transformations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "bg-gray-800 w-8" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
