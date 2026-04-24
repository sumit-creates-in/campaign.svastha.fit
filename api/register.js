import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

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
    phone: null,
    user_id: null,
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
}
