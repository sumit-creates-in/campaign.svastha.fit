import { useEffect, useRef, useState } from "react";
import { FLASH_OFFER } from "@/config/masterclass";

/**
 * Live flash offer, started by Sumit from his control button during the
 * Master Class. The state lives in Supabase (view campaign_flash_offer_status,
 * public read). The server computes seconds_left, so a visitor's wrong phone
 * clock cannot stretch or shorten the 15 minutes.
 *
 * Polls every 10 s (and when the tab comes back), counts down locally between
 * polls. Any error → no flash (the page simply shows the normal offer).
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://swcubveqtvjhqwawgcks.supabase.co";
// Publishable (client-side) key. The project's legacy anon JWT keys were
// disabled on 2 Oct 2026, so the old key in useSeatsLeft no longer works.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gFmxbC7PXhw7erXGwkR9Ew_ap58IhD3";

export interface FlashState {
  active: boolean;
  /** Whole seconds left while active, else 0. */
  secondsLeft: number;
}

export function useFlashOffer(enabled: boolean): FlashState {
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [, tick] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setEndsAt(null);
      return;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/campaign_flash_offer_status?id=eq.${encodeURIComponent(
            FLASH_OFFER.id,
          )}&select=seconds_left`,
          {
            headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
            cache: "no-store",
          },
        );
        if (!res.ok) throw new Error(String(res.status));
        const rows = (await res.json()) as { seconds_left: number | null }[];
        const left = Number(rows?.[0]?.seconds_left ?? 0);
        if (!cancelled) setEndsAt(left > 0 ? Date.now() + left * 1000 : null);
      } catch {
        if (!cancelled) setEndsAt(null);
      }
    };
    load();
    const poll = window.setInterval(load, 10_000);
    const onVis = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled]);

  // 1 s ticker only while a flash is running.
  useEffect(() => {
    if (endsAt === null) return;
    timer.current = window.setInterval(() => tick((n) => n + 1), 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [endsAt]);

  const secondsLeft = endsAt ? Math.max(0, Math.round((endsAt - Date.now()) / 1000)) : 0;
  return { active: enabled && secondsLeft > 0, secondsLeft };
}

export function formatMmSs(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
