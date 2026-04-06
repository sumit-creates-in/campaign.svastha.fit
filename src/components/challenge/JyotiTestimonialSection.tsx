import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const JyotiTestimonialSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: "S4C-v8OCHZ8",
      thumbnail: "https://img.youtube.com/vi/S4C-v8OCHZ8/maxresdefault.jpg",
      title: "Jyoti Ji Lost 6.5 Kg in Just 6 Days"
    },
    {
      id: "Jr3SLUysAQA",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/Testimonial-1.png",
      title: "Success Story 1"
    },
    {
      id: "4Bn9pORVFVM",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/4.png",
      title: "Success Story 2"
    },
    {
      id: "SZy_hjB6vHo",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/3.png",
      title: "Success Story 3"
    },
    {
      id: "4ezH5ZklCLE",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/IMG-20250215-WA0015.jpg",
      title: "Success Story 4"
    },
    {
      id: "oHvn8jAuon8",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/12.png",
      title: "Success Story 5"
    },
    {
      id: "4DHzrggWCH0",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/5.png",
      title: "Success Story 6"
    },
    {
      id: "7e48bnEhIpI",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/10.png",
      title: "Success Story 7"
    },
    {
      id: "n5EJQVvDRYc",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/2.png",
      title: "Success Story 8"
    },
    {
      id: "Ts4huVChfZw",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/15.png",
      title: "Success Story 9"
    },
    {
      id: "GVR15f366qg",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/11.png",
      title: "Success Story 10"
    },
    {
      id: "v41N_bq0XZ4",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/9.png",
      title: "Success Story 11"
    },
    {
      id: "ue0L2_-r8DQ",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/6.png",
      title: "Success Story 12"
    },
    {
      id: "4PMP8mkV3vM",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/7.png",
      title: "Success Story 13"
    },
    {
      id: "yHzVBGI6qik",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/8.png",
      title: "Success Story 14"
    },
    {
      id: "0S0oV3V1yjk",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/13.png",
      title: "Success Story 15"
    },
    {
      id: "YGFOF891dv0",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/1.jpg",
      title: "Success Story 16"
    },
    {
      id: "fa_0HjnLyuo",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/3rd.jpg",
      title: "Success Story 17"
    },
    {
      id: "aNk3QGniBN4",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/4th.jpg",
      title: "Success Story 18"
    },
    {
      id: "BmJy--U8xBQ",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/4.jpg",
      title: "Success Story 19"
    },
    {
      id: "HBOUUUWD3LM",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/5.jpg",
      title: "Success Story 20"
    },
    {
      id: "OV_AT9gtREw",
      thumbnail: "https://strongbyyoga.com/wp-content/uploads/2025/02/6-1.jpg",
      title: "Success Story 21"
    }
  ];

  // Duplicate videos for infinite scroll effect
  const duplicatedVideos = [...videos, ...videos, ...videos];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardWidth = 700;
    const gap = 24;
    const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    
    setCurrentIndex(newIndex);
    scrollContainer.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardWidth = 700;
    const gap = 24;
    const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    
    setCurrentIndex(newIndex);
    scrollContainer.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Set initial scroll position to 0 (first card)
    scrollContainer.scrollLeft = 0;

    let intervalId: NodeJS.Timeout;
    const cardWidth = 700; // Desktop card width
    const gap = 24; // gap-6 = 24px
    const scrollDelay = 3000; // 3 seconds per card

    // Initial delay before first scroll
    const initialTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (!isPaused && scrollContainer) {
          setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % videos.length; // Loop infinitely
            
            // Calculate scroll position
            const scrollPosition = nextIndex * (cardWidth + gap);
            
            // Smooth scroll to next card
            scrollContainer.scrollTo({
              left: scrollPosition,
              behavior: 'smooth'
            });

            return nextIndex;
          });
        }
      }, scrollDelay);
    }, 1000); // 1 second initial hold

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, videos.length]);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2 flex-wrap">
            <span>❤️See What People Are Saying About Us❤️</span>           
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-800 mb-12 flex items-center justify-center gap-2 flex-wrap">
            Real transformations, real results! 
            <span>💪</span>
            <span>✨</span>
          </p>

          {/* Horizontal Scrolling Video Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-[45%] -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Previous video">
              <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-emerald-600 transition-colors" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-[45%] -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Next video">
              <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-emerald-600 transition-colors" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory" 
              style={{ 
                scrollbarWidth: 'none'
              }}>
              <div className="flex gap-6" style={{ width: 'max-content' }}>
                {duplicatedVideos.map((video, index) => (
                  <motion.div
                    key={`${video.id}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index % videos.length) * 0.05 }}
                    className="flex-shrink-0 w-[90vw] md:w-[700px] group cursor-pointer snap-center"
                    onClick={() => setSelectedVideo(video.id)}>
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        </div>
                      </div>
                      {/* Video Title */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-semibold text-lg">{video.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="text-center mt-6 text-gray-600 text-sm flex items-center justify-center gap-2 flex-wrap">
              <span>{isPaused ? "⏸️ Paused" : "🔄 Auto-scrolling"}</span>
              <span>•</span>
              <span>Card {(currentIndex % videos.length) + 1} of {videos.length}</span>
              <span>•</span>
              <span>Use arrows or hover to pause</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
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
