import { useEffect, useRef, useState } from "react";
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
  PersonalizedOfferPopup,
  PersonalizedStartNowSection,
} from "@/components/masterclass/PersonalizedStartNow";
import {
  PersonalizedLeadModal,
  type PersonalizedOffer,
} from "@/components/masterclass/PersonalizedLeadModal";
import { FreeConsultationModal } from "@/components/masterclass/FreeConsultationModal";

import {
  JyotiTestimonialSection,
  MeetYourMentorSection,
  TransformationsSection,
  WhoIsThisForSection,
} from "@/components/challenge";

import {
  FREE_CONSULTATION,
  MASTERCLASS,
  PERSONALIZED_START_NOW,
  PRICING,
} from "@/config/masterclass";

const OFFER_SEEN_KEY = "svastha_pers_popup_seen";
const CONSULT_SEEN_KEY = "svastha_consult_popup_seen";

function seen(key: string) {
  try {
    return !!localStorage.getItem(key);
  } catch {
    return false;
  }
}
function markSeen(key: string) {
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/** Which popup is on screen. Only one at a time. */
type Overlay =
  | null
  | "choose"
  | "masterclass"
  | "masterclass-direct"
  | "personalized"
  | "personalized-direct"
  | "offer"
  | "consult";

/**
 * Breathing room between sections. Sumit's note was that the page felt
 * clustered, especially on mobile, so every section gets clear air around it.
 */
const Gap = () => <div className="h-10 bg-white md:h-16" aria-hidden="true" />;

const MasterClass = () => {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [offer, setOffer] = useState<PersonalizedOffer>("regular");
  const overlayRef = useRef<Overlay>(null);
  overlayRef.current = overlay;
  const close = () => setOverlay(null);

  /**
   * Every "Reserve seat" button opens the ₹49 form directly. (A "how would you
   * like to start?" choice screen ran on 15 Nov; nobody picked the dietitian
   * path and it added a step before the ₹49 payment, so Sumit removed it.)
   * The start-now section, the ₹500-off popup and the free-call popup stay.
   */
  const openModal = () => setOverlay("masterclass-direct");
  const startPersonalized = (o: PersonalizedOffer, fromChoice: boolean) => {
    setOffer(o);
    setOverlay(fromChoice ? "personalized" : "personalized-direct");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
   * Two one-time popups, driven by scrolling:
   *  - the ₹500-off offer after 60% of the page;
   *  - "Book a free consultation call" when someone has reached the bottom and
   *    then scrolls back up (they read everything and are still unsure).
   * Neither interrupts another popup or the registration form.
   */
  useEffect(() => {
    let reachedBottomAt: number | null = null;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const y = window.scrollY;
      const ratio = y / max;
      const busy = overlayRef.current !== null;

      if (ratio >= FREE_CONSULTATION.bottomAt) {
        reachedBottomAt = Math.max(reachedBottomAt ?? 0, y);
      }

      if (busy) return;

      if (ratio >= PERSONALIZED_START_NOW.popupAtScroll && !seen(OFFER_SEEN_KEY)) {
        markSeen(OFFER_SEEN_KEY);
        setOverlay("offer");
        return;
      }

      if (
        reachedBottomAt !== null &&
        y < reachedBottomAt - FREE_CONSULTATION.scrollUpPx &&
        !seen(CONSULT_SEEN_KEY)
      ) {
        markSeen(CONSULT_SEEN_KEY);
        setOverlay("consult");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isModalOpen = overlay !== null;

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

      {/* Second path (Sumit, 15 Nov): start the Personalized plan without the class */}
      <PersonalizedStartNowSection onStart={() => startPersonalized("regular", false)} />
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
        isOpen={overlay === "masterclass" || overlay === "masterclass-direct"}
        onClose={close}
        onBack={overlay === "masterclass" ? () => setOverlay("choose") : undefined}
      />

      {(overlay === "personalized" || overlay === "personalized-direct") && (
        <PersonalizedLeadModal
          offer={offer}
          onClose={close}
          onBack={overlay === "personalized" ? () => setOverlay("choose") : undefined}
        />
      )}

      {overlay === "offer" && (
        <PersonalizedOfferPopup
          onClose={close}
          onAccept={() => startPersonalized("popup", false)}
          onMasterClass={() => setOverlay("masterclass-direct")}
        />
      )}

      {overlay === "consult" && <FreeConsultationModal onClose={close} />}
    </div>
  );
};

export default MasterClass;
