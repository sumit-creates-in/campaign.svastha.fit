/**
 * Ultimate 21 Day Weight Loss Challenge — Master Class
 * Single source of truth for dates, pricing, copy and payment config.
 * Change values here; every section on the page reads from this file.
 */

// ─── Session ──────────────────────────────────────────────────────────────────
export const MASTERCLASS = {
  name: "Ultimate 21 Day Weight Loss Challenge",
  subtitle: "Master Class",
  /** Shown as the event-name banner under the headline. */
  eventName: "MASTER CLASS",

  /** ISO 8601 with IST offset. Drives the countdown and all date displays. */
  startsAt: "2026-09-18T19:30:00+05:30",
  dateLabel: "Friday, 18 September 2026",
  timeLabel: "7:30 PM IST",
  durationLabel: "90 minutes",
  platformLabel: "LIVE on Zoom",
  languageLabel: "Hindi + English",

  /** Batch that the Master Class pitches into. */
  challengeStartLabel: "27 September 2026",
} as const;

// ─── Pricing ──────────────────────────────────────────────────────────────────
export const PRICING = {
  anchor: "₹999",
  price: "₹49",
  priceNumeric: 49,
} as const;

// ─── Payment ──────────────────────────────────────────────────────────────────
/**
 * The Razorpay Payment Page for the ₹49 Master Class registration.
 *
 * IMPORTANT — use the full pages.razorpay.com URL, never the rzp.io short link.
 * Verified in a real browser on 14 Sep 2026: rzp.io/rzp/zWaRqQT redirects here
 * but DROPS the entire query string, so every prefill value is lost. That was
 * why registrants had to retype their details.
 */
export const RAZORPAY_URL = "https://pages.razorpay.com/pl_TOmYLhPmv9SfhQ/view";

export interface PrefillDetails {
  name: string;
  email: string;
  /** 10-digit Indian mobile, no country code. */
  phone: string;
}

/**
 * Builds the Razorpay URL with the registrant's details already filled in.
 *
 * Parameter names verified against the live page — the phone field responds to
 * `mobile`. It does NOT respond to `phone` or `contact`, despite what
 * Razorpay's own docs suggest for Payment Pages.
 */
export function buildRazorpayUrl({
  name,
  email,
  phone,
}: PrefillDetails): string {
  const params = new URLSearchParams({
    name: name.trim(),
    email: email.trim(),
    mobile: phone.trim(),
  });
  return `${RAZORPAY_URL}?${params.toString()}`;
}

// ─── Daily yoga classes ───────────────────────────────────────────────────────
// Positioned as the practice that drives the transformation — never as "free".
export const DAILY_PRACTICE = {
  morning: "6:30 AM",
  evening: "5:30 PM",
  days: "Monday to Friday",
} as const;

// ─── Chronic conditions we explicitly welcome ─────────────────────────────────
export const CONDITIONS = [
  "Fatty Liver",
  "PCOS / PCOD",
  "Type 2 Diabetes",
  "Thyroid",
  "Heart & BP Issues",
  "High Cholesterol",
] as const;

// ─── Proof numbers ────────────────────────────────────────────────────────────
// One set of numbers for the whole page. The existing challenge page quotes
// 4067+, 6733+ and 256+ in different components — contradictions like that are
// exactly what damages credibility, so everything here reads from one place.
export const PROOF = {
  transformations: "6,700+",
  instagramFollowers: "131K",
  yearsExperience: "10+",
} as const;

// ─── Chat ─────────────────────────────────────────────────────────────────────
/**
 * No WhatsApp anywhere on this page — Sumit wants visitors returned to the
 * platform they arrived from, with Instagram as the fallback.
 */
