import { SOCIAL, CHAT_MESSAGE } from "@/config/masterclass";

export type Platform = "instagram" | "facebook";

/**
 * Works out where the visitor came from so we can send them back to the same
 * inbox. Meta strips the referrer on a lot of ad clicks, so we check three
 * signals in order of reliability. Instagram is the fallback.
 */
export function detectPlatform(): Platform {
  if (typeof window === "undefined") return "instagram";

  try {
    const params = new URLSearchParams(window.location.search);
    const tagged = [
      params.get("utm_source"),
      params.get("source"),
      params.get("platform"),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (/\b(ig|insta|instagram)\b/.test(tagged)) return "instagram";
    if (/\b(fb|facebook|messenger)\b/.test(tagged)) return "facebook";

    // Meta's own click identifiers.
    if (params.has("igshid")) return "instagram";
    if (params.has("fbclid")) return "facebook";

    const ref = (document.referrer || "").toLowerCase();
    if (ref.includes("instagram.")) return "instagram";
    if (ref.includes("facebook.") || ref.includes("messenger.")) return "facebook";

    // In-app browsers identify themselves in the user agent.
    const ua = navigator.userAgent || "";
    if (/Instagram/i.test(ua)) return "instagram";
    if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "facebook";
  } catch {
    /* fall through to the default */
  }

  return "instagram";
}

/**
 * Opens the right inbox and puts the message on the clipboard.
 *
 * Neither Instagram nor Messenger supports prefilled message text in a deep
 * link the way WhatsApp does, so copying it is the closest we can get —
 * the visitor just pastes.
 *
 * Returns true if the message reached the clipboard.
 */
export async function openChat(platform: Platform): Promise<boolean> {
  let copied = false;
  try {
    await navigator.clipboard.writeText(CHAT_MESSAGE);
    copied = true;
  } catch {
    /* clipboard can be blocked; opening the chat still works */
  }

  const url =
    platform === "facebook" ? SOCIAL.facebookDirect : SOCIAL.instagramDirect;
  window.open(url, "_blank", "noopener,noreferrer");

  return copied;
}
