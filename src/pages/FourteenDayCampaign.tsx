import { useEffect } from "react";
import FourteenDayHero from "@/components/campaign/FourteenDayHero";

const FourteenDayCampaign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <FourteenDayHero />
    </div>
  );
};

export default FourteenDayCampaign;