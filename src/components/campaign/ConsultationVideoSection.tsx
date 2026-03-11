import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";

const ConsultationVideoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
                Weight Loss That Stays With You Forever
              </h2>
              <p className="text-lg text-orange-600 font-semibold mb-8">
                1-on-1 Consultation With Us
              </p>
              
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg mb-4"
              >
                Book 30 min. Call with Us
              </Button>
              
              <p className="text-sm text-gray-600 mb-2">Fee: Rs. 99/- Only</p>
              <p className="text-xs text-gray-500">✅ 100% money-back</p>
            </div>

            {/* Right Side - Video */}
            <div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                  src="https://www.youtube.com/embed/0zkAOy4AP38"
                  title="Why book an appointment with me?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default ConsultationVideoSection;