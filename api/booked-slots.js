import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "date is required" });
  }

  const { data, error } = await supabase
    .from("vaishnavi_leads")
    .select("preferred_time")
    .eq("preferred_date", date)
    .not("preferred_time", "is", null);

  if (error) {
    console.error("❌ Booked slots error:", error);
    return res.status(500).json({ error: "Failed to fetch booked slots" });
  }

  // Normalize stored time to match TIME_SLOTS format
  const booked = data.map((r) => {
    const raw = r.preferred_time.replace(/^'+/, "").trim().toUpperCase();
    console.log("📅 Raw stored time:", r.preferred_time, "→ normalized:", raw);
    return raw;
  });

  console.log("📋 Booked slots for", date, ":", booked);
  res.json({ booked });
}
