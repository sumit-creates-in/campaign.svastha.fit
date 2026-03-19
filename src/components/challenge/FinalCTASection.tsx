import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2 } from "lucide-react";

interface FinalCTASectionProps {
  scrollToRegistration: () => void;
}

export const FinalCTASection = ({ scrollToRegistration }: FinalCTASectionProps) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl md:text-2xl text-emerald-100 mb-8">
            Join 6733+ people who have already started their journey
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">6733+</div>
                <div className="text-emerald-100">People Joined</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">7.5 kg</div>
                <div className="text-emerald-100">Average Loss</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-emerald-100">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              <span className="text-lg">21-Day Structured Program</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              <span className="text-lg">Expert Guidance & Support</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              <span className="text-lg">Proven Results</span>
            </div>
          </div>

          <Button
            onClick={scrollToRegistration}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-2xl px-16 py-8 rounded-full shadow-2xl hover:shadow-emerald-400/50 transform hover:scale-105 transition-all duration-300">
            Join the Challenge Now
            <ChevronRight className="ml-2 w-8 h-8" />
          </Button>

          <p className="mt-6 text-emerald-100 text-lg">
            Limited spots available • Register now for just ₹990
          </p>
        </motion.div>
      </div>
    </section>
  );
};
