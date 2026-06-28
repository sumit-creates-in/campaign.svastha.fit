import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const navigate = useNavigate();

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
        <LeaderboardSection />
        <div style={{ height: "150px" }} />
        <JyotiTestimonialSection />
        <div style={{ height: "150px" }} />
        <HowItWorksSection />
        <div style={{ height: "150px" }} />
        <AanchalTestimonialSection />
        <div style={{ height: "150px" }} />
        <WhatYouGetSection scrollToRegistration={scrollToRegistration} />
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
          startDateText="12th July 2026"
        />
        <ScrollPopupModal
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
          startDateText="12th July 2026"
        />
        <StickyBottomBar onRegisterClick={scrollToRegistration} />
        <WhatsAppFloatingButton />
      </div>
    </>
  );
};

export default Ultimate21DayChallenge;
