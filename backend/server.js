import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabase.js";
import { waitUntil } from "@vercel/functions";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://spiritriseyoga.com", "https://campaign.svastha.fit"]
      : [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://localhost:8080",
          "http://127.0.0.1:8080",
        ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting — max 5 submissions per IP per hour
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: "Too many submissions. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Base route for health check
app.get("/", (req, res) => {
  res.send("YogaCamp Backend API is running with Supabase...");
});

// ✅ Simple registration - directly store in yoga_registrations table
app.post("/api/register", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    console.log("📝 Registering user:", { name, email });

    // Check if already registered
    const { data: existingRegistration } = await supabase
      .from("yoga_registrations")
      .select("id, name")
      .eq("email", email)
      .single();

    if (existingRegistration) {
      console.log("✅ User already registered");
      return res.json({
        success: true,
        message: `${existingRegistration.name} is already registered for yoga camp`,
        already_registered: true,
      });
    }

    // Register for yoga camp
    const { error } = await supabase.from("yoga_registrations").insert({
      name,
      email,
      phone: null, // Phone is now optional
      user_id: null, // Not linking to users table for now
      whatsapp_joined: false,
      app_installed: false,
    });

    if (error) {
      console.error("❌ Registration error:", error);
      return res.status(500).json({ error: "Failed to register" });
    }

    console.log("✅ Registration successful");
    res.json({
      success: true,
      message: `${name} successfully registered for yoga camp!`,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📋 Submit lead - save to Supabase + fire-and-forget to Google Sheet + BotBiz
app.post("/api/submit-lead", leadLimiter, async (req, res) => {
  const data = req.body;

  if (!data?.name || !data?.phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  // 1. Save to Supabase first (fast, same infra)
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
    // Don't block — still respond success and fire webhooks
  } else {
    console.log("✅ Lead saved to Supabase");
  }

  // 2. Respond immediately — user ko success mil gaya
  res.json({ success: true });

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

  const fireWebhooks = Promise.all([
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: sheetPayload,
    })
      .then(() => console.log("✅ Google Sheet submitted"))
      .catch((err) => console.error("❌ Google Sheet error:", err)),

    fetch(BOTBIZ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: data.name,
        Mobile_No_: data.phone,
        Call_Date: data.callDate || "",
        Call_Time: data.callTime || "",
      }),
    })
      .then(() => console.log("✅ BotBiz submitted"))
      .catch((err) => console.error("❌ BotBiz error:", err)),
  ]);

  // 3. Vercel pe waitUntil, locally direct await
  if (process.env.VERCEL) {
    waitUntil(fireWebhooks);
  } else {
    await fireWebhooks;
  }
});

// 🔍 Debug endpoint
app.get("/api/debug", (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL ? "Set" : "Not Set",
    supabaseKey: process.env.SUPABASE_ANON_KEY ? "Set" : "Not Set",
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `🔗 Supabase URL: ${
      process.env.SUPABASE_URL ? "Connected" : "Not configured"
    }`
  );
});
