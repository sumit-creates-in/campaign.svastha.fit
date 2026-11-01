/**
 * 6-month upgrade offer (/6-month-offer) — pitched by Sumit to the 21 Day
 * Challenge Group Plan members in the Week 2 live session (B156, Sun 1 Nov
 * 2026). Prices from the Svastha app's pricing page (packages table), with
 * Sumit's usual offer: ₹1,000 off + 1 month extra, and a 15-minute live flash
 * (₹4,990 / ₹9,990, Sumit 1 Nov) that Sumit starts with his Flash Offer Button.
 *
 *   Sumit's Community, 6 months         — regular ₹7,999,  offer ₹6,999,  flash ₹4,990
 *   Personalized (Human Coach + Group),  — regular ₹11,999, offer ₹10,999, flash ₹9,990
 *   6 months
 *
 * Every Razorpay page carries a required plan field whose key marks the plan
 * in the payment notes (`plan_6m_community` / `plan_6m_personalized`). The page
 * prefills it through the query string. These amounts match no Automator
 * branch or app payment rule, so nothing is sent automatically: the team
 * activates the plan in the app after the call.
 *
 * Flash: Supabase row `b156w2` (campaign_flash_offers), only inside the window.
 */

export interface SixMonthPlan {
  id: "community" | "personalized";
  name: string;
  appName: string;
  tagline: string;
  planField: "plan_6m_community" | "plan_6m_personalized";
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

export const SIX_MONTH_FLASH_ID = "b156w2";

export const SIX_MONTH_PLANS: readonly SixMonthPlan[] = [
  {
    id: "community",
    name: "Sumit's Community",
    appName: "Sumit's Community — 6 months",
    tagline: "Keep going with Sumit and the group",
    planField: "plan_6m_community",
    planValue: "Community 6 Months",
    regularPrice: "₹7,999",
    regularPage: "https://pages.razorpay.com/pl_TulGYMVbUc9wbM/view",
    offerPrice: "₹6,999",
    offerPage: "https://pages.razorpay.com/pl_TulGKmezH6NYC6/view",
    flashPrice: "₹4,990",
    flashPage: "https://pages.razorpay.com/pl_TulfbMw51mg1F0/view",
    features: [
      "Live group yoga classes + recordings",
      "Group weekly diet plan",
      "Dietitian follow-ups",
      "Sumit's voice notes",
      "Weekly community meet with Sumit",
      "Chat with Mini, your AI Coach, and Mini's daily check-ins",
      "Weight & habit tracker in the Svastha app",
    ],
    bestFor: [
      "The 21 days are working and you want to keep the momentum",
      "You like the group, the classes and Sumit's guidance",
      "You want the most value for the next 6 months",
    ],
  },
  {
    id: "personalized",
    name: "Personalized",
    appName: "Human Coach + Group Classes — 6 months",
    tagline: "Your own dietitian, plus everything in the community",
    planField: "plan_6m_personalized",
    planValue: "Personalized 6 Months",
    regularPrice: "₹11,999",
    regularPage: "https://pages.razorpay.com/pl_TulGcgTx03oNTu/view",
    offerPrice: "₹10,999",
    offerPage: "https://pages.razorpay.com/pl_TulGZoFw4K9SE1/view",
    flashPrice: "₹9,990",
    flashPage: "https://pages.razorpay.com/pl_Tulg1I1tGYCyS5/view",
    features: [
      "A dedicated dietitian from the Svastha team",
      "Personalized weekly diet plans, built around you",
      "Weekly follow-up with your dietitian",
      "Live group yoga classes + recordings",
      "Sumit's voice notes and weekly community meet",
      "Chat with Mini, your AI Coach, and Mini's daily check-ins",
      "Weight & habit tracker in the Svastha app",
    ],
    bestFor: [
      "You are managing thyroid, PCOS, sugar or BP",
      "You have a big goal and want a person accountable to you",
      "You want the plan to change as your body changes",
    ],
  },
] as const;

/** The offer price is live all of Sun 1 Nov 2026 and closes at midnight (IST). */
export const SIX_MONTH_OFFER_WINDOW = {
  opensAt: Date.parse("2026-11-01T00:00:00+05:30"),
  closesAt: Date.parse("2026-11-02T00:00:00+05:30"),
};

export const SIX_MONTH_BONUS = "+1 month extra (7 months in total)";

export function isSixMonthOfferLive(now: number = Date.now()): boolean {
  return now >= SIX_MONTH_OFFER_WINDOW.opensAt && now < SIX_MONTH_OFFER_WINDOW.closesAt;
}

/** Adds the plan marker to a Razorpay page URL (%20, not "+": Razorpay shows "+" literally). */
export function sixMonthCheckoutUrl(plan: SixMonthPlan, page: string): string {
  return `${page}?${plan.planField}=${encodeURIComponent(plan.planValue)}`;
}
