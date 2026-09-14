import { useEffect, useState } from "react";
import { useMeta } from "@/hooks/useMeta";

import { MasterClassHero } from "@/components/masterclass/MasterClassHero";
import { AgendaSection } from "@/components/masterclass/AgendaSection";
import { DailyPracticeSection } from "@/components/masterclass/DailyPracticeSection";
import { ValueStackSection } from "@/components/masterclass/ValueStackSection";
import { MasterClassStickyBar } from "@/components/masterclass/MasterClassStickyBar";
import { MasterClassRegistrationModal } from "@/components/masterclass/MasterClassRegistrationModal";

import {
  JyotiTestimonialSection,
  MeetYourMentorSection,
  MoreMentorsSection,
  TransformationsSection,
  WhoIsThisForSection,
  YogaTeachersSection,
  FAQSection,
  WhatsAppFloatingButton,
} from "@/components/challenge";

import { MASTERCLASS, PRICING, WHATSAPP_URL } from "@/config/masterclass";

const FAQS = [
  {
    question: "Is this really live, or a recording?",
    answer:
      `Really live. Sumit runs the session himself on Zoom on ${MASTERCLASS.dateLabel} at ${MASTERCLASS.timeLabel}, and the last stretch is an open Q&A where you can ask about your own situation.`,
  },
  {
    question: "Will you try to sell me something at the end?",
    answer:
      "Yes — and it's fair that you know beforehand. In the last few minutes Sumit explains the 21 Day Challenge and how to join it. You are under no obligation. Plenty of people take the plan from the session, follow it on their own, and get results. That's a perfectly good outcome and the plan is yours either way.",
  },
  {
    question: `Why charge ${PRICING.price} if it's a master class?`,
    answer:
      "Because a free room fills up with people who never turn up. The token fee means everyone in the session actually wants to change something — which makes the Q&A sharper and the group stronger. It also lets us keep the class small enough that questions get answered.",
  },
  {
    question: "I've never fasted before. Can I still join?",
    answer:
      "Yes. The session is built for beginners. Sumit starts from what fasting actually is and how to do it safely around normal Indian meal timings — you don't need any prior experience.",
  },
  {
    question: `What if I can't attend at ${MASTERCLASS.timeLabel}?`,
    answer:
      "Register anyway. The recording is sent to everyone who registers, so you can watch it when it suits you. The live Q&A is the part worth showing up for, but you won't lose the content.",
  },
  {
    question: "I have PCOS, thyroid, diabetes or high BP. Is this for me?",
    answer:
      "These are exactly the situations Sumit works with most. The approach focuses on food, fasting windows and daily movement rather than restriction. If you're on medication, keep taking it and keep your doctor in the loop — nothing here asks you to stop treatment.",
  },
  {
    question: "Do I need to know yoga already?",
    answer:
      "No. Our teachers run the classes for complete beginners and give easier variations for every posture. If you can stand up and sit down, you can start.",
  },
  {
    question: "Will the diet be expensive or hard to cook?",
    answer:
      "It's daal, chawal, roti and sabji — food that's already in your kitchen, cooked the way your family already eats. No supplements, no imported ingredients, no cooking a separate meal for yourself.",
  },
  {
    question: "How do I get the Zoom link?",
    answer:
      "It comes to the WhatsApp number you register with, along with the 21-Day Starter Plan. You'll also get a reminder on the day of the session, so please use a number you actually check.",
  },
  {
    question: "I live outside India. Can I join?",
    answer:
      `Yes. ${MASTERCLASS.timeLabel} works comfortably across the Gulf, and everyone gets the recording. The live yoga classes run on India time, and many of our members abroad join the morning slot or use the recordings.`,
  },
];

const MasterClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: `${MASTERCLASS.name} — ${MASTERCLASS.subtitle} | ${MASTERCLASS.dateLabel}`,
    description:
      `Live 90-minute Master Class with Sumit Sharma on ${MASTERCLASS.dateLabel}, ${MASTERCLASS.timeLabel}. The 5 Golden Rules, the right way to fast, and the full 21-day Indian diet & fasting plan. ${PRICING.price} only.`,
    ogTitle: `${MASTERCLASS.name} — ${MASTERCLASS.subtitle}`,
    ogDescription: `${MASTERCLASS.dateLabel} · ${MASTERCLASS.timeLabel} · Live on Zoom. Learn the 5 Golden Rules and the 21-day Indian diet & fasting plan. ${PRICING.price} only.`,
    // Absolute URL from /public so WhatsApp and Facebook can actually resolve
    // it — the challenge page points at a /src/assets/ path that 404s once built.
    ogImage: "https://campaign.svastha.fit/masterclass-og.jpg",
    twitterImage: "https://campaign.svastha.fit/masterclass-og.jpg",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-24 md:pb-20">
      <MasterClassHero onRegister={openModal} />

      <AgendaSection onRegister={openModal} />

      {/* Proof first and proof often — this is the asset competitors don't have */}
      <JyotiTestimonialSection />

      <DailyPracticeSection />

      <MeetYourMentorSection
        scrollToRegistration={openModal}
        registerButtonText={`Reserve My Seat — ${PRICING.price}`}
      />

      <YogaTeachersSection />

      <MoreMentorsSection />

      <TransformationsSection />

      <WhoIsThisForSection />

      <ValueStackSection onRegister={openModal} />

      <FAQSection faqs={FAQS} whatsappUrl={WHATSAPP_URL} />

      <MasterClassStickyBar onRegister={openModal} hidden={isModalOpen} />
      <WhatsAppFloatingButton showImmediately={true} isModalOpen={isModalOpen} />

      <MasterClassRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MasterClass;
