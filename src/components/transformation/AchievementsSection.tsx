import { Target, Zap, Heart, TrendingDown, Activity, Sparkles } from "lucide-react";

const AchievementsSection = () => {
  const achievements = [
    {
      icon: TrendingDown,
      text: "Lose 5–12 kg of body fat safely",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: Activity,
      text: "Improve flexibility and mobility",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Heart,
      text: "Build daily healthy habits",
      color: "text-pink-600",
      bg: "bg-pink-50"
    },
    {
      icon: Target,
      text: "Reduce belly fat and inches",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: Zap,
      text: "Improve energy and metabolism",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      icon: Sparkles,
      text: "Feel stronger and more confident in your body",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            What You Can Achieve
          </h2>
          <p className="text-xl text-center text-emerald-600 font-semibold mb-12">
            In The Next 12 Weeks
          </p>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`${achievement.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${achievement.color}`} />
                  </div>
                  <p className="text-lg font-medium text-gray-800 leading-relaxed">
                    {achievement.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
