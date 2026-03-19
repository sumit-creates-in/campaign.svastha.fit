import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const VideoTestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
        </motion.div>

        {/* Video 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/S4C-v8OCHZ8"
                title="Success Story 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Lost 6.5 kg in 6 days!
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                "I couldn't believe the results! The combination of diet and yoga worked wonders.
                I feel more energetic and confident than ever before."
              </p>
              <p className="font-semibold text-emerald-600">- Jyoti</p>
            </div>
          </motion.div>
        </div>

        {/* Video 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Amazing Transformation!
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                "The support from the community and coaches made all the difference.
                I learned sustainable habits that I'll keep for life."
              </p>
              <p className="font-semibold text-emerald-600">- Aanchal</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/is5v451Bw18"
                title="Success Story 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
