import { Button } from "@/components/ui/button";
import { Check, Crown, Users } from "lucide-react";

const ProgramOptionsSection = () => {
  const groupFeatures = [
    "12 Weeks Structured Fat Loss Plan",
    "Live Yoga & Workout Sessions",
    "Weekly Fat Loss Coaching Sessions",
    "Private Community Support Group",
    "Habit Tracking System",
    "Monthly Progress Review",
    "Access to recorded sessions"
  ];

  const vipFeatures = [
    "Dedicated Personal Dietitian",
    "Customized Diet Plan",
    "Weekly 1-on-1 Check-ins",
    "Personalized diet adjustments",
    "Direct WhatsApp support",
    "Plate-by-plate nutrition guidance"
  ];

  return (
    <section id="program-options" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Choose Your
          </h2>
          <p className="text-xl text-center text-emerald-600 font-semibold mb-16">
            Transformation Path
          </p>

          {/* Options Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Group Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Group Transformation Plan</h3>
                  <p className="text-sm text-gray-600">Best for structured guidance and motivation</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="font-semibold text-gray-900 mb-4">Includes:</p>
                <div className="space-y-3">
                  {groupFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Results */}
              <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-emerald-800 mb-1">Expected Results:</p>
                <p className="text-lg font-bold text-emerald-900">Lose 5–8 kg in 12 weeks</p>
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("https://wa.me/919999999999?text=I'm interested in the Group Transformation Plan", "_blank")}
              >
                Join Group Transformation
              </Button>
            </div>

            {/* VIP Plan */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border-2 border-purple-300 relative transform lg:scale-105">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6 mt-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">VIP Transformation Plan</h3>
                  <p className="text-sm text-purple-700 font-semibold">Most Powerful - Faster Results</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="font-semibold text-gray-900 mb-3">Everything in Group Plan plus:</p>
                <div className="space-y-3">
                  {vipFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Results */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6 border border-purple-200">
                <p className="text-sm font-semibold text-purple-800 mb-1">Expected Results:</p>
                <p className="text-lg font-bold text-purple-900">Lose 8–12 kg in 12 weeks</p>
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open("https://wa.me/919999999999?text=I'm interested in the VIP Transformation Plan", "_blank")}
              >
                Join VIP Transformation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramOptionsSection;
