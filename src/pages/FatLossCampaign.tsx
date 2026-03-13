import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import Navigation from "@/components/Navigation";
import FatLossHero from "@/components/campaign/FatLossHero";
import VideoTestimonialSection from "@/components/campaign/VideoTestimonialSection";
import VideoTestimonialSection2 from "@/components/campaign/VideoTestimonialSection2";
import BenefitsSection from "@/components/campaign/BenefitsSection";
import WhyDifferentSection from "@/components/campaign/WhyDifferentSection";
import BatchesSection from "@/components/campaign/BatchesSection";
import MentorsSection from "@/components/campaign/MentorsSection";
import CampScheduleSection from "@/components/campaign/CampScheduleSection";
import DailyGuidanceSection from "@/components/campaign/DailyGuidanceSection";
import CommunitySection from "@/components/campaign/CommunitySection";
import WhyPeopleFailSection from "@/components/campaign/WhyPeopleFailSection";
import PerfectForYouSection from "@/components/campaign/PerfectForYouSection";
import BenefitsExperienceSection from "@/components/campaign/BenefitsExperienceSection";
import MoneyBackGuaranteeSection from "@/components/campaign/MoneyBackGuaranteeSection";
import RealTransformationsSection from "@/components/transformation/RealTransformationsSection";
import WhoShouldJoinSection from "@/components/campaign/WhoShouldJoinSection";
import PricingSection from "@/components/campaign/PricingSection";
import FAQSection from "@/components/campaign/FAQSection";
import FinalCTASection from "@/components/campaign/FinalCTASection";
import StickyCTA from "@/components/campaign/StickyCTA";

const FatLossCampaign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set meta tags for 14-Day Fat Loss Campaign
  useMeta({
    title: "14-Day Yoga Fat Loss Camp | Transform Your Body in 14 Days",
    description: "Join our intensive 14-Day Yoga Fat Loss Camp. Proven yoga techniques for rapid fat loss, daily live classes, expert guidance, and guaranteed results. Register now!",
    ogTitle: "14-Day Yoga Fat Loss Camp | Svastha Wellness",
    ogDescription: "Transform your body in just 14 days with our intensive yoga fat loss program. Daily live classes, expert instructors, and proven results.",
    ogImage: "/src/assets/hero-yoga.jpg",
    twitterTitle: "14-Day Yoga Fat Loss Camp | Svastha Wellness",
    twitterDescription: "Transform your body in just 14 days with our intensive yoga fat loss program. Daily live classes, expert instructors, and proven results.",
    twitterImage: "/src/assets/hero-yoga.jpg"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 overflow-x-hidden">
      {/* <Navigation /> */}
      <FatLossHero />
      <VideoTestimonialSection />
      <BenefitsSection />
      <VideoTestimonialSection2 />
      <WhyDifferentSection />
      <BatchesSection />
      <MentorsSection />
      <CampScheduleSection />
      <DailyGuidanceSection />
      <CommunitySection />
      <WhyPeopleFailSection />
      <PerfectForYouSection />
      <BenefitsExperienceSection />
      <MoneyBackGuaranteeSection />
      <RealTransformationsSection />
      <WhoShouldJoinSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <StickyCTA />
    </div>
  );
};

export default FatLossCampaign;
