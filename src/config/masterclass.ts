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
  challengeStartLabel: "20 September 2026",
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