export const SOCIAL = {
  instagramHandle: "sumit_sharma_coach",
  instagramProfile: "https://www.instagram.com/sumit_sharma_coach/",
  /** ig.me opens a direct-message thread rather than the profile grid. */
  instagramDirect: "https://ig.me/m/sumit_sharma_coach",

  facebookHandle: "yogabysumit",
  facebookProfile: "https://www.facebook.com/yogabysumit",
  /** m.me opens a Messenger thread. */
  facebookDirect: "https://m.me/yogabysumit",
} as const;

// ─── Post-payment ─────────────────────────────────────────────────────────────
/**
 * The WhatsApp group every paid registrant must join — the Zoom link and all
 * reminders go out here. Shown only on the confirmation page, which Razorpay
 * redirects to after a successful payment.
 */
export const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/LAQveQilP4W5DcKmd6Ef8t";

export const CHAT_MESSAGE =
  "Hi, I want to know more about Ultimate 21 Day Weight Loss Challenge - Master Class.";

// ─── The offer ────────────────────────────────────────────────────────────────
/**
 * Everything the post–Master Class offer page reads from.
 *
 * Master Class pricing closes at 11:00 PM IST on the night of the session.
 * After that the page switches itself over to the regular prices and the
 * regular payment links — no edit or redeploy needed. That switch is the whole
 * point: if the price is still there tomorrow, the deadline never works again.
 */
export const OFFER = {
  /** ISO 8601 with IST offset. After this instant, regular pricing shows. */
  deadline: "2026-09-16T23:00:00+05:30",
  deadlineLabel: "11:00 PM tonight",
} as const;

export interface OfferPlan {
  id: "group" | "personalized";
  name: string;
  tagline: string;
  /** Master Class price — live until OFFER.deadline. */
  earlyPrice: string;
  earlyUrl: string;
  /** Regular price — what the page shows afterwards. */
  regularPrice: string;
  regularUrl: string;
  startLabel: string;
  features: string[];
  bestFor: string[];
}

export const OFFER_PLANS: readonly OfferPlan[] = [
  {
    id: "group",
    name: "Group Plan",
    tagline: "You follow the plan with the batch",
    earlyPrice: "₹790",
    earlyUrl: "https://rzp.io/rzp/29j50yv8",
    regularPrice: "₹990",
    regularUrl: "https://pages.razorpay.com/pl_QHMrm9qAqyqcdA/view",
    startLabel: "Batch starts 27 September",
    features: [
      "The full 21 day diet plan — 5 options for every meal",
      "Your intermittent fasting windows and fasting days",
      "Live yoga classes twice a day, Monday to Friday",
      "Daily guidance in the batch WhatsApp group",
      "The live leaderboard and the Weight Loss Champ contest",
      "Every class recorded, so one busy day costs you nothing",
    ],
    bestFor: [
      "You are generally healthy",
      "You can start with the batch on 27 September",
      "You are happy following a set plan",
      "Budget matters right now",
    ],
  },
  {
    id: "personalized",
    name: "Personalized Plan",
    tagline: "A dietitian builds it around you",
    earlyPrice: "₹2,490",
    earlyUrl: "https://rzp.io/rzp/2EBxuXvN",
    regularPrice: "₹2,990",
    regularUrl: "https://pages.razorpay.com/pl_QHMy1AvL4XDeqQ/view",
    startLabel: "You can start today",
    features: [
      "Everything in the Group Plan",
      "A diet plan built around your body, routine and food habits",
      "Your own dedicated dietitian, not group guidance",
      "Thyroid, PCOS, sugar or BP planned around — not worked around",
      "Direct WhatsApp access to your dietitian",
      "Your plan adjusted as your body responds",
    ],
    bestFor: [
      "You are managing thyroid, PCOS, sugar or BP",
      "You want to start today, not in 11 days",
      "You have tried before and stalled",
      "You want someone accountable to you",
    ],
  },
] as const;

/** True while Master Class pricing is still live. */
export function isOfferLive(now: number = Date.now()): boolean {
  return now < new Date(OFFER.deadline).getTime();
}
