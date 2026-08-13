import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";

// Import all sections
import {
  HeroSection,
  LeaderboardSection,
  JyotiTestimonialSection,
  HowItWorksSection,
  AanchalTestimonialSection,
  WhatYouGetSection,
  MeetYourMentorSection,
  MoreMentorsSection,
  BenefitsSection,
  TransformationsSection,
  WhoIsThisForSection,
  YogaTeachersSection,
  RegisterHereSection,
  FAQSection,
  UpgradeModal,
  ScrollPopupModal,
  StickyBottomBar,
  WhatsAppFloatingButton,
} from "@/components/challenge";
import transformation1 from "@/assets/tranformation1.jpeg";
import transformation2 from "@/assets/tranformation2.jpeg";
import transformation3 from "@/assets/tranformation3.jpeg";
import transformation4 from "@/assets/tranformation4.jpeg";
import transformation5 from "@/assets/tranformation5.jpeg";
import transformation6 from "@/assets/tranformation6.jpeg";
import transformation8 from "@/assets/tranformation8.jpeg";
import transformation9 from "@/assets/tranformation9.jpeg";

const transformation = [
  {
    image: transformation5,
    text: "Now I can eat without any tension and enjoy my life. My fatty liver and hypertension are also cured now. Amazing experience. - Ravikant",
  },
  {
    image: transformation8,
    text: "With Sir's guidance, I have lost 20 kg so far and have been maintaining it for the last 6 months. Thank you Sumit Sir. - Sumit",
  },
  {
    image: transformation2,
    text: "Lost 15 kilos without following any strict diet, just ate well and enjoyed life. Thank you Sumit Sir. - Vijay",
  },
  {
    image: transformation1,
    text: "Explained very well and helped me follow through. I didn't even realize I was on a diet. Everyone is amazed that I lost weight while eating everything. This is a great program.",
  },
  {
    image: transformation3,
    text: "I lost 25 kg just by following the golden rules without any strict diet. Thank you Sumit Sir!!! - Namrata",
  },
  {
    image: transformation4,
    text: "Got the results in just 21 days. So happy to have joined this program. - Aditi",
  },
  {
    image: transformation6,
    text: "The journey from 95 kg to 60 kg was not just weight loss for me, it was a complete life change.",
  },
  {
    image: transformation9,
    text: "Lost 12 kg's with the help of Sumit's teachings. Best decision ever. - Rabiya",
  },
];

function detectUserLocation(): Promise<{ country: string }> {
  return new Promise((resolve) => {
    // Try to get timezone-based location
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Check for India
      if (tz.includes("Asia/Kolkata") || tz.includes("Asia/Calcutta")) {
        resolve({ country: "IN" });
        return;
      }

      // Check for UAE
      if (tz.includes("Asia/Dubai")) {
        resolve({ country: "AE" });
        return;
      }

      // Default to international
      resolve({ country: "OTHER" });
    } catch {
      resolve({ country: "OTHER" });
    }
  });
}

