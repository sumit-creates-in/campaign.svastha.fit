import { useCallback, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Calendar, MessageCircle, UserCheck, Video } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

import {
  AanchalTestimonialSection,
  BenefitsSection,
  FAQSection,
  HowItWorksSection,
  JyotiTestimonialSection,
  LeaderboardSection,
  MeetYourMentorSection,
  TransformationsSection,
  WhoIsThisForSection,
  YogaTeachersSection,
} from "@/components/challenge";
import { AgendaSection } from "@/components/masterclass/AgendaSection";
import { ConditionsSection } from "@/components/masterclass/ConditionsSection";
import { ChatButton } from "@/components/masterclass/ChatButton";

import { UsMasterClassHero } from "@/components/us-masterclass/UsMasterClassHero";
import { UsRegistrationModal } from "@/components/us-masterclass/UsRegistrationModal";
import { UsOfferPopup } from "@/components/us-masterclass/UsOfferPopup";
import { UsRegisterCard, UsStickyBar } from "@/components/us-masterclass/UsRegisterBlocks";
import { US_MASTERCLASS, US_PRICING, type UsPriceTier } from "@/config/usMasterclass";

/**
 * US Master Class — built from the International 21 Day Challenge page.
 *
 * Kept: intro video, US testimonial, leaderboard, testimonials, mentor,
 * benefits, transformations, who-it's-for, yoga teachers, FAQ layout.
 * Changed: the offer. This page sells a $19 seat in a live Master Class, so
 * the plan-picker modals, the "dedicated dietitian" section and the seat
 * counters (which read the India challenge's numbers) are gone.
 */

const usFaqs = [
  {
    question: "Is this really live, or a recording?",
    answer: `Really live. Sumit runs the session himself on Zoom — ${US_MASTERCLASS.dateLabel}, ${US_MASTERCLASS.timeLabelLong}. The last stretch is an open Q&A where you can ask about your own situation.`,
  },
  {
    question: "What happens after I pay?",
    answer:
      "You land straight on a confirmation page with the link to our WhatsApp group. Please join it — your Zoom link, the starter plan and your reminders are all shared there. Stripe also emails you a receipt right away.",
  },
  {
    question: "What if I can't attend live?",
    answer:
      "Register anyway. The recording is shared with everyone who registers, so you can watch when it suits you. The live Q&A is the part worth showing up for, but you won't lose the content.",
  },
  {
    question: "Will the diet plan work with food available in the USA & Canada?",
    answer:
      "Yes.\n\nThe plan is based on simple Indian food that is easy to find across the USA and Canada — plus how to handle the office lunch, the Costco run and eating out without undoing your week.\n\nNo expensive supplements, meal replacements or special products.",
  },
  {
    question: "Will you try to sell me something at the end?",
    answer:
      "Yes — and it's fair you know beforehand. In the last few minutes Sumit explains the 21 Day Challenge and how to join it. You're under no obligation. Plenty of people take the plan from the session and follow it on their own.",
  },
  {
    question: `Why charge ${US_PRICING.standard.price}?`,
    answer:
      "Because a free room fills up with people who never turn up. A small fee means everyone in the session genuinely wants to change something — which makes the Q&A sharper and keeps the group small enough for questions to get answered.",
  },
  {
    question: "I work long hours. Will I be able to follow this?",
    answer:
      "Yes.\n\nThe plan is built for busy professionals, business owners, parents and homemakers. It focuses on simple changes to what and when you eat, not complicated routines.",
  },
  {
    question: "I've never fasted before. Can I still join?",
    answer:
      "Yes. The session is built for beginners. Sumit starts from what fasting actually is and how to do it safely around a normal work day.",
  },
  {
    question: "Is this a crash diet?",
    answer:
      "No.\n\nIt's built on proper nutrition, intermittent fasting, yoga and habits you can keep. The goal is long-term health, not a quick number on the scale.",
  },
  {
    question: "I have diabetes, thyroid, PCOS, fatty liver or high blood pressure. Can I join?",
    answer:
      "Yes — people managing these conditions are a large part of who we work with, and you can tell us about yours when you register.\n\nNothing here asks you to stop or change any medication, and this is nutrition, fasting and yoga guidance rather than medical treatment. If you are under care for a condition, please check with your doctor before changing your diet.",
  },
  {
    question: "Who should not join?",
    answer:
      "If you are pregnant, under 18, or being treated for a serious medical condition, please speak to your doctor first. The session is designed for healthy adults.",
  },
];

const UsMasterClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tier, setTier] = useState<UsPriceTier>("standard");
  const [hasOpenedForm, setHasOpenedForm] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  // Once someone claims the $14 offer, every button honours it for the rest
  // of the visit — closing the form must not quietly put them back on $19.
  const [offerClaimed, setOfferClaimed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: `${US_MASTERCLASS.subtitle} for Indians in the USA — ${US_MASTERCLASS.dateLabel} | Svastha`,
    description: `A 90-minute live Master Class with Sumit Sharma on Zoom — ${US_MASTERCLASS.dateLabel}, ${US_MASTERCLASS.timeLabel}. The 5 Golden Rules, the right way to fast around a US work day, and the 21-day Indian diet plan. ${US_PRICING.standard.price} per seat.`,
    ogTitle: `Live Master Class for Indians in the USA — ${US_MASTERCLASS.dateLabel}`,
    ogDescription: `${US_MASTERCLASS.timeLabel} · Live on Zoom with Sumit Sharma. ${US_PRICING.standard.price} per seat.`,
    ogImage: "https://campaign.svastha.fit/masterclass-og.jpg",
    twitterImage: "https://campaign.svastha.fit/masterclass-og.jpg",
  });

  const openRegistration = useCallback((nextTier: UsPriceTier = "standard") => {
    setTier(nextTier);
    setHasOpenedForm(true);
    setIsModalOpen(true);
  }, []);

  const register = () => openRegistration(offerClaimed ? "offer" : "standard");

  return (
    <>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.05); }
          50% { transform: scale(1); }
        }
        .ultimate-challenge-page button { animation: heartbeat 1s ease-in-out infinite; }
        .ultimate-challenge-page button[aria-expanded],
        .ultimate-challenge-page button.no-heartbeat { animation: none; }
        @media (prefers-reduced-motion: reduce) {
          .ultimate-challenge-page button { animation: none; }
        }
      `}</style>

      <div className="ultimate-challenge-page min-h-screen overflow-x-hidden bg-gradient-to-b from-emerald-50 via-white to-teal-50 pb-20 md:pb-0">
        <UsMasterClassHero onRegister={register} />

        <div style={{ height: "150px" }} />
        <AanchalTestimonialSection
          heading={
            <>
              Shwetha from{" "}
              <ReactCountryFlag countryCode="US" svg style={{ width: "0.9em", height: "0.9em" }} />{" "}
              US, Lost 5.5 kg (12 lbs) in 4 Weeks 😱
            </>
          }
          subHeading="Watch her unbelievable journey!"
          videoUrl="https://www.youtube.com/embed/E2wElxslK5E"
        />

        <div style={{ height: "150px" }} />
        <AgendaSection onRegister={register} priceLabel={US_PRICING.standard.price} />

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
            { icon: UserCheck, title: "Register", desc: `Reserve your seat for ${US_PRICING.standard.price}.` },
            { icon: MessageCircle, title: "Join the group", desc: "Join the WhatsApp group on the confirmation page — your Zoom link is shared there." },
            { icon: Video, title: "Attend live", desc: `${US_MASTERCLASS.dateLabel}, ${US_MASTERCLASS.timeLabel}, on Zoom.` },
            { icon: Calendar, title: "Start your 21 days", desc: "Walk away with the plan and start the next morning." },
          ]}
        />

        <div style={{ height: "150px" }} />
        <ConditionsSection onRegister={register} priceLabel={US_PRICING.standard.price} />

        <div style={{ height: "150px" }} />
        <AanchalTestimonialSection />

        <div style={{ height: "150px" }} />
        <MeetYourMentorSection
          scrollToRegistration={register}
          registerButtonText={`Reserve My Seat — ${US_PRICING.standard.price}`}
        />

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
        <UsRegisterCard onRegister={register} />

        <div style={{ height: "150px" }} />
        <FAQSection faqs={usFaqs} />

        <UsRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tier={tier} />

        <UsOfferPopup
          suppressed={hasOpenedForm}
          onClaim={() => {
            setOfferClaimed(true);
            openRegistration("offer");
          }}
          onVisibilityChange={setIsOfferOpen}
        />

        <UsStickyBar onRegister={register} hidden={isModalOpen || isOfferOpen} />
        <ChatButton hidden={isModalOpen || isOfferOpen} />
      </div>
    </>
  );
};

export default UsMasterClass;
