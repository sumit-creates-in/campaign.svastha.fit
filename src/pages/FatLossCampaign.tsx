import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import FatLossHero from "@/components/campaign/FatLossHero";
import BenefitsSection from "@/components/campaign/BenefitsSection";
import WhyDifferentSection from "@/components/campaign/WhyDifferentSection";
import BatchesSection from "@/components/campaign/BatchesSection";
import MentorsSection from "@/components/campaign/MentorsSection";
import CampScheduleSection from "@/components/campaign/CampScheduleSection";
import DailyGuidanceSection from "@/components/campaign/DailyGuidanceSection";
import CommunitySection from "@/components/campaign/CommunitySection";
import WhoShouldJoinSection from "@/components/campaign/WhoShouldJoinSection";
import PricingSection from "@/components/campaign/PricingSection";
import FinalCTASection from "@/components/campaign/FinalCTASection";
import StickyCTA from "@/components/campaign/StickyCTA";
import WhatsAppButton from "@/components/campaign/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const FatLossCampaign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <Navigation />
      <FatLossHero />
      <BenefitsSection />
      <WhyDifferentSection />
      <BatchesSection />
      <MentorsSection />
      <CampScheduleSection />
      <DailyGuidanceSection />
      <CommunitySection />
      <WhoShouldJoinSection />
      <PricingSection />
      <FinalCTASection />
      <StickyCTA />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default FatLossCampaign;
