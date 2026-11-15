import { CRM_LEAD_WEBHOOK_URL } from "@/config/masterclass";

export interface CrmLead {
  name: string;
  /** 10 digits, no country code */
  phone: string;
  email?: string;
  source: string;
  /** Free text the sales team sees in the CRM ("details"). */
  details: string;
  /** CRM call date, e.g. "16 November 2026". Defaults to today (IST). */
  callDate?: string;
  /** CRM call time, e.g. "10:00 AM". Defaults to now (IST). */
  callTime?: string;
}

export function istDateLabel(d: Date = new Date()) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function istTimeLabel(d: Date = new Date()) {
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

/**
 * Send a lead to the SVASTHA CRM through the Automator. Never throws and never
 * waits longer than `maxWaitMs`, so a slow hook can't stop someone paying.
 */
export async function sendCrmLead(lead: CrmLead, maxWaitMs = 2500): Promise<void> {
  const body = JSON.stringify({
    event: "lead",
    source: lead.source,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? "",
    goal: lead.details,
    submitted_date: lead.callDate ?? istDateLabel(),
    submitted_time: lead.callTime ?? istTimeLabel(),
    paid: false,
  });
  try {
    await Promise.race([
      fetch(CRM_LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }),
      new Promise((resolve) => setTimeout(resolve, maxWaitMs)),
    ]);
  } catch {
    /* lead capture must never block the visitor */
  }
}

/** Meta Pixel is loaded in index.html; guard in case it is blocked. */
export function trackPixel(event: string, data?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", event, data);
  } catch {
    /* tracking must never block the visitor */
  }
}
