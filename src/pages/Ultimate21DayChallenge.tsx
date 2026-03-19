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
} from "@/components/challenge";

const Ultimate21DayChallenge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: "Ultimate 21 Day Weight Loss Challenge | Lose up to 10 Kg | Svastha",
    description: "Join the Ultimate 21 Day Weight Loss Challenge. 4067+ transformations, 7.5 kg average loss, 98% success rate. Expert guidance, diet plans, yoga classes. Register for ₹990.",
    ogTitle: "Ultimate 21 Day Weight Loss Challenge | Svastha",
    ogDescription: "Transform your body in 21 days. Proven system with 4067+ success stories. Diet plan + Yoga + WhatsApp support. Register now for ₹990.",
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

  return (
    <>
      <style>{`
        .ultimate-challenge-page section {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        .ultimate-challenge-page .fixed {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        .ultimate-challenge-page .container {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        .ultimate-challenge-page [class*="px-"] {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        
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
      `}</style>
      <div className="ultimate-challenge-page min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-x-hidden">
        <HeroSection scrollToRegistration={scrollToRegistration} />
        <LeaderboardSection />
        <JyotiTestimonialSection />
        <HowItWorksSection />
        <AanchalTestimonialSection />
        <WhatYouGetSection scrollToRegistration={scrollToRegistration} />
        <MeetYourMentorSection />
        <MoreMentorsSection />
        <BenefitsSection />
        <TransformationsSection />
        <WhoIsThisForSection />
        <YogaTeachersSection />
        <RegisterHereSection onRegister={handleJoinGroup} />
        <FAQSection />
        <UpgradeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
        />
        <ScrollPopupModal
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
        />
        <StickyBottomBar onRegisterClick={scrollToRegistration} />
      </div>
    </>
  );
};

export default Ultimate21DayChallenge;
