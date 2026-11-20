import { motion } from "framer-motion";
import { Frown, Scale, Cookie, Activity, Flower2, Briefcase, Home, Heart, Hourglass } from "lucide-react";

/**
 * "Who is this for?" for the women-only US Master Class. Same look as the
 * shared WhoIsThisForSection; the list speaks to Indian women in the USA.
 */
const AUDIENCES = [
  { icon: Frown, title: "Tried Losing Weight but Failed" },
  { icon: Scale, title: "Lost Weight but it Came Back" },
  { icon: Hourglass, title: "Metabolism Slowed Down After 35" },
  { icon: Cookie, title: "Crave Sugar & Carbs" },
  { icon: Activity, title: "Gut Issues & Bloating" },
  { icon: Flower2, title: "Hormonal Imbalance" },
  { icon: Briefcase, title: "Working Women" },
  { icon: Home, title: "Home Makers" },
  { icon: Heart, title: "Busy Moms" },
];

export const UsWomenWhoIsThisFor = () => (
  <section className="bg-white px-4 py-20">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Who is this for?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">
          Indian women living in the USA &amp; Canada who want to lose weight
          without giving up the food they grew up with.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
        {AUDIENCES.map((a, idx) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg md:h-20 md:w-20">
              <a.icon className="h-8 w-8 text-white md:h-10 md:w-10" strokeWidth={2} />
            </div>
            <p className="text-base font-normal text-gray-700 md:text-lg">{a.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
