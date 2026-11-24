/**
 * US Master Class — single source of truth.
 *
 * Every date, price, link and label on /us-masterclass and
 * /us-masterclass-confirmed reads from this file. To run the next session,
 * change `startsAt` and the labels below — nothing else.
 */

// ─── Session ──────────────────────────────────────────────────────────────────
export const US_MASTERCLASS = {
  name: "Ultimate 21 Day Weight Loss Challenge",
  subtitle: "Master Class",
  eventName: "LIVE MASTER CLASS FOR WOMEN",
  /** Who the session is for (Sumit, 20 Nov 2026: women of Indian origin, 35–54). */
  audienceLabel: "For Indian women in the USA & Canada",

  /**
   * ISO 8601 with IST offset. Sunday 29 Nov 2026, 8:00 PM IST
   *   = 9:30 AM EST (New York) = 8:30 AM CST = 6:30 AM PST (Los Angeles).
   * (Sumit, 20 Nov 2026: first women-only US Master Class.)
   * Previous session: Sunday 27 Sep 2026, 9:30 PM IST.
   */
  startsAt: "2026-11-29T20:00:00+05:30",
  durationMinutes: 90,

  /** Shown everywhere a date is needed. US order: weekday, month day. */
  dateLabel: "Sunday, November 29",
  /** Primary time line — Eastern first, Pacific second. */
  timeLabel: "9:30 AM ET · 6:30 AM PT",
  /** Longer form used in the details list and on the confirmation page. */
  timeLabelLong: "9:30 AM Eastern · 8:30 AM Central · 6:30 AM Pacific",
  durationLabel: "90 minutes",
  platformLabel: "LIVE on Zoom",
  languageLabel: "English (with a little Hindi)",
} as const;

// ─── Pricing & payment ────────────────────────────────────────────────────────
/**
 * Stripe Payment Links on the StrongByYoga LLC account (live mode), both on
 * product prod_VIzLYPgjBQPyLB. Each one redirects to /us-masterclass-confirmed
 * after payment, carrying `amount` and the Checkout Session ID.
 *
 * Payment Links can only prefill the email address — Stripe does not accept a
 * name or phone number in the URL. That is fine here: the card form asks for
 * card details only, and we already hold the name and WhatsApp number from
 * our own form (sent to the automator webhook before the redirect).
 */
export const US_PRICING = {
  standard: {
    price: "$19",
    amount: 19,
    url: "https://book.stripe.com/00wdR9exi7eMe03gIg5c41n",
  },
  /** Shown only by the one-time scroll offer. */
  offer: {
    price: "$14",
    amount: 14,
    was: "$19",
    saving: "$5",
    url: "https://book.stripe.com/28E28r0Gscz63lp1Nm5c41o",
  },
} as const;

export type UsPriceTier = keyof typeof US_PRICING;

/**
 * 21-Day Personalized Plan for the US (Sumit, 24 Nov 2026): the "start today"
 * option next to the Master Class. Own SVASTHA coach, starts within 24 h.
 * $59 (the app's 1-month personal plan is $69.99); $10 off = $49 through the
 * one-time scroll offer. Stripe product prod_VgdA0TRvRnLi3d (StrongByYoga LLC,
 * live), metadata funnel=us-personalized. Both links redirect to
 * /us-personal-plan-confirmed?amount=59|49&session_id=…
 * No sandbox copy exists, so test mode (?test=1) stops before Stripe.
 */
export const US_PERSONAL_PRICING = {
  standard: {
    price: "$59",
    amount: 59,
    url: "https://buy.stripe.com/6oUdR9fBmbv2e03ajS5c41p",
  },
  offer: {
    price: "$49",
    amount: 49,
    was: "$59",
    saving: "$10",
    url: "https://buy.stripe.com/bJe28r2OAbv27BF4Zy5c41q",
  },
} as const;

/** What the visitor picked in the registration modal. */
export type UsPlan = "masterclass" | "personalized" | "call";

/**
 * Free consultation call (Sumit, 24 Nov 2026). Samiksha calls US leads
 * 9 AM – 10 PM IST every day. In US time that is 10:30 PM – 11:30 AM ET
 * (7:30 PM – 8:30 AM PT), so we offer the two windows that are awake-time
 * on both coasts. Labels are shown as-is; the IST range goes to the CRM.
 */
export const US_CALL_WINDOWS = [
  {
    id: "morning",
    label: "Morning",
    us: "8:30 – 11:30 AM ET · 5:30 – 8:30 AM PT",
    ist: "7:00 – 10:00 PM IST",
  },
  {
    id: "evening",
    label: "Evening",
    us: "10:30 PM – 12:00 AM ET · 7:30 – 9:00 PM PT",
    ist: "9:00 – 10:30 AM IST (next day)",
  },
] as const;

