import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoIncrementCounter } from "@/hooks/useAutoIncrementCounter";

interface StickyBottomBarProps {
  onRegisterClick: () => void;
}

export const StickyBottomBar = ({ onRegisterClick }: StickyBottomBarProps) => {
  const peopleCount = useAutoIncrementCounter({
    initialCount: 67833,
    incrementAmount: 8,
    intervalHours: 1, // 1 hour
    startDate: '2026-03-30T18:00:00Z',
  });
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] border-t-2 border-gray-200 md:hidden">
      <div className="flex items-start justify-between px-4 py-3">
        {/* Left Side - Challenge Info */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">
            Ultimate 21 Day Weight Loss Challenge
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Fee: <span className="font-semibold text-gray-900">Rs. 990/-</span> only
          </p>
        </div>

        {/* Right Side - Register Button and People Count */}
        <div className="flex flex-col items-end ">
          <Button
            onClick={onRegisterClick}
            className="bg-gradient-to-r w-full from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm !px-12 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 mb-1">
            Register Now
          </Button>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Users className="w-3 h-3" />
            <span>{peopleCount.toLocaleString()} people joined</span>
          </div>
        </div>
      </div>
    </div>
  );
};
