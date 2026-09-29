import { useCallback, useEffect, useState } from "react";
import { useMeta } from "@/hooks/useMeta";

import {
  AanchalTestimonialSection,
  BenefitsSection,
  JyotiTestimonialSection,
  LeaderboardSection,
  MeetYourMentorSection,
  TransformationsSection,
  WhoIsThisForSection,
  YogaTeachersSection,
} from "@/components/challenge";
import { ChatButton } from "@/components/masterclass/ChatButton";

import { NavFitHero } from "@/components/navfit/NavFitHero";
import {
  NavFitFAQ,
  NavFitHabitsSection,
  NavFitIncludedSection,
  NavFitRegisterCard,
  NavFitStickyBar,
  NavFitTimelineSection,
  NavFitWhySection,
} from "@/components/navfit/NavFitSections";
import { NavFitRegistrationModal } from "@/components/navfit/NavFitRegistrationModal";
import { NavFitOfferPopup } from "@/components/navfit/NavFitOfferPopup";
import { NAVFIT, NAVFIT_CHAT_MESSAGE, NAVFIT_PRICING, type NavFitTier } from "@/config/navfit";

/**
 * Nav Fit Challenge — 9 day guided Navratri fasting program.
 *
 * Proof, mentor, yoga-teacher and leaderboard sections are the same ones the
 * Ultimate 21 Day Weight Loss Challenge page uses. Everything specific to
 * Navratri (dates, 9 Golden Habits, price, popup) lives in config/navfit.ts.
 *
 * No WhatsApp chat anywhere — Instagram / Messenger only (Sumit's rule).
 */
const Gap = () => <div className="h-10 bg-white md:h-16" aria-hidden="true" />;

const NavFitChallenge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tier, setTier] = useState<NavFitTier>("standard");
  const [hasOpenedForm, setHasOpenedForm] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  // Once someone claims ₹399, every button keeps that price for the visit.
  const [offerClaimed, setOfferClaimed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: `${NAVFIT.name} — 9 Day Weight Loss Challenge | ${NAVFIT.datesShort} | Svastha`,
    description: `A 9 day weight loss challenge with Sumit Sharma, ${NAVFIT.datesShort} — with or without the Navratri vrat. Live orientation on ${NAVFIT.orientationDateLabel} at ${NAVFIT.orientationTimeLabel}, the 9 Ultimate Golden Habits, a Navratri or regular diet plan and daily live yoga. ${NAVFIT_PRICING.standard.price}.`,
    ogTitle: `${NAVFIT.name} — 9 Day Weight Loss Challenge`,
    ogDescription: `9 days · ${NAVFIT.datesShort} · 9 Golden Habits · Daily live yoga · ${NAVFIT_PRICING.standard.price}`,
    ogImage: `https://img.youtube.com/vi/gBowL78VcXo/maxresdefault.jpg`,
    twitterImage: `https://img.youtube.com/vi/gBowL78VcXo/maxresdefault.jpg`,
  });

  const openRegistration = useCallback((next: NavFitTier = "standard") => {
    setTier(next);
    setHasOpenedForm(true);
    setIsModalOpen(true);
  }, []);

  const register = () => openRegistration(offerClaimed ? "offer" : "standard");
  const priceLabel = offerClaimed ? NAVFIT_PRICING.offer.price : NAVFIT_PRICING.standard.price;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-24 md:pb-0">
      <NavFitHero onRegister={register} priceLabel={priceLabel} />

      {/* A 9-day result, for a 9-day program */}
      <AanchalTestimonialSection />
      <Gap />

      <NavFitWhySection onRegister={register} priceLabel={priceLabel} />
      <Gap />

      <NavFitTimelineSection />

      <Gap />

      <NavFitIncludedSection onRegister={register} priceLabel={priceLabel} />

      <NavFitHabitsSection />
      <Gap />

      <JyotiTestimonialSection />
      <Gap />

      <LeaderboardSection />
      <Gap />

      <WhoIsThisForSection />
      <Gap />

      <MeetYourMentorSection
        scrollToRegistration={register}
        registerButtonText={`Join the Nav Fit Challenge — ${priceLabel}`}
      />
      <Gap />

      <YogaTeachersSection />
      <Gap />

      <BenefitsSection />
      <Gap />

      <TransformationsSection />

      <NavFitRegisterCard onRegister={register} priceLabel={priceLabel} />

      <NavFitFAQ />

      <NavFitRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tier={tier} />

      <NavFitOfferPopup
        suppressed={hasOpenedForm}
        onClaim={() => {
          setOfferClaimed(true);
          openRegistration("offer");
        }}
        onVisibilityChange={setIsOfferOpen}
      />

      <NavFitStickyBar onRegister={register} priceLabel={priceLabel} hidden={isModalOpen || isOfferOpen} />
      <ChatButton hidden={isModalOpen || isOfferOpen} message={NAVFIT_CHAT_MESSAGE} />
    </div>
  );
};

export default NavFitChallenge;
