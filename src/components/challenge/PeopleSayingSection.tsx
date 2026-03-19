import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

export const PeopleSayingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const testimonials = [
    {
      title: "Fasted my way to Lose Weight!",
      thumbnail: "https://img.youtube.com/vi/S4C-v8OCHZ8/maxresdefault.jpg",
      videoId: "S4C-v8OCHZ8"
    },
    {
      title: "From Tired to Thriving!",
      thumbnail: "https://img.youtube.com/vi/is5v451Bw18/maxresdefault.jpg",
      videoId: "is5v451Bw18"
    },
    {
      title: "Lost 3 kilos In No Time!",
      thumbnail: "https://img.youtube.com/vi/S4C-v8OCHZ8/maxresdefault.jpg",
      videoId: "S4C-v8OCHZ8"
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            ❤️ See What People Are Saying About Us ❤️
          </h2>
        </motion.div>

        {/* Desktop View - 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative">
              {/* Card */}
              <div className="bg-gradient-to-br from-yellow-300 via-orange-200 to-yellow-400 rounded-2xl p-6 shadow-lg relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => openVideo(testimonial.videoId)}>
                {/* Decorative wavy line at top */}
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <svg width="60" height="10" viewBox="0 0 60 10" className="text-gray-800">
                    <path d="M0 5 Q 7.5 0, 15 5 T 30 5 T 45 5 T 60 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                {/* Thumbnail as background */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Profile Image */}
                  <div className="flex justify-start mb-4 mt-2">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md">
                      <img
                        src={testimonial.thumbnail}
                        alt="Testimonial"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-gray-900 italic mb-4 leading-tight">
                    {testimonial.title}
                  </h3>

                  {/* Play Button */}
                  <div className="flex justify-center items-center">
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="absolute bottom-4 left-6 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-sm">⭐</span>
                    ))}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-16 right-6 text-2xl">😊</div>
                  <div className="absolute bottom-16 right-8 text-xl">💪</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-yellow-300 via-orange-200 to-yellow-400 rounded-2xl p-6 shadow-lg relative overflow-hidden max-w-sm mx-auto cursor-pointer"
                    onClick={() => openVideo(testimonial.videoId)}>
                    {/* Decorative wavy line at top */}
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                      <svg width="60" height="10" viewBox="0 0 60 10" className="text-gray-800">
                        <path d="M0 5 Q 7.5 0, 15 5 T 30 5 T 45 5 T 60 5" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    {/* Profile Image */}
                    <div className="flex justify-start mb-4 mt-2">
                      <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md">
                        <img
                          src={testimonial.thumbnail}
                          alt="Testimonial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-gray-900 italic mb-4 leading-tight">
                      {testimonial.title}
                    </h3>

                    {/* Play Button */}
                    <div className="flex justify-center items-center">
                      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="absolute bottom-4 left-6 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-sm">⭐</span>
                      ))}
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-16 right-6 text-2xl">😊</div>
                    <div className="absolute bottom-16 right-8 text-xl">💪</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "bg-gray-800 w-6" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeVideo}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video">
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Video Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
