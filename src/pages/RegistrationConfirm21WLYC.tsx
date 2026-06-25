import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, Monitor, Users, ArrowBigDown } from "lucide-react";
import { useLocation } from "react-router-dom";

function formatTime12h(hour24: number): string {
    let h = ((hour24 % 24) + 24) % 24;
    const minutes = Math.round((h % 1) * 60);
    const hourInt = Math.floor(h);
    const period = hourInt >= 12 ? "pm" : "am";
    const hour12 = hourInt === 0 ? 12 : hourInt > 12 ? hourInt - 12 : hourInt;
    return minutes === 0 ? `${hour12}:00 ${period}` : `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function getUSTimezoneInfo(): { name: string; offsetFromIST: number } {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.includes("America/New_York") || tz.includes("America/Detroit") || tz.includes("America/Toronto") || tz.includes("US/Eastern")) {
            return { name: "Eastern Time (ET)", offsetFromIST: -9.5 };
        }
        if (tz.includes("America/Chicago") || tz.includes("America/Winnipeg") || tz.includes("US/Central")) {
            return { name: "Central Time (CT)", offsetFromIST: -10.5 };
        }
        if (tz.includes("America/Denver") || tz.includes("America/Edmonton") || tz.includes("US/Mountain")) {
            return { name: "Mountain Time (MT)", offsetFromIST: -11.5 };
        }
        if (tz.includes("America/Los_Angeles") || tz.includes("America/Vancouver") || tz.includes("US/Pacific")) {
            return { name: "Pacific Time (PT)", offsetFromIST: -12.5 };
        }
        const offsetMinutes = new Date().getTimezoneOffset();
        const offsetFromUTC = -offsetMinutes / 60;
        const offsetFromIST = offsetFromUTC - 5.5;
        const tzAbbr = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
        return { name: tzAbbr || "Your Local Time", offsetFromIST };
    } catch {
        return { name: "Eastern Time (ET)", offsetFromIST: -9.5 };
    }
}

const RegistrationConfirm21WLYC = ({ isGlobal = false }: { isGlobal?: boolean }) => {
    const location = useLocation();
    const [tzInfo, setTzInfo] = useState<{ name: string; offsetFromIST: number }>({
        name: "Asia/Calcutta",
        offsetFromIST: 0,
    });

    const isInternational =
        location.pathname.replace(/\/$/, "") === "/reg-confirm-21wlyc-international";

    const isUsa =
        location.pathname.replace(/\/$/, "") === "/u21dwlc-group-registration-success-usa";

    const localHour = 20.5 + tzInfo.offsetFromIST;
    const formattedLocalTime = formatTime12h(localHour);

    const sessionTime = isUsa
        ? (tzInfo.offsetFromIST === 0 
            ? "8:30 pm (Calcutta/Asia)"
            : `${formattedLocalTime} (${tzInfo.name}) / 8:30 pm (Calcutta/Asia)`)
        : isInternational
            ? "10:30 PM EDT (USA) / 8:00 AM GST"
            : isGlobal
                ? "8:00 AM (Gulf Standard Time (GST))"
                : "9:30 AM (India Time)";

    useEffect(() => {
        window.scrollTo(0, 0);
        setTzInfo(getUSTimezoneInfo());

        // Meta Pixel Code
        const w = window as any;
        if (!w.fbq) {
            w.fbq = function (...args: any[]) {
                w.fbq.callMethod
                    ? w.fbq.callMethod.apply(w.fbq, args)
                    : w.fbq.queue.push(args);
            };
            if (!w._fbq) w._fbq = w.fbq;
            w.fbq.push = w.fbq;
            w.fbq.loaded = !0;
            w.fbq.version = "2.0";
            w.fbq.queue = [];
            const script = document.createElement("script");
            script.async = true;
            script.src = "https://connect.facebook.net/en_US/fbevents.js";
            const firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode?.insertBefore(script, firstScript);
        }

        w.fbq("init", "4183888118531938", {
            em: "email@email.com",
            ph: "1234567890",
        });
        w.fbq("track", "PageView");
    }, []);

    const handleJoinWhatsApp = () => {
        const whatsappLink = isUsa
            ? "https://chat.whatsapp.com/IQFDiBlIYQ2BOPQd0fTO5G"
            : "https://chat.whatsapp.com/FCrXhOBEwmv8v7cX467LYP";
        window.open(whatsappLink, "_blank");
    };

    const steps = [
        {
            number: "1️⃣",
            title: "Save the admin number",
            description: "Add the admin contact to your phone"
        },
        {
            number: "2️⃣",
            title: "Turn on WhatsApp notifications",
            description: "Enable notifications for important updates"
        },
        {
            number: "3️⃣",
            title: "Attend the orientation session on time",
            description: `Join the Zoom call at ${sessionTime} on ${isUsa ? "12th July" : "28th June"}`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
            {/* Success Header */}
            <section className="py-12 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-20 h-20 text-white animate-bounce" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Registration Successful!
                        </h1>
                        <p className="text-xl text-white/90">
                            🎉 Welcome to the 21 Day Weight Loss & Yoga Camp
                        </p>
                    </motion.div>
                </div>
            </section>
            <div className="flex justify-center py-4">
                <ArrowBigDown className="w-14 h-14 text-green-600" />

            </div>

            {/* Main Content */}
            <section className="py-2 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Confirmation Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-green-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Your seat has been successfully reserved.
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg">
                            Thank you for registering! We're excited to have you join our community.
                        </p>
                    </motion.div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center py-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: [0, 8, 0] }}
                            transition={{ duration: 0.6, delay: 0.2, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.4 }}
                        >
                            <ArrowBigDown className="w-14 h-14 text-green-600" />
                        </motion.div>
                    </div>

                    {/* Orientation Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-blue-200"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-blue-600" />
                            Orientation Session Details
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Date</p>
                                    <p className="text-lg text-gray-900 font-bold">
                                        {isUsa ? "12th July (Sunday)" : "28th June (Sunday)"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Time</p>
                                    <p className="text-lg text-gray-900 font-bold">
                                        {sessionTime}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Monitor className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Platform</p>
                                    <p className="text-lg text-gray-900 font-bold">Live on Zoom</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Recording</p>
                                    <p className="text-lg text-gray-900 font-bold">Recording will be provided</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center py-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: [0, 8, 0] }}
                            transition={{ duration: 0.6, delay: 0.3, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.4 }}
                        >
                            <ArrowBigDown className="w-14 h-14 text-green-600" />
                        </motion.div>
                    </div>

                    {/* WhatsApp Group CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-green-300"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Join The WhatsApp Group
                        </h3>
                        <p className="text-gray-600 text-lg mb-8">
                            Click the button below to join the official camp group.
                        </p>
                        <Button
                            onClick={handleJoinWhatsApp}
                            size="lg"
                            className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                            {/* <Users className="w-6 h-6" /> */}
                            JOIN WHATSAPP GROUP
                        </Button>
                    </motion.div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center py-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: [0, 8, 0] }}
                            transition={{ duration: 0.6, delay: 0.4, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.4 }}
                        >
                            <ArrowBigDown className="w-14 h-14 text-green-600" />
                        </motion.div>
                    </div>

                    {/* Next Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-gray-200"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            ⏳ Next Step
                        </h3>
                        <p className="text-gray-600 text-lg mb-8">
                            Once you join the WhatsApp group:
                        </p>

                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    className="flex items-start gap-4 bg-gray-50 rounded-xl p-6"
                                >
                                    <div className="text-3xl flex-shrink-0">{step.number}</div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">{step.title}</p>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center py-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: [0, 8, 0] }}
                            transition={{ duration: 0.6, delay: 0.5, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.4 }}
                        >
                            <ArrowBigDown className="w-14 h-14 text-green-600" />
                        </motion.div>
                    </div>

                    {/* Final Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white"
                    >
                        <h3 className="text-3xl font-bold mb-4">
                            See You In The Orientation Session!
                        </h3>
                        <p className="text-lg text-white/90">
                            – Team Svastha
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationConfirm21WLYC;
