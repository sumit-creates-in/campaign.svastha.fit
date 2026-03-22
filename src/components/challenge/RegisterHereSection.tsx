import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";

interface RegisterHereSectionProps {
  onRegister: () => void;
}

export const RegisterHereSection = ({ onRegister }: RegisterHereSectionProps) => {
  return (
    <section id="registration" className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-2xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Register here
          </h2>
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-xs mx-auto">
          {/* Green Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-6 px-6">
            <h3 className="text-lg font-bold">Ultimate 21 Day Weight Loss</h3>
            <p className="text-sm font-semibold">Challenge</p>
          </div>

          {/* Card Content */}
          <div className="p-6 py-8">
            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg text-red-400 line-through font-medium">₹ 2900/-</span>
                <span className="text-2xl font-bold text-gray-900">₹ 990/-</span>
                <span className="text-gray-600 font-medium">only</span>
              </div>
              <p className="text-xs text-gray-600">All Inclusive</p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {[
                "Live Session with Sumit",
                "Detailed Diet Plan",
                "Intermittent Fasting Plan",
                "Live Yoga & Workout Classes",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" strokeWidth={2.5} />
                  <p className="text-sm text-gray-800">{feature}</p>
                </div>
              ))}
            </div>

            {/* Register Button */}
            <Button
              onClick={onRegister}
              className="w-full bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-xl px-12 md:px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4">
              Register Now
            </Button>

            {/* People Joined */}
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <p className="text-xs font-medium">6733 people joined</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
