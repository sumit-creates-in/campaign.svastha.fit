import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
    onJoinGroup: () => void;
    upgradeUrl?: string;
    joinGroupUrl?: string;
    upgradePriceText?: string;
    groupPriceText?: string;
    joinGroupButtonText?: string;
    isGlobal?: boolean;
    startDateText?: string;
    timerEndDate?: string;
    hideTimer?: boolean;
    yogaTeacher?: string;
}

export const UpgradeModalGlobal = ({
    isOpen,
    onClose,
    onUpgrade,
    onJoinGroup,
    upgradeUrl = "https://pages.razorpay.com/pl_QHMy1AvL4XDeqQ/view",
    joinGroupUrl = "https://pages.razorpay.com/pl_QHMrm9qAqyqcdA/view",
    upgradePriceText = "Rs. 2990",
    groupPriceText = "Rs. 990",
    joinGroupButtonText,
    isGlobal = false,
    startDateText = "26th July 2026",
    timerEndDate,
    hideTimer = false,
    yogaTeacher = "Yes, Add Yoga Teacher – Pay AED 299"
}: UpgradeModalProps) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endDate = timerEndDate
                ? new Date(timerEndDate)
                : isGlobal
                    ? new Date("2026-06-21T23:59:59")
                    : new Date("2026-06-08T12:00:00");

            const difference = endDate.getTime() - now.getTime();

            if (difference > 0) {
                // Calculate total days and round up if there are remaining hours
                const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
                setTimeLeft({ days: totalDays });
            } else {
                setTimeLeft({ days: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [isGlobal, timerEndDate]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Modal Content */}
                <div className="px-8 py-10">
                    {/* Header */}
                    <div className="mb-4 text-center">
                        <div className="flex items-center justify-center gap-3 mb-1">

                            <h2 className="text-base font-bold text-gray-900 leading-tight">
                                Want to Add a Personal Yoga Teacher?
                            </h2>
                        </div>

                        {!hideTimer && timeLeft.days > 0 && (
                            <p className="text-xs text-red-600 font-semibold flex items-center justify-center gap-2">
                                Limited Time Offer :
                                <span className="font-bold text-red-600">
                                    {timeLeft.days} {timeLeft.days === 1 ? "Day" : "Days"} Left
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Upgrade Benefits */}
                    <div className="mb-5">

                        <div className="space-y-1.5 flex flex-col items-start pl-8">
                            {[
                                "✅ 3 Live 1-on-1 Yoga Sessions Every Week",
                                "✅ Personalized Yoga Plan",
                                "✅ Lose Weight Faster & Stay Motivated",
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-2.5">


                                    <p className="text-xs text-gray-900 leading-tight">
                                        {benefit}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>


                    <Button
                        onClick={() => {
                            if (upgradeUrl === "") {
                                onUpgrade();
                            } else {
                                window.open(upgradeUrl, "_blank");
                            }
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-lime-400 text-white font-semibold text-sm py-3.5 rounded-full shadow-md transition-all duration-300 mb-5"
                    >
                        {yogaTeacher}
                    </Button>

                    {/* No Upgrade Section */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 justify-center mb-3">

                            <h3 className="text-sm font-bold text-gray-900">
                                Or
                            </h3>
                        </div>

                    </div>

                    {/* Group Plan Button */}
                    <Button
                        onClick={() => {
                            if (joinGroupUrl === "") {
                                onJoinGroup();
                            } else {
                                window.open(joinGroupUrl, "_blank");
                            }
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-lime-400 text-white font-semibold text-[12px] py-3.5 rounded-full shadow-md transition-all duration-300"
                    >
                        {joinGroupButtonText ?? `Join Group Plan - ${groupPriceText}`}
                    </Button>
                </div>
            </div>
        </div>
    );
};