// ─── Test mode ────────────────────────────────────────────────────────────────
/**
 * Open the page with `?test=1` to run the whole funnel with no real money:
 *   campaign.svastha.fit/us-masterclass?test=1
 *
 * Test mode swaps in Stripe *sandbox* links (the "For Claude" sandbox,
 * product prod_VJ1n5S1T6zgpIB) — pay with card 4242 4242 4242 4242, any
 * future date, any CVC. Everything downstream still runs (lead webhook,
 * WhatsApp, sheets, email, CRM) but is marked "[TEST]", and no Meta Pixel
 * events are sent, so ad reporting stays clean. Normal visitors never see it.
 */
export const US_TEST_LINKS: Record<UsPriceTier, string> = {
  standard: "https://book.stripe.com/test_aFa3cwehV8cDdGx4JPgMw00",
  offer: "https://book.stripe.com/test_3cI9AUddRakL9qhekpgMw01",
};

export function isUsTestMode(): boolean {
  try {
    return new URLSearchParams(window.location.search).get("test") === "1";
  } catch {
    return false;
  }
}

/**
 * Builds the Stripe link with the email already filled in and the lead ID
 * attached, so every payment can be matched back to the lead it came from.
 * `client_reference_id` must be alphanumeric, dashes or underscores.
 */
export function buildStripeUrl(
  tier: UsPriceTier,
  who: { email: string; leadId: string; phone?: string; name?: string },
  plan: "masterclass" | "personalized" = "masterclass",
): string {
  const { email, leadId, phone, name } = who;
  const params = new URLSearchParams({
    prefilled_email: email.trim(),
    client_reference_id: buildClientReference({ leadId, phone, name }),
  });
  // Pass UTM tags through — Stripe copies them onto the success-page URL.
  try {
    const here = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(
      (k) => {
        const v = here.get(k);
        if (v && /^[\w-]{1,150}$/.test(v)) params.set(k, v);
      },
    );
  } catch {
    /* no UTM tags is fine */
  }
  const base =
    plan === "personalized"
      ? US_PERSONAL_PRICING[tier].url
      : isUsTestMode()
        ? US_TEST_LINKS[tier]
        : US_PRICING[tier].url;
  return `${base}?${params.toString()}`;
}

/**
 * Stripe hands `client_reference_id` back in the checkout.session.completed
 * event, and it is the only per-customer field a Payment Link carries. Stripe
 * has no field for the phone number, so we pack what the automator needs to
 * send the WhatsApp confirmation into it:
 *
 *   <leadId>__<phone digits incl. country code>__<Name-In-Ascii>
 *   us-mucb8xvg-xvfqzq__14155550123__Priya-Sharma
 *
 * Stripe silently DROPS the whole value if it contains anything other than
 * A–Z, a–z, 0–9, "-" or "_", or exceeds 200 characters — so every part is
 * reduced to exactly those characters.
 */
export function buildClientReference({
  leadId,
  phone,
  name,
}: {
  leadId: string;
  phone?: string;
  name?: string;
}): string {
  const safeLead = leadId.replace(/[^A-Za-z0-9-]/g, "").slice(0, 60);
  const digits = String(phone ?? "").replace(/\D/g, "").slice(0, 15);
  const safeName = String(name ?? "")
    .normalize("NFD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return [safeLead, digits, safeName].join("__").slice(0, 200);
}

// ─── Lead capture ─────────────────────────────────────────────────────────────
/** Svastha automator — receives every lead the moment they click to pay. */
export const US_LEAD_WEBHOOK_URL =
  "https://svastha-automator-webhook-production.up.railway.app/api/webhooks/rQBhWl0vnG8-4XG1un3AF_";

/** Country codes offered on the WhatsApp number field. US first. */
export const PHONE_COUNTRIES = [
  { code: "+1", flag: "🇺🇸", label: "US / Canada", digits: [10] },
  { code: "+91", flag: "🇮🇳", label: "India", digits: [10] },
  { code: "+44", flag: "🇬🇧", label: "UK", digits: [10] },
  { code: "+971", flag: "🇦🇪", label: "UAE", digits: [9] },
  { code: "+61", flag: "🇦🇺", label: "Australia", digits: [9] },
] as const;

// ─── Post-payment ─────────────────────────────────────────────────────────────
/** The WhatsApp group every paid US registrant joins. Zoom link goes here. */
export const US_WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/LKXLbh0st2887lx5ysaBxF"; // 29 Nov women class (Sumit, 20 Nov). Sept group: EJkcq8ecZVyKd8tsTbmeKK

/** Local storage key used to hand the lead from the form to the success page. */
export const US_LEAD_STORAGE_KEY = "svastha_us_mc_lead";

// ─── Helpers ──────────────────────────────────────────────────────────────────
/**
 * The session start in the visitor's own time zone, e.g. "11:00 AM CDT".
 * Returns null if the browser can't tell us, so callers can simply skip it.
 */
export function localStartLabel(): string | null {
  try {
    const d = new Date(US_MASTERCLASS.startsAt);
    return d.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return null;
  }
}
