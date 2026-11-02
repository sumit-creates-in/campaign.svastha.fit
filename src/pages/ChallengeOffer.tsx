import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, CalendarDays, Clock3, ShieldCheck, Soup, Users, UserRound } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMeta } from "@/hooks/useMeta";
import { ChatButton } from "@/components/masterclass/ChatButton";
import { DailyYogaSection } from "@/components/masterclass/DailyYogaSection";
import { TransformationsSection, WhoIsThisForSection } from "@/components/challenge";
import sumitSharmaImage from "@/assets/sumit sharma.png";
import {
  CHALLENGE_PLANS,
  EARLY_BIRD,
  GROUP_SCHEDULE,
  isEarlyBird,
  type ChallengePlan,
} from "@/config/challengeOffer";

/**
 * /21-day-challenge (also the old /Ultimate-21-day-weight-loss-challenge URL)
 * — sells the 21 Day Challenge directly, Group or Personalized, in the Master
 * Class design. Prices and pages: src/config/challengeOffer.ts.
 *
 * Visitors outside India go to the international / UAE pages, like the old page.
 */

function detectCountry(): "IN" | "AE" | "OTHER" {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Asia/Kolkata") || tz.includes("Asia/Calcutta")) return "IN";
    if (tz.includes("Asia/Dubai")) return "AE";
    return "OTHER";
  } catch {
    return "IN";
  }
}

function trackCheckout(plan: ChallengePlan, price: string) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        value: Number(price.replace(/[^\d]/g, "")),
        currency: "INR",
        content_name: `21 Day Challenge — ${plan.name}`,
      });
    }
  } catch {
    /* tracking must never block the sale */
  }
}

const STEPS = [
  {
    icon: CalendarDays,
    title: "Choose your plan",
    body: `Group starts with the batch (${GROUP_SCHEDULE.shortStart}). Personalized starts within 48 hours.`,
  },
  {
    icon: Soup,
    title: "Get your diet & fasting plan",
    body: "Home-cooked Indian food your family already eats — what changes is the quantity, combination and timing.",
  },
  {
    icon: Users,
    title: "Follow it with support",
    body: "Daily guidance on WhatsApp, live yoga classes and your weight tracked in the Svastha app.",
  },
];

const FAQS = [
  {
    q: "Which plan should I choose?",
    a: "Choose the Group Plan if you're generally healthy and enjoy doing it with a batch — it's the best value. Choose Personalized if you're managing thyroid, PCOS, sugar or BP, have tried before and stalled, or want to start now instead of on 23 November.",
  },
  {
    q: "When do I start?",
    a: `Group Plan: the starting session is live with Sumit on ${GROUP_SCHEDULE.sessionLabel}, ${GROUP_SCHEDULE.sessionTime}, and Day 1 is ${GROUP_SCHEDULE.day1Label}. You get the batch WhatsApp group link right after paying. Personalized Plan: our team calls you (10 am – 7 pm) and you start within 48 hours.`,
  },
  {
    q: "Will I have to eat special or expensive food?",
    a: "No. The plan is daal, chawal, roti, sabji — the food your family already eats. You won't have to cook separately.",
  },
  {
    q: "I have never done yoga. Can I join?",
    a: "Yes. Most people start as complete beginners. Every class has easier versions of each posture, and every class is recorded.",
  },
  {
    q: "I have a health condition. Is it safe?",
    a: "People managing thyroid, PCOS, diabetes or BP are most of who we work with — the Personalized Plan is made for this. Nothing here asks you to stop or change any medication: this is nutrition, fasting and yoga guidance, not medical treatment. Keep your doctor in the loop. Pregnant women should not join.",
  },
  {
    q: "What happens after I pay?",
    a: "You see a confirmation page straight away and get a WhatsApp message and an email. Group Plan members get the batch group link; Personalized members get a call from our team to start.",
  },
  {
    q: "I live outside India. Can I join?",
    a: "Yes — sessions are in India time and every session and class is recorded. Message us and we'll help you choose.",
  },
] as const;

