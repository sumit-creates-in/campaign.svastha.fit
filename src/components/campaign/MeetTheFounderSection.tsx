import sumitSharmaImage from "@/assets/sumit sharma.png";

const MeetTheFounderSection = () => {
  const achievements = [
    {
      title: "WEIGHT LOSS EXPERT",
      description: "Helped 10,000+ people lose weight naturally without dieting or going to gym"
    },
    {
      title: "CERTIFIED YOGA TEACHER",
      description: "200 Hour Yoga Teacher Training Certificate from Yoga Alliance USA"
    },
    {
      title: "INTERMITTENT FASTING EXPERT",
      description: "Helped people reverse diabetes, PCOS, thyroid & other lifestyle diseases"
    },
    {
      title: "DIETITIAN",
      description: "Certified Dietitian & Nutritionist with 8+ years of experience"
    },
    {
      title: "AUTHOR",
      description: "Written multiple books on weight loss, yoga & intermittent fasting"
    },
    {
      title: "FEATURED IN MEDIA",
      description: "Featured in Times of India, Hindustan Times, DNA & other leading newspapers"
    },
    {
      title: "SPEAKER",
      description: "Conducted 500+ workshops & seminars on weight loss & healthy living"
    },
    {
      title: "COACH",
      description: "Personal coach to celebrities, politicians & business leaders"
    },
    {
      title: "ENTREPRENEUR",
      description: "Founder of Svastha - India's #1 holistic health platform"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-12">
          Meet the Founder
        </h2>
        
        <div className="text-center mb-12">
          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-orange-400 shadow-lg">
            <img 
              src={sumitSharmaImage} 
              alt="Sumit Sharma" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">SUMIT SHARMA</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sumit Sharma is India's leading Weight Loss Expert | Yoga Teacher | Dietitian | Intermittent Fasting Expert & Founder of Svastha
          </p>
        </div>

        <div className="mb-12">
          <h4 className="text-xl font-bold text-center text-gray-800 mb-8">
            Credentials & Expertise
          </h4>
          <p className="text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
            With over 8 years of experience in the health and wellness industry, Sumit has transformed the lives of more than 10,000 people through his unique approach to natural weight loss. His methods combine ancient yoga wisdom with modern nutritional science to create sustainable, long-term results without extreme dieting or expensive gym memberships.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-bold text-center text-green-600 mb-8">
            Who is this for?
          </h4>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">✓</span>
              </div>
              <h5 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                {achievement.title}
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheFounderSection;