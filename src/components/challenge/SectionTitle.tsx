import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Master Class-style section heading: small pill, bold title, one line under it.
 * Used by the challenge sections when they get `clean` (Ultimate 21 Day page,
 * Sumit 25 Nov 2026), so every heading on that page looks the same.
 */
export const SectionTitle = ({
  eyebrow,
  title,
  sub,
  className = "mb-10 md:mb-14",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-center ${className}`}
  >
    {eyebrow && (
      <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
        {eyebrow}
      </span>
    )}
    <h2 className="mx-auto mt-4 max-w-2xl text-[26px] font-extrabold leading-tight text-gray-900 md:text-4xl">
      {title}
    </h2>
    {sub && <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 md:text-lg">{sub}</p>}
  </motion.div>
);
