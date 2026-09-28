import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import BioLinkHub from "@/components/campaign/BioLinkHub";

/**
 * campaign.svastha.fit/healthy-life-by-sumit — the link in Sumit's Instagram,
 * Facebook and other social bios. (File name kept from the old 14-day page so
 * the route in App.tsx is untouched; the old FourteenDayHero is no longer used.)
 */
const FourteenDayCampaign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: "Sumit Sharma — Weight Loss the Natural Way | Svastha",
    description:
      "Sumit Sharma, Yoga & Nutrition Coach and Founder of SVASTHA. Join the Nav Fit Challenge (9 day guided Navratri fasting, 11–19 Oct) or book a consultation call.",
    ogTitle: "Sumit Sharma — Svastha",
    ogDescription:
      "Nav Fit Challenge: guided Navratri fasting for maximum weight loss, 11–19 October. Or book a call with our weight-loss expert.",
    ogImage: "https://campaign.svastha.fit/ads/navfit/navfit-right-way.jpg",
    twitterImage: "https://campaign.svastha.fit/ads/navfit/navfit-right-way.jpg",
  });

  return <BioLinkHub />;
};

export default FourteenDayCampaign;
