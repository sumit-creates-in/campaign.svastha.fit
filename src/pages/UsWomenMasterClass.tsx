import { useCallback, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useMeta } from "@/hooks/useMeta";

import {
  AanchalTestimonialSection,
  JyotiTestimonialSection,
  MeetYourMentorSection,
  TransformationsSection,
} from "@/components/challenge";
import { defaultTransformations } from "@/components/challenge/TransformationsSection";
import { AgendaSection } from "@/components/masterclass/AgendaSection";
import { ConditionsSection } from "@/components/masterclass/ConditionsSection";
import { ChatButton } from "@/components/masterclass/ChatButton";

import { UsRegistrationModal } from "@/components/us-masterclass/UsRegistrationModal";
import { UsOfferPopup } from "@/components/us-masterclass/UsOfferPopup";
import { UsStickyBar } from "@/components/us-masterclass/UsRegisterBlocks";
import { TestModeBar } from "@/components/us-masterclass/TestModeBar";

import { UsWomenHero } from "@/components/us-women-mc/UsWomenHero";
import { UsWomenWhoIsThisFor } from "@/components/us-women-mc/UsWomenWhoIsThisFor";
import { UsWomenValueStack } from "@/components/us-women-mc/UsWomenValueStack";
import { UsWomenFAQ } from "@/components/us-women-mc/UsWomenFAQ";

import { US_MASTERCLASS, US_PRICING, isUsTestMode, type UsPriceTier } from "@/config/usMasterclass";

/**
 * US Master Class for women (Sumit, 20 Nov 2026).
 *
 * A copy of the India /masterclass design (hero, agenda, proof, who-it's-for,
 * conditions, mentor, transformations, value stack, FAQ), reworded for Indian
 * women living in the USA & Canada, in English, with US times and Stripe in
 * dollars. Registration, the $14 scroll offer and the sticky bar are the US
 * funnel pieces built on 22 Sep (Stripe Payment Links + automator webhooks).
 *
 * Left out on purpose: the India daily-yoga timings, the ₹ Personalized
 * start-now section and popups, the seat counter (it reads India numbers),
 * and the WhatsApp chat button (Sumit's rule).
 */

/** Women only: the shared list also has three men's stories. */
const WOMEN_TRANSFORMATIONS = defaultTransformations.filter(
  (t) => !/- (Vijay|Ravikant|Sumit)\s*$/.test(t.text),
);

const Gap = () => <div className="h-10 bg-white md:h-16" aria-hidden="true" />;

const UsWomenMasterClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tier, setTier] = useState<UsPriceTier>("standard");
  const [hasOpenedForm, setHasOpenedForm] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  // Once someone claims the $14 offer, every button honours it for the visit.
  const [offerClaimed, setOfferClaimed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: `${US_MASTERCLASS.subtitle} for Indian Women in the USA — ${US_MASTERCLASS.dateLabel} | Svastha`,
    description: `A 90-minute live Master Class for women with Sumit Sharma on Zoom — ${US_MASTERCLASS.dateLabel}, ${US_MASTERCLASS.timeLabel}. The 5 Golden Rules, the right way to fast around a US day, and the 21-day Indian diet plan. ${US_PRICING.standard.price} per seat.`,
    ogTitle: `Live Weight Loss Master Class for Indian Women in the USA — ${US_MASTERCLASS.dateLabel}`,
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
  const price = offerClaimed ? US_PRICING.offer.price : US_PRICING.standard.price;
  const busy = isModalOpen || isOfferOpen;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-24 md:pb-20">
      {isUsTestMode() && (
        <TestModeBar note="Stripe sandbox — pay with 4242 4242 4242 4242, any future date, any CVC." />
      )}

      <UsWomenHero onRegister={register} price={price} />
      <Gap />

      <AgendaSection onRegister={register} priceLabel={price} />
      <Gap />

      {/* Proof from women in the USA first */}
      <AanchalTestimonialSection
        heading={
          <>
            Shwetha from{" "}
            <ReactCountryFlag countryCode="US" svg style={{ width: "0.9em", height: "0.9em" }} />{" "}
            US, Lost 5.5 kg (12 lbs) in 4 Weeks
          </>
        }
        subHeading="Watch her journey"
        videoUrl="https://www.youtube.com/embed/E2wElxslK5E"
      />
      <Gap />

      <UsWomenWhoIsThisFor />
      <Gap />

      <AanchalTestimonialSection
        heading="Hear What Kavitha, Saritha & Veena Have to Say"
        subHeading=""
        videoUrl="https://www.youtube.com/embed/o-H24IM-emE"
      />
      <Gap />

      <ConditionsSection onRegister={register} priceLabel={price} />
      <Gap />

      <JyotiTestimonialSection />
      <div className="h-16 bg-white md:h-24" aria-hidden="true" />

      <MeetYourMentorSection
        scrollToRegistration={register}
        registerButtonText={`Reserve My Seat — ${price}`}
      />
      <Gap />

      <TransformationsSection transformations={WOMEN_TRANSFORMATIONS} />
      <Gap />

      <UsWomenValueStack onRegister={register} price={price} />
      <Gap />

      <UsWomenFAQ />

      <UsRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tier={tier} />

      <UsOfferPopup
        suppressed={hasOpenedForm}
        onClaim={() => {
          setOfferClaimed(true);
          openRegistration("offer");
        }}
        onVisibilityChange={setIsOfferOpen}
      />

      <UsStickyBar onRegister={register} hidden={busy} />
      <ChatButton hidden={busy} />
    </div>
  );
};

export default UsWomenMasterClass;
