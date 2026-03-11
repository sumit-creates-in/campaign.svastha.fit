const FastestTransformationsSection = () => {
  const transformations = [
    {
      beforeImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      testimonial: "Maine apni problem solve karne ke liye 23 kg ka weight loss kiya aur bina kisi strict diet ki. Thank you Sumit Sir. - Ravikant"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=400&fit=crop",
      testimonial: "Ab me bina kisi tension k khana kha sakta hun agni jile enjoy kar sakta hun, mera fatty liver or hypertension bhi ab theek ho gaya hai. Amazing experience. - Ravikant"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      testimonial: "Pahle baat ka plan me ache se follow kar paaya hu ye plan ima season bhi ki gaya hi nahi, chalta hai result bhi milne lag jaate hai, maine 14 kilo wazam kam kar liya 6 or ab sabhi mujhse poochte hain. - Minalini"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Svastha Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SVASTHA</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-12">
          Fastest Weight Loss Transformations🔥
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {transformations.map((transformation, index) => (
            <div key={index} className="text-center">
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <img 
                    src={transformation.beforeImage} 
                    alt="Before transformation"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <img 
                    src={transformation.afterImage} 
                    alt="After transformation"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                {transformation.testimonial}
              </p>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default FastestTransformationsSection;