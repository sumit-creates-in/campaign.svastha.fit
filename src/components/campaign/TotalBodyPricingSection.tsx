import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";

const TotalBodyPricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"group" | "vip">("group");

  const groupFeatures = [
    "21 Day Structured Fat Loss Plan",
    "Weekly Community Diet Plan",
    "Live Yoga & Workout Sessions",
    "Weekly Fat Loss Coaching Sessions",
    "Private Community Support Group",
    "Habit Tracking System",
    "Weekly Progress Review",
    "Access to recorded sessions"
  ];

  const vipFeatures = [
    "Dedicated Personal Dietitian",
    "Weekly Personalized Diet Plan",
    "Call & Chat Support",
    "Customized Diet Plan",
    "Weekly 1-on-1 Check-ins",
    "Live Yoga & Workout Sessions",
    "Weekly Fat Loss Coaching Sessions",
    "Private Community Support Group",
    "Habit Tracking System",
    "Weekly Progress Review",
    "Access to recorded sessions"
  ];

  const handlePlanSelect = (plan: "group" | "vip") => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="block md:inline">Ultimate</span>{" "}
            <span className="block md:inline">21 Day</span>{" "}
            <span className="block md:inline">Weight Loss</span>{" "}
            <span className="block md:inline">Challenge</span>
          </h2>
          <p className="text-2xl md:text-3xl text-orange-500 font-bold">
            Your Real Transformation Begins Now
          </p>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mt-4">
            Starts 5th April
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Group Plan */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-all duration-300">
            <div className="bg-gray-600 text-white p-8 text-center">
              <h3 className="text-3xl font-bold mb-2">Group Transformation Plan</h3>
              <p className="text-lg opacity-90">Best for structured guidance & motivation</p>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-start justify-center gap-1">
                  <span className="text-3xl text-gray-700 mt-2">₹</span>
                  <span className="text-7xl font-bold text-gray-800">790</span>
                  <span className="text-3xl text-gray-700 mt-2">/-</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {groupFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => window.open('https://rzp.io/rzp/XWdFe1DR', '_blank')}
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Pay Now
              </Button>
            </div>
          </div>

          {/* VIP Plan */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-pink-300 hover:border-pink-500 transition-all duration-300 relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white p-8 text-center">
              <h3 className="text-3xl font-bold mb-2">Personalise Transformation Plan</h3>
              <p className="text-lg opacity-90">Faster results with personal support</p>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-start justify-center gap-1">
                  <span className="text-3xl text-gray-700 mt-2">₹</span>
                  <span className="text-7xl font-bold text-gray-800">2790</span>
                  <span className="text-3xl text-gray-700 mt-2">/-</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {vipFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => window.open('https://rzp.io/rzp/MAAYbWOe', '_blank')}
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        buttonText={`Proceed to Payment - ₹${selectedPlan === "group" ? "4999" : "7999"}`}
        modalTitle="Registration Details"
      />
    </section>
  );
};

export default TotalBodyPricingSection;
