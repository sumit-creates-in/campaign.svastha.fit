import { useEffect, useState } from "react";
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

const Global21DayWeightLossChallenge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: "Global 21 Day Weight Loss Challenge | Lose up to 10 Kg | Svastha",
    description: "Join the Global 21 Day Weight Loss Challenge in UAE. 4067+ transformations, 7.5 kg average loss, 98% success rate. Expert guidance, diet plans, yoga classes. Register for 39 AED.",
    ogTitle: "Global 21 Day Weight Loss Challenge | Svastha",
    ogDescription: "Transform your body in 21 days. Proven system with 4067+ success stories. Diet plan + Yoga + WhatsApp support. Register now for 39 AED.",
    ogImage: "/src/assets/hero-yoga.jpg",
  });

  const scrollToRegistration = () => {
    setIsModalOpen(true);
  };

  const handleUpgrade = () => {
    setIsModalOpen(false);
    toast.error("Payment link is currently empty for the Global page.");
  };

  const handleJoinGroup = () => {
    setIsModalOpen(false);
    toast.error("Payment link is currently empty for the Global page.");
  };

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
        <HeroSection scrollToRegistration={scrollToRegistration} feeText="49 AED" />
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
        <RegisterHereSection onRegister={scrollToRegistration} originalPrice="149 AED" discountedPrice="49 AED" />
        <div style={{ height: "150px" }} />
        <FAQSection />
        <UpgradeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
          upgradeUrl=""
          joinGroupUrl=""
          upgradePriceText="149 AED"
          groupPriceText="49 AED"
        />
        <ScrollPopupModal
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
          upgradeUrl=""
          joinGroupUrl=""
          personalDiscountText="20 AED off"
          personalPriceText="129 AED"
          groupDiscountText="10 AED off"
          groupPriceText="39 AED"
        />
        <StickyBottomBar onRegisterClick={scrollToRegistration} feeText="49 AED" />
        <WhatsAppFloatingButton />
      </div>
    </>
  );
};

export default Global21DayWeightLossChallenge;
