import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const TransformationHero = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("program-options");
    pricingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200')] bg-cover bg-center opacity-15"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>For 21 Day Challenge Participants</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
            Your Real Transformation
            <span className="block text-emerald-600 mt-2">Begins Now</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            You started your journey in the 21 Day Weight Loss Challenge.
            <span className="block mt-2 font-semibold text-gray-900">
              Now it's time to complete your transformation in the next 12 weeks.
            </span>
          </p>

          {/* Benefits List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8 animate-fade-in">
            <p className="text-lg font-semibold text-gray-900 mb-6">This program is designed to help you:</p>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {[
                "Burn stubborn body fat",
                "Build strength and flexibility",
                "Reset your eating habits",
                "Create a healthy lifestyle that lasts for life"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToPricing}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
          >
            Join the 12 Week Transformation Now
          </Button>

          {/* Trust Line */}
          <p className="mt-6 text-sm text-gray-600 animate-fade-in">
            ✨ Trusted by thousands of students coached by Sumit Sharma
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationHero;
