/**
 * Ultimate 21 Day Weight Loss Challenge — Master Class
 * Single source of truth for dates, pricing, copy and payment config.
 * Change values here; every section on the page reads from this file.
 */

// ─── Sessions ─────────────────────────────────────────────────────────────────
/**
 * Every Master Class in the current run, oldest first. The page always shows
 * the NEXT session: a session stays "current" until 60 minutes after it starts
 * (so late joiners still land in the right group), then the page rolls over to
 * the following one by itself. No redeploy between sessions.
 *
 * Each session has its own WhatsApp group — the Zoom link and reminders go out
 * there. The SVASTHA Automator "RazorPay Payment Captured" Master Class (₹49–₹99) branch sends the
 * same group link, and is switched over at the same moment.
 */
export interface MasterClassSession {
  /** ISO 8601 with IST offset. */
  startsAt: string;
  dateLabel: string;
  /** Optional — defaults to "9:30 AM IST" (the Sunday-morning slot). */
  timeLabel?: string;
  whatsappGroupUrl: string;
}

export const SESSIONS: readonly MasterClassSession[] = [
  {
    startsAt: "2026-10-15T19:30:00+05:30",
    dateLabel: "Thursday, 15 October 2026",
    whatsappGroupUrl: "https://chat.whatsapp.com/LrLUN2UfvPI2G3vdtc8s3m",
  },
  {
    startsAt: "2026-10-20T19:30:00+05:30",
    dateLabel: "Tuesday, 20 October 2026",
    whatsappGroupUrl: "https://chat.whatsapp.com/H3mAtQ9892O5LVjrG0xBxa",
  },
  {
    startsAt: "2026-10-25T09:30:00+05:30",
    dateLabel: "Sunday, 25 October 2026",
    whatsappGroupUrl: "https://chat.whatsapp.com/DkwXZLX6yDLIp3gTqtkDf9",
  },
  {
    // Extra weekday-evening Master Class (Sumit, 27 Oct). Same WhatsApp group
    // as the 22 Nov session (B111); registrants also keep a seat for 22 Nov.
    startsAt: "2026-10-30T19:30:00+05:30",
    dateLabel: "Friday, 30 October 2026",
    timeLabel: "7:30 PM IST",
    whatsappGroupUrl: "https://chat.whatsapp.com/CuLcTIYGt3mKxz4Hj01Kic",
  },
  {
    // Extra Sunday Master Class (Sumit, 10 Nov): own WhatsApp group. Sells the
    // early-bird into B157 (22 Nov) with a lower class price (see OFFER windows).
    startsAt: "2026-11-15T09:30:00+05:30",
    dateLabel: "Sunday, 15 November 2026",
    whatsappGroupUrl: "https://chat.whatsapp.com/JQCVTG8WvMc8T5GqbKsGCh",
  },
  {
    // Extra Wednesday-evening Master Class (Sumit, 15 Nov). Its own WhatsApp
    // group; registrants also keep a seat for the 22 Nov class.
    startsAt: "2026-11-18T19:30:00+05:30",
    dateLabel: "Wednesday, 18 November 2026",
    timeLabel: "7:30 PM IST",
    whatsappGroupUrl: "https://chat.whatsapp.com/KmV3SWAXavGENm1xz7KDgL",
  },
  {
    // Master Class + B157 Orientation (Sumit, 15 Nov). Its own WhatsApp group
    // from 19 Nov (Sumit); earlier registrants are in the 15 / 18 Nov groups.
    startsAt: "2026-11-22T09:30:00+05:30",
    dateLabel: "Sunday, 22 November 2026",
    whatsappGroupUrl: "https://chat.whatsapp.com/KHRPiO51puTDhLhEvZv3Wu",
  },
];

/** How long after the start a session still counts as the current one. */
const ROLLOVER_AFTER_MS = 60 * 60 * 1000;

/** The session a visitor registering right now is joining. */
export function currentSession(now: number = Date.now()): MasterClassSession {
  return (
    SESSIONS.find((s) => now < new Date(s.startsAt).getTime() + ROLLOVER_AFTER_MS) ??
    SESSIONS[SESSIONS.length - 1]
  );
}

const SESSION = currentSession();

// ─── Session ──────────────────────────────────────────────────────────────────
export const MASTERCLASS = {
  name: "Ultimate 21 Day Weight Loss Challenge",
  subtitle: "Master Class",
  /** Shown as the event-name banner under the headline. */
  eventName: "MASTER CLASS",

  /** Drives the countdown and all date displays — from the current session. */
  startsAt: SESSION.startsAt,
  dateLabel: SESSION.dateLabel,
  timeLabel: SESSION.timeLabel ?? "9:30 AM IST",
  durationLabel: "90 minutes",
  platformLabel: "LIVE on Zoom",
  languageLabel: "Hindi + English",

  /** Batch that the Master Class pitches into. */
  challengeStartLabel: "Monday, 23 November 2026",
} as const;

