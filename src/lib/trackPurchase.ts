import { applyMetaUserData } from "@/lib/metaUserData";

/**
 * Fire a Meta Pixel Purchase once per browser session on a payment
 * confirmation page. The Razorpay payment pages for the 21 Day Challenge
 * do not send Purchase themselves, so without this Meta never sees the sale.
 * If Razorpay adds razorpay_payment_id to the redirect, it is used as the
 * eventID so a duplicate from elsewhere is ignored by Meta.
 */
export function trackPurchaseOnce(key: string, value: number, contentName: string) {
  try {
    if (sessionStorage.getItem(key)) return;
  } catch {
    /* storage blocked: still track */
  }
  const w = window as any;
  if (typeof w.fbq !== "function") return;
  applyMetaUserData(); // email + phone if this browser registered for the Master Class
  const pid = new URLSearchParams(window.location.search).get("razorpay_payment_id");
  const data = { currency: "INR", value, content_name: contentName };
  if (pid) w.fbq("track", "Purchase", data, { eventID: pid });
  else w.fbq("track", "Purchase", data);
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* ignore */
  }
}
