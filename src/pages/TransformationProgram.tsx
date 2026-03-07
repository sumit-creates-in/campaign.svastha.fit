import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import TransformationHero from "@/components/transformation/TransformationHero";
import BigRealizationSection from "@/components/transformation/BigRealizationSection";
import AchievementsSection from "@/components/transformation/AchievementsSection";
import ProgramStructureSection from "@/components/transformation/ProgramStructureSection";
import ProgramOptionsSection from "@/components/transformation/ProgramOptionsSection";
import CoachSection from "@/components/transformation/CoachSection";
import SuccessStoriesSection from "@/components/transformation/SuccessStoriesSection";
import RealTransformationsSection from "@/components/transformation/RealTransformationsSection";
import BonusesSection from "@/components/transformation/BonusesSection";
import UrgencySection from "@/components/transformation/UrgencySection";
import FinalCTASection from "@/components/transformation/FinalCTASection";
import StickyCTA from "@/components/transformation/StickyCTA";
import WhatsAppButton from "@/components/campaign/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const TransformationProgram = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <TransformationHero />
      <BigRealizationSection />
      <AchievementsSection />
      <ProgramStructureSection />
      <ProgramOptionsSection />
      <CoachSection />
      <SuccessStoriesSection />
      <RealTransformationsSection />
      <BonusesSection />
      <UrgencySection />
      <FinalCTASection />
      <StickyCTA />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default TransformationProgram;
