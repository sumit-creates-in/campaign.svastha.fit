import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MASTERCLASS, PRICING } from "@/config/masterclass";

interface Props {
  onRegister: () => void;
  hidden?: boolean;
}

export const MasterClassStickyBar = ({ onRegister, hidden }: Props) => {
  const [show, setShow] = useState(false);

  // Only appear once the hero CTA has scrolled away, so it never competes
  // with the primary button.
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-gray-200 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight text-gray-900">
            {MASTERCLASS.subtitle} · {MASTERCLASS.timeLabel}
          </p>
          <p className="truncate text-xs text-gray-600">
            {MASTERCLASS.dateLabel}
          </p>
        </div>
        <Button
          onClick={onRegister}
          className="no-heartbeat flex-shrink-0 rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-6 py-5 text-sm font-bold text-white shadow-md"
        >
          Reserve Seat — {PRICING.price}
        </Button>
      </div>
    </div>
  );
};
