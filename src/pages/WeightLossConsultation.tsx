import { useEffect } from "react";
import FastestTransformationsSection from "@/components/campaign/FastestTransformationsSection";
import ConsultationHero from "@/components/campaign/ConsultationHero";
import ConsultationBenefitsSection from "@/components/campaign/ConsultationBenefitsSection";
import ConsultationWhatYouGetSection from "@/components/campaign/ConsultationWhatYouGetSection";
import ConsultationVideoSection from "@/components/campaign/ConsultationVideoSection";
import ConsultationTransformationsSection from "@/components/campaign/ConsultationTransformationsSection";
import ConsultationFinalCTA from "@/components/campaign/ConsultationFinalCTA";
import MeetTheFounderSection from "@/components/campaign/MeetTheFounderSection";

const WeightLossConsultation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <FastestTransformationsSection />
      <ConsultationHero />
      <ConsultationBenefitsSection />
      <ConsultationWhatYouGetSection />
      <ConsultationVideoSection />
      <ConsultationTransformationsSection />
      <ConsultationFinalCTA />
      <MeetTheFounderSection />
    </div>
  );
};

export default WeightLossConsultation;