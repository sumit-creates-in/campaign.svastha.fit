/**
 * Nav Fit Challenge — 9 day guided Navratri fasting program.
 * Single source of truth for dates, prices, links and copy that repeats.
 * Every section on /nav-fit-challenge and /nav-fit-challenge-confirmed reads
 * from this file.
 */

// ─── Program ──────────────────────────────────────────────────────────────────
export const NAVFIT = {
  name: "Nav Fit Challenge",
  tagline: "Guided Navratri fasting for maximum weight loss",
  eventName: "9 DAY NAVRATRI FASTING PROGRAM",

  /** Live orientation with Sumit — ISO 8601 with IST offset. Drives the countdown. */
  orientationAt: "2026-10-09T19:30:00+05:30",
  orientationDateLabel: "Friday, 9 October",
  orientationTimeLabel: "7:30 PM IST",
  orientationDuration: "90 minutes",

  prepDayLabel: "Saturday, 10 October",
  startLabel: "Sunday, 11 October",
  endLabel: "Monday, 19 October",
  datesShort: "11 – 19 October",

  goldenHabits: 9,
  platformLabel: "Live on Zoom",
  languageLabel: "Hindi + English",
} as const;

// ─── Pricing & payment ────────────────────────────────────────────────────────
/**
 * Razorpay Payment Pages. Use the full pages.razorpay.com URL — the rzp.io
 * short links drop the query string, and with it every prefill value.
 *
 * Both pages must have form fields keyed `name`, `email` and `mobile` (easiest:
 * duplicate the ₹49 Master Class page), and after payment redirect to
 *   https://campaign.svastha.fit/nav-fit-challenge-confirmed?amount=499 (or 399)
 */
export const NAVFIT_PRICING = {
  standard: {
    price: "₹499",
    amount: 499,
    // = rzp.io/rzp/my5eneH. Full URL on purpose: the short link drops prefill.
    url: "https://pages.razorpay.com/pl_Tgxfm6n8axz2WR/view",
  },
  /** Shown only by the one-time scroll offer. */
  offer: {
    price: "₹399",
    amount: 399,
    was: "₹499",
    saving: "₹100",
    // = rzp.io/rzp/38cS3Hn
    url: "https://pages.razorpay.com/pl_TgxgjPVBWJHkuA/view",
  },
} as const;

export type NavFitTier = keyof typeof NAVFIT_PRICING;

/** Razorpay prefill — the phone field on these pages responds to `mobile`. */
export function buildNavFitPaymentUrl(
  tier: NavFitTier,
  { name, email, phone }: { name: string; email: string; phone: string },
): string {
  const params = new URLSearchParams({
    name: name.trim(),
    email: email.trim(),
    mobile: phone.trim(),
  });
  return `${NAVFIT_PRICING[tier].url}?${params.toString()}`;
}

// ─── Lead capture ─────────────────────────────────────────────────────────────
/** Automator workflow "Capture Lead from Nav Fit Challenge" → lead sheet, team email, CRM. */
export const NAVFIT_LEAD_WEBHOOK_URL =
  "https://svastha-automator-webhook-production.up.railway.app/api/webhooks/brb2NTzvcw-fnhlDIDmcMB";

// ─── Post-payment ─────────────────────────────────────────────────────────────
/** Every paid participant joins this group — the Zoom link and daily guidance go here. */
export const NAVFIT_WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Cw9ck65K2cd39P7zwWC8UB";

export const NAVFIT_STORAGE_KEY = "svastha_navfit_lead";

/** Pre-typed message for the Instagram / Messenger chat button. */
export const NAVFIT_CHAT_MESSAGE =
  "Hi, I want to know more about the Nav Fit Challenge (9 day Navratri fasting program).";

/** YouTube intro video at the top of the page. */
export const NAVFIT_VIDEO_ID = "gBowL78VcXo";

// ─── Daily live yoga (same classes as the 21 Day Challenge) ──────────────────
export const NAVFIT_YOGA = {
  morning: "5:30, 6:30, 7:30, 8:30 & 9:30 AM",
  evening: "4:30, 5:30 & 6:30 PM",
  days: "Monday to Friday",
} as const;
