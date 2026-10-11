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
      "Sumit Sharma, Yoga & Nutrition Coach and Founder of SVASTHA. Join the live Master Class on the Ultimate 21 Day Weight Loss Challenge (₹49) or book a consultation call.",
    ogTitle: "Sumit Sharma — Svastha",
    ogDescription:
      "Live Master Class: the 21-day plan with home-cooked Indian food, the right way to fast and daily yoga. ₹49 only.",
    ogImage: "https://campaign.svastha.fit/masterclass-og.jpg",
    twitterImage: "https://campaign.svastha.fit/masterclass-og.jpg",
  });

  return <BioLinkHub />;
};

export default FourteenDayCampaign;
