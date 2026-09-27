import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X as XIcon, CheckCircle2, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { detectPlatform, openChat } from "@/lib/chat";
import { InstagramGlyph, MessengerGlyph } from "@/components/masterclass/ChatGlyphs";
import {
  NAVFIT,
  NAVFIT_CHAT_MESSAGE,
  NAVFIT_YOGA,
} from "@/config/navfit";

import sumitImage from "@/assets/sumit sharma.png";
import dietImage from "@/assets/2.jpeg";
import groupImage from "@/assets/3.jpeg";
import motivationImage from "@/assets/4.jpeg";
import contestImage from "@/assets/5.jpeg";
import fastingImage from "@/assets/6.jpeg";
import yogaImage from "@/assets/7.jpeg";

type CtaProps = { onRegister: () => void; priceLabel: string };

const CtaButton = ({ onRegister, priceLabel, label = "Join the Nav Fit Challenge" }: CtaProps & { label?: string }) => (
  <button
    type="button"
    onClick={onRegister}
    className="no-heartbeat w-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-rose-600/20 transition-transform hover:scale-[1.02] sm:w-auto sm:px-10 md:text-lg"
  >
    {label} — {priceLabel}
  </button>
);

const SectionHeading = ({ eyebrow, title, sub }: { eyebrow?: string; title: React.ReactNode; sub?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mx-auto mb-10 max-w-2xl text-center"
  >
    {eyebrow && (
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">{eyebrow}</p>
    )}
    <h2 className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">{title}</h2>
    {sub && <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">{sub}</p>}
  </motion.div>
);

// ─── The problem ──────────────────────────────────────────────────────────────
const USUAL = [
  "Long hungry gaps, then a heavy fried meal at night",
  "Kuttu puri, sabudana vada, aloo chips — all deep fried",
  "Sweets and sugary drinks to “keep energy up”",
  "Tired, bloated and irritable by day four",
  "Weight goes up — and stays up after Dussehra",
];
const NAVFIT_WAY = [
  "Clear fasting windows you can actually keep",
  "Vrat foods cooked and portioned for fat loss",
  "9 Golden Habits you learn once and keep for life",
  "Daily live yoga to keep energy and metabolism up",
  "Daily guidance so you never guess what to eat next",
];

export const NavFitWhySection = ({ onRegister, priceLabel }: CtaProps) => (
  <section className="bg-white px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Why Nav Fit"
        title={<>The vrat isn&apos;t the problem. <span className="text-rose-600">The way we fast is.</span></>}
        sub="Navratri is the one time of year millions of us already fast. Done right, those 9 days are the easiest weight loss window you'll get all year."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border-2 border-gray-200 bg-gray-50 p-6 md:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500">The usual Navratri</p>
          <ul className="mt-4 space-y-3">
            {USUAL.map((t) => (
              <li key={t} className="flex items-start gap-3 text-gray-700">
                <XIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" strokeWidth={2.5} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-amber-50 p-6 md:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-rose-700">The Nav Fit way</p>
          <ul className="mt-4 space-y-3">
            {NAVFIT_WAY.map((t) => (
              <li key={t} className="flex items-start gap-3 font-medium text-gray-900">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" strokeWidth={3} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-10 text-center">
        <CtaButton onRegister={onRegister} priceLabel={priceLabel} />
      </div>
    </div>
  </section>
);

// ─── Timeline ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    when: NAVFIT.orientationDateLabel,
    time: `${NAVFIT.orientationTimeLabel} · ${NAVFIT.orientationDuration}`,
    title: "Live orientation with Sumit",
    desc: `Sumit walks you through the ${NAVFIT.goldenHabits} Ultimate Golden Habits, how the fasting works and exactly what to eat. Live on Zoom — recording shared in the group.`,
  },
  {
    when: NAVFIT.prepDayLabel,
    time: "Preparation day",
    title: "Get your kitchen ready",
    desc: "Stock up on what the plan needs, set your fasting windows and ease your body in, so day one doesn't feel like a shock.",
  },
  {
    when: `${NAVFIT.startLabel} – ${NAVFIT.endLabel}`,
    time: "Day 1 to Day 9",
    title: "Follow the plan, every day",
    desc: "The guided Navratri fasting plan, daily live yoga, and reminders and motivation in the WhatsApp group — every day until the last day of the challenge.",
  },
];

export const NavFitTimelineSection = () => (
  <section className="bg-gradient-to-b from-amber-50/60 to-white px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-3xl">
      <SectionHeading eyebrow="How it works" title="Your 11 days, step by step" />

      <ol className="relative space-y-6 border-l-2 border-dashed border-rose-200 pl-8">
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-orange-500 text-sm font-bold text-white shadow-md">
              {i + 1}
            </span>
            <div className="rounded-2xl border-2 border-amber-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                {s.when} · <span className="text-gray-500">{s.time}</span>
              </p>
              <h3 className="mt-1 text-lg font-bold text-gray-900 md:text-xl">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 md:text-base">{s.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

// ─── What you get ────────────────────────────────────────────────────────────
const INCLUDED: { title: string; desc: string; image: string; extra?: string[] }[] = [
  {
    title: "Live orientation with Sumit Sharma",
    desc: `90 minutes on Zoom on ${NAVFIT.orientationDateLabel} at ${NAVFIT.orientationTimeLabel}. The why and the how, straight from Sumit — with the recording shared in the group.`,
    image: sumitImage,
  },
  {
    title: `The ${NAVFIT.goldenHabits} Ultimate Golden Habits`,
    desc: "Nine habits — one for each day of Navratri — that make the weight come off and stay off long after the festival.",
    image: fastingImage,
  },
  {
    title: "Guided Navratri fasting diet plan",
    desc: "A day-by-day vrat plan built for maximum weight loss, with simple home-cooked vrat food. No supplements, no shakes.",
    image: dietImage,
  },
  {
    title: "Daily live yoga classes",
    desc: "Join the same live classes as our 21 Day Challenge members, from home. Recordings are shared.",
    image: yogaImage,
    extra: [
      `Morning: ${NAVFIT_YOGA.morning}`,
      `Evening: ${NAVFIT_YOGA.evening}`,
      `${NAVFIT_YOGA.days} · IST`,
    ],
  },
  {
    title: "Daily guidance, motivation & reminders",
    desc: "What to eat, when to eat and what to do next — every day, in the WhatsApp group.",
    image: motivationImage,
  },
  {
    title: "🏆 Live leaderboard & Weight Loss Champ contest",
    desc: "Track your progress against the group and push yourself to the top.",
    image: contestImage,
  },
  {
    title: "A group of highly motivated people",
    desc: "Fast alongside people doing the same 9 days, with the same plan, cheering each other on.",
    image: groupImage,
  },
];

export const NavFitIncludedSection = ({ onRegister, priceLabel }: CtaProps) => (
  <section className="bg-white px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading eyebrow="Everything included" title="What you get for 9 days" />

      <div className="grid gap-5 sm:grid-cols-2">
        {INCLUDED.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 2) * 0.08 }}
            className={`flex gap-4 rounded-3xl border-2 border-amber-100 bg-gradient-to-br from-white to-amber-50/50 p-4 shadow-sm md:p-5 ${
              i === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover md:h-28 md:w-28"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-base font-bold leading-snug text-gray-900 md:text-lg">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              {item.extra && (
                <ul className="mt-2 space-y-0.5 text-xs font-semibold text-gray-800">
                  {item.extra.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <CtaButton onRegister={onRegister} priceLabel={priceLabel} />
      </div>
    </div>
  </section>
);

// ─── 9 Golden Habits teaser ──────────────────────────────────────────────────
/** Nine festive colours, one per night. Decorative only — not the official day colours. */
const HABIT_COLOURS = [
  "from-orange-500 to-amber-400",
  "from-rose-600 to-pink-500",
  "from-emerald-600 to-green-500",
  "from-yellow-500 to-amber-300",
  "from-sky-600 to-cyan-500",
  "from-red-600 to-rose-500",
  "from-violet-600 to-purple-500",
  "from-fuchsia-600 to-pink-500",
  "from-teal-600 to-emerald-500",
];

export const NavFitHabitsSection = () => (
  <section className="bg-gradient-to-b from-rose-950 to-rose-900 px-4 py-16 text-white md:py-20">
    <div className="container mx-auto max-w-4xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Revealed live at the orientation</p>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl">
        9 nights. 9 Ultimate Golden Habits.
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-rose-100 md:text-lg">
        Our 21 Day Challenge teaches five. For Navratri, Sumit is teaching nine — one for each
        night — so the festival leaves you with habits, not just a lower number on the scale.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
        {HABIT_COLOURS.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${c} shadow-lg`}
          >
            <span className="text-3xl font-extrabold md:text-5xl">{i + 1}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/90 md:text-xs">
              Golden Habit
            </span>
            <Lock className="absolute right-2 top-2 h-3.5 w-3.5 text-white/70 md:h-4 md:w-4" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Register card ───────────────────────────────────────────────────────────
const CARD_POINTS = [
  `Live orientation with Sumit — ${NAVFIT.orientationDateLabel}, ${NAVFIT.orientationTimeLabel}`,
  `The ${NAVFIT.goldenHabits} Ultimate Golden Habits`,
  "Guided Navratri fasting diet plan — all 9 days",
  "Daily live yoga classes (recordings shared)",
  "Daily guidance & motivation in the WhatsApp group",
  "Live leaderboard & Weight Loss Champ contest",
];

export const NavFitRegisterCard = ({ onRegister, priceLabel }: CtaProps) => (
  <section id="register" className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-r from-rose-700 to-orange-500 px-6 py-6 text-center text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-100">{NAVFIT.eventName}</p>
          <h3 className="mt-1 text-2xl font-extrabold">{NAVFIT.name}</h3>
          <p className="mt-1 text-sm font-medium">{NAVFIT.datesShort}</p>
        </div>
        <div className="p-6">
          <div className="mb-6 text-center">
            <span className="text-5xl font-extrabold text-gray-900">{priceLabel}</span>
            <p className="mt-1 text-sm text-gray-500">one-time · all 9 days</p>
          </div>
          <ul className="mb-7 space-y-3">
            {CARD_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-gray-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onRegister}
            className="no-heartbeat w-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500 py-4 text-lg font-extrabold text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            Join Now — {priceLabel}
          </button>
          <p className="mt-3 text-center text-[11px] text-gray-500">
            Secure payment via Razorpay · Instant confirmation
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What happens after I pay?",
    a: "You land straight on a confirmation page with the link to the Nav Fit WhatsApp group. Please join it — the Zoom link for the orientation, the diet plan, the yoga class links and all daily guidance are shared there.",
  },
  {
    q: "Do I have to fast all 9 days?",
    a: "The plan is built around the full 9 days of Navratri, and that's where the best results come from. Sumit explains in the orientation how to follow it around your own routine and your family's traditions.",
  },
  {
    q: "What will I eat?",
    a: "Simple, home-cooked vrat food — the kind already in your kitchen during Navratri — planned and portioned for weight loss. No supplements, no meal-replacement shakes, no expensive products.",
  },
  {
    q: "I don't usually keep the Navratri fast. Can I still join?",
    a: "Yes. The plan works as a guided 9-day fasting and diet reset whether or not you observe the vrat for religious reasons.",
  },
  {
    q: "I have diabetes, thyroid, PCOS or BP. Is this safe for me?",
    a: "People managing these conditions are a big part of who we work with, and you can tell us about yours when you register. Nothing here asks you to stop or change any medication, and this is nutrition, fasting and yoga guidance rather than medical treatment. If you are on medication — especially for diabetes — please check with your doctor before fasting.",
  },
  {
    q: "What if I miss the live orientation?",
    a: "The recording is shared in the WhatsApp group, so you won't miss the content. Joining live is still the best way — you can ask Sumit your questions directly.",
  },
  {
    q: "I've never done yoga. Can I join the classes?",
    a: "Yes. The live classes are designed for beginners and every pose has an easier version. If you can't make a class, the recordings are shared.",
  },
  {
    q: "Who should not join?",
    a: "If you are pregnant, breastfeeding, under 18, or being treated for a serious medical condition, please speak to your doctor first. The program is designed for healthy adults.",
  },
];

export const NavFitFAQ = () => {
  const platform = useMemo(detectPlatform, []);
  const [copied, setCopied] = useState(false);
  const isFacebook = platform === "facebook";

  const handleChat = async () => {
    const didCopy = await openChat(platform, NAVFIT_CHAT_MESSAGE);
    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

  return (
    <section className="bg-[#fbf7f0] px-4 py-16 md:py-20">
      <div className="container mx-auto max-w-3xl">
        <h2 className="mb-8 text-3xl font-extrabold text-gray-900 md:text-4xl">Questions, answered</h2>
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-gray-300 py-2">
              <AccordionTrigger className="text-left text-sm font-semibold text-gray-800 hover:no-underline md:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pt-1 text-sm leading-relaxed text-gray-600 md:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">Still have a question?</p>
          <button
            type="button"
            onClick={handleChat}
            className={`no-heartbeat mx-auto mt-4 flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] ${
              isFacebook
                ? "bg-gradient-to-r from-[#0084FF] to-[#0064E0]"
                : "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
            }`}
          >
            {isFacebook ? <MessengerGlyph className="h-5 w-5" /> : <InstagramGlyph className="h-5 w-5" />}
            Message us on {isFacebook ? "Messenger" : "Instagram"}
          </button>
          {copied && (
            <p className="mt-3 text-xs font-medium text-emerald-700">Message copied — just paste it in the chat.</p>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── Mobile sticky bar ───────────────────────────────────────────────────────
export const NavFitStickyBar = ({
  onRegister,
  priceLabel,
  hidden,
}: CtaProps & { hidden?: boolean }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-amber-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{NAVFIT.name} · {NAVFIT.datesShort}</p>
          <p className="truncate text-xs text-gray-600">Orientation {NAVFIT.orientationDateLabel.replace("Friday, ", "")}, {NAVFIT.orientationTimeLabel}</p>
        </div>
        <button
          type="button"
          onClick={onRegister}
          className="no-heartbeat flex-shrink-0 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md"
        >
          Join — {priceLabel}
        </button>
      </div>
    </div>
  );
};

