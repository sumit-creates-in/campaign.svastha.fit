import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";
import { CHALLENGE_PLANS, EARLY_BIRD, isEarlyBird } from "@/config/challengeOffer";

// Import all sections
import { UltimateHero } from "@/components/challenge/UltimateHero";
import {
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
    description: "Join the Ultimate 21 Day Weight Loss Challenge — next batch starts Sunday 6 December 2026 (New Year offer). Diet and intermittent fasting plan, live yoga classes, WhatsApp guidance with Sumit Sharma.",
    ogTitle: "Ultimate 21 Day Weight Loss Challenge | Svastha",
    ogDescription: "Next batch starts Sunday 6 December 2026. Diet plan + intermittent fasting + live yoga + WhatsApp support.",
    ogImage: "/src/assets/hero-yoga.jpg",
  });

  // Offer pricing: same plans, prices and Razorpay pages as /21-day-challenge —
  // offer price until EARLY_BIRD.closesAt, regular after. New Year offer for
  // B158 (Sumit, 25 Nov): ₹1,290 / ₹2,990, scroll popup ₹990 / ₹2,790.
  const earlyBird = isEarlyBird();
  const groupPlan = CHALLENGE_PLANS.find((p) => p.id === "group")!;
  const personalPlan = CHALLENGE_PLANS.find((p) => p.id === "personalized")!;
  const groupPrice = earlyBird ? groupPlan.earlyPrice : groupPlan.regularPrice;
  const groupPage = earlyBird ? groupPlan.earlyPage : groupPlan.regularPage;
  const personalPrice = earlyBird ? personalPlan.earlyPrice : personalPlan.regularPrice;
  const personalPage = earlyBird ? personalPlan.earlyPage : personalPlan.regularPage;
  const groupFeeText = earlyBird
    ? `${groupPrice}/- (${EARLY_BIRD.name})`
    : `${groupPrice}/-`;

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

  // Layout tidied in the Master Class page's style (Sumit approved 25 Nov 2026):
  // new top section (UltimateHero), one heading style (`clean` on every section),
  // no fixed 150 px gaps between sections, and buttons that stay still.
  return (
    <>
      <div className="ultimate-challenge-page min-h-screen bg-white overflow-x-hidden">
        <UltimateHero onRegister={scrollToRegistration} />
        {isStartPage && (
          <AanchalTestimonialSection
            clean
            eyebrow="Sumit's story"
            heading="Watch Sumit's Amazing Transformation"
            subHeading="From where he started to where he is today."
            videoUrl="https://www.youtube.com/embed/lyo56Iu67_M"
          />
        )}
        <LeaderboardSection clean />
        {!isStartPage && <JyotiTestimonialSection clean />}
        {isStartPage && <TransformationsSection clean transformations={transformation} />}
        {isStartPage && (
          <AanchalTestimonialSection
            clean
            heading="Rajesh ji Lost 4 Kg's in Just 7 Days 🤩"
            subHeading="Watch his journey."
            videoUrl="https://www.youtube.com/embed/LVHVl5kHhgI"
          />
        )}
        {!isStartPage && <AanchalTestimonialSection clean subHeading="Watch her journey." />}
        <HowItWorksSection clean />
        <WhatYouGetSection scrollToRegistration={scrollToRegistration} isUltimate={true} clean />
        <MeetYourMentorSection scrollToRegistration={scrollToRegistration} clean />
        <MoreMentorsSection clean />
        <BenefitsSection clean />
        <TransformationsSection clean />
        <WhoIsThisForSection clean />
        <YogaTeachersSection clean />
        <RegisterHereSection
          clean
          eyebrow={earlyBird ? EARLY_BIRD.name : undefined}
          onRegister={scrollToRegistration}
          hideScarcity
          originalPrice={earlyBird ? `${groupPlan.regularPrice}/-` : "₹ 2900/-"}
          discountedPrice={`${groupPrice}/-`}
        />
        <FAQSection clean />
        <UpgradeModal
          joinGroupUrl={groupPage}
          groupPriceText={groupPrice}
          upgradeUrl={personalPage}
          upgradePriceText={personalPrice}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpgrade={handleUpgrade}
          onJoinGroup={handleJoinGroup}
          startDateText="6th December 2026"
          hideScarcity
        />
        <ScrollPopupModal
          onUpgrade={handleUpgrade}
          upgradeUrl={earlyBird ? personalPlan.popupPage : personalPage}
          personalDiscountText={earlyBird ? personalPlan.popupSaving : ""}
          personalPriceText={earlyBird ? personalPlan.popupPrice : personalPrice}
          joinGroupUrl={earlyBird ? groupPlan.popupPage : groupPage}
          groupDiscountText={earlyBird ? groupPlan.popupSaving : ""}
          groupPriceText={earlyBird ? groupPlan.popupPrice : groupPrice}
          onJoinGroup={handleJoinGroup}
          startDateText="6th December 2026"
          onVisibilityChange={setIsScrollModalOpen}
          hideScarcity
        />
        <StickyBottomBar onRegisterClick={scrollToRegistration} hideScarcity feeText={groupFeeText} />
        <WhatsAppFloatingButton showImmediately={true} isModalOpen={isModalOpen || isScrollModalOpen} />
      </div>
    </>
  );
};

export default Ultimate21DayChallenge;