/** Short form used on the offer page ("Batch starts Monday, 26 October"). */
export const BATCH_START_SHORT = "Monday, 23 November";

// ─── Current India 21 Day batch (what buyers join) ──────────────────────────
/**
 * Read by the post-payment pages for Group (/reg-confirm-group-21wlyc-india)
 * and Personalized (/reg-confirm-personalised-21wlyc-india) buyers in India.
 * Change these three values for every new batch.
 */
export const INDIA_BATCH = {
  name: "B157",
  whatsappGroupUrl: "https://chat.whatsapp.com/HpDgEeX7DtE22BsX4y4h4X",
  /** Starting session (the Sunday live with Sumit). */
  sessionDateLabel: "22nd November (Sunday)",
  sessionTimeLabel: "9:30 AM (India Time)",
  /** Day 1 of the batch. */
  day1Label: "Monday, 23rd November",
} as const;

// ─── Pricing ──────────────────────────────────────────────────────────────────
export const PRICING = {
  anchor: "₹999",
  // ₹49 until 19 Nov 2026; Sumit raised the registration fee to ₹99 from the
  // 22 Nov class. The Automator registration branch accepts ₹49 to ₹99.
  price: "₹99",
  priceNumeric: 99,
} as const;

// ─── Payment ──────────────────────────────────────────────────────────────────
/**
 * The Razorpay Payment Page for the ₹99 Master Class registration.
 *
 * IMPORTANT — use the full pages.razorpay.com URL, never the rzp.io short link.
 * Verified in a real browser on 14 Sep 2026: rzp.io/rzp/zWaRqQT redirects here
 * but DROPS the entire query string, so every prefill value is lost. That was
 * why registrants had to retype their details.
 */
export const RAZORPAY_URL = "https://pages.razorpay.com/pl_U25cQ5uz3bHL3v/view";
// Previous ₹49 page (still active, not linked any more): pl_TOmYLhPmv9SfhQ.

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
export const WHATSAPP_GROUP_URL = SESSION.whatsappGroupUrl;

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
  /** Live from the start of a session until the same time the next day. */
  windowHours: 24,
  deadlineLabel: "midnight on Sunday",
} as const;

/**
 * Fixed offer window for the B157 batch (same pattern Sumit set for B156 on
 * 23 Oct): the Master Class price opens Friday 20 Nov and closes at midnight
 * on Sunday 22 Nov (IST), instead of 24 h after the session. Before and after
 * this window the page shows the regular price. Set new dates every cycle.
 */
type PriceOverride = Partial<
  Pick<OfferPlan, "earlyPrice" | "earlyUrl" | "flashPrice" | "flashUrl">
>;

interface OfferWindow {
  opensAt: number;
  closesAt: number;
  /** Optional per-window prices; anything not given uses OFFER_PLANS. */
  prices?: Partial<Record<OfferPlan["id"], PriceOverride>>;
}

