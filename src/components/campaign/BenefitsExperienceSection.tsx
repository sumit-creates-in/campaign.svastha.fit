import { Check } from "lucide-react";

const BenefitsExperienceSection = () => {
  const benefits = [
    "Healthy natural weight loss",
    "Reduced belly fat",
    "Increased energy",
    "Better digestion",
    "Improved flexibility",
    "Better sleep",
    "Reduced sugar cravings",
    "Improved mental clarity"
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Benefits You Will Experience
        </h2>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-lg text-gray-700 font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsExperienceSection;
