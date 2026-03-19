import { X, Check, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ScrollPopupModalProps {
  onUpgrade: () => void;
  onJoinGroup: () => void;
}

export const ScrollPopupModal = ({ onUpgrade, onJoinGroup }: ScrollPopupModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show popup after scrolling 50% of the page
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > 50 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xs w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="sticky top-3 left-full -ml-11 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-gray-100 rounded-lg p-1"
          aria-label="Close modal">
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Modal Content */}
        <div className="px-5 py-6 pt-2">
          {/* Bell Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Bell className="w-12 h-12 text-red-500 animate-bounce" fill="currentColor" />
            </div>
          </div>

          {/* Warning Text */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2 leading-tight">
              If You Close It,
            </h2>
            <h2 className="text-2xl font-bold text-red-600 mb-4 leading-tight">
              You Will Lose it!
            </h2>
          </div>

          {/* Discount Badge */}
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-gray-900">
              🎉 <span className="text-gray-800">Discount Unlocked</span> 🥳
            </p>
          </div>

          {/* Upgrade Section */}
          <div className="mb-6">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                Want to Upgrade to Personalized 21 Day Plan?
              </h3>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2 italic">Upgrade to Get:</p>
              <div className="space-y-1.5">
                {[
                  "Start Anyday (Priority Onboarding)",
                  "Dedicated Dietitian",
                  "Personalized Diet Plan",
                  "Personalized Intermittent fasting",
                  "Call & Chat Support",
                  "Root Cause Analysis of Weight & Health Issues",
                  "Higher chances of consistent results",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                    <p className="text-xs text-gray-800 leading-tight">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Anyday */}
            <p className="text-center text-gray-700 font-medium text-xs mb-2">Start Anyday</p>

            {/* Discount Text */}
            <p className="text-center text-red-500 font-semibold text-sm mb-3">Rs. 200 off</p>

            {/* Upgrade Button */}
            <Button
              onClick={() => {
                handleClose();
                window.open("https://pages.razorpay.com/pl_QHfwHt0q52MdOJ/view", "_blank");
              }}
              className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 mb-5 flex flex-col items-center leading-tight">
              <span>Upgrade to Personalized Plan</span>
              <span>Rs. 2790</span>
            </Button>
          </div>

          {/* No Upgrade Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 justify-center mb-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0" strokeWidth={3} />
              <h3 className="text-sm font-bold text-gray-900">
                No, I don't want to Upgrade
              </h3>
            </div>
            <p className="text-center text-gray-700 font-medium text-xs mb-2">
              Starts 5th April 2026
            </p>
            <p className="text-center text-red-500 font-semibold text-sm mb-3">Rs. 100 off</p>
          </div>

          {/* Group Plan Button */}
          <Button
            onClick={() => {
              handleClose();
              window.open("https://pages.razorpay.com/pl_QHg0K5EhmJMBP8/view", "_blank");
            }}
            className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Join Group Plan - Rs. 890
          </Button>
        </div>
      </div>
    </div>
  );
};
