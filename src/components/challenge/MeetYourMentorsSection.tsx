import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, Users, Grid3x3, Bookmark } from "lucide-react";
import sumitImage from "@/assets/sumit sharma.png";

interface MeetYourMentorsSectionProps {
  scrollToRegistration: () => void;
}

export const MeetYourMentorsSection = ({ scrollToRegistration }: MeetYourMentorsSectionProps) => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
            Meet Your Mentor
          </h2>
          <p className="text-base text-gray-600">Get trained by the best in the industry</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Instagram Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4">
            {/* Instagram Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-md mx-auto">
              {/* Header with username */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold text-sm">healthylife_by_sumit</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Follow
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={sumitImage} 
                  alt="Sumit Sharma" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" 
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Sumit Sharma</h3>
                  <div className="flex gap-4 text-xs text-gray-600 mb-2">
                    <span><strong>1,234</strong> posts</span>
                    <span><strong>111K</strong> followers</span>
                    <span><strong>567</strong> following</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="text-sm text-gray-700 mb-4 space-y-1">
                <p className="font-semibold">Weight Loss Expert | Dietitian</p>
                <p>🧘‍♂️ Yoga Teacher & Lifestyle Coach</p>
                <p>📍 Helping people transform their lives</p>
                <p>💪 10+ years of experience</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs font-semibold">
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs font-semibold">
                  Email
                </Button>
              </div>

              {/* Stats Icons */}
              <div className="flex justify-around border-t pt-4">
                <Grid3x3 className="w-6 h-6 text-gray-600" />
                <Users className="w-6 h-6 text-gray-400" />
                <Bookmark className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Followers Badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg">
                <Instagram className="w-5 h-5" />
                <span className="font-bold text-sm">130K+ Instagram Followers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 flex flex-col justify-center h-full">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Sumit Sharma
              </h3>
              <p className="text-base text-emerald-600 font-semibold mb-4">
                Certified Dietitian | Yoga Teacher | Lifestyle Coach
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Sumit is a well accomplished name in the wellness industry with over 10 years of experience. 
                He has helped thousands of people achieve their weight loss goals through his proven methods 
                combining intermittent fasting, yoga, and personalized diet plans. His approach focuses on 
                sustainable lifestyle changes rather than quick fixes.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                With 130K+ followers on Instagram, Sumit has built a community of health enthusiasts who 
                trust his expertise and guidance. Join the challenge and learn directly from one of India's 
                most trusted wellness coaches.
              </p>
            </div>

            <Button
              onClick={scrollToRegistration}
              className="bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-semibold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
              Register Now - Learn from Sumit
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
