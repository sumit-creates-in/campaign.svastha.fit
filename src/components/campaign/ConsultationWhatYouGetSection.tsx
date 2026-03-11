import { Phone, User, FileText, Recycle, MessageCircle } from "lucide-react";

const ConsultationWhatYouGetSection = () => {
  const features = [
    {
      icon: Phone,
      title: "30 min. Direct Consultation With an Expert"
    },
    {
      icon: User,
      title: "Personalised Diet & Fasting Tips"
    },
    {
      icon: FileText,
      title: "Root Cause Analysis of Your Health Issues"
    },
    {
      icon: Recycle,
      title: "Long-Term Solution for Weight Loss & Health Issues"
    },
    {
      icon: MessageCircle,
      title: "Answer to Your Queries"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
            ✅ Here is What You Will Get
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700 leading-tight">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationWhatYouGetSection;