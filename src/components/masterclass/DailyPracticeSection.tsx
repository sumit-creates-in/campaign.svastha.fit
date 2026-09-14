import { motion } from "framer-motion";
import { Sunrise, Sunset, UserCheck, PlayCircle } from "lucide-react";
import { DAILY_PRACTICE } from "@/config/masterclass";

const PILLARS = [
  {
    icon: UserCheck,
    title: "A real teacher, not a video",
    body: "Someone who sees you on screen, corrects your posture, and notices when you don't show up. That accountability is the whole point.",
  },
  {
    icon: PlayCircle,
    title: "Recordings if life gets in the way",
    body: "Miss a morning and the session is waiting for you. Nobody falls behind because of one bad day.",
  },
];

export const DailyPracticeSection = () => (
  <section className="bg-white px-4 py-16 md:py-20">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Included with your registration
        </span>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-4xl">
          Your Daily Practice — Live, Twice a Day
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
          A diet plan tells you what to eat. A daily practice is what actually
          changes your body. From the day you register, you join our live
          classes with Svastha&apos;s own yoga teachers — the same sessions our
          paying members practise in every morning and evening.
        </p>
      </motion.div>

      {/* The two slots */}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            icon: Sunrise,
            when: DAILY_PRACTICE.morning,
            label: "Morning",
            body: "Start the day with your metabolism switched on. This is the slot that most transformations are built on.",
            tone: "from-amber-50 to-orange-50 border-amber-200",
            iconTone: "text-amber-600",
          },
          {
            icon: Sunset,
            when: DAILY_PRACTICE.evening,
            label: "Evening",
            body: "For working professionals and anyone whose mornings belong to the family. Same teachers, same practice.",
            tone: "from-indigo-50 to-violet-50 border-indigo-200",
            iconTone: "text-indigo-600",
          },
        ].map((slot, idx) => (
          <motion.div
            key={slot.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`rounded-3xl border-2 bg-gradient-to-br p-6 ${slot.tone}`}
          >
            <slot.icon className={`h-8 w-8 ${slot.iconTone}`} />
            <p className="mt-3 text-3xl font-extrabold text-gray-900">
              {slot.when}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {slot.label} · {DAILY_PRACTICE.days}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {slot.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Why it works */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex gap-4 rounded-2xl border-2 border-gray-100 bg-gray-50/60 p-5"
          >
            <pillar.icon className="h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 md:text-base">
                {pillar.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {pillar.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Additional class timings through the day are available to members of the
        21 Day Challenge.
      </p>
    </div>
  </section>
);
