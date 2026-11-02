import { INDIA_BATCH } from "@/config/masterclass";

/**
 * Direct-sale page for the Ultimate 21 Day Weight Loss Challenge
 * (/21-day-challenge, and the old /Ultimate-21-day-weight-loss-challenge URL).
 *
 * Sumit, 2 Nov 2026: between Master Class cycles, sell both plans directly —
 *   Group Plan        — joins the next batch (INDIA_BATCH in masterclass.ts)
 *   Personalized Plan — own dietitian, starts within 48 hours
 *
 * Early-bird price until 15 Nov midnight (IST), regular price after:
 *   Group        ₹1,490 → ₹1,990
 *   Personalized ₹2,490 → ₹2,990
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
  /** Last moment of the early-bird price (exclusive). */
  closesAt: Date.parse("2026-11-16T00:00:00+05:30"),
  closesLabel: "15 November",
};

export function isEarlyBird(now: number = Date.now()): boolean {
  return now < EARLY_BIRD.closesAt;
}

export const GROUP_SCHEDULE = {
  batch: INDIA_BATCH.name,
  sessionLabel: INDIA_BATCH.sessionDateLabel, // "22nd November (Sunday)"
  sessionTime: INDIA_BATCH.sessionTimeLabel, // "9:30 AM (India Time)"
  day1Label: INDIA_BATCH.day1Label, // "Monday, 23rd November"
  shortStart: "Starts 22 Nov",
  sundays: "22 Nov, 29 Nov and 6 Dec",
};

export interface ChallengePlan {
  id: "group" | "personalized";
  name: string;
  label: string;
  tagline: string;
  startLine: string;
  earlyPrice: string;
  earlyPage: string;
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
    earlyPrice: "₹1,490",
    earlyPage: "https://pages.razorpay.com/pl_TciTJHasd9VWSs/view",
    regularPrice: "₹1,990",
    regularPage: "https://pages.razorpay.com/pl_QHMrm9qAqyqcdA/view",
    features: [
      "Live sessions with Sumit every Sunday (22 Nov, 29 Nov, 6 Dec) — recordings shared",
      "21 day diet plan with home-cooked food: daal, rice, roti, sabji",
      "Intermittent fasting plan and daily guidance in the batch WhatsApp group",
      "Live yoga classes, Monday to Friday — 8 time slots, recordings shared",
      "Track your weight in the Svastha app, with a live leaderboard",
    ],
    bestFor: [
      "You like doing it together with a group",
      "You can start on Monday, 23 November",
      "You want Sumit's guidance at the best price",
    ],
  },
  {
    id: "personalized",
    name: "Personalized Plan",
    label: "Personalized",
    tagline: "Your own dietitian builds the plan around you",
    startLine: "Start within 48 hours — no waiting for a batch. Our team calls you after you join.",
    earlyPrice: "₹2,490",
    earlyPage: "https://pages.razorpay.com/pl_TciWVzv0619TOd/view",
    regularPrice: "₹2,990",
    regularPage: "https://pages.razorpay.com/pl_QHMy1AvL4XDeqQ/view",
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
      "You want to start now, not on 23 November",
    ],
  },
] as const;
