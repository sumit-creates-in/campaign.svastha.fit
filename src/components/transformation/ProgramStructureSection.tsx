import { Sprout, Flame, Trophy } from "lucide-react";

const ProgramStructureSection = () => {
  const phases = [
    {
      icon: Sprout,
      weeks: "Week 1–4",
      title: "Foundation Phase",
      description: "Build consistency with yoga, movement and mindful eating.",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Flame,
      weeks: "Week 5–8",
      title: "Fat Burning Phase",
      description: "Accelerate fat loss and improve stamina.",
      color: "orange",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Trophy,
      weeks: "Week 9–12",
      title: "Transformation Phase",
      description: "Lock in habits and shape your new lifestyle.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Your 12 Week
          </h2>
          <p className="text-xl text-center text-emerald-600 font-semibold mb-16">
            Transformation Journey
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-orange-200 to-purple-200"></div>

            {/* Phases Grid */}
            <div className="grid md:grid-cols-3 gap-8 relative">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="relative">
                    {/* Phase Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-emerald-200">
                      {/* Icon */}
                      <div className={`bg-gradient-to-br ${phase.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Week Range */}
                      <div className={`inline-block bg-${phase.color}-50 text-${phase.color}-700 px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                        {phase.weeks}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {phase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {phase.description}
                      </p>

                      {/* Phase Number */}
                      <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Arrow - Mobile */}
                    {index < phases.length - 1 && (
                      <div className="md:hidden flex justify-center my-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-emerald-300 to-emerald-400"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramStructureSection;
