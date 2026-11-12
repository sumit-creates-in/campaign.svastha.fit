/**
 * Meta Pixel "advanced matching" (Meta's Events Manager suggestion, 12 Nov 2026):
 * send the buyer's email and phone with the Purchase event so Meta can match
 * more purchases to the people who saw the ad. The Pixel hashes these values
 * (SHA-256) in the browser before anything is sent; they never go into a URL.
 *
 * Flow: the Master Class form saves name/email/phone on this device just before
 * the Razorpay redirect; the confirmation pages read it back and re-init the
 * Pixel with it right before Purchase fires.
 */

export const META_PIXEL_ID = "4183888118531938";
const KEY = "svastha_meta_user";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredUser {
  email?: string;
  phone?: string; // digits only, 10-digit Indian mobile
  name?: string;
  at: number;
}

export function saveMetaUserData(user: { email?: string; phone?: string; name?: string }) {
  try {
    const data: StoredUser = {
      email: user.email?.trim().toLowerCase() || undefined,
      phone: user.phone?.replace(/\D/g, "") || undefined,
      name: user.name?.trim() || undefined,
      at: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage blocked: nothing to do */
  }
}

/** Re-init the Pixel with the stored user data (if any). Safe to call repeatedly. */
export function applyMetaUserData() {
  try {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq !== "function") return;
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const u = JSON.parse(raw) as StoredUser;
    if (!u || !u.at || Date.now() - u.at > MAX_AGE_MS) return;

    const am: Record<string, string> = { country: "in" };
    if (u.email && /.+@.+\..+/.test(u.email)) am.em = u.email;
    if (u.phone) {
      const d = u.phone.replace(/\D/g, "");
      if (d.length === 10) am.ph = `91${d}`;
      else if (d.length === 12 && d.startsWith("91")) am.ph = d;
    }
    const first = u.name?.split(/\s+/)[0]?.toLowerCase();
    if (first) am.fn = first;
    if (!am.em && !am.ph) return;

    w.fbq("init", META_PIXEL_ID, am);
  } catch {
    /* tracking must never break the page */
  }
}
