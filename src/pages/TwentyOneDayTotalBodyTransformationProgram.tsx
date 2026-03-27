import { useEffect } from "react";
import TotalBodyPricingSection from "@/components/campaign/TotalBodyPricingSection";

const TwentyOneDayTotalBodyTransformationProgram = () => {
  useEffect(() => {
    document.title = "21-Day Total Body Transformation Program | Transform Your Body in 21 Days";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-x-hidden">
      <TotalBodyPricingSection />
    </div>
  );
};

export default TwentyOneDayTotalBodyTransformationProgram;