const Ultimate21DayChallenge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrollModalOpen, setIsScrollModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isStartPage = pathname === "/Ultimate-21-day-weight-loss-challenge-Start";

  useEffect(() => {
    // Check if user should be redirected based on location
    const checkAndRedirect = async () => {
      const location = await detectUserLocation();

      if (location.country === "AE") {
        // Redirect to UAE page
        navigate("/global-21-day-weight-loss-challenge", { replace: true });
      } else if (location.country === "OTHER") {
        // Redirect to international page
        navigate("/international-21-day-weight-loss-challenge", { replace: true });
      } else {
        // Stay on this page for India
        setShouldRedirect(false);
      }
    };

    checkAndRedirect();
    window.scrollTo(0, 0);
  }, [navigate]);

  useMeta({
    title: "Ultimate 21 Day Weight Loss Challenge | Lose up to 10 Kg | Svastha",
    description: "Join the Ultimate 21 Day Weight Loss Challenge. 4067+ transformations, 7.5 kg average loss, 98% success rate. Expert guidance, diet plans, yoga classes. Register for ₹890.",
    ogTitle: "Ultimate 21 Day Weight Loss Challenge | Svastha",
    ogDescription: "Transform your body in 21 days. Proven system with 4067+ success stories. Diet plan + Yoga + WhatsApp support. Register now for ₹890.",
    ogImage: "/src/assets/hero-yoga.jpg",
  });

  const scrollToRegistration = () => {
    setIsModalOpen(true);
  };

  const handleUpgrade = () => {
    setIsModalOpen(false);
    toast.success("Redirecting to upgrade payment...");
    window.open("https://pages.razorpay.com/pl_PERSONALIZED21DAY/view", "_blank");
  };

  const handleJoinGroup = () => {
    setIsModalOpen(false);
    const paymentUrl = `https://pages.razorpay.com/pl_CHALLENGE21DAY/view`;
    toast.success("Redirecting to payment...");
    window.open(paymentUrl, "_blank");
  };

  // Show loading or nothing while redirecting
  if (shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
        <WhatsAppFloatingButton showImmediately={true} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1);
          }
        }
        
        .ultimate-challenge-page button {
          animation: heartbeat 1s ease-in-out infinite;
        }
        
        .ultimate-challenge-page button[aria-expanded],
        .ultimate-challenge-page button.no-heartbeat {
          animation: none;
        }
      `}</style>
      <div className="ultimate-challenge-page min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-x-hidden">
        <HeroSection scrollToRegistration={scrollToRegistration} showLanguageToggle={true} />
        <div style={{ height: "150px" }} />
        {isStartPage && (
          <AanchalTestimonialSection
            heading="Watch Sumit's Amazing Transformation"
            videoUrl="https://www.youtube.com/embed/lyo56Iu67_M"
          />
        )}
        <div style={{ height: "150px" }} />
        <LeaderboardSection />

        <div style={{ height: "10px" }} />
        {(!isStartPage &&
          <JyotiTestimonialSection
          />
        )}

        <div style={{ height: "150px" }} />
        {isStartPage && (
          <TransformationsSection
            transformations={transformation}
          />
        )}

        <div style={{ height: "150px" }} />
        {isStartPage && (
          <AanchalTestimonialSection
            heading="Rajesh ji Lost 4 Kg's in Just 7 Days 🤩"
            videoUrl="https://www.youtube.com/embed/LVHVl5kHhgI"
          />
        )}

        {!isStartPage && (
          <AanchalTestimonialSection />
        )}

        <div style={{ height: "150px" }} />
        <HowItWorksSection />
        <div style={{ height: "150px" }} />
        <WhatYouGetSection scrollToRegistration={scrollToRegistration} isUltimate={true} />
        <div style={{ height: "150px" }} />
        <MeetYourMentorSection scrollToRegistration={scrollToRegistration} />
        <div style={{ height: "150px" }} />
        <MoreMentorsSection />
        <div style={{ height: "150px" }} />
        <BenefitsSection />
        <div style={{ height: "150px" }} />
        <TransformationsSection />
        <div style={{ height: "150px" }} />
        <WhoIsThisForSection />
        <div style={{ height: "150px" }} />
        <YogaTeachersSection />
        <div style={{ height: "150px" }} />
        <RegisterHereSection onRegister={scrollToRegistration} />
        <div style={{ height: "150px" }} />
        <FAQSection />
        <UpgradeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
          startDateText="30th August 2026"
        />
        <ScrollPopupModal
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
          startDateText="30th August 2026"
          onVisibilityChange={setIsScrollModalOpen}
        />
        <StickyBottomBar onRegisterClick={scrollToRegistration} />
        <WhatsAppFloatingButton showImmediately={true} isModalOpen={isModalOpen || isScrollModalOpen} />
      </div>
    </>
  );
};

export default Ultimate21DayChallenge;
