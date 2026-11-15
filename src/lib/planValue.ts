import { FLASH_OFFER, isOfferLive, offerPlansAt, type OfferPlan } from "@/config/masterclass";

/**
 * The real amount a 21-day plan buyer paid, for the Meta Purchase event
 * (Sumit, 15 Nov 2026: Meta showed ₹1,490 for ₹990 sales).
 *
 * Razorpay doesn't tell the confirmation page the amount, so we work it out:
 *  1. The price the buyer clicked on /join in this browser (last 6 hours).
 *  2. Otherwise, if Sumit's live flash offer started in the last 3 hours, the
 *     flash price (buyers from the Zoom flash button never visit /join).
 *  3. Otherwise the price /join shows right now (Master Class or regular).
 */
type PlanId = OfferPlan["id"];

const KEY = (id: PlanId) => `svastha_plan_value_${id}`;
const REMEMBER_MS = 6 * 60 * 60 * 1000;
const FLASH_GRACE_MS = 3 * 60 * 60 * 1000;

const SUPABASE_URL = "https://swcubveqtvjhqwawgcks.supabase.co";
// Publishable (client-side) key, same as useFlashOffer.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gFmxbC7PXhw7erXGwkR9Ew_ap58IhD3";

export const rupees = (price: string) => Number(price.replace(/[^\d]/g, ""));

/** Call when someone clicks a plan's payment button on /join. */
export function rememberPlanValue(id: PlanId, value: number) {
  try {
    localStorage.setItem(KEY(id), JSON.stringify({ value, at: Date.now() }));
  } catch {
    /* storage blocked: the fallbacks below still apply */
  }
}

function recalled(id: PlanId): number | null {
  try {
    const raw = localStorage.getItem(KEY(id));
    if (!raw) return null;
    const v = JSON.parse(raw) as { value?: number; at?: number };
    if (!v.value || !v.at || Date.now() - v.at > REMEMBER_MS) return null;
    localStorage.removeItem(KEY(id));
    return v.value;
  } catch {
    return null;
  }
}

async function flashStartedAt(): Promise<number | null> {
  try {
    const ctl = new AbortController();
    const t = window.setTimeout(() => ctl.abort(), 2500);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/campaign_flash_offer_status?id=eq.${FLASH_OFFER.id}&select=started_at`,
      { headers: { apikey: SUPABASE_PUBLISHABLE_KEY }, cache: "no-store", signal: ctl.signal },
    );
    window.clearTimeout(t);
    if (!res.ok) return null;
    const rows = (await res.json()) as { started_at: string | null }[];
    const s = rows?.[0]?.started_at;
    return s ? Date.parse(s) : null;
  } catch {
    return null;
  }
}

export async function paidPlanValue(id: PlanId): Promise<number> {
  const clicked = recalled(id);
  if (clicked) return clicked;

  const now = Date.now();
  const started = await flashStartedAt();
  if (started && now >= started && now - started < FLASH_GRACE_MS) {
    const plan = offerPlansAt(started).find((p) => p.id === id);
    if (plan) return rupees(plan.flashPrice);
  }

  const plan = offerPlansAt(now).find((p) => p.id === id);
  if (!plan) return 0;
  return rupees(isOfferLive(now) ? plan.earlyPrice : plan.regularPrice);
}
