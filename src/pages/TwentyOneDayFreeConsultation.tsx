import { useEffect, useRef, useState } from "react";
import { HeartPulse, Languages, PhoneCall, Salad, ShieldCheck, Star, Users } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { CHALLENGE_PLANS, isEarlyBird } from "@/config/challengeOffer";
import { INDIA_BATCH } from "@/config/masterclass";
import { U21PlanChooser } from "@/components/challenge/U21PlanChooser";
import { ConsultationFunnelForm } from "@/components/challenge/ConsultationFunnelForm";
import {
  AanchalTestimonialSection,
  FAQSection,
  JyotiTestimonialSection,
  LeaderboardSection,
  MeetYourMentorSection,
  WhatsAppFloatingButton,
} from "@/components/challenge";
import { openWhatsApp } from "@/lib/whatsapp";

/**
 * /21-day-free-consultation — consultation-first copy of the 21 Day page
 * (Sumit, 26 Nov 2026; Fitelo-style). No prices on the page: the goal is a booked
 * free call. Prices appear only if the visitor asks to "see the plans" after booking.
 * Meta: the Lead event here is what the consultation campaign optimises for.
 */

const WA_MESSAGE = "Hi, I want a free consultation for the Ultimate 21 Day Weight Loss Challenge.";

const FAQS = [
  {
    question: "Is the consultation call really free?",
    answer:
      "Yes. It is a free 15-minute call with a SVASTHA expert. You get a clear answer on what will work for your body and routine. There is no pressure to buy anything.",
  },
  {
    question: "What will we talk about on the call?",
    answer:
      "Your goal, your daily routine, what you eat, any health condition and what you have tried before. Then the expert tells you what approach suits you and which SVASTHA programme fits, if any.",
  },
  {
    question: "I have thyroid / PCOD / diabetes / BP. Can I still lose weight?",
    answer:
      "Many of our members have these conditions. Tell the expert about it on the call — the diet, fasting window and yoga are adjusted for you. Keep taking the medicines your doctor has prescribed.",
  },
  {
    question: "Do I need supplements, special food or a gym?",
    answer:
      "No. The programme uses the home food you already eat — daal, chawal, roti, sabji — the right fasting window and daily live yoga at home.",
  },
  {
    question: "Which language is the call in?",
    answer: "Hindi or English — you choose when you book.",
  },
  {
    question: "What if I am not in India?",
    answer:
      "You can still book. Pick a time in India time (IST) and we will call you on WhatsApp.",
  },
];

const TwentyOneDayFreeConsultation = () => {
  useMeta({
    title: "Free Weight Loss Consultation Call | SVASTHA",
    description:
      "Book a free 15-minute call with a SVASTHA expert. Lose weight with home food, intermittent fasting and daily live yoga. Over 10,000 people helped.",
    ogTitle: "Free Weight Loss Consultation Call | SVASTHA",
    ogDescription: "Talk to a SVASTHA expert about your goal, routine and health condition. Free, no pressure to buy.",
    ogImage: "/src/assets/hero-yoga.jpg",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formRef = useRef<HTMLDivElement>(null);
  const [plansOpen, setPlansOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  // Sticky "Book free call" bar once the form has scrolled out of view.
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const whatsapp = (where: string) => openWhatsApp(WA_MESSAGE, `WhatsApp - 21 day consultation page ${where}`);

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

  const trust = [
    { icon: Users, label: "Over 10,000 people helped" },
    { icon: Salad, label: "Home food · no supplements" },
    { icon: HeartPulse, label: "Thyroid, PCOD, diabetes friendly" },
    { icon: Languages, label: "Hindi + English" },
  ];

  const callSteps = [
    { n: "1", t: "Tell us about you", d: "Your goal, routine, food habits and any health condition." },
    { n: "2", t: "Get a clear answer", d: "What will work for your body — diet, fasting window and yoga." },
    { n: "3", t: "Decide in your own time", d: "If a SVASTHA programme fits, we explain it. No pressure." },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-20">
      {/* Hero + form */}
      <section className="bg-gradient-to-b from-emerald-50 via-white to-white px-4 pb-14 pt-6 md:pb-20 md:pt-10">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="text-center lg:pt-6 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <PhoneCall className="h-3.5 w-3.5" /> Free consultation call
            </span>
            <h1 className="mt-5 text-[28px] font-extrabold leading-[1.15] text-gray-900 sm:text-4xl md:text-5xl">
              Not sure what will work for your body?{" "}
              <span className="text-emerald-600">Talk to a SVASTHA expert — free.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 md:text-lg lg:mx-0">
              Lose weight with the home food you already eat, the right fasting window and daily live yoga. Tell us
              your goal and routine — we'll tell you what will work for you.
            </p>
            <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2.5 lg:mx-0">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-white px-3 py-2.5 text-left">
                  <Icon className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span className="text-[13px] font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-1 text-amber-500 lg:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-1.5 text-sm font-semibold text-gray-700">Loved by our members</span>
            </div>
          </div>

          <ConsultationFunnelForm ref={formRef} onSeePlans={() => setPlansOpen(true)} onWhatsApp={() => whatsapp("after booking")} />
        </div>
      </section>

      {/* What happens on the call */}
      <section className="px-4 py-14">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-extrabold text-gray-900 md:text-3xl">What happens on the call</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {callSteps.map((s) => (
              <div key={s.n} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-base font-extrabold text-white">{s.n}</div>
                <p className="mt-3 text-lg font-bold text-gray-900">{s.t}</p>
                <p className="mt-1 text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={toForm}
              className="no-heartbeat rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-10 py-4 text-lg font-bold text-white shadow-xl hover:from-green-700 hover:to-lime-600"
            >
              Book my free call
            </button>
          </div>
        </div>
      </section>

      <JyotiTestimonialSection clean />
      <AanchalTestimonialSection clean heading="Aanchal lost 6.5 kg" subHeading="Watch her journey." />
      <LeaderboardSection clean />
      <MeetYourMentorSection clean scrollToRegistration={toForm} registerButtonText="Book a free call with our team" />

      {/* Ask first */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-3xl rounded-3xl border-2 border-green-200 bg-green-50/60 px-6 py-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="mt-3 text-2xl font-extrabold text-gray-900">Prefer to ask a quick question first?</h2>
          <p className="mt-2 text-sm text-gray-600">Message our team on WhatsApp. We usually reply within minutes.</p>
          <button
            type="button"
            onClick={() => whatsapp("ask first")}
            className="no-heartbeat mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#1ebe5b]"
          >
            Ask on WhatsApp
          </button>
        </div>
      </section>

      <FAQSection clean faqs={FAQS} />

      <p className="px-6 pb-6 text-center text-[11px] text-gray-400">
        Results vary from person to person. SVASTHA programmes do not replace medical advice — keep taking the
        medicines your doctor has prescribed.
      </p>

      {/* Sticky bar */}
      {showSticky && !plansOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="hidden flex-1 sm:block">
              <p className="text-sm font-bold text-gray-900">Free 15-minute consultation call</p>
              <p className="text-xs text-gray-500">Hindi or English · no pressure to buy</p>
            </div>
            <button
              type="button"
              onClick={toForm}
              className="no-heartbeat flex-1 rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3 text-base font-extrabold text-white shadow-lg sm:flex-none sm:px-8"
            >
              Book my free call
            </button>
          </div>
        </div>
      )}

      <WhatsAppFloatingButton showAfterScrollRatio={0.12} noPulse message={WA_MESSAGE} isModalOpen={plansOpen} />

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
    </div>
  );
};

export default TwentyOneDayFreeConsultation;
