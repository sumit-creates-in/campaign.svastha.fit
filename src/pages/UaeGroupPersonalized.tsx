import { useEffect, useState } from "react";
import { useMeta } from "@/hooks/useMeta";
import { toast } from "sonner";
import ReactCountryFlag from "react-country-flag";

// ─── Limited-Time Offer configuration ────────────────────────────────────────
// Offer ends July 24 2026 at 1:30 PM IST  = 09:00 AM UTC  = 1:00 PM Gulf (UTC+4)
const OFFER_END_UTC = new Date("2026-07-24T09:00:00Z");

// Gulf timezone offset: UTC+4 (used for display reference)
// Timer displays in Gulf time

function getGulfTimeLeft() {
    const nowUTC = Date.now();
    const diff = OFFER_END_UTC.getTime() - nowUTC;
    if (diff <= 0) return null;
    const totalSecs = Math.floor(diff / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return { hours, minutes, seconds };
}

function useOfferActive() {
    const [offerActive, setOfferActive] = useState(() => Date.now() < OFFER_END_UTC.getTime());
    const [timeLeft, setTimeLeft] = useState(getGulfTimeLeft);

    useEffect(() => {
        const tick = () => {
            const remaining = getGulfTimeLeft();
            setTimeLeft(remaining);
            setOfferActive(remaining !== null);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return { offerActive, timeLeft };
}

// Import all sections
import {
    HeroSection,
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
    ScrollPopupModal,
    UpgradeModal,
} from "@/components/challenge";
import { Calendar, ClipboardList, UserCheck, Users } from "lucide-react";

const globalFaqs = [
    {
        question: "I live in UAE / Saudi Arabia / Qatar / Oman / Bahrain / Kuwait. Can I still join?",
        answer: "Absolutely!\n\nThis program is designed for Indians living both in India and abroad. We already have participants joining from multiple countries.\n\nYou can follow the program comfortably from your location and receive guidance throughout the challenge."
    },
    {
        question: "Will the diet plan work with food available in Gulf countries?",
        answer: "Yes.\n\nThe diet plan is based on simple Indian foods that are easily available across UAE, Saudi Arabia, Qatar, Oman, Bahrain and Kuwait.\n\nYou won't need expensive supplements, meal replacements or special products."
    },
    {
        question: "What will happen after I register?",
        answer: "After registration, you'll receive a confirmation email with access to our WhatsApp group, course materials, and schedule for the live sessions."
    },
    {
        question: "Is it possible to lose weight within 21 days?",
        answer: "Yes! Our proven program has helped 6733+ people lose an average of 7.5 kg in 21 days through a combination of proper diet, yoga, and lifestyle changes."
    },
    {
        question: "Is it safe to lose weight within 21 days?",
        answer: "Absolutely! Our program focuses on natural, sustainable weight loss through healthy eating and yoga. It's designed by certified experts and is completely safe."
    },
    {
        question: "What happens after 21 Days?",
        answer: "You'll have learned sustainable habits that you can continue for life. We also offer ongoing support and advanced programs to help you maintain your results."
    },
    {
        question: "What kind of diet plan will be provided?",
        answer: "You'll get a personalized Indian diet plan with natural foods like daal, rice, roti, and sabji. No expensive supplements or exotic ingredients required!"
    },
    {
        question: "When will I receive confirmation email?",
        answer: "You'll receive your confirmation email within 24 hours of registration with all the details to get started."
    },
    {
        question: "What if I cannot attend the live sessions?",
        answer: "No problem.\n\nAll important sessions are recorded and shared with participants so you can watch them at your convenience."
    },
    {
        question: "I am in different country/time zone. How will it work for me?",
        answer: "All live sessions are recorded and available for replay. You can follow the program at your own pace and still get full support through our WhatsApp group."
    },
    {
        question: "I don't know how to do yoga. Can I join?",
        answer: "Yes! Our program is designed for complete beginners. We'll guide you step-by-step through each yoga pose and provide modifications for all levels."
    },
    {
        question: "I don't want to do yoga or workout. Will I still lose weight?",
        answer: "While yoga enhances results, our diet plan alone can help you lose weight. However, we highly recommend yoga for better health and faster results."
    },
    {
        question: "I work long hours. Will I be able to follow this program?",
        answer: "Yes.\n\nThe program is specifically designed for busy professionals, business owners, parents and homemakers.\n\nMost participants spend very little extra time following the plan because it focuses on simple lifestyle changes rather than complicated routines."
    },
    {
        question: "Is this a crash diet?",
        answer: "No.\n\nThis is a healthy lifestyle transformation program based on proper nutrition, intermittent fasting, yoga and sustainable habits.\n\nThe goal is not just weight loss but long-term health improvement."
    },
    {
        question: "Do I need to buy supplements, protein powders or special foods?",
        answer: "No.\n\nThe program focuses on real food and practical habits.\n\nMost participants can follow the plan using ingredients they already buy for their household."
    },
    {
        question: "Who should not join this program?",
        answer: "Pregnant women, people with serious medical conditions, or those under 18 should consult their doctor before joining. This program is for healthy adults."
    },
    {
        question: "I have diabetes, thyroid, PCOS, fatty liver or high blood pressure. Can I join?",
        answer: "Many participants with lifestyle-related health conditions have successfully completed the program.\n\nHowever, if you have a medical condition or are taking medication, we recommend consulting your doctor before starting any weight loss program."
    },
    {
        question: "Is WhatsApp support available internationally?",
        answer: "Yes.\n\nWhatsApp support is available for participants joining from Gulf countries and other parts of the world."
    }
];

const UaeGroupPersonalized = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrollModalOpen, setIsScrollModalOpen] = useState(false);
    const { offerActive, timeLeft } = useOfferActive();

    // ── Offer prices ──────────────────────────────────────────────────────────
    // Group plan (UpgradeModal "join group" / HeroSection fee):
    //   Normal AED 99 → Offer AED 59
    // Personalized plan (UpgradeModal "upgrade"):
    //   Normal AED 199 → Offer AED 149
    // Scroll popup personalized:
    //   Normal AED 179 → Offer AED 139
    // Scroll popup group:
    //   Normal AED 79 → Offer AED 49

    const groupPrice = offerActive ? "AED 59" : "AED 99";
    const personalizedPrice = offerActive ? "AED 149" : "AED 199";
    const scrollPersonPrice = offerActive ? "AED 139" : "AED 179";
    const scrollGroupPrice = offerActive ? "AED 49" : "AED 79";

    const groupUrl = offerActive
        ? "https://buy.stripe.com/14A00j4WI9mUbRV3Vu5c41l"   // AED 59
        : "https://buy.stripe.com/bJe8wP60M1Us3lp2Rq5c41j";  // AED 99 (normal)

    const personalizedUrl = offerActive
        ? "https://buy.stripe.com/3cI4gz74QdDa4pt63C5c40W"   // AED 149
        : "https://buy.stripe.com/6oUcN54WI1Us3lpgIg5c41b";  // AED 199 (normal)

    const scrollPersonUrl = offerActive
        ? "https://buy.stripe.com/3cIfZh74Q2Ywg8b8bK5c41m"   // AED 139
        : "https://buy.stripe.com/9B6dR960MdDa8FJ9fO5c41c";  // AED 179 (normal)

    const scrollGroupUrl = offerActive
        ? "https://buy.stripe.com/3cI6oH88U6aIaNR9fO5c40V"   // AED 49
        : "https://buy.stripe.com/eVq8wP88U56EaNR77G5c41k";  // AED 79 (normal)

    // Countdown label for Gulf time
    const countdownLabel = timeLeft
        ? `${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`
        : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useMeta({
        title: "Global 21 Day Weight Loss Challenge | Lose up to 10 Kg | Svastha",
        description: "Join the Global 21 Day Weight Loss Challenge in UAE. 4067+ transformations, 7.5 kg average loss, 98% success rate. Expert guidance, diet plans, yoga classes. Register for 39 AED.",
        ogTitle: "Global 21 Day Weight Loss Challenge | Svastha",
        ogDescription: "Transform your body in 21 days. Proven system with 4067+ success stories. Diet plan + Yoga + WhatsApp support. Register now for AED 39.",
        ogImage: "/src/assets/hero-yoga.jpg",
    });

    const scrollToRegistration = () => {
        setIsModalOpen(true);
    };

    const handleUpgrade = () => {
        setIsModalOpen(false);
        toast.success("Redirecting to upgrade payment...");

    };

    const handleJoinGroup = () => {
        setIsModalOpen(false);
        toast.success("Redirecting to payment...");

    };

    return (
        <>
            <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1);
          }
        }
        
        .ultimate-challenge-page button {
          animation: heartbeat 1s ease-in-out infinite;
        }
        
        .ultimate-challenge-page button[aria-expanded],
        .ultimate-challenge-page button.no-heartbeat {
          animation: none;
        }
      `}</style>
            <div className="ultimate-challenge-page min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-x-hidden">
                <HeroSection scrollToRegistration={scrollToRegistration} feeText={groupPrice} isGlobal={true} videoId="0NBiGEJodyc" registerButtonText="Register Now" timerEndDate="2026-07-24T09:00:00Z" />

                <div style={{ height: "150px" }} />
                <AanchalTestimonialSection
                    heading={<>Shwetha from <ReactCountryFlag countryCode="US" svg style={{ width: "0.9em", height: "0.9em" }} /> US, Lost 5.5 kg in 4 Weeks 😱</>}
                    subHeading="Watch her unbelievable journey!"
                    videoUrl="https://www.youtube.com/embed/E2wElxslK5E"
                />
                <div style={{ height: "150px" }} />
                <LeaderboardSection />
                <div style={{ height: "150px" }} />
                <AanchalTestimonialSection
                    heading="See What Kavitha, Saritha & Veena has to say about us ♥️"
                    subHeading=""
                    videoUrl="https://www.youtube.com/embed/o-H24IM-emE"
                />

                <div style={{ height: "150px" }} />
                <HowItWorksSection
                    steps={[
                        {
                            icon: UserCheck,
                            title: "Register",
                            desc: "Register for your personalised challenge.",
                        },
                        {
                            icon: Calendar,
                            title: "Onboarding",
                            desc: "Consult with an expert dietitian. Get your personalised plan.",
                        },
                        {
                            icon: ClipboardList,
                            title: "Follow The Plan",
                            desc: "Start following the plan from next day. Get daily reminders & motivation via WhatsApp Group.",
                        },
                        {
                            icon: Users,
                            title: "Transform",
                            desc: "Track progress on the LIVE leaderboard & push yourself to the top!",
                        },
                    ]}
                />
                <div style={{ height: "150px" }} />
                <AanchalTestimonialSection
                />
                <div style={{ height: "150px" }} />
                <WhatYouGetSection scrollToRegistration={scrollToRegistration} isUae={true} />
                <div style={{ height: "150px" }} />
                <MeetYourMentorSection scrollToRegistration={scrollToRegistration} />
                <div style={{ height: "150px" }} />
                <MoreMentorsSection />
                <div style={{ height: "150px" }} />
                <JyotiTestimonialSection />
                <div style={{ height: "150px" }} />
                <BenefitsSection />
                <div style={{ height: "150px" }} />
                <TransformationsSection />
                <div style={{ height: "150px" }} />
                <WhoIsThisForSection />
                <div style={{ height: "150px" }} />
                <YogaTeachersSection />
                <div style={{ height: "150px" }} />
                <RegisterHereSection onRegister={scrollToRegistration} originalPrice="AED 399" discountedPrice={groupPrice} />
                <div style={{ height: "150px" }} />
                <FAQSection faqs={globalFaqs} />
                <UpgradeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpgrade={handleUpgrade}
                    onJoinGroup={handleJoinGroup}
                    upgradeUrl={personalizedUrl}
                    joinGroupUrl={groupUrl}
                    upgradePriceText={personalizedPrice}
                    groupPriceText={groupPrice}
                    joinGroupButtonText={`Continue with Group Plan – Pay ${groupPrice}`}
                    UpgradePay="Upgrade & Pay"
                    startDateText="26th July"
                    isGlobal={true}
                    timerEndDate="2026-07-24T09:00:00Z"
                />
                <ScrollPopupModal
                    onUpgrade={handleUpgrade}
                    onJoinGroup={handleJoinGroup}
                    upgradeUrl={scrollPersonUrl}
                    joinGroupUrl={scrollGroupUrl}
                    personalDiscountText="AED 10 off"
                    personalPriceText={scrollPersonPrice}
                    groupDiscountText="AED 10 off"
                    groupPriceText={scrollGroupPrice}
                    joinGroupButtonText={`Continue with Group Plan – Pay ${scrollGroupPrice}`}
                    startDateText="26th July"
                    isGlobal={true}
                    onVisibilityChange={setIsScrollModalOpen}
                    timerEndDate="2026-07-24T09:00:00Z"
                />
                <StickyBottomBar onRegisterClick={scrollToRegistration} feeText={groupPrice} registerButtonText="Regiter Now" />
                <WhatsAppFloatingButton
                    showImmediately={true}
                    isModalOpen={isModalOpen || isScrollModalOpen}
                    message="I want to know more about Global 21 Day Weight Loss Challenge"
                />
            </div>
        </>
    );
};

export default UaeGroupPersonalized;