const OFFER_FIXED_WINDOWS: OfferWindow[] = [
  // Sun 15 Nov extra Master Class (Sumit, 10 Nov): class price Group ₹1,290 /
  // Personalized ₹2,290 until midnight; 15-min flash ₹990 / ₹1,990.
  // The ₹1,990 Personalized page is the Human Coach page — its required
  // plan_human_coach field keeps the Automator from treating ₹1,990 as Group.
  {
    opensAt: Date.parse("2026-11-15T00:00:00+05:30"),
    closesAt: Date.parse("2026-11-16T00:00:00+05:30"),
    prices: {
      group: {
        earlyPrice: "₹1,290",
        earlyUrl: "https://pages.razorpay.com/pl_TrgT4iq2FuRZaa/view",
        flashPrice: "₹990",
        // pl_TyMfI09EM3qcvG — created 10 Nov for the 15 Nov flash.
        flashUrl: "https://pages.razorpay.com/pl_TyMfI09EM3qcvG/view",
      },
      personalized: {
        earlyPrice: "₹2,290",
        earlyUrl: "https://pages.razorpay.com/pl_TrgT9LUtmZLFtU/view",
        flashPrice: "₹1,990",
        flashUrl:
          "https://pages.razorpay.com/pl_TspnaK0HgnttUb/view?plan_human_coach=Human%20Coach%20Plan",
      },
    },
  },
  // Wed 18 Nov extra Master Class (Sumit, 15 Nov): same ladder as 15 Nov —
  // 15-min flash ₹990 / ₹1,990, then ₹1,290 / ₹2,290 until midnight.
  {
    opensAt: Date.parse("2026-11-18T00:00:00+05:30"),
    closesAt: Date.parse("2026-11-19T00:00:00+05:30"),
    prices: {
      group: {
        earlyPrice: "₹1,290",
        earlyUrl: "https://pages.razorpay.com/pl_TrgT4iq2FuRZaa/view",
        flashPrice: "₹990",
        flashUrl: "https://pages.razorpay.com/pl_TyMfI09EM3qcvG/view",
      },
      personalized: {
        earlyPrice: "₹2,290",
        earlyUrl: "https://pages.razorpay.com/pl_TrgT9LUtmZLFtU/view",
        flashPrice: "₹1,990",
        flashUrl:
          "https://pages.razorpay.com/pl_TspnaK0HgnttUb/view?plan_human_coach=Human%20Coach%20Plan",
      },
    },
  },
  // Fri 30 Oct extra Master Class (Sumit, 30 Oct): same Group + Personalized
  // offer as B156 — Group joins B157 (22 Nov). Open now, closes at midnight
  // on Friday 30 Oct (IST).
  {
    opensAt: Date.parse("2026-10-30T00:00:00+05:30"),
    closesAt: Date.parse("2026-10-31T00:00:00+05:30"),
  },
  // Sun 22 Nov Master Class + B157 starting session (Sumit, 22 Nov morning):
  // same ladder as 15 / 18 Nov on the day — 15-min flash ₹990 / ₹1,990, then
  // ₹1,290 / ₹2,290 until midnight. Listed before the 20–23 Nov window so it
  // wins on 22 Nov (offerPlansAt takes the first match).
  {
    opensAt: Date.parse("2026-11-22T00:00:00+05:30"),
    closesAt: Date.parse("2026-11-23T00:00:00+05:30"),
    prices: {
      group: {
        earlyPrice: "₹1,290",
        earlyUrl: "https://pages.razorpay.com/pl_TrgT4iq2FuRZaa/view",
        flashPrice: "₹990",
        flashUrl: "https://pages.razorpay.com/pl_TyMfI09EM3qcvG/view",
      },
      personalized: {
        earlyPrice: "₹2,290",
        earlyUrl: "https://pages.razorpay.com/pl_TrgT9LUtmZLFtU/view",
        flashPrice: "₹1,990",
        flashUrl:
          "https://pages.razorpay.com/pl_TspnaK0HgnttUb/view?plan_human_coach=Human%20Coach%20Plan",
      },
    },
  },
  // 20–21 Nov: Master Class price ₹1,490 / ₹2,490 (OFFER_PLANS defaults).
  {
    opensAt: Date.parse("2026-11-20T00:00:00+05:30"),
    closesAt: Date.parse("2026-11-23T00:00:00+05:30"),
  },
];

export interface OfferPlan {
  id: "group" | "personalized";
  name: string;
  tagline: string;
  /** Master Class price — live within 24 h of each session (see isOfferLive). */
  earlyPrice: string;
  earlyUrl: string;
  /** 15-minute live flash price (started by Sumit's button) — see FLASH_OFFER. */
  flashPrice: string;
  flashUrl: string;
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
    earlyPrice: "₹1,490",
    // Amount is set at the Razorpay end — this link was ₹790 on 16 Sep and
    // was re-priced to ₹1,490 for 18 Sep. Used ONLY by this page.
    earlyUrl: "https://rzp.io/rzp/29j50yv8",
    flashPrice: "₹1,290",
    // pl_TrgT4iq2FuRZaa — created 24 Oct for the live flash offer only.
    flashUrl: "https://pages.razorpay.com/pl_TrgT4iq2FuRZaa/view",
    regularPrice: "₹1,990",
    // SHARED with UpgradeModal / ScrollPopupModal on the challenge page.
    // Re-pricing this link changes what those popups charge too.
    regularUrl: "https://pages.razorpay.com/pl_QHMrm9qAqyqcdA/view",
    startLabel: `Batch starts ${BATCH_START_SHORT}`,
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
      `You can start with the batch on ${BATCH_START_SHORT}`,
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
    flashPrice: "₹2,290",
    // pl_TrgT9LUtmZLFtU — created 24 Oct for the live flash offer only.
    flashUrl: "https://pages.razorpay.com/pl_TrgT9LUtmZLFtU/view",
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
      "You want to start today, not wait for the batch",
      "You have tried before and stalled",
      "You want someone accountable to you",
    ],
  },
] as const;

/**
 * Live flash offer (Sumit, 24 Oct): when Sumit presses Start on his control
 * page, the flash prices show for 15 minutes on /join, then the page goes back
 * to the Master Class prices above. State: Supabase row campaign_flash_offers
 * id "b156" (read through the public view campaign_flash_offer_status).
 * Only honoured while isOfferLive() is true.
 */
export const FLASH_OFFER = { id: "b156", minutes: 15 } as const;

