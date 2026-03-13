import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
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

const TransformationProgram = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set meta tags for 12-Week Transformation Program
  useMeta({
    title: "12-Week Total Body Transformation Program | Svastha Wellness",
    description: "Complete 12-week body transformation program with yoga, nutrition, and lifestyle coaching. Guaranteed results with expert guidance and community support.",
    ogTitle: "12-Week Total Body Transformation | Svastha Wellness",
    ogDescription: "Complete 12-week body transformation program with yoga, nutrition, and lifestyle coaching. Guaranteed results with expert guidance.",
    ogImage: "/src/assets/sumit sharma.png",
    twitterTitle: "12-Week Total Body Transformation | Svastha Wellness",
    twitterDescription: "Complete 12-week body transformation program with yoga, nutrition, and lifestyle coaching. Guaranteed results with expert guidance.",
    twitterImage: "/src/assets/sumit sharma.png"
  });

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
    </div>
  );
};

export default TransformationProgram;
