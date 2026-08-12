import { useEffect, useState } from "react";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";

// Import all sections
import {
    LeaderboardSection,
    JyotiTestimonialSection,
    HowItWorksSection,
    AanchalTestimonialSection,
    WhatYouGetSection,
    MeetYourMentorSection,
    MoreMentorsSection,
    BenefitsSection,
    TransformationsSection,
    WhoIsThisForSection,
    YogaTeachersSection,
    RegisterHereSection,
    FAQSection,
    StickyBottomBar,
    WhatsAppFloatingButton,
} from "@/components/challenge";

import transformation1 from "@/assets/tranformation1.jpeg";
import transformation2 from "@/assets/tranformation2.jpeg";
import transformation3 from "@/assets/tranformation3.jpeg";
import transformation4 from "@/assets/tranformation4.jpeg";
import transformation5 from "@/assets/tranformation5.jpeg";
import transformation6 from "@/assets/tranformation6.jpeg";
import transformation8 from "@/assets/tranformation8.jpeg";
import transformation9 from "@/assets/tranformation9.jpeg";

const transformation = [
    {
        image: transformation5,
        text: "Now I can eat without any tension and enjoy my life. My fatty liver and hypertension are also cured now. Amazing experience. - Ravikant",
    },
    {
        image: transformation8,
        text: "With Sir's guidance, I have lost 20 kg so far and have been maintaining it for the last 6 months. Thank you Sumit Sir. - Sumit",
    },
    {
        image: transformation2,
        text: "Lost 15 kilos without following any strict diet, just ate well and enjoyed life. Thank you Sumit Sir. - Vijay",
    },
    {
        image: transformation1,
        text: "Explained very well and helped me follow through. I didn't even realize I was on a diet. Everyone is amazed that I lost weight while eating everything. This is a great program.",
    },
    {
        image: transformation3,
        text: "I lost 25 kg just by following the golden rules without any strict diet. Thank you Sumit Sir!!! - Namrata",
    },
    {
        image: transformation4,
        text: "Got the results in just 7 days. So happy to have joined this program. - Aditi",
    },
    {
        image: transformation6,
        text: "The journey from 95 kg to 60 kg was not just weight loss for me, it was a complete life change.",
    },
    {
        image: transformation9,
        text: "Lost 12 kg's with the help of Sumit's teachings. Best decision ever. - Rabiya",
    },
];

const PAYMENT_URL = "https://rzp.io/rzp/zWaRqQT";

const detoxFaqs = [
    {
        question: "What will happen after I register?",
        answer: "After registration, you'll receive a confirmation email with access to our WhatsApp group, course materials, and schedule for the live sessions.",
    },
    {
        question: "Is it possible to lose weight within 7 days?",
        answer: "Yes! Our proven detox program helps you cleanse your body and kickstart fat loss in just 7 days through a combination of proper diet, yoga, and lifestyle changes.",
    },
    {
        question: "Is it safe to detox within 7 days?",
        answer: "Absolutely! Our program focuses on natural, sustainable detox through healthy eating and yoga. It's designed by certified experts and is completely safe.",
    },
    {
        question: "What happens after 7 Days?",
        answer: "You'll have learned sustainable habits that you can continue for life. We also offer ongoing support and advanced programs to help you maintain your results.",
    },
    {
        question: "What kind of diet plan will be provided?",
        answer: "You'll get a 7 Day Indian diet plan with natural foods like daal, rice, roti, and sabji. No expensive supplements or exotic ingredients required!",
    },
    {
        question: "When will I receive confirmation email?",
        answer: "You'll receive your confirmation email within 24 hours of registration with all the details to get started.",
    },
    {
        question: "I am in a different country/time zone. How will it work for me?",
        answer: "All live sessions are recorded and available for replay. You can follow the program at your own pace and still get full support through our WhatsApp group.",
    },
    {
        question: "I don't know how to do yoga. Can I join?",
        answer: "Yes! Our program is designed for complete beginners. We'll guide you step-by-step through each yoga pose and provide modifications for all levels.",
    },
    {
        question: "I don't want to do yoga or workout. Will I still benefit?",
        answer: "While yoga enhances results, our diet plan alone can help you detox and feel lighter. However, we highly recommend yoga for better health and faster results.",
    },
    {
        question: "Who should not join this program?",
        answer: "Pregnant women, people with serious medical conditions, or those under 18 should consult their doctor before joining. This program is for healthy adults.",
    },
];

