import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";
import { BeforeAfterDashboardCard } from "@/components/gamification/BeforeAfterDashboardCard";
import sumitSharmaImage from "@/assets/sumit sharma.png";
import svasthaLogo from "@/assets/svastha.png";
import { ChartBarIcon, MessageCircle } from "lucide-react";

const FourteenDayHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Side - Svastha */}
              <div className="text-center flex-1">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-white flex items-center justify-center p-2">
                  <img
                    src={svasthaLogo}
                    alt="Svastha"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  Sustainable Weight<br />Loss Naturally
                </h2>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  India's #1 holistic health<br />
                  platform for weight loss<br />
                  & reversing chronic<br />
                  diseases
                </p>
              </div>

              {/* Right Side - Sumit Sharma */}
              <div className="text-center flex-1 mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full overflow-hidden bg-orange-400 flex items-center justify-center">
                  <img
                    src={sumitSharmaImage}
                    alt="Sumit Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Sumit Sharma</h2>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Founder of Svastha |<br />
                  Yoga Teacher | Dietitian<br />
                  | Intermittent Fasting<br />
                  Expert
                </p>
              </div>
            </div>
          </div>

          {/* Real Transformations */}
          <div className="mb-8">
            <BeforeAfterDashboardCard />
          </div>

          {/* YouTube Video */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                src="https://www.youtube.com/embed/0zkAOy4AP38"
                title="Inspiring Transformations"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Text */}
          <div className="text-center mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-6">
              For Effective, Affordable Weight Loss
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 max-w-md mx-auto mb-8">
            {/* Most Popular Badge + 14 Day Challenge Button */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                Most Popular
              </div>
              <Button
                onClick={() => navigate('/14-Day-Yoga-Fat-Loss-Camp')}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg"
              >
                🔥 14 Day Weight Loss Challenge
              </Button>
            </div>

            {/* Consultation Button */}
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-600 mb-3">For Exclusive, Faster Weight Loss</p>
              <Button
                onClick={() => window.location.href = 'https://strongbyyoga.com/weight-loss-consultation-with-expert/'}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg"
              >
                ✓ Weight Loss Consultation with Expert
              </Button>
            </div>

            {/* Instagram Button */}
            <div className="text-center" style={{ marginBottom: '50px' }}>
              <p className="text-xs md:text-sm text-gray-600 mb-3">Follow Sumit Sharma on Instagram</p>
              <Button
                onClick={() => window.open('https://www.instagram.com/sumit_sharma_coach?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg"
              >
                Follow Sumit on Instagram
              </Button>
            </div>
          </div>
        </div>

        {/* Fixed Chat Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white py-3 z-50">
          <div className="container mx-auto text-center">
            <Button
              onClick={() => window.open('https://api.whatsapp.com/send/?phone=917208683034&text&type=phone_number&app_absent=0', '_blank')}
              className="bg-white text-green-500 hover:bg-gray-100 font-bold px-6 py-2 rounded-full"
            >
              <MessageCircle />
              Chat with Us
            </Button>
          </div>
        </div>
      </section>

      <RegistrationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default FourteenDayHero;