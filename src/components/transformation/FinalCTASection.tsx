import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Transformation
            <span className="block mt-2">Starts Today</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            If you have already taken the first step during the challenge,
            <span className="block mt-2 font-semibold">
              this is your chance to complete your transformation.
            </span>
          </p>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {[
              "Proven System",
              "Expert Guidance",
              "Lasting Results"
            ].map((prop, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircle2 className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-semibold">{prop}</p>
              </div>
            ))}
          </div>

          <p className="text-xl text-white font-semibold mb-8">
            Choose your plan and begin your 12 Week Total Body Transformation Journey
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-bold group"
              onClick={() => window.open("https://wa.me/919999999999?text=I'm interested in the Group Transformation Plan", "_blank")}
            >
              Join Group Transformation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-bold group border-2 border-white/30"
              onClick={() => window.open("https://wa.me/919999999999?text=I'm interested in the VIP Transformation Plan", "_blank")}
            >
              Join VIP Transformation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Line */}
          <p className="mt-8 text-white/80 text-sm">
            🔒 Secure enrollment • 💯 Satisfaction guaranteed • 🎯 Results-focused approach
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
