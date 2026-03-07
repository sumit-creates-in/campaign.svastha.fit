import { Clock, Users, AlertCircle } from "lucide-react";

const UrgencySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full animate-pulse">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Special Challenge
          </h2>
          <p className="text-xl text-center text-red-600 font-semibold mb-12">
            Participant Offer
          </p>

          {/* Content Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-red-200">
            <div className="space-y-6 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                This offer is available <span className="font-bold text-red-600">only for participants</span> of the 21 Day Weight Loss Challenge.
              </p>

              {/* Urgency Points */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
                  <Clock className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-900 text-lg mb-2">Enrollment Closes Soon</p>
                  <p className="text-gray-600 text-sm">Don't miss this limited-time opportunity</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
                  <Users className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-900 text-lg mb-2">Limited Spots Available</p>
                  <p className="text-gray-600 text-sm">To maintain personal attention and quality coaching</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 text-white">
                <p className="text-lg font-semibold mb-2">
                  ⚡ Act Now to Secure Your Spot
                </p>
                <p className="text-sm opacity-90">
                  Join now and continue your transformation journey without losing momentum
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