const ChallengeOffer = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const early = isEarlyBird();

  useEffect(() => {
    const c = detectCountry();
    if (c === "AE") navigate("/global-21-day-weight-loss-challenge", { replace: true });
    else if (c === "OTHER") navigate("/international-21-day-weight-loss-challenge", { replace: true });
    else setReady(true);
    window.scrollTo(0, 0);
  }, [navigate]);

  useMeta({
    title: "Ultimate 21 Day Weight Loss Challenge with Sumit Sharma | Svastha",
    description:
      "Lose weight with the home-cooked Indian food you already eat. 21 days of diet and fasting guidance, live yoga classes and live sessions with Sumit Sharma. Group Plan or Personalized Plan with your own dietitian.",
    ogTitle: "Ultimate 21 Day Weight Loss Challenge — Svastha",
    ogDescription: "Group Plan (starts 22 Nov) or Personalized Plan with your own dietitian (start now).",
    ogImage: "https://campaign.svastha.fit/masterclass-og.jpg",
    twitterImage: "https://campaign.svastha.fit/masterclass-og.jpg",
  });

  const priceOf = (p: ChallengePlan) => (early ? p.earlyPrice : p.regularPrice);
  const urlOf = (p: ChallengePlan) => (early ? p.earlyPage : p.regularPage);
  const scrollToPlans = () => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });

  if (!ready) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-28">
      <div className="bg-gray-950 px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Svastha · with Sumit Sharma</p>
        <p className="mt-0.5 text-sm font-bold text-white md:text-base">Ultimate 21 Day Weight Loss Challenge</p>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-5 pb-10 pt-10 md:pb-14 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          {early ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Early-bird price till {EARLY_BIRD.closesLabel}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-200">
              Next batch · {GROUP_SCHEDULE.batch} · 22 Nov
            </span>
          )}

          <h1 className="mt-5 text-[30px] font-extrabold leading-[1.12] tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Lose weight with the food
            <br />
            <span className="text-emerald-600">you already eat.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            21 days of daal, rice, roti and sabji — eaten the right way — with the right way to fast,
            live yoga from home, and Sumit Sharma guiding you every Sunday.
          </p>

          <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-2xl bg-gray-50 p-3 text-left ring-1 ring-gray-100">
            <img src={sumitSharmaImage} alt="Sumit Sharma" className="h-14 w-14 flex-shrink-0 rounded-full object-cover object-top" />
            <div>
              <p className="text-sm font-extrabold text-gray-950">Sumit Sharma</p>
              <p className="text-xs leading-snug text-gray-600">
                Yoga & Nutrition Coach and Founder of SVASTHA · 130K+ followers on Instagram
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToPlans}
            className="mx-auto mt-7 flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-emerald-600/20 transition-transform duration-200 hover:scale-[1.02] md:text-lg"
          >
            See the two plans <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </section>

      {/* ── Plans ────────────────────────────────────────────────────────── */}
      <section id="plans" className="scroll-mt-4 px-5 pb-4">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {CHALLENGE_PLANS.map((plan, i) => {
            const dark = plan.id === "personalized";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-3xl border-2 ${dark ? "border-gray-950 bg-gray-950" : "border-emerald-500 bg-white"}`}
              >
                <div className={`absolute right-0 top-0 rounded-bl-xl px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${dark ? "bg-emerald-500" : "bg-gray-950"}`}>
                  {dark ? "Start now" : GROUP_SCHEDULE.shortStart}
                </div>
                <div className="p-6 md:p-7">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                    21 days · {plan.name}
                  </p>
                  <h2 className={`mt-2 text-2xl font-extrabold leading-snug ${dark ? "text-white" : "text-gray-950"}`}>{plan.tagline}</h2>

                  <div className="mt-5 flex flex-wrap items-baseline gap-3">
                    {early && (
                      <span className={`text-xl font-semibold line-through ${dark ? "text-gray-500" : "text-gray-400"}`}>{plan.regularPrice}</span>
                    )}
                    <span className={`text-5xl font-extrabold tracking-tight ${dark ? "text-white" : "text-gray-950"}`}>{priceOf(plan)}</span>
                  </div>
                  <p className={`mt-1.5 text-sm font-semibold ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {early ? `Early-bird price till ${EARLY_BIRD.closesLabel}` : "All inclusive · one-time payment"}
                  </p>

                  <div className={`mt-4 flex gap-2.5 rounded-2xl p-3.5 text-sm leading-relaxed ${dark ? "bg-white/5 text-gray-300" : "bg-emerald-50/70 text-gray-700"}`}>
                    <Clock3 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${dark ? "text-emerald-400" : "text-emerald-600"}`} />
                    <span>{plan.startLine}</span>
                  </div>

                  <a
                    href={urlOf(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCheckout(plan, priceOf(plan))}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-extrabold transition-transform duration-200 hover:scale-[1.02] md:text-lg ${
                      dark ? "bg-emerald-500 text-white hover:bg-emerald-400" : "bg-gray-950 text-white hover:bg-gray-800"
                    }`}
                  >
                    Join {plan.name} — {priceOf(plan)}
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${dark ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={3} />
                        <span className={`text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-6 rounded-2xl p-4 ${dark ? "bg-white/5" : "bg-emerald-50/70"}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? "text-emerald-400" : "text-emerald-700"}`}>Choose this if</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {plan.bestFor.map((b) => (
                        <li key={b} className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-gray-500">
          Payments are handled securely by Razorpay. Results vary from person to person.
        </p>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-950 md:text-3xl">How the 21 days work</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl border-2 border-gray-100 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-extrabold text-white">{i + 1}</span>
                  <s.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="mt-3 text-base font-bold text-gray-950">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhoIsThisForSection />
      <div className="h-10 md:h-16" aria-hidden="true" />

      <DailyYogaSection />
      <div className="h-10 md:h-16" aria-hidden="true" />

      {/* ── Conditions ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-teal-50 via-cyan-50/60 to-blue-50 px-5 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold text-gray-950 md:text-3xl">&ldquo;I have thyroid / PCOS / diabetes / BP. Will this work for me?&rdquo;</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
            People managing a health condition are most of who we work with. If that's you, choose the
            <strong> Personalized Plan</strong>: your own dietitian plans around your condition and adjusts as your body responds.
          </p>
          <div className="mx-auto mt-6 flex max-w-xl gap-3 rounded-2xl bg-white p-4 text-left shadow-sm">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
            <p className="text-sm leading-relaxed text-gray-700">
              Your medication stays exactly as it is. Nothing here asks you to stop or change any treatment — keep your doctor in the loop.
            </p>
          </div>
        </div>
      </section>

      {/* ── Meet Sumit ───────────────────────────────────────────────────── */}
      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row">
          <img src={sumitSharmaImage} alt="Sumit Sharma" className="h-64 w-64 rounded-3xl object-cover object-top shadow-lg" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">Your coach</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-950">Sumit Sharma</h2>
            <p className="mt-1 text-sm font-semibold text-gray-500">Yoga & Nutrition Coach and Founder of SVASTHA</p>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              For over 10 years Sumit has helped thousands of people lose weight with simple Indian food, the right way to fast and
              yoga — no starving, no gym. 130K+ people follow him on Instagram for it. In the challenge he teaches live every Sunday,
              and the Svastha team of dietitians and yoga teachers is with you every day.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <UserRound className="h-4 w-4 text-emerald-600" /> Supported by the Svastha dietitian and yoga team
            </div>
          </div>
        </div>
      </section>

      <TransformationsSection />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-950 md:text-3xl">Before you decide</h2>
          <Accordion type="single" collapsible className="mt-6 space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white px-4 data-[state=open]:border-emerald-200 data-[state=open]:bg-emerald-50/40"
              >
                <AccordionTrigger className="py-4 text-left text-[15px] font-bold text-gray-950 hover:no-underline md:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 px-5 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            Twenty one days from now, you'll wish you had started today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-400">
            {early ? `Early-bird price till ${EARLY_BIRD.closesLabel}.` : "Pick the plan that fits you."}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {CHALLENGE_PLANS.map((plan) => (
              <a
                key={plan.id}
                href={urlOf(plan)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCheckout(plan, priceOf(plan))}
                className={`flex flex-col items-center justify-center rounded-2xl px-5 py-4 font-extrabold transition-transform duration-200 hover:scale-[1.02] ${
                  plan.id === "personalized" ? "bg-emerald-500 text-white hover:bg-emerald-400" : "bg-white text-gray-950 hover:bg-gray-100"
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">{plan.name}</span>
                <span className="mt-1 text-2xl">{priceOf(plan)}</span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-500">Payments are handled by Razorpay.</p>
        </div>
      </section>

      <StickyBar priceOf={priceOf} urlOf={urlOf} />
      <ChatButton />
    </div>
  );
};

const StickyBar = ({ priceOf, urlOf }: { priceOf: (p: ChallengePlan) => string; urlOf: (p: ChallengePlan) => string }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800 bg-gray-950/95 px-3 py-3">
      <div className="mx-auto flex max-w-3xl gap-2.5">
        {CHALLENGE_PLANS.map((plan) => (
          <a
            key={plan.id}
            href={urlOf(plan)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCheckout(plan, priceOf(plan))}
            className={`flex flex-1 flex-col items-center rounded-xl px-3 py-2.5 leading-tight transition-transform duration-200 active:scale-[0.98] ${
              plan.id === "personalized" ? "bg-emerald-500 text-white" : "bg-white text-gray-950"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-70">{plan.label}</span>
            <span className="text-lg font-extrabold">{priceOf(plan)}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChallengeOffer;
