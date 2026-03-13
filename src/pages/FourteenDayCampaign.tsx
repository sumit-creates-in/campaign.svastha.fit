import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import FourteenDayHero from "@/components/campaign/FourteenDayHero";

const FourteenDayCampaign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set meta tags for 14-Day Campaign
  useMeta({
    title: "14-Day Healthy Life Transformation | Sumit's Yoga Program",
    description: "Transform your life in 14 days with Sumit's proven yoga and wellness program. Daily guidance, healthy habits, and sustainable lifestyle changes.",
    ogTitle: "14-Day Healthy Life Transformation | Sumit's Program",
    ogDescription: "Join Sumit's 14-day transformation program. Yoga, wellness, and healthy lifestyle changes that last a lifetime.",
    ogImage: "/src/assets/sumit sharma.png",
    twitterTitle: "14-Day Healthy Life Transformation | Sumit's Program",
    twitterDescription: "Join Sumit's 14-day transformation program. Yoga, wellness, and healthy lifestyle changes that last a lifetime.",
    twitterImage: "/src/assets/sumit sharma.png"
  });

  return (
    <div className="min-h-screen bg-white">
      <FourteenDayHero />
    </div>
  );
};

export default FourteenDayCampaign;