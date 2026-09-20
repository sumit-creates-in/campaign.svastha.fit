import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, ArrowRight } from "lucide-react";
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
  MASTERCLASS,
  OFFER_PLANS,
  isOfferLive,
  type OfferPlan,
} from "@/config/masterclass";

/**
 * Ultimate 21 Day Weight Loss Challenge — the offer page.
 *
 * Shared in the WhatsApp group at the end of the Master Class. Master Class
 * pricing is live until OFFER.deadline; after that the page switches itself
 * over to the regular prices and the regular payment links. Nothing to edit,
 * nothing to redeploy — which is exactly what makes the deadline real.
 *
 * Deliberately no countdown timer. Sumit's call, and the right one: a ticking
 * clock reads as a sales trick, and the people in this room already trust him.
 */

/** Re-checks the deadline while the page sits open, so it flips on its own. */
function useOfferLiveNow(): boolean {
  const [live, setLive] = useState(() => isOfferLive());

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setLive(isOfferLive()), 15_000);
    return () => clearInterval(id);
  }, [live]);

  return live;
}

/** Meta Pixel — fires when someone leaves for Razorpay. */
function trackCheckout(plan: OfferPlan, price: string) {
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

const COMPARISON = [
  { label: "Diet plan", group: "The batch plan, weekly", personal: "Built around your body" },
  { label: "Dietitian", group: "Group guidance", personal: "Your own, dedicated" },
  { label: "Your condition", group: "General guidance", personal: "Planned around it" },
  { label: "Start date", group: "27 September", personal: "Today" },
  { label: "Live yoga classes", group: true, personal: true },
  { label: "Leaderboard & contest", group: true, personal: true },
  { label: "WhatsApp support", group: "In the batch group", personal: "Direct with your dietitian" },
] as const;

const FAQS = [
  {
    q: "I have thyroid / PCOS / sugar / BP. Can I do this?",
    a: "Yes, and you will be in the majority here rather than the exception. Tell us at signup and our dietitian team sees it before you start. On the Personalized Plan the whole plan is built around it. Two things to be clear about: nothing here asks you to stop or change any medication, and this is nutrition, fasting and yoga guidance rather than medical treatment. Keep taking what your doctor prescribed, and keep them in the loop.",
  },
  {
    q: "I cannot cook separately from my family.",
    a: "You will not have to. The plan is daal, chawal, roti, sabji — the food your family is already eating. What changes is the quantity, the combination and the timing, not the kitchen.",
  },
  {
    q: "What if I miss the live classes?",
    a: "Every class is recorded and sent to the group the same day. One busy day does not break your 21 days.",
  },
  {
    q: "What is the difference between the two plans, really?",
    a: "The plan, the classes, the leaderboard and the contest are identical. What you pay more for on the Personalized Plan is a dietitian who builds the plan around you specifically and stays reachable on WhatsApp — and being able to start today instead of waiting for the batch.",
  },
  {
    q: "How do I get started after paying?",
    a: "You will get a confirmation straight away and our team reaches out on WhatsApp the same day with your plan and your group. If anything looks wrong, message us and we will fix it.",
  },
] as const;

const MasterClassOffer = () => {
  const live = useOfferLiveNow();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: `Join the ${MASTERCLASS.name}`,
    description:
      "Two ways to join the 21 Day Challenge — the Group Plan or the Personalized Plan. Full diet and fasting plan, live yoga twice a day, and dietitian guidance.",
    ogTitle: `Join the ${MASTERCLASS.name}`,
    ogDescription:
      "Group Plan or Personalized Plan. Full diet and fasting plan, live yoga classes twice a day, and dietitian guidance for 21 days.",
    ogImage: "https://campaign.svastha.fit/masterclass-og.jpg",
    twitterImage: "https://campaign.svastha.fit/masterclass-og.jpg",
  });

  const priceOf = (p: OfferPlan) => (live ? p.earlyPrice : p.regularPrice);
  const urlOf = (p: OfferPlan) => (live ? p.earlyUrl : p.regularUrl);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-28">
      {/* ── Event bar ─────────────────────────────────────────────────────── */}
      <div className="bg-gray-950 px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
          {MASTERCLASS.eventName}
        </p>
        <p className="mt-0.5 text-sm font-bold text-white md:text-base">
          {MASTERCLASS.name}
        </p>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
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
              Master Class price — closing soon
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-200">
              Enrolment open
            </span>
          )}

          <h1 className="mt-5 text-[30px] font-extrabold leading-[1.12] tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            You have the plan.
            <br />
            <span className="text-emerald-600">Now let&apos;s do the 21 days together.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            Same plan. Same classes. The only difference between the two options
            below is how much of it is built around you personally.
          </p>
        </motion.div>

        {/* Deadline strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl"
        >
          {live ? (
            /* Deliberately no clock and no closing time. Sumit tells the room
               the price closes soon without naming the hour, and the page has
               to say the same thing. The switch still happens by itself at
               OFFER.deadline. */
            <div className="rounded-2xl bg-red-600 px-5 py-5 text-center shadow-lg shadow-red-600/20">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-100">
                Offer ends soon
              </p>
              <p className="mt-2 text-xl font-extrabold leading-snug text-white md:text-2xl">
                This price is for the people who sat through the Master Class.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-red-100">
                When it closes, this page goes back to the usual price. You
                won&apos;t get a reminder.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-center">
              <p className="text-base font-bold text-gray-900">
                The Master Class price has closed.
              </p>
              <p className="mt-1.5 text-sm text-gray-600">
                Regular pricing applies — both plans are still open below.
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── The two plans ─────────────────────────────────────────────────── */}
      <section id="plans" className="scroll-mt-4 px-5 pb-4">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {OFFER_PLANS.map((plan, i) => {
            const isPersonal = plan.id === "personalized";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-3xl border-2 ${
                  isPersonal
                    ? "border-gray-950 bg-gray-950"
                    : "border-emerald-500 bg-white"
                }`}
              >
                {isPersonal && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most results
                  </div>
                )}

                <div className="p-6 md:p-7">
                  <p
                    className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                      isPersonal ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    {plan.name}
                  </p>
                  <h2
                    className={`mt-2 text-2xl font-extrabold leading-snug ${
                      isPersonal ? "text-white" : "text-gray-950"
                    }`}
                  >
                    {plan.tagline}
                  </h2>

                  {/* Price */}
                  <div className="mt-5 flex flex-wrap items-baseline gap-3">
                    {live && (
                      <span
                        className={`text-xl font-semibold line-through ${
                          isPersonal ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {plan.regularPrice}
                      </span>
                    )}
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        isPersonal ? "text-white" : "text-gray-950"
                      }`}
                    >
                      {priceOf(plan)}
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 text-sm font-semibold ${
                      isPersonal ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {plan.startLabel}
                    {live && " · Master Class price"}
                  </p>

                  {/* CTA */}
                  <a
                    href={urlOf(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCheckout(plan, priceOf(plan))}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-extrabold transition-transform duration-200 hover:scale-[1.02] md:text-lg ${
                      isPersonal
                        ? "bg-emerald-500 text-white hover:bg-emerald-400"
                        : "bg-gray-950 text-white hover:bg-gray-800"
                    }`}
                  >
                    Join {plan.name} — {priceOf(plan)}
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                            isPersonal ? "text-emerald-400" : "text-emerald-600"
                          }`}
                          strokeWidth={3}
                        />
                        <span
                          className={`text-sm leading-relaxed ${
                            isPersonal ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Best for */}
                  <div
                    className={`mt-6 rounded-2xl p-4 ${
                      isPersonal ? "bg-white/5" : "bg-emerald-50/70"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                        isPersonal ? "text-emerald-400" : "text-emerald-700"
                      }`}
                    >
                      Choose this if
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {plan.bestFor.map((b) => (
                        <li
                          key={b}
                          className={`text-sm ${
                            isPersonal ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Comparison ────────────────────────────────────────────────────── */}
      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-950 md:text-3xl">
            What actually changes between them
          </h2>

          <div className="mt-7 overflow-hidden rounded-2xl border-2 border-gray-100">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-gray-950 px-3 py-3 text-center md:px-5">
              <span />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 md:text-xs">
                Group
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 md:text-xs">
                Personalized
              </span>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.1fr_1fr_1fr] items-center gap-2 px-3 py-3.5 md:px-5 ${
                  i % 2 ? "bg-white" : "bg-gray-50/80"
                }`}
              >
                <span className="text-xs font-semibold text-gray-500 md:text-sm">
                  {row.label}
                </span>
                {[row.group, row.personal].map((cell, k) => (
                  <span
                    key={k}
                    className="text-center text-xs font-bold text-gray-900 md:text-sm"
                  >
                    {cell === true ? (
                      <Check
                        className="mx-auto h-4 w-4 text-emerald-600"
                        strokeWidth={3}
                      />
                    ) : cell === false ? (
                      <Minus className="mx-auto h-4 w-4 text-gray-300" />
                    ) : (
                      cell
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Everything else — the yoga, the leaderboard, the contest — is
            identical.
          </p>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <TransformationsSection />

      {/* ── Objections ────────────────────────────────────────────────────── */}
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
                <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 px-5 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            Twenty one days from now, you will have done it either way.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-400">
            The only question is whether you did it alone or with a team behind
            you.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {OFFER_PLANS.map((plan) => (
              <a
                key={plan.id}
                href={urlOf(plan)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCheckout(plan, priceOf(plan))}
                className={`flex flex-col items-center justify-center rounded-2xl px-5 py-4 font-extrabold transition-transform duration-200 hover:scale-[1.02] ${
                  plan.id === "personalized"
                    ? "bg-emerald-500 text-white hover:bg-emerald-400"
                    : "bg-white text-gray-950 hover:bg-gray-100"
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">
                  {plan.name}
                </span>
                <span className="mt-1 text-2xl">{priceOf(plan)}</span>
              </a>
            ))}
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Payments are handled by Razorpay. Our team reaches out on WhatsApp
            the same day.
          </p>
        </div>
      </section>

      {/* ── Sticky bar ────────────────────────────────────────────────────── */}
      <StickyOfferBar live={live} />
      <ChatButton />
    </div>
  );
};

/** Two-button sticky bar — appears once the plan cards scroll past. */
const StickyOfferBar = ({ live }: { live: boolean }) => {
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
        {OFFER_PLANS.map((plan) => {
          const price = live ? plan.earlyPrice : plan.regularPrice;
          const url = live ? plan.earlyUrl : plan.regularUrl;
          return (
            <a
              key={plan.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCheckout(plan, price)}
              className={`flex flex-1 flex-col items-center rounded-xl px-3 py-2.5 leading-tight transition-transform duration-200 active:scale-[0.98] ${
                plan.id === "personalized"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-950"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-70">
                {plan.id === "personalized" ? "Personalized" : "Group"}
              </span>
              <span className="text-lg font-extrabold">{price}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MasterClassOffer;
