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
  eventName: "LIVE MASTER CLASS",

  /**
   * ISO 8601 with IST offset. Sunday 27 Sep 2026, 9:30 PM IST
   *   = 12:00 PM EDT (New York) = 9:00 AM PDT (Los Angeles).
   * US clocks change on 1 Nov 2026 — after that, 9:30 PM IST is 11:00 AM EST.
   */
  startsAt: "2026-09-27T21:30:00+05:30",
  durationMinutes: 90,

  /** Shown everywhere a date is needed. US order: weekday, month day. */
  dateLabel: "Sunday, September 27",
  /** Primary time line — Eastern first, Pacific second. */
  timeLabel: "12:00 PM ET · 9:00 AM PT",
  /** Longer form used in the details list and on the confirmation page. */
  timeLabelLong: "12:00 PM Eastern · 11:00 AM Central · 9:00 AM Pacific",
  durationLabel: "90 minutes",
  platformLabel: "LIVE on Zoom",
  languageLabel: "English + Hindi",
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
 * Builds the Stripe link with the email already filled in and the lead ID
 * attached, so every payment can be matched back to the lead it came from.
 * `client_reference_id` must be alphanumeric, dashes or underscores.
 */
export function buildStripeUrl(
  tier: UsPriceTier,
  { email, leadId }: { email: string; leadId: string },
): string {
  const params = new URLSearchParams({
    prefilled_email: email.trim(),
    client_reference_id: leadId,
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
  return `${US_PRICING[tier].url}?${params.toString()}`;
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
  "https://chat.whatsapp.com/EJkcq8ecZVyKd8tsTbmeKK";

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
