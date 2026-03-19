import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onJoinGroup: () => void;
}

export const UpgradeModal = ({ isOpen, onClose, onUpgrade, onJoinGroup }: UpgradeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 transition-colors z-10"
          aria-label="Close modal">
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Modal Content */}
        <div className="px-6 py-8">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              Want to Upgrade to 21 Day Personalized Plan?
            </h2>
          </div>

          {/* Upgrade Benefits */}
          <div className="mb-5">
            <p className="text-xs text-gray-700 mb-2 italic">Upgrade to get:</p>
            <div className="space-y-1.5">
              {[
                "Start Anytime (Priority Onboarding)",
                "Dedicated Dietitian",
                "Personalized Diet Plan",
                "Personalized Intermittent fasting",
                "Call & Chat Support",
                "Root Cause Analysis of Weight & Health Issues",
                "Higher chances of consistent results",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-xs text-gray-900 leading-tight">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Start Anyday Text */}
          <p className="text-center text-gray-700 font-medium text-xs mb-3">Start Anyday</p>

          {/* Upgrade Button */}
          <Button
            onClick={() => window.open('https://pages.razorpay.com/pl_QHMy1AvL4XDeqQ/view', '_blank')}
            className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 mb-5">
            Upgrade & Pay Rs. 2990
          </Button>

          {/* No Upgrade Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 justify-center mb-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0" strokeWidth={3} />
              <h3 className="text-sm font-bold text-gray-900">
                No, I don't want to Upgrade
              </h3>
            </div>
            <p className="text-center text-gray-700 font-medium text-xs mb-3">
              Starts 5th April 2026
            </p>
          </div>

          {/* Group Plan Button */}
          <Button
            onClick={() => window.open('https://pages.razorpay.com/pl_QHMrm9qAqyqcdA/view', '_blank')}
            className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Join Group Plan - Rs. 990
          </Button>
        </div>
      </div>
    </div>
  );
};
