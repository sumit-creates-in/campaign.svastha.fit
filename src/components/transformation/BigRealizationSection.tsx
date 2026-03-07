import { AlertCircle } from "lucide-react";

const BigRealizationSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-amber-100 p-4 rounded-full">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-8">
            Why Most People Regain Weight
            <span className="block text-amber-600 mt-2">After a Challenge</span>
          </h2>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Many people lose weight during a short challenge but gain it back later.
            </p>
            
            <p className="text-xl font-semibold text-gray-900">
              Why?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Because real body transformation requires <span className="font-semibold text-emerald-600">consistent guidance and accountability over time</span>.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl">
              <p className="text-lg text-gray-800 leading-relaxed">
                <span className="font-bold text-emerald-700">21 days</span> builds awareness.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mt-2">
                But <span className="font-bold text-emerald-700">90 days</span> builds a new body and a new identity.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed pt-4">
              The <span className="font-semibold text-gray-900">12 Week Total Body Transformation Program</span> is designed to help you lock in your progress and take your results to the next level.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigRealizationSection;
