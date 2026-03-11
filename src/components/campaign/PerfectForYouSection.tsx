import { Check } from "lucide-react";

const PerfectForYouSection = () => {
  const benefits = [
    "You want to lose weight naturally",
    "You struggle with belly fat",
    "You feel tired and low on energy",
    "You want to start yoga but don't know how",
    "You want guidance and accountability"
  ];

  const perfectFor = [
    "Working professionals",
    "Homemakers",
    "Parents",
    "Beginners"
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          This Camp Is Perfect For You If
        </h2>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-lg text-gray-700 font-semibold">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Perfect for:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {perfectFor.map((item, index) => (
                <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="font-medium text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectForYouSection;
