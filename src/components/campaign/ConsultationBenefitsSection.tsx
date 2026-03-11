const ConsultationBenefitsSection = () => {
  const benefits = [
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      title: "100% Healthy, Natural Fat Loss"
    },
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      title: "Lose Inches Like Magic"
    },
    {
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      title: "Fight Type 2 Diabetes, PCOS, Hypothyriod, Hypertension, Fatty Liver, Uric Acid etc."
    },
    {
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      title: "Feel Lighter, Brighter and Faster"
    },
    {
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      title: "Naturally Detox and Cleanse Your Body"
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      title: "Learn the Right Way to Cook & Eat Food"
    },
    {
      image: "https://images.unsplash.com/photo-1506629905607-45c9e0e3d9b7?w=400&h=300&fit=crop",
      title: "Get Rid of Your Cravings & Food Addiction"
    },
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      title: "Build Habits that will Help You Stay Healthy, Fit Forever"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-400 to-green-500">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Benefits We Promise
        </h2>
        
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-32 h-32 md:h-24 flex-shrink-0">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                  />
                </div>
                <div className="flex-1 p-6 md:p-4 text-center md:text-left">
                  <p className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">
                    {benefit.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationBenefitsSection;