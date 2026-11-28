import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { CHALLENGE_PLANS, isEarlyBird } from "@/config/challengeOffer";
import { INDIA_BATCH } from "@/config/masterclass";
import { U21PlanChooser } from "@/components/challenge/U21PlanChooser";
import { ConsultationFunnelForm } from "@/components/challenge/ConsultationFunnelForm";
import { UltimateHero } from "@/components/challenge/UltimateHero";
import { SushilStorySection } from "@/components/challenge/SushilStorySection";
import { Overlay } from "@/components/masterclass/leadFormBits";
import {
  AanchalTestimonialSection,
  BenefitsSection,
  FAQSection,
  HowItWorksSection,
  JyotiTestimonialSection,
  LeaderboardSection,
  MeetYourMentorSection,
  MoreMentorsSection,
  TransformationsSection,
  WhatYouGetSection,
  WhatsAppFloatingButton,
  WhoIsThisForSection,
  YogaTeachersSection,
} from "@/components/challenge";
import { openWhatsApp } from "@/lib/whatsapp";

/**
 * /21-day-free-consultation — a free consultation call FOR the Ultimate 21 Day Weight Loss Challenge
 * (Sumit, 26 Nov 2026). Identical to /Ultimate-21-day-weight-loss-challenge (same intro video and
 * sections) so people know what the call is about; every button books the free call instead of
 * registering, and no prices are shown. Prices appear only if someone asks to "see the plans"
 * after booking. Meta: the Lead event here is what the consultation campaign optimises for.
 */

const WA_MESSAGE = "Hi, I want a consultation call for the Ultimate 21 Day Weight Loss Challenge.";
// No "free" anywhere (Sumit, 27 Nov 2026): callers thought the challenge itself was free.
const BOOK = "Book Consultation Call";

const FAQS = [
  {
    question: "Is there a charge for the call? Is the challenge paid?",
    answer:
      "The 15-minute call has no charge. The Ultimate 21 Day Weight Loss Challenge itself is a paid programme — on the call we explain both plans and their fees, and you decide in your own time.",
  },
  {
    question: "What will we talk about on the call?",
    answer:
      "Your goal, your daily routine, what you eat, any health condition and what you have tried before. Then we explain how the 21 Day Challenge would work for you and which plan fits — the Group Plan or the Personalized Plan with your own dietitian.",
  },
  {
    question: "I have thyroid / PCOD / diabetes / BP. Can I still join?",
    answer:
      "Many of our members have these conditions. Tell us about it on the call — the diet, fasting window and yoga are adjusted for you. Keep taking the medicines your doctor has prescribed.",
  },
  {
    question: "Is it possible to lose weight within 21 days?",
    answer:
      "Many members see a real change in 21 days. How much depends on your starting weight, how consistently you follow the plan and any health conditions — results vary from person to person.",
  },
  {
    question: "What kind of diet plan will be provided?",
    answer:
      "An Indian diet plan with natural home food like daal, rice, roti and sabji. No expensive supplements or exotic ingredients.",
  },
  {
    question: "I don't know how to do yoga. Can I join?",
    answer:
      "Yes! The program is designed for complete beginners. We guide you step by step through each yoga pose, with modifications for all levels.",
  },
  {
    question: "I am in a different country / time zone. How will it work for me?",
    answer:
      "All live sessions are recorded. For the call, pick a time in India time (IST) and we will call you on WhatsApp.",
  },
  {
    question: "Which language is the call in?",
    answer: "Hindi or English — you choose when you book.",
  },
  {
    question: "Who should not join this program?",
    answer:
      "Pregnant women, people with serious medical conditions, or those under 18 should consult their doctor first. Tell us on the call and we will guide you.",
  },
];

const TwentyOneDayFreeConsultation = () => {
  useMeta({
    title: "Consultation Call – Ultimate 21 Day Weight Loss Challenge | SVASTHA",
    description:
      "Book a 15-minute call about the Ultimate 21 Day Weight Loss Challenge — home food, intermittent fasting and daily live yoga with Sumit and the SVASTHA team.",
    ogTitle: "Consultation Call – Ultimate 21 Day Weight Loss Challenge | SVASTHA",
    ogDescription: "Not sure if the 21 Day Challenge suits you? Talk to our team before you join. Hindi or English, no pressure to buy.",
    ogImage: "/src/assets/hero-yoga.jpg",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formFrom, setFormFrom] = useState<string | null>(null);
  const [plansOpen, setPlansOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const book = (from: string) => () => setFormFrom(from);
  const whatsapp = (where: string) => openWhatsApp(WA_MESSAGE, `WhatsApp - 21 day consultation page ${where}`);
  const seePlans = () => {
    setFormFrom(null);
    setPlansOpen(true);
  };

  // Plans (only after booking): same prices and payment pages as the 21 Day page.
  const earlyBird = isEarlyBird();
  const groupPlan = CHALLENGE_PLANS.find((p) => p.id === "group")!;
  const personalPlan = CHALLENGE_PLANS.find((p) => p.id === "personalized")!;
  const groupChoice = {
    price: earlyBird ? groupPlan.earlyPrice : groupPlan.regularPrice,
    offerPrice: earlyBird ? groupPlan.earlyPrice : groupPlan.regularPrice,
    offerSaving: "",
    url: earlyBird ? groupPlan.earlyPage : groupPlan.regularPage,
    offerUrl: earlyBird ? groupPlan.earlyPage : groupPlan.regularPage,
  };
  const personalChoice = {
    price: earlyBird ? personalPlan.earlyPrice : personalPlan.regularPrice,
    offerPrice: earlyBird ? personalPlan.earlyPrice : personalPlan.regularPrice,
    offerSaving: "",
    url: earlyBird ? personalPlan.earlyPage : personalPlan.regularPage,
    offerUrl: earlyBird ? personalPlan.earlyPage : personalPlan.regularPage,
  };
  const batchStartLabel = INDIA_BATCH.sessionDateLabel.replace(/\s*\(.*\)\s*/, "");
  const batchDay = INDIA_BATCH.sessionDateLabel.match(/\(([^)]+)\)/)?.[1] ?? "";
  const batchTime = INDIA_BATCH.sessionTimeLabel.replace(/\s*\(India Time\)/i, " IST");
  const batchStartDetail = [batchDay, `live orientation ${batchTime}`].filter(Boolean).join(" · ");

  const callSteps = [
    { n: "1", t: "Tell us about you", d: "Your goal, routine, food habits and any health condition." },
    {
      n: "2",
      t: "Know if the challenge suits you",
      d: "How the 21 Day Challenge — diet, fasting window, daily live yoga — would work for you.",
    },
    { n: "3", t: "Pick the right plan, or don't", d: "Group Plan or your own dietitian. Decide in your own time — no pressure." },
  ];

  return (
    <>
      <div className="ultimate-challenge-page min-h-screen overflow-x-hidden bg-white pb-20">
        <UltimateHero consult onRegister={book("top")} />
        <SushilStorySection page="21-day-consultation" ctaText={BOOK} onCta={book("sushil-video")} ctaNote="Hindi or English · no pressure to buy" />

        {/* What the free call is */}
        <section className="bg-emerald-50/50 px-4 py-14">
          <div className="container mx-auto max-w-5xl">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-emerald-700">Consultation call</p>
            <h2 className="mt-2 text-center text-2xl font-extrabold text-gray-900 md:text-3xl">
              A 15-minute call about the 21 Day Challenge
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {callSteps.map((s) => (
                <div key={s.n} className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-base font-extrabold text-white">
                    {s.n}
                  </div>
                  <p className="mt-3 text-lg font-bold text-gray-900">{s.t}</p>
                  <p className="mt-1 text-sm text-gray-600">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={book("what-happens")}
                className="no-heartbeat rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-10 py-4 text-lg font-bold text-white shadow-xl hover:from-green-700 hover:to-lime-600"
              >
                {BOOK}
              </button>
              <p className="mt-2 text-xs text-gray-500">Hindi or English · no pressure to buy</p>
            </div>
          </div>
        </section>

        {/* Same sections as the 21 Day Challenge page */}
        <LeaderboardSection clean />
        <JyotiTestimonialSection clean />
        <AanchalTestimonialSection clean heading="Aanchal lost 6.5 kg" subHeading="Watch her journey." />
        <HowItWorksSection clean />
        <WhatYouGetSection scrollToRegistration={book("what-you-get")} isUltimate={true} clean registerButtonText={BOOK} />
        <MeetYourMentorSection
          scrollToRegistration={book("mentor")}
          clean
          registerButtonText="Book a Call with Sumit's Team"
        />
        <MoreMentorsSection clean />
        <BenefitsSection clean />
        <TransformationsSection clean />
        <WhoIsThisForSection clean />
        <YogaTeachersSection clean />

        {/* In place of "Register here": the booking form itself */}
        <section className="bg-gradient-to-b from-white to-emerald-50 px-4 py-14">
          <div className="container mx-auto max-w-xl">
            <div className="mb-6 text-center">
              <PhoneCall className="mx-auto h-10 w-10 text-emerald-600" />
              <h2 className="mt-3 text-2xl font-extrabold text-gray-900 md:text-3xl">Talk to us before you join</h2>
              <p className="mt-2 text-sm text-gray-600">
                Book your consultation call for the Ultimate 21 Day Weight Loss Challenge (a paid programme — we explain the plans and fees on the call).
              </p>
            </div>
            <ConsultationFunnelForm from="bottom form" onSeePlans={seePlans} onWhatsApp={() => whatsapp("after booking")} />
          </div>
        </section>

        <FAQSection clean faqs={FAQS} />

        <p className="px-6 pb-6 text-center text-[11px] text-gray-400">
          Results vary from person to person. SVASTHA programmes do not replace medical advice — keep taking the
          medicines your doctor has prescribed.
        </p>
      </div>

      {/* Sticky bar — like the 21 Day page, but it books the free call */}
      {showSticky && !plansOpen && !formFrom && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="hidden flex-1 sm:block">
              <p className="text-sm font-bold text-gray-900">Ultimate 21 Day Weight Loss Challenge</p>
              <p className="text-xs text-gray-500">15-minute consultation call · Hindi or English</p>
            </div>
            <button
              type="button"
              onClick={book("sticky bar")}
              className="no-heartbeat flex-1 rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3 text-base font-extrabold text-white shadow-lg sm:flex-none sm:px-8"
            >
              {BOOK}
            </button>
          </div>
        </div>
      )}

      {/* Booking pop-up for every button on the page */}
      {formFrom && (
        <Overlay onClose={() => setFormFrom(null)} labelledBy="consult-form-title">
          <span id="consult-form-title" className="sr-only">
            Book your consultation call
          </span>
          <ConsultationFunnelForm bare from={formFrom} onSeePlans={seePlans} onWhatsApp={() => whatsapp("after booking")} />
        </Overlay>
      )}

      <WhatsAppFloatingButton showAfterScrollRatio={0.12} noPulse message={WA_MESSAGE} isModalOpen={plansOpen || !!formFrom} />

      <U21PlanChooser
        mode="register"
        isOpen={plansOpen}
        onClose={() => setPlansOpen(false)}
        personal={personalChoice}
        group={groupChoice}
        batchName={earlyBird ? "New Year batch" : "Next batch"}
        batchStartLabel={batchStartLabel}
        batchStartDetail={batchStartDetail}
      />
    </>
  );
};

export default TwentyOneDayFreeConsultation;
