import { useEffect, useState } from "react";
import { useMeta } from "@/hooks/useMeta";

import { MasterClassHero } from "@/components/masterclass/MasterClassHero";
import { AgendaSection } from "@/components/masterclass/AgendaSection";
import { DailyYogaSection } from "@/components/masterclass/DailyYogaSection";
import { ConditionsSection } from "@/components/masterclass/ConditionsSection";
import { ValueStackSection } from "@/components/masterclass/ValueStackSection";
import { MasterClassFAQ } from "@/components/masterclass/MasterClassFAQ";
import { MasterClassStickyBar } from "@/components/masterclass/MasterClassStickyBar";
import { MasterClassRegistrationModal } from "@/components/masterclass/MasterClassRegistrationModal";
import { ChatButton } from "@/components/masterclass/ChatButton";

import {
  JyotiTestimonialSection,
  MeetYourMentorSection,
  TransformationsSection,
  WhoIsThisForSection,
} from "@/components/challenge";

import { MASTERCLASS, PRICING } from "@/config/masterclass";

/**
 * Breathing room between sections. Sumit's note was that the page felt
 * clustered, especially on mobile, so every section gets clear air around it.
 */
const Gap = () => <div className="h-10 bg-white md:h-16" aria-hidden="true" />;

const MasterClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: `${MASTERCLASS.name} — ${MASTERCLASS.subtitle} | ${MASTERCLASS.dateLabel}`,
    description: `Live 90-minute Master Class with Sumit Sharma on ${MASTERCLASS.dateLabel}, ${MASTERCLASS.timeLabel}. The 5 Golden Rules, the right way to fast, and the full 21-day Indian diet & fasting plan. ${PRICING.price} only.`,
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
      <Gap />

      <AgendaSection onRegister={openModal} />
      <Gap />

      {/* Proof early and proof often — the asset competitors don't have */}
      <JyotiTestimonialSection />
      <div className="h-16 bg-white md:h-24" aria-hidden="true" />

      <WhoIsThisForSection />
      <Gap />

      <ConditionsSection onRegister={openModal} />
      <Gap />

      {/* What you actually do every day, and who you'll do it with */}
      <DailyYogaSection />
      <Gap />

      <MeetYourMentorSection
        scrollToRegistration={openModal}
        registerButtonText={`Reserve My Seat — ${PRICING.price}`}
      />
      <Gap />

      <TransformationsSection />
      <Gap />

      <ValueStackSection onRegister={openModal} />
      <Gap />

      <MasterClassFAQ />

      <MasterClassStickyBar onRegister={openModal} hidden={isModalOpen} />
      <ChatButton hidden={isModalOpen} />

      <MasterClassRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MasterClass;
