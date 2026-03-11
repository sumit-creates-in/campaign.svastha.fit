import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";
import sumitSharmaImage from "@/assets/sumit sharma.png";

const ConsultationTransformationsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transformations = [
    {
      beforeImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      testimonial: "Ab me bina kisi tension k khana kha sakta hun agni jile enjoy kar sakta hun, mera fatty liver or hypertension bhi ab theek ho gaya hai. Amazing experience. - Ravikant"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=400&fit=crop",
      testimonial: "Pahle baat ka plan me ache se follow kar paaya hu ye plan ima season bhi ki gaya hi nahi, chalta hai result bhi milne lag jaate hai, maine 14 kilo wazam kam kar liya 6 or ab sabhi mujhse poochte hain. - Minalini"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      testimonial: "Sir ki guidance me maine ab tak 20 kg wazam liya or ye profile 6 mahine se isa maintain khi ki Thank you Sumit Sir. - Sumit"
    }
  ];

  return (
    <>
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Svastha Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SVASTHA</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-12">
            Fastest Weight Loss Transformations🔥
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
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

          {/* Bottom Section */}
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            {/* Profile Image */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden bg-orange-400 shadow-lg">
              <img 
                src={sumitSharmaImage} 
                alt="Sumit Sharma" 
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Looking for
            </h3>
            <h4 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-blue-900">Natural</span>
              <span className="text-green-600">🌿</span>
              <span className="text-gray-900"> & </span>
              <span className="text-blue-900">Sustainable</span>
              <span className="text-green-600">🌱</span>
            </h4>

            <p className="text-sm text-gray-600 mb-4">Fee: Rs. 99/- Only</p>
            <p className="text-xs text-gray-500 mb-6">✅ 100% Genuine</p>
            
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
            >
              Book Call with Us
            </Button>
          </div>
        </div>
      </section>

      <RegistrationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default ConsultationTransformationsSection;