import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// In-memory rate limit. Resets on cold start, which is fine — this only needs
// to stop obvious abuse, not be a fortress.
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  const record = rateLimitStore.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"] || req.connection?.remoteAddress;
  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ error: "Too many submissions. Please try again later." });
  }

  const data = req.body || {};
  const name = (data.name || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const phone = (data.phone || "").toString().replace(/\D/g, "").slice(-10);

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  const row = {
    name,
    email: email || null,
    phone,
    goal: data.goal || null,
    conditions: Array.isArray(data.conditions) ? data.conditions : [],
    source: data.source || "masterclass-landing",
    webinar_date: data.webinarDate || null,
    // Flipped to true by the Razorpay webhook once payment succeeds. Until
    // then the row is still a lead worth calling — that is the point of
    // capturing before the payment page rather than after it.
    paid: false,
  };

  const { error } = await supabase
    .from("webinar_registrations")
    .upsert(row, { onConflict: "phone" });

  if (error) {
    console.error("❌ webinar_registrations insert error:", error);
    return res.status(500).json({ error: "Failed to save registration" });
  }

  return res.json({ success: true });
}
