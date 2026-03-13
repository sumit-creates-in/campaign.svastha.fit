import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
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

  // Set meta tags for Weight Loss Consultation
  useMeta({
    title: "Free Weight Loss Consultation with Expert | Svastha Wellness",
    description: "Get personalized weight loss guidance from certified experts. Free consultation to create your custom transformation plan. Book your session now!",
    ogTitle: "Free Weight Loss Consultation | Expert Guidance",
    ogDescription: "Get personalized weight loss guidance from certified experts. Free consultation to create your custom transformation plan.",
    ogImage: "/src/assets/sumit sharma.png",
    twitterTitle: "Free Weight Loss Consultation | Expert Guidance",
    twitterDescription: "Get personalized weight loss guidance from certified experts. Free consultation to create your custom transformation plan.",
    twitterImage: "/src/assets/sumit sharma.png"
  });

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