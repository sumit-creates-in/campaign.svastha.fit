import { motion } from "framer-motion";
import { Sunrise, Sunset, Laptop, Repeat2, Baby } from "lucide-react";
import { DAILY_PRACTICE } from "@/config/masterclass";

import TanviImage from "@/assets/TanviPanvar.jpeg";
import karishmaImage from "@/assets/karishma Kaintura.jpeg";
import saumyaImage from "@/assets/Saumya.jpg";

const TEACHERS = [
  {
    name: "Tanvi Panvar",
    role: "Yoga Instructor",
    blurb: "Runs the energetic morning flow. Expect to sweat a little and feel awake all day.",
    image: TanviImage,
    objectPosition: "center",
  },
  {
    name: "Karishma Kaintura",
    role: "Restorative Yoga",
    blurb: "Gentle, slow and joint-friendly. Where most complete beginners start.",
    image: karishmaImage,
    objectPosition: "center 30%",
  },
  {
    name: "Saumya Gangwar",
    role: "Yoga & Workout Expert",
    blurb: "Mixes yoga with fat-burn movement. The class people say they dread and then love.",
    image: saumyaImage,
    objectPosition: "center",
  },
];

const PRACTICAL = [
  {
    icon: Laptop,
    title: "From your home, on Zoom",
    body: "No gym, no equipment, no travel. A phone or laptop and a bit of floor space is all you need.",
  },
  {
    icon: Baby,
    title: "Built for complete beginners",
    body: "Never done yoga? That's normal here. Every posture comes with an easier version.",
  },
  {
    icon: Repeat2,
    title: "Missed a class? It's recorded",
    body: "Every session is recorded and sent to you, so one busy day never breaks your streak.",
  },
];

export const DailyYogaSection = () => (
  <section className="bg-white px-4 py-20 md:py-28">
    <div className="container mx-auto max-w-5xl">
      {/* What it actually is — in plain words */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
          Included with your registration
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900 md:text-4xl">
          Live Yoga Classes, Every Single Day
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
          Twice every weekday, one of our teachers runs a <strong>live class on
          Zoom</strong> and you join from home. Not a video library. A real
          teacher, at a fixed time, who can see you, correct your posture and
          notices when you don&apos;t turn up.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base">
          A diet plan tells you what to eat. This is the part that actually
          changes your body — and the reason people who join the classes get
          results that hold.
        </p>
      </motion.div>

      {/* The two times */}
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {[
          {
            icon: Sunrise,
            when: DAILY_PRACTICE.morning,
            label: "Morning class",
            body: "Start the day with your metabolism switched on.",
            tone: "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50",
            iconTone: "text-amber-600",
          },
          {
            icon: Sunset,
            when: DAILY_PRACTICE.evening,
            label: "Evening class",
            body: "For working people, and anyone whose mornings belong to the family.",
            tone: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50",
            iconTone: "text-indigo-600",
          },
        ].map((slot, idx) => (
          <motion.div
            key={slot.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`rounded-3xl border-2 p-6 text-center md:p-7 ${slot.tone}`}
          >
            <slot.icon className={`mx-auto h-9 w-9 ${slot.iconTone}`} />
            <p className="mt-3 text-4xl font-extrabold text-gray-900">
              {slot.when}
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gray-600">
              {slot.label}
            </p>
            <p className="mt-1 text-xs font-semibold text-gray-500">
              {DAILY_PRACTICE.days}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {slot.body}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Come to either one, or both. More class timings through the day are open
        to members of the 21 Day Challenge.
      </p>

      {/* Practical reassurance */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {PRACTICAL.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="rounded-2xl border-2 border-gray-100 bg-gray-50/70 p-5"
          >
            <item.icon className="h-6 w-6 text-emerald-600" />
            <h3 className="mt-3 text-sm font-bold text-gray-900 md:text-base">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Meet the teachers — merged in so the classes have faces */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center md:mt-24"
      >
        <h3 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
          🧘‍♀️ The teachers you&apos;ll practise with
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 md:text-base">
          Not one instructor on a loop — a team, each with their own style.
          You&apos;ll find the one that suits you within a week.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {TEACHERS.map((teacher, idx) => (
          <motion.div
            key={teacher.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex flex-col items-center rounded-3xl border-2 border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-100 shadow-lg md:h-36 md:w-36">
              <img
                src={teacher.image}
                alt={teacher.name}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: teacher.objectPosition }}
              />
            </div>
            <h4 className="mt-4 text-lg font-bold text-gray-900">
              {teacher.name}
            </h4>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {teacher.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {teacher.blurb}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
