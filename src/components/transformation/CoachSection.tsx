import { Award, Heart, Lightbulb } from "lucide-react";

const CoachSection = () => {
  const expertise = [
    {
      icon: Heart,
      title: "Traditional yoga wisdom",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: Lightbulb,
      title: "Modern fat loss science",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      icon: Award,
      title: "Practical lifestyle coaching",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Meet Your Coach
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/src/assets/sumit sharma.png"
                  alt="Sumit Sharma - Yoga & Wellness Coach"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 border-2 border-emerald-200">
                <p className="text-sm text-gray-600">Founder of</p>
                <p className="text-xl font-bold text-emerald-600">Svastha</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sumit Sharma
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <p className="text-lg text-gray-700 font-medium">Certified Yoga Teacher</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <p className="text-lg text-gray-700 font-medium">Dietitian & Wellness Coach</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <p className="text-lg text-gray-700 font-medium">Founder of Svastha</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                He has helped <span className="font-bold text-emerald-600">thousands of people</span> transform their health through yoga, mindful nutrition and sustainable lifestyle habits.
              </p>

              {/* Approach */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100">
                <p className="font-semibold text-gray-900 mb-4">His approach blends:</p>
                <div className="space-y-4">
                  {expertise.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`${item.bg} p-3 rounded-xl`}>
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <span className="text-gray-700 font-medium">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