const SevenDayDetoxChallenge = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useMeta({
        title: "7 Day Full Body Detox Challenge | Cleanse & Transform | Svastha",
        description:
            "Join the 7 Day Full Body Detox Challenge. Expert guidance, yoga classes, diet plan. Register for ₹49 only (limited-time offer) .",
        ogTitle: "7 Day Full Body Detox Challenge | Svastha",
        ogDescription:
            "Transform your body in 7 days. Proven detox system with hundreds of success stories. Diet plan + Yoga + WhatsApp support. Register now for ₹49.",
        ogImage: "/src/assets/hero-yoga.jpg",
    });

    const handleRegister = () => {
        toast.success("Redirecting to payment...");
        window.open(PAYMENT_URL, "_blank");
    };

    return (
        <>
            <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25%       { transform: scale(1.05); }
          50%       { transform: scale(1); }
        }

        .detox-challenge-page button {
          animation: heartbeat 1s ease-in-out infinite;
        }

        .detox-challenge-page button[aria-expanded],
        .detox-challenge-page button.no-heartbeat {
          animation: none;
        }
      `}</style>

            <div className="detox-challenge-page min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-x-hidden">
                {/* ── Hero ── */}
                <DetoxHeroSection onRegister={handleRegister} />

                <div style={{ height: "150px" }} />
                <LeaderboardSection />

                <div style={{ height: "150px" }} />
                <JyotiTestimonialSection />

                <div style={{ height: "150px" }} />
                <AanchalTestimonialSection />

                <div style={{ height: "150px" }} />
                <HowItWorksSection />

                <div style={{ height: "150px" }} />
                <WhatYouGetSection scrollToRegistration={handleRegister} isUltimate={true} registerButtonText="Join Now – Rs. 49 Only" dietPlanLabel="7 Day Diet Plan (Weekly)" />

                <div style={{ height: "150px" }} />
                <MeetYourMentorSection scrollToRegistration={handleRegister} />

                <div style={{ height: "150px" }} />
                <MoreMentorsSection />

                <div style={{ height: "150px" }} />
                <BenefitsSection />

                <div style={{ height: "150px" }} />
                <TransformationsSection transformations={transformation} />

                <div style={{ height: "150px" }} />
                <WhoIsThisForSection />

                <div style={{ height: "150px" }} />
                <YogaTeachersSection />

                <div style={{ height: "150px" }} />
                <RegisterHereSection
                    onRegister={handleRegister}
                    originalPrice="₹ 249/-"
                    discountedPrice="₹ 49/-"
                    registerButtonText="Join Now – Rs. 49 Only"
                />

                <div style={{ height: "150px" }} />
                <FAQSection faqs={detoxFaqs} whatsappUrl="https://api.whatsapp.com/send/?phone=15557533653&text=I%20want%20to%20know%20more%20about%207%20Day%20Full%20Body%20Detox%20Challenge&type=phone_number&app_absent=0" />

                <StickyBottomBar
                    onRegisterClick={handleRegister}
                    feeText="Rs. 49/- (Limited Offer)"
                    registerButtonText="Join Now"
                />
                <WhatsAppFloatingButton showImmediately={true} message="I want to know more about 7 Day Full Body Detox Challenge" />
            </div>
        </>
    );
};

/* ─────────────────────────────────────────────────────────────
   Custom Hero Section for the 7-Day Detox Challenge
   Uses the shared HeroSection component with overridden props,
   then renders a custom heading via a wrapper approach.
───────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useAutoIncrementCounter } from "@/hooks/useAutoIncrementCounter";

interface DetoxHeroProps {
    onRegister: () => void;
}

const DetoxHeroSection = ({ onRegister }: DetoxHeroProps) => {
    const peopleCount = useAutoIncrementCounter({
        initialCount: 67833,
        incrementAmount: 8,
        intervalHours: 1,
        startDate: "2026-03-30T18:00:00Z",
    });

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const targetDate = new Date("2026-08-16T00:00:00"); // 16 August 2026
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ days, hours, minutes });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative px-4 bg-white" style={{ paddingTop: "2rem" }}>
            <div style={{ paddingTop: "2rem", paddingBottom: "75px" }}>
                <div className="container mx-auto max-w-7xl">
                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center mb-6 md:mb-12"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-emerald-500 text-3xl md:text-4xl">✦</span>
                            <h1 className="text-3xl md:text-4xl text-emerald-600 tracking-wider">
                                ULTIMATE
                            </h1>
                            <span className="text-emerald-500 text-3xl md:text-4xl">✦</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-emerald-600 mb-2">
                            7 Day Full Body
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-bold text-emerald-600">
                            Detox Challenge
                        </h3>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <div>
                                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                    Lose up to 4 Kg's 🔥
                                </h4>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                    In Just 7 Days!
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3">
                                {[
                                    { label: "With Natural Food Like", value: "Daal, Rice, Roti, Sabji 🌾" },
                                    { label: "Start Burning Fat For", value: "Energy 🔥" },
                                    { label: "Learn 3 Ultimate", value: "Golden Habits 🌟" },
                                    { label: "Learn The", value: "Right Way of Fasting 🍽️" },
                                    { label: "Join Live", value: "Yoga Classes from Home 🧘" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                                        <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                                        <p className="text-lg text-gray-700">
                                            <span className="font-semibold">{item.label}</span> {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="pt-4 md:pl-8">
                                <Button
                                    onClick={onRegister}
                                    size="lg"
                                    className="w-full md:w-auto bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-xl px-12 md:px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Join Now – Rs. 49 Only
                                </Button>

                                {/* Pricing */}
                                <p className="text-center md:text-left mt-3 text-lg font-semibold text-gray-700 md:pl-2">
                                    Fee:{" "}
                                    <span className="text-green-600">Rs. 49/-</span>{" "}
                                    <span className="text-sm font-normal text-gray-500 line-through ml-1">Rs. 249</span>{" "}
                                    <span className="text-xs text-red-500 font-semibold">Limited-Time Offer</span> {" "}

                                </p>

                                {/* Start Date */}
                                <div className="text-center md:text-left mt-12 md:pl-2">
                                    <span className="text-lg font-semibold text-gray-700">Start Date: 16th August (Sunday)</span>
                                </div>

                                {/* Countdown Timer */}
                                <div className="flex items-center justify-center md:justify-start gap-3 mt-4 md:pl-2">
                                    <div className="flex flex-col items-center bg-emerald-50 rounded-lg px-4 py-2 min-w-[70px]">
                                        <span className="text-2xl font-bold text-emerald-600">{timeLeft.days}</span>
                                        <span className="text-xs text-gray-600 font-medium">Days</span>
                                    </div>
                                    <div className="flex flex-col items-center bg-emerald-50 rounded-lg px-4 py-2 min-w-[70px]">
                                        <span className="text-2xl font-bold text-emerald-600">{timeLeft.hours}</span>
                                        <span className="text-xs text-gray-600 font-medium">Hrs</span>
                                    </div>
                                    <div className="flex flex-col items-center bg-emerald-50 rounded-lg px-4 py-2 min-w-[70px]">
                                        <span className="text-2xl font-bold text-emerald-600">{timeLeft.minutes}</span>
                                        <span className="text-xs text-gray-600 font-medium">Min</span>
                                    </div>
                                </div>

                                <p
                                    className="text-center md:text-left text-sm text-emerald-600 font-medium flex items-center justify-center md:justify-start gap-2 md:pl-2"
                                    style={{ marginTop: "15px" }}
                                >
                                    <Users className="w-4 h-4" />
                                    {peopleCount.toLocaleString()} people joined
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column – YouTube Video */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="w-full order-first lg:order-last"
                        >
                            <div
                                className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-100"
                                style={{ paddingBottom: "56.25%" }}
                            >
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/_yLQZu77YB8"
                                    title="7 Day Full Body Detox Challenge"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SevenDayDetoxChallenge;
