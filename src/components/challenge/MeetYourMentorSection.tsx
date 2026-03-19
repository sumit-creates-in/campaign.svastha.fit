import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import sumitImage from "@/assets/image.png";

export const MeetYourMentorSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-2">
            Meet Your Mentor
          </h2>
          <p className="text-sm text-gray-600">
            Get trained by the best in the industry
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
          {/* Left Side - Instagram Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full relative">
              {/* Instagram Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">healthylife_by_sumit</span>
                  <span className="text-red-500">❤️</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Instagram className="w-6 h-6 text-gray-800" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      1
                    </span>
                  </div>
                  <button className="text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Profile Section */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img
                        src={sumitImage}
                        alt="Sumit Sharma"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-lg font-bold border-2 border-white">
                    +
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      What's new?
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">Sumit Sharma</h3>
                  <div className="flex gap-6 text-center">
                    <div>
                      <div className="font-bold text-gray-900">476</div>
                      <div className="text-xs text-gray-600">posts</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">111K</div>
                      <div className="text-xs text-gray-600">followers</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">78</div>
                      <div className="text-xs text-gray-600">following</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="text-xs text-gray-700 space-y-1 mb-3">
                <div className="flex items-center gap-1">
                  <span>⚖️ Weight Loss Expert |</span>
                  <span>🥗 Dietitian |</span>
                  <span>🧘 Yoga Teacher</span>
                </div>
                <div>💪 Follow me to learn secrets of weight loss & intermittent fasting</div>
                <div>📚 Plans, Courses & Services</div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-600">🔗 strongbyyoga.com/healthy-life-by-sumit...</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>👥 Fasting Champs</span>
                  <span className="text-gray-500">1K members</span>
                </div>
              </div>

              {/* Professional Dashboard */}
              <div className="bg-gray-50 rounded-lg p-2 mb-4">
                <div className="font-semibold text-xs text-gray-900">Professional dashboard</div>
                <div className="text-xs text-gray-500">3.4M views in the last 30 days</div>
              </div>

              {/* Instagram Badge */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Instagram className="w-4 h-4" />
                  <span>130K+ Followers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Sumit Sharma
              </h3>
              <p className="text-sm text-teal-600 font-medium mb-4">
                Certified Dietitian | Yoga Teacher | Lifestyle Coach | Intermittent Fasting Expert | Founder: Svastha
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-lg">⭐</span>
                <span className="text-sm font-semibold text-gray-700">Get trained by the best</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Sumit is a well-accomplished name in the wellness industry. With an impressive experience of over{" "}
                <span className="font-bold">10 years</span>, he has successfully helped{" "}
                <span className="font-bold">thousands of people</span> transform their life. He is known for his work in holistic lifestyle changes and all-natural solutions.
              </p>
            </div>

            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold px-8 py-6 rounded-lg text-base shadow-lg hover:shadow-xl transition-all duration-300">
                Register Now - Learn from Sumit
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
