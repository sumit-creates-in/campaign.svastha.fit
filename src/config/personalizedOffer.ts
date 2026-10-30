/**
 * Personalized-only offer page (/join-personalized) — used in the extra
 * weekday Master Classes, where Sumit sells only the Personalized 21 Day Plan
 * in two versions (Sumit, 27 Oct 2026):
 *
 *   Human Coach — regular ₹2,990, Master Class offer ₹2,290, flash ₹1,990
 *   AI Coach    — regular ₹1,490, Master Class offer ₹1,290, flash ₹990
 *
 * Every Razorpay page below carries a required "Plan" field whose key marks
 * the plan in the payment notes: `plan_human_coach` or `plan_ai_coach`. The
 * Automator and the onboarding flow route on that key, NOT on the amount
 * (₹1,290 / ₹1,490 / ₹1,990 are also Group Plan prices). The page prefills the
 * field through the query string, so buyers never have to type it.
 *
 * The flash price uses the same live switch as /join (Supabase row "b156",
 * Sumit's Flash Offer Button) and only shows inside the offer window.
 */

export interface PersonalPlan {
  id: "human" | "ai";
  name: string;
  tagline: string;
  /** Razorpay field key that marks this plan in the payment notes. */
  planField: "plan_human_coach" | "plan_ai_coach";
  planValue: string;
  regularPrice: string;
  regularPage: string;
  offerPrice: string;
  offerPage: string;
  flashPrice: string;
  flashPage: string;
  features: string[];
  bestFor: string[];
}

export const PERSONAL_PLANS: readonly PersonalPlan[] = [
  {
    id: "human",
    name: "Human Coach",
    tagline: "Your own coach builds the plan around you",
    planField: "plan_human_coach",
    planValue: "Human Coach Plan",
    regularPrice: "₹2,990",
    regularPage: "https://pages.razorpay.com/pl_Tspnl2viiwedy6/view",
    offerPrice: "₹2,290",
    offerPage: "https://pages.razorpay.com/pl_TspnYPCMpuEeYs/view",
    flashPrice: "₹1,990",
    flashPage: "https://pages.razorpay.com/pl_TspnaK0HgnttUb/view",
    features: [
      "A 21 day diet and fasting plan built around your body, routine and food habits",
      "Your own dedicated coach from our dietitian team",
      "Direct WhatsApp access to your coach",
      "Thyroid, PCOS, sugar or BP planned around — not worked around",
      "Your plan adjusted as your body responds",
      "Live yoga classes twice a day, Monday to Friday",
    ],
    bestFor: [
      "You are managing thyroid, PCOS, sugar or BP",
      "You have tried before and stalled",
      "You want a person accountable to you",
    ],
  },
  {
    id: "ai",
    name: "AI Coach",
    tagline: "A personalized plan, guided by your AI coach",
    planField: "plan_ai_coach",
    planValue: "AI Coach Plan",
    regularPrice: "₹1,490",
    regularPage: "https://pages.razorpay.com/pl_Tspmwjg3FSSlb4/view",
    offerPrice: "₹1,290",
    offerPage: "https://pages.razorpay.com/pl_TspnUA6LweCpoz/view",
    flashPrice: "₹990",
    flashPage: "https://pages.razorpay.com/pl_TspnW5Aw6Wv15q/view",
    features: [
      "A personalized 21 day diet and fasting plan built from your details",
      "Day-to-day guidance and answers from your AI coach",
      "Built on Sumit's method and our dietitian team's plans",
      "Live yoga classes twice a day, Monday to Friday",
    ],
    bestFor: [
      "You are generally healthy",
      "You like to follow a plan on your own, with help when you need it",
      "Budget matters right now",
    ],
  },
] as const;

/**
 * Offer window for the Fri 30 Oct Master Class: the Master Class price is
 * live now and closes at midnight on Friday 30 Oct (IST). Outside the window
 * the page shows the regular prices. Set new dates for each extra session.
 */
export const PERSONAL_OFFER_WINDOW = {
  opensAt: Date.parse("2026-10-27T00:00:00+05:30"),
  closesAt: Date.parse("2026-10-31T00:00:00+05:30"),
};

export function isPersonalOfferLive(now: number = Date.now()): boolean {
  return now >= PERSONAL_OFFER_WINDOW.opensAt && now < PERSONAL_OFFER_WINDOW.closesAt;
}

/** Adds the plan marker (and any known buyer details) to a Razorpay page URL. */
export function planCheckoutUrl(plan: PersonalPlan, page: string): string {
  // encodeURIComponent (%20), not URLSearchParams (+): Razorpay shows "+" literally.
  return `${page}?${plan.planField}=${encodeURIComponent(plan.planValue)}`;
}
