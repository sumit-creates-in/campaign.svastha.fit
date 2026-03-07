import { BookOpen, Video, Brain, Gift } from "lucide-react";

const BonusesSection = () => {
  const bonuses = [
    {
      icon: BookOpen,
      title: "Fat Loss Recipe Guide",
      description: "50+ delicious, easy-to-make recipes designed for fat loss and optimal nutrition",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Video,
      title: "Home Yoga Practice Library",
      description: "Complete video library of yoga sequences you can practice anytime, anywhere",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Brain,
      title: "Mindful Eating Masterclass",
      description: "Learn the psychology of eating and how to build a healthy relationship with food",
      color: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Gift className="w-4 h-4" />
              <span>Exclusive Bonuses</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Exclusive Bonuses
            </h2>
            <p className="text-xl text-emerald-600 font-semibold">
              For Challenge Participants
            </p>
          </div>

          {/* Bonuses Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {bonuses.map((bonus, index) => {
              const Icon = bonus.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-emerald-200"
                >
                  {/* Icon */}
                  <div className={`bg-gradient-to-br ${bonus.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Bonus Number */}
                  <div className="text-sm font-bold text-emerald-600 mb-2">
                    BONUS {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {bonus.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {bonus.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Special Note */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-800">
              <span className="font-bold text-amber-700">🎁 Special Gift:</span> These bonuses are available{" "}
              <span className="font-bold text-gray-900">only for 21 Day Challenge participants</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusesSection;
