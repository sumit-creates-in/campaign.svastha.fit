import { motion } from "framer-motion";

const VideoTestimonialSection = () => {
    return (
        <section className="py-20 px-0 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Jyoti Ji Lost 6.5 Kg in Just 6 Days !!!
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8">
                        Watch her amazing journey with us!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                            src="https://www.youtube.com/embed/S4C-v8OCHZ8"
                            title="Jyoti Ji Lost 6.5 Kg in Just 6 Days"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
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
                            Ready to start your own transformation journey?
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoTestimonialSection;