import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, ClipboardList, Sparkles, Clock } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import {
  US_PERSONAL_PRICING,
  US_LEAD_STORAGE_KEY,
  US_LEAD_WEBHOOK_URL,
} from "@/config/usMasterclass";

/**
 * After paying for the US 21-Day Personalized Plan (Sumit, 24 Nov 2026).
 * Stripe sends people here with ?amount=59|49&session_id=…
 *
 * 1. Fires the Meta Pixel Purchase once per Stripe session.
 * 2. Tells the automator the lead has paid (same webhook as the form, event
 *    "us_personal_plan_paid"), so the CRM shows it for Samiksha straight away.
 *
 * No WhatsApp chat button (Sumit's rule) — the coach messages them.
 */

type StoredLead = {
  leadId?: string;
  name?: string;
  email?: string;
  phone?: string;
  tier?: "standard" | "offer";
  plan?: string;
  goal?: string;
  conditions?: string[];
};

function readLead(): StoredLead | null {
  try {
    const raw = localStorage.getItem(US_LEAD_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredLead) : null;
  } catch {
    return null;
  }
}

/** True the first time we see this Stripe session in this browser. */
function firstVisit(sessionId: string | null): boolean {
  if (!sessionId) return false;
  const key = `svastha_us_pp_purchase_${sessionId}`;
  try {
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, "1");
  } catch {
    /* storage blocked — treat as first visit for this page load */
  }
  return true;
}

const UsPersonalPlanConfirmed = () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const isTest = params.get("test") === "1";
  const lead = useMemo(readLead, []);

  const amount =
    Number(params.get("amount")) ||
    (lead?.tier === "offer" ? US_PERSONAL_PRICING.offer.amount : US_PERSONAL_PRICING.standard.amount);
  const firstName = lead?.name?.split(" ")[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isTest || !firstVisit(sessionId)) return;

    try {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq(
          "track",
          "Purchase",
          { value: amount, currency: "USD", content_name: "US 21-Day Personalized Plan" },
          { eventID: sessionId },
        );
      }
    } catch {
      /* tracking must never break the page */
    }

    if (lead?.phone) {
      const conditions = Array.isArray(lead.conditions) ? lead.conditions : [];
      const body = {
        event: "us_personal_plan_paid",
        plan: "personalized",
        paid: true,
        summary: [
          `PAID — PERSONALIZED 21-DAY PLAN $${amount}. WhatsApp her to start the plan within 24 h`,
          lead.goal ?? "",
          conditions.join(", "),
        ]
          .filter(Boolean)
          .join(" / "),
        source: "us-masterclass-landing",
        lead_id: lead.leadId ?? "",
        name: lead.name ?? "",
        email: lead.email ?? "",
        phone: lead.phone,
        goal: lead.goal ?? "",
        conditions,
        amount,
        currency: "USD",
        stripe_session_id: sessionId,
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
      };
      fetch(US_LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {
        /* Stripe still has the payment on record */
      });
    }
  }, [sessionId, amount, isTest, lead]);

  useMeta({
    title: "Payment received — your 21-Day Personalized Plan | Svastha",
    description: "Your SVASTHA coach will WhatsApp you within 24 hours to start your plan.",
  });

  const steps = [
    {
      icon: MessageCircle,
      title: "Your coach WhatsApps you",
      text: "Within 24 hours, on the WhatsApp number you gave us. Please keep an eye on your messages.",
    },
    {
      icon: ClipboardList,
      title: "A short chat about you",
      text: "Your weight, routine, food habits and any health conditions — so the plan fits your life.",
    },
    {
      icon: Sparkles,
      title: "Your plan starts",
      text: "21 days of a plan made for you, with your coach checking in on WhatsApp.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-white px-5 py-14">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/30">
            <Check className="h-11 w-11 text-white" strokeWidth={3.5} />
          </div>
          <h1 className="mt-7 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            {firstName ? `Welcome, ${firstName}.` : "Welcome."}
          </h1>
          <p className="mt-3 text-base text-gray-600 md:text-lg">
            Your <span className="font-bold text-gray-900">21-Day Personalized Plan</span> is booked.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 rounded-3xl border-2 border-emerald-200 bg-white p-6 shadow-lg md:p-8"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
            What happens next
          </p>
          <ol className="mt-5 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {i + 1}. {s.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-2xl bg-gray-50 px-5 py-4 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
            <Clock className="h-4 w-4 text-emerald-600" />
            Our coaches reply 10:30 PM – 11:30 AM ET, every day
          </p>
          <p className="mt-1 text-xs text-gray-500">(7:30 PM – 8:30 AM PT · 9 AM – 10 PM in India)</p>
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-400">
          A receipt from Stripe is on its way to your inbox.
        </p>
        <p className="mt-4 text-center text-sm text-gray-400">Glad to have you with us — Team SVASTHA</p>
      </div>
    </div>
  );
};

export default UsPersonalPlanConfirmed;
