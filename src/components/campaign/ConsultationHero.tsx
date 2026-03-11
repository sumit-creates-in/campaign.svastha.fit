import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";
import sumitSharmaImage from "@/assets/sumit sharma.png";

const ConsultationHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden bg-orange-400 shadow-lg">
            <img 
              src={sumitSharmaImage} 
              alt="Sumit Sharma" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Looking for
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="text-blue-900">Natural</span>
            <span className="text-green-600">🌿</span>
            <span className="text-gray-900"> & </span>
            <span className="text-blue-900">Sustainable</span>
            <span className="text-green-600">🌱</span>
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-8">
            Weight Loss?
          </h3>

          {/* Divider */}
          <div className="w-32 h-1 bg-gray-300 mx-auto mb-8"></div>

          {/* Secondary Heading */}
          <h4 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Want to Lose Weight by Eating
          </h4>
          <h5 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-blue-900">Normal Food like </span>
            <span className="text-orange-600">Daal</span>
            <span className="text-orange-400">🍛</span>
            <span className="text-blue-900"> Rice</span>
            <span className="text-red-500">🍚</span>
          </h5>
          <h6 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
            <span className="text-blue-900">& </span>
            <span className="text-green-600">Sabji</span>
            <span className="text-green-400">🥬</span>
            <span className="text-blue-900"> Roti</span>
            <span className="text-orange-400">🫓</span>
            <span className="text-blue-900">?</span>
          </h6>

          {/* Divider */}
          <div className="w-32 h-1 bg-gray-300 mx-auto mb-8"></div>

          {/* Call to Action Text */}
          <h7 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Serious About Taking Charge of
          </h7>
          <p className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Your Health <span className="text-orange-500">💪</span>
          </p>
          <p className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
            & Life <span className="text-yellow-500">✨</span> ?
          </p>

          <p className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
            Then Book an Appointment with
          </p>
          <p className="text-2xl md:text-3xl font-bold text-blue-900 mb-12">
            Me RIGHT NOW <span className="text-blue-600">🚀</span>
          </p>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <h8 className="text-xl md:text-2xl font-bold text-green-600 mb-4">
              Weight Loss Consultation
            </h8>
            <p className="text-sm text-gray-600 mb-4">Fee: Rs. 99/- Only</p>
            <p className="text-xs text-gray-500 mb-6">✅ 100% Genuine</p>
            
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg font-semibold rounded-full shadow-lg"
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

export default ConsultationHero;