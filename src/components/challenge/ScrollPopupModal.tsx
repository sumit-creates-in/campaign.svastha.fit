import { X, Check } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[95vh] overflow-y-auto animate-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="sticky top-2 left-full -ml-20 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-gray-100 rounded-lg p-1"
          aria-label="Close modal">
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Modal Content */}
        <div className="px-4 py-3 pt-0">
          {/* Alert Icon */}
          <div className="flex justify-center mb-2">
            <span className="text-3xl animate-bounce">🚨</span>
          </div>

          {/* Warning Text */}
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold text-red-600 leading-tight">
              If You Close It, You Will Lose it!
            </h2>
          </div>

          {/* Discount Badge */}
          <div className="text-center mb-3">
            <p className="text-base font-bold text-gray-900">
              🎉 <span className="text-gray-800">Discount Unlocked</span> 🥳
            </p>
          </div>

          {/* Upgrade Section */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  Upgrade to Personalized
                </h3>
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  21 Day Plan to Get:
                </h3>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-2">
              <p className="text-xs text-gray-600 mb-1 italic text-center">Upgrade to Get:</p>
              <div className="space-y-1 flex flex-col items-start pl-6">
                {[
                  "Start Anyday (Priority Onboarding)",
                  "Dedicated Dietitian",
                  "Personalized Diet Plan",
                  "Personalized Intermittent fasting",
                  "Call & Chat Support",
                  "Root Cause Analysis",
                  "Higher chances of results",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2 h-2 text-white" strokeWidth={3} />
                    </div>
                    <p className="text-sm text-gray-800 leading-tight">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Anyday & Discount */}
            <div className="text-center mb-3 mt-3">
              <p className="text-red-500 font-semibold text-sm">Rs. 200 off</p>
              <p className="text-gray-700 font-medium text-xs">Start Anyday</p>
            </div>

            {/* Upgrade Button */}
            <Button
              onClick={() => {
                handleClose();
                window.open("https://pages.razorpay.com/pl_QHfwHt0q52MdOJ/view", "_blank");
              }}
              className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 mb-3 mt-2 flex flex-col items-center leading-tight gap-0.5">
              <span>Upgrade to Personalized Plan</span>
              <span>Rs. 2790</span>
            </Button>
          </div>

          {/* No Upgrade Section */}
          <div className="mb-2">
            <div className="flex items-center gap-2 justify-center mb-2">
              <X className="w-4 h-4 text-red-500 flex-shrink-0" strokeWidth={3} />
              <h3 className="text-sm font-bold text-gray-900">
                No, I don't want to Upgrade
              </h3>
            </div>
            <div className="text-center mb-2">
              <p className="text-red-500 font-semibold text-sm">Rs. 100 off</p>
              <p className="text-gray-700 font-medium text-xs">Starts 5th April 2026</p>
            </div>
          </div>

          {/* Group Plan Button */}
          <Button
            onClick={() => {
              handleClose();
              window.open("https://pages.razorpay.com/pl_QHg0K5EhmJMBP8/view", "_blank");
            }}
            className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Join Group Plan - Rs. 890
          </Button>
        </div>
      </div>
    </div>
  );
};
