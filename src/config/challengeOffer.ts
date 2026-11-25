import { INDIA_BATCH } from "@/config/masterclass";

/**
 * Direct-sale page for the Ultimate 21 Day Weight Loss Challenge
 * (/21-day-challenge, and the old /Ultimate-21-day-weight-loss-challenge URL).
 *
 * Sumit, 2 Nov 2026: between Master Class cycles, sell both plans directly —
 *   Group Plan        — joins the next batch (INDIA_BATCH in masterclass.ts)
 *   Personalized Plan — own dietitian, starts within 48 hours
 *
 * New Year offer (Sumit, 25 Nov 2026) for B158 (orientation Sun 6 Dec), until
 * 6 Dec midnight (IST), regular price after:
 *   Group        ₹1,290 (scroll popup ₹990)   → ₹1,990
 *   Personalized ₹2,990 (scroll popup ₹2,690) → ₹2,990
 * Changed the same evening (Sumit, 25 Nov 2026 ~7:30 PM) — "first 20 sign-ups"
 * offer, NOT mentioned on the page; review after 20 sign-ups:
 *   Group        ₹990   (scroll popup ₹790,   ₹200 off) → ₹1,990
 *   Personalized ₹2,990 (scroll popup ₹2,790, ₹200 off) → ₹2,990
 * (Before: early-bird ₹1,490 / ₹2,490 until 15 Nov.)
 *
 * The Razorpay pages are the existing ones (same as /join), so the Automator,
 * the confirmation pages and the app's B157 payment rules already handle them:
 * Group buyers get the batch WhatsApp group + app challenge, Personalized buyers
 * get the "our team will call you" route (no batch group).
 *
 * When the batch changes, update INDIA_BATCH (masterclass.ts) and the dates in
 * GROUP_SCHEDULE below, and set a new EARLY_BIRD window.
 */

export const EARLY_BIRD = {
  /** What the offer is called on the pages. */
  name: "New Year offer",
  /** Last moment of the offer price (exclusive). */
  closesAt: Date.parse("2026-12-07T00:00:00+05:30"),
  closesLabel: "6 December",
};

export function isEarlyBird(now: number = Date.now()): boolean {
  return now < EARLY_BIRD.closesAt;
}

export const GROUP_SCHEDULE = {
  batch: INDIA_BATCH.name,
  sessionLabel: INDIA_BATCH.sessionDateLabel, // "22nd November (Sunday)"
  sessionTime: INDIA_BATCH.sessionTimeLabel, // "9:30 AM (India Time)"
  day1Label: INDIA_BATCH.day1Label, // "Monday, 23rd November"
  shortStart: "Starts 6 Dec",
  sundays: "6 Dec, 13 Dec and 20 Dec",
};

export interface ChallengePlan {
  id: "group" | "personalized";
  name: string;
  label: string;
  tagline: string;
  startLine: string;
  earlyPrice: string;
  earlyPage: string;
  /** One-time scroll-popup discount (Ultimate page). */
  popupPrice: string;
  popupPage: string;
  popupSaving: string;
  regularPrice: string;
  regularPage: string;
  features: string[];
  bestFor: string[];
}

export const CHALLENGE_PLANS: readonly ChallengePlan[] = [
  {
    id: "group",
    name: "Group Plan",
    label: "Group Plan",
    tagline: "Do the 21 days with Sumit and the batch",
    startLine: `Starting session live with Sumit: ${INDIA_BATCH.sessionDateLabel}, ${INDIA_BATCH.sessionTimeLabel}. Day 1: ${INDIA_BATCH.day1Label}.`,
    // First-20 offer (Sumit, 25 Nov 2026). Before: ₹1,290 pl_TrgT4iq2FuRZaa, popup ₹990.
    earlyPrice: "₹990",
    earlyPage: "https://pages.razorpay.com/pl_TyMfI09EM3qcvG/view",
    popupPrice: "₹790",
    popupPage: "https://pages.razorpay.com/pl_U4QmZHiHgH4KXx/view",
    popupSaving: "₹200 off",
    regularPrice: "₹1,990",
    regularPage: "https://pages.razorpay.com/pl_QHMrm9qAqyqcdA/view",
    features: [
      "Live sessions with Sumit every Sunday (6 Dec, 13 Dec, 20 Dec) — recordings shared",
      "21 day diet plan with home-cooked food: daal, rice, roti, sabji",
      "Intermittent fasting plan and daily guidance in the batch WhatsApp group",
      "Live yoga classes, Monday to Friday — 8 time slots, recordings shared",
      "Track your weight in the Svastha app, with a live leaderboard",
    ],
    bestFor: [
      "You like doing it together with a group",
      "You can start on Monday, 7 December",
      "You want Sumit's guidance at the best price",
    ],
  },
  {
    id: "personalized",
    name: "Personalized Plan",
    label: "Personalized",
    tagline: "Your own dietitian builds the plan around you",
    startLine: "Start within 48 hours — no waiting for a batch. Our team calls you after you join.",
    earlyPrice: "₹2,990",
    earlyPage: "https://pages.razorpay.com/pl_QHMy1AvL4XDeqQ/view?plan_human_coach=Human%20Coach%20Plan",
    // Scroll offer: ₹200 off, same as the Group Plan (Sumit, 25 Nov 2026 evening).
    // (₹2,690 page pl_U4QRvV0SdWkdE4 exists but is not used now.)
    popupPrice: "₹2,790",
    popupPage: "https://pages.razorpay.com/pl_QHfwHt0q52MdOJ/view",
    popupSaving: "₹200 off",
    regularPrice: "₹2,990",
    regularPage: "https://pages.razorpay.com/pl_QHMy1AvL4XDeqQ/view?plan_human_coach=Human%20Coach%20Plan",
    features: [
      "A dedicated dietitian from the Svastha team",
      "A 21 day diet and fasting plan built around your body, routine and food habits",
      "Thyroid, PCOS, sugar or BP planned around — not worked around",
      "Direct WhatsApp access to your dietitian, with your plan adjusted as your body responds",
      "Live yoga classes, Monday to Friday — 8 time slots, recordings shared",
    ],
    bestFor: [
      "You are managing thyroid, PCOS, sugar or BP",
      "You have tried before and stalled",
      "You want to start now, not on 7 December",
    ],
  },
] as const;
