import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";

const ConsultationFinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Serious About Taking Charge of
          </h2>
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
            <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-4">
              Weight Loss Consultation
            </h3>
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

export default ConsultationFinalCTA;