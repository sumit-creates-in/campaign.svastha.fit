/**
 * Ultimate 21 Day Weight Loss Challenge — Master Class
 * Single source of truth for dates, pricing, copy and payment config.
 * Change values here; every section on the page reads from this file.
 */

// ─── Session ──────────────────────────────────────────────────────────────────
export const MASTERCLASS = {
  name: "Ultimate 21 Day Weight Loss Challenge",
  subtitle: "Master Class",

  /** ISO 8601 with IST offset. Drives the countdown and all date displays. */
  startsAt: "2026-09-16T19:30:00+05:30",
  dateLabel: "Wednesday, 16 September 2026",
  timeLabel: "7:30 PM IST",
  durationLabel: "90 minutes",
  platformLabel: "LIVE on Zoom",
  languageLabel: "Hindi + English",

  /** Batch that the Master Class pitches into. */
  challengeStartLabel: "20 September 2026",

  // ─── Navratri framing ──────────────────────────────────────────────────────
  // Sharad Navratri 2026: 11–20 October. A 21-day challenge starting 20 Sept
  // finishes right as Navratri begins — that's the hook.
  navratriStartLabel: "11 October",
  navratriLabel: "Navratri",
} as const;

// ─── Pricing ──────────────────────────────────────────────────────────────────
export const PRICING = {
  anchor: "₹999",
  price: "₹49",
  priceNumeric: 49,
} as const;

// ─── Payment ──────────────────────────────────────────────────────────────────
/** Razorpay Payment Page for the ₹49 Master Class registration. */
export const RAZORPAY_URL = "https://rzp.io/rzp/zWaRqQT";

/**
 * Razorpay Payment Pages accept prefill values as URL query parameters.
 * `email` and `phone` are standard field names. The name field is a custom
 * input, and its parameter is the field's own label lowercased with
 * underscores — which varies per page. We send the three common spellings;
 * Razorpay silently ignores parameters that don't match a field, so the
 * correct one lands and the others are discarded.
 *
 * If the name still arrives empty, open the Payment Page in Razorpay, read the
 * exact label of the name field, and add its slug to this list.
 */
export const RAZORPAY_NAME_PARAMS = ["name", "full_name", "your_name"] as const;

export interface PrefillDetails {
  name: string;
  email: string;
  /** 10-digit Indian mobile, no country code. */
  phone: string;
}

/** Builds the Razorpay URL with the registrant's details already filled in. */
export function buildRazorpayUrl({ name, email, phone }: PrefillDetails): string {
  const params = new URLSearchParams();
  params.set("email", email.trim());
  params.set("phone", phone.trim());
  for (const key of RAZORPAY_NAME_PARAMS) {
    params.set(key, name.trim());
  }
  return `${RAZORPAY_URL}?${params.toString()}`;
}

// ─── Daily practice (yoga classes) ────────────────────────────────────────────
// Positioned as the practice that drives the transformation — never as "free".
export const DAILY_PRACTICE = {
  morning: "6:30 AM",
  evening: "5:30 PM",
  days: "Monday to Friday",
} as const;

// ─── Proof numbers ────────────────────────────────────────────────────────────
// One set of numbers for the whole page. The existing challenge page quotes
// 4067+, 6733+ and 256+ in different components — contradictions like that are
// exactly what damages credibility, so everything here reads from one place.
export const PROOF = {
  transformations: "6,700+",
  instagramFollowers: "131K",
  yearsExperience: "10+",
} as const;

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
export const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=15557533653&text=" +
  encodeURIComponent(
    "I want to know more about the Ultimate 21 Day Weight Loss Challenge Master Class",
  ) +
  "&type=phone_number&app_absent=0";
