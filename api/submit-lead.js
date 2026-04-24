import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Rate limiting store (in-memory, resets on cold start)
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const record = rateLimitStore.get(ip);
  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ error: "Too many submissions. Please try again later." });
  }

  const data = req.body;

  if (!data?.name || !data?.phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  // Save to Supabase
  const { error: dbError } = await supabase.from("vaishnavi_leads").insert({
    name: data.name,
    phone: data.phone,
    age: data.age || null,
    city: data.city || null,
    gender: data.gender || null,
    weight: data.weight || null,
    weight_loss_reason: data.weightLossReason || null,
    health_condition: data.healthCondition || null,
    past_attempts: data.pastAttempts || null,
    weight_gain_cause: data.weightGainCause || null,
    profession: data.profession || null,
    busyness: data.busyness || null,
    paid_plans: data.paidPlans || null,
    languages: data.languages || null,
    preferred_date: data.callDate || null,
    preferred_time: data.callTime || null,
  });

  if (dbError) {
    console.error("❌ Supabase insert error:", dbError);
  } else {
    console.log("✅ Lead saved to Supabase");
  }

  // Respond immediately
  res.json({ success: true });

  // Fire webhooks in background
  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbwYjH-L7MrhHcv1WpsdD0tviAA6CqopwLXLcvZJEacKzXeZFob8wmADsxsk0mWyEced/exec?gid=1455575979";
  const BOTBIZ_URL =
    "https://dash.botbiz.io/webhook/whatsapp-workflow/106644.375783.358876.1776863417";

  const sheetPayload = new URLSearchParams({
    Name: data.name,
    "Contact No.": data.phone,
    "Call Date": data.callDate || "",
    Source: "Lose-weight-with-vaishnavi",
    Details: data.details || "",
    "Call Time": data.callTime || "",
  }).toString();

  Promise.all([
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: sheetPayload,
    }).catch((err) => console.error("❌ Google Sheet error:", err)),

    fetch(BOTBIZ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: data.name,
        Mobile_No_: data.phone,
        Call_Date: data.callDate || "",
        Call_Time: data.callTime || "",
      }),
    }).catch((err) => console.error("❌ BotBiz error:", err)),
  ]);
}
