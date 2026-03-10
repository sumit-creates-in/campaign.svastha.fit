import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VideoTestimonialSection2 = () => {
    const videoId = "is5v451Bw18";
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const handleVideoClick = () => {
        window.open("https://youtu.be/is5v451Bw18?si=Q0qeWbM7ETGCjoq3", "_blank");
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Aanchal Shed 6.5 Kg in Just 9 Days!
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8">
                        Watch her unbelievable journey!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative max-w-3xl mx-auto"
                >
                    <div
                        onClick={handleVideoClick}
                        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl cursor-pointer group hover:shadow-3xl transition-all duration-300"
                    >
                        {/* YouTube Thumbnail */}
                        <div className="aspect-video relative">
                            <img
                                src={thumbnailUrl}
                                alt="Aanchal's Weight Loss Journey"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>

                            {/* Play Button */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="bg-red-600 hover:bg-red-700 rounded-full p-6 shadow-lg transition-colors duration-300">
                                    <Play className="w-12 h-12 text-white ml-1" fill="currentColor" />
                                </div>
                            </motion.div>

                            {/* Video Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h3 className="text-white text-xl font-bold mb-2">
                                    Incredible 6.5 Kg Weight Loss in 9 Days
                                </h3>
                                <p className="text-white/90 text-sm">
                                    Discover Aanchal's unbelievable transformation story
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-8"
                    >
                        <p className="text-lg text-gray-700 mb-4">
                            Ready to achieve similar results?
                        </p>
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                            <span>Click to watch her inspiring story</span>
                            <Play className="w-4 h-4" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoTestimonialSection2;