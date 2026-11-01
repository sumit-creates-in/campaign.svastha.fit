import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMeta } from "@/hooks/useMeta";
import { ChatButton } from "@/components/masterclass/ChatButton";
import { TransformationsSection } from "@/components/challenge";
import {
  SIX_MONTH_PLANS as PERSONAL_PLANS,
  SIX_MONTH_FLASH_ID,
  SIX_MONTH_BONUS,
  isSixMonthOfferLive as isPersonalOfferLive,
  sixMonthCheckoutUrl as planCheckoutUrl,
  type SixMonthPlan as PersonalPlan,
} from "@/config/sixMonthOffer";
import { useFlashOffer, formatMmSs } from "@/hooks/useFlashOffer";

/**
 * /6-month-offer — the 6-month upgrade offer Sumit pitches to 21 Day Challenge
 * Group Plan members in the Week 2 live session: Sumit's Community or
 * Personalized (Human Coach + Group Classes), 6 months + 1 month extra.
 * Offer price inside the window, Sumit's 15-minute flash price when he presses
 * the button (row b156w2), regular price otherwise. See src/config/sixMonthOffer.ts.
 */

function useLiveNow(): boolean {
  const [live, setLive] = useState(() => isPersonalOfferLive());
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setLive(isPersonalOfferLive()), 15_000);
    return () => clearInterval(id);
  }, [live]);
  return live;
}

function trackCheckout(plan: PersonalPlan, price: string) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        value: Number(price.replace(/[^\d]/g, "")),
        currency: "INR",
        content_name: `6 Month Plan — ${plan.name}`,
      });
    }
  } catch {
    /* tracking must never block the sale */
  }
}

const FAQS = [
  {
    q: "What is the difference between the two plans?",
    a: "Sumit's Community keeps you in the group: live yoga classes, the group weekly diet plan, dietitian follow-ups, Sumit's voice notes and the weekly community meet. Personalized adds your own dietitian, who builds your weekly diet plan around you and follows up with you every week.",
  },
  {
    q: "I have thyroid / PCOS / sugar / BP. Which one should I take?",
    a: "Personalized. A dietitian plans around your condition and adjusts as your body responds. Nothing here asks you to stop or change any medication — this is nutrition, fasting and yoga guidance, not medical treatment. Keep your doctor in the loop.",
  },
  {
    q: "What happens to my 21 Day Challenge?",
    a: "Nothing changes — finish your 21 days with the batch as planned. Our team will call you to set the start date of your 6 months, so nothing overlaps.",
  },
  {
    q: "What is the 1 month extra?",
    a: "If you join at today's price, you get 7 months for the price of 6.",
  },
  {
    q: "How do I get started after paying?",
    a: "You see a confirmation straight away, and our team calls you (10 am to 7 pm) to activate your plan in the Svastha app. If anything looks wrong, message us and we will fix it.",
  },
] as const;

const SixMonthOffer = () => {
  const live = useLiveNow();
  const flash = useFlashOffer(live, SIX_MONTH_FLASH_ID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: "Make it permanent — 6 Month Plans | Svastha",
    description:
      "Continue after your 21 days: Sumit's Community or a Personalized plan with your own dietitian, for 6 months — plus 1 month extra.",
    ogTitle: "Make it permanent — 6 Month Plans",
    ogDescription: "Sumit's Community or Personalized, 6 months + 1 month extra.",
    ogImage: "https://campaign.svastha.fit/masterclass-og.jpg",
    twitterImage: "https://campaign.svastha.fit/masterclass-og.jpg",
  });

  const priceOf = (p: PersonalPlan) =>
    flash.active ? p.flashPrice : live ? p.offerPrice : p.regularPrice;
  const urlOf = (p: PersonalPlan) =>
    planCheckoutUrl(p, flash.active ? p.flashPage : live ? p.offerPage : p.regularPage);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-28">
      <div className="bg-gray-950 px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
          Ultimate 21 Day Weight Loss Challenge · Week 2
        </p>
        <p className="mt-0.5 text-sm font-bold text-white md:text-base">
          6 Month Plans — for challenge members
        </p>
      </div>

      <section className="px-5 pb-10 pt-10 md:pb-14 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          {live ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {flash.active
                ? "Live flash price — ends in " + formatMmSs(flash.secondsLeft)
                : "Challenge members\u2019 price — closes tonight"}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-200">
              6 Month Plans
            </span>
          )}

          <h1 className="mt-5 text-[30px] font-extrabold leading-[1.12] tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            21 days started it.
            <br />
            <span className="text-emerald-600">6 months make it permanent.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            Keep losing weight with Sumit, the classes and the group — or with your
            own dietitian. Join today and get <strong>1 month extra</strong>.
          </p>
        </motion.div>

        <div className="mx-auto mt-7 max-w-2xl">
          {flash.active ? (
            <div className="rounded-2xl bg-amber-400 px-5 py-5 text-center shadow-lg shadow-amber-400/30">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-900">
                ⚡ Live flash offer
              </p>
              <p className="mt-2 text-xl font-extrabold leading-snug text-gray-950 md:text-2xl">
                Ends in <span className="tabular-nums">{formatMmSs(flash.secondsLeft)}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950">
                Only for the people in the live session right now. When the timer
                hits zero, the price goes back up.
              </p>
            </div>
          ) : live ? (
            <div className="rounded-2xl bg-red-600 px-5 py-5 text-center shadow-lg shadow-red-600/20">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-100">
                Offer ends soon
              </p>
              <p className="mt-2 text-xl font-extrabold leading-snug text-white md:text-2xl">
                ₹1,000 off + 1 month extra, only for challenge members.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-red-100">
                At 12 midnight tonight this page goes back to the usual price. You
                won&apos;t get a reminder.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section id="plans" className="scroll-mt-4 px-5 pb-4">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {PERSONAL_PLANS.map((plan, i) => {
            const dark = plan.id === "personalized";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-3xl border-2 ${
                  dark ? "border-gray-950 bg-gray-950" : "border-emerald-500 bg-white"
                }`}
              >
                {dark && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most personal
                  </div>
                )}
                <div className="p-6 md:p-7">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                    6 months · {plan.name}
                  </p>
                  <h2 className={`mt-2 text-2xl font-extrabold leading-snug ${dark ? "text-white" : "text-gray-950"}`}>
                    {plan.tagline}
                  </h2>

                  <div className="mt-5 flex flex-wrap items-baseline gap-3">
                    {live && (
                      <span className={`text-xl font-semibold line-through ${dark ? "text-gray-500" : "text-gray-400"}`}>
                        {plan.regularPrice}
                      </span>
                    )}
                    <span className={`text-5xl font-extrabold tracking-tight ${dark ? "text-white" : "text-gray-950"}`}>
                      {priceOf(plan)}
                    </span>
                  </div>
                  <p className={`mt-1.5 text-sm font-semibold ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {live ? SIX_MONTH_BONUS : "6 months"}
                    {flash.active ? " · Live flash price" : live && " · Today\u2019s price"}
                  </p>

                  <a
                    href={urlOf(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCheckout(plan, priceOf(plan))}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-extrabold transition-transform duration-200 hover:scale-[1.02] md:text-lg ${
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
                    <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? "text-emerald-400" : "text-emerald-700"}`}>
                      Choose this if
                    </p>
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
      </section>

      <TransformationsSection />

      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-950 md:text-3xl">
            Before you decide
          </h2>
          <Accordion type="single" collapsible className="mt-6 space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white px-4 data-[state=open]:border-emerald-200 data-[state=open]:bg-emerald-50/40"
              >
                <AccordionTrigger className="py-4 text-left text-[15px] font-bold text-gray-950 hover:no-underline md:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-gray-950 px-5 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            Six months from now, you will be glad you didn&apos;t stop.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-400">
            Most people regain the weight when the guidance stops. Don&apos;t stop.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PERSONAL_PLANS.map((plan) => (
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

const StickyBar = ({
  priceOf,
  urlOf,
}: {
  priceOf: (p: PersonalPlan) => string;
  urlOf: (p: PersonalPlan) => string;
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800 bg-gray-950/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl gap-2.5">
        {PERSONAL_PLANS.map((plan) => (
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
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-70">{plan.name}</span>
            <span className="text-lg font-extrabold">{priceOf(plan)}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SixMonthOffer;
