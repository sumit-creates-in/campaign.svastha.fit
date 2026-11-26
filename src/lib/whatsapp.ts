/**
 * One place for the WhatsApp chat link (Wabiz number, answered by the bot + team).
 * Every tap is sent to Meta as "Contact" so ads can learn from people who ask
 * before they pay (Sumit's plan, 26 Nov 2026).
 */
import { trackPixel } from "@/lib/crmLead";

export const WHATSAPP_NUMBER = "15557533653";

export function whatsappUrl(message: string, phone: string = WHATSAPP_NUMBER) {
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

/** Open the chat and count it as a Contact. Never throws. */
export function openWhatsApp(message: string, contentName: string, phone: string = WHATSAPP_NUMBER) {
  trackPixel("Contact", { content_name: contentName });
  window.open(whatsappUrl(message, phone), "_blank");
}
