import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeatsLeft } from "@/hooks/useSeatsLeft";

interface StickyBottomBarProps {
  onRegisterClick: () => void;
  feeText?: string;
  registerButtonText?: string;
}

export const StickyBottomBar = ({
  onRegisterClick,
  feeText = "Rs.1990/-",
  registerButtonText = "Register Now",
}: StickyBottomBarProps) => {
  const { displaySeats } = useSeatsLeft();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] border-t-2 border-gray-200 md:hidden">
      <div className="flex items-start justify-between px-4 py-3">
        {/* Left Side - Challenge Info */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">
            Ultimate 21 Day Weight Loss Challenge
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Fee: <span className="font-semibold text-gray-900">{feeText}</span>
            {feeText !== "FREE" && " only"}
          </p>
        </div>

        {/* Right Side - Register Button and People Count */}
        <div className="flex flex-col items-end ">
          <Button
            onClick={onRegisterClick}
            className="bg-gradient-to-r w-full from-green-600 to-lime-400 text-white font-semibold text-sm !px-12 py-2 rounded-full shadow-md transition-all duration-300 mb-1"
          >
            {registerButtonText}
          </Button>
          <div className="flex items-center gap-1 mr-5 text-xs text-gray-600">
            <Users className="w-3 h-3" />
            <span>{displaySeats} Seats Left. Hurry Up!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