/** The offer plans with any price overrides of the window open at `now`. */
export function offerPlansAt(now: number = Date.now()): OfferPlan[] {
  const w = OFFER_FIXED_WINDOWS.find((x) => now >= x.opensAt && now < x.closesAt);
  return OFFER_PLANS.map((p) => ({ ...p, ...(w?.prices?.[p.id] ?? {}) }));
}

/**
 * Dietitian onboarding (Nov 2026): every Personalized payment carries the plan field `plan_human_coach`, so the
 * Svastha app knows a personal dietitian was bought (never guessed from the amount: Rs 1,290 / 1,990 are also Group
 * prices) and sends the buyer the "Set up your plan" link. The Razorpay page must have a field with the key
 * `plan_human_coach` for Razorpay to keep it; full pages.razorpay.com links only (rzp.io short links drop the query).
 */
export const PERSONALIZED_PLAN_FIELD = "plan_human_coach";
export const PERSONALIZED_PLAN_VALUE = "Human Coach Plan";

export function offerCheckoutUrl(plan: Pick<OfferPlan, "id">, url: string): string {
  if (plan.id !== "personalized" || !url.includes("pages.razorpay.com") || url.includes(`${PERSONALIZED_PLAN_FIELD}=`)) return url;
  // encodeURIComponent (%20), not URLSearchParams (+): Razorpay shows "+" literally.
  return `${url}${url.includes("?") ? "&" : "?"}${PERSONALIZED_PLAN_FIELD}=${encodeURIComponent(PERSONALIZED_PLAN_VALUE)}`;
}

/** True while Master Class pricing is live — within 24 h of any session's start. */
export function isOfferLive(now: number = Date.now()): boolean {
  // Only the fixed window counts (27 Oct): extra Master Classes such as 30 Oct
  // must NOT switch /join to the Master Class price on their own.
  return OFFER_FIXED_WINDOWS.some((w) => now >= w.opensAt && now < w.closesAt);
}

// ─── "Start now" Personalized offer on the Master Class page ────────────────
/**
 * Sumit, 15 Nov: visitors who don't want to wait for (or sit through) the live
 * class can start the Personalized 21-day plan straight away. A section on
 * /masterclass shows ₹2,490 (regular ₹2,990); once per visitor, a popup at 60%
 * scroll offers ₹500 off → ₹1,990 — the same as the live flash price, so nobody
 * gets a better deal than the live room.
 *
 * The ₹1,990 page is the Human Coach page: its plan_human_coach field keeps the
 * Automator and the app's payment rules from treating ₹1,990 as a Group sale.
 */
export const PERSONALIZED_START_NOW = {
  regularPrice: "₹2,990",
  price: "₹2,490",
  priceNumeric: 2490,
  // pl_TciWVzv0619TOd — ₹2,490 Personalized (redirects to the Personalized confirmation).
  url: "https://pages.razorpay.com/pl_TciWVzv0619TOd/view?plan_human_coach=Human%20Coach%20Plan",
  popupPrice: "₹1,990",
  popupPriceNumeric: 1990,
  popupDiscount: "₹500 off",
  popupUrl:
    "https://pages.razorpay.com/pl_TspnaK0HgnttUb/view?plan_human_coach=Human%20Coach%20Plan",
  /** Fraction of the page scrolled before the popup shows (once per visitor). */
  popupAtScroll: 0.6,
} as const;

/** Remembered on click so the Personalized confirmation page reports the real amount to Meta. */
export const PERSONALIZED_VALUE_KEY = "svastha_pers_value";

// ─── Lead capture to the SVASTHA CRM (Sumit, 15 Nov 2026) ─────────────────────
/**
 * Automator workflow "Capture Lead from Nav Fit Challenge": it is a generic
 * lead hook (lead sheet + SVASTHA CRM) that passes our `source` through, so the
 * Master Class page reuses it instead of a new secret-bearing workflow.
 * Body: { name, phone (10 digits), email, source, goal (= CRM details),
 *         submitted_date (= CRM call date), submitted_time (= CRM call time) }.
 */
export const CRM_LEAD_WEBHOOK_URL =
  "https://svastha-automator-webhook-production.up.railway.app/api/webhooks/brb2NTzvcw-fnhlDIDmcMB";

export const LEAD_SOURCES = {
  startNow: "masterclass-start-now",
  consultation: "masterclass-free-consultation",
} as const;

/** "Book a free consultation call" — shown once, after reaching the bottom and scrolling back up. */
export const FREE_CONSULTATION = {
  /** Fraction of the page that counts as "reached the bottom". */
  bottomAt: 0.93,
  /** How far back up (px) before the offer appears. */
  scrollUpPx: 900,
  durationLabel: "15-minute",
  slots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
} as const;
