// Supabase Database Webhook Handler
// This endpoint will be called by Supabase when a new lead is inserted

export default async function handler(req, res) {
  // Verify webhook signature (optional but recommended)
  // const signature = req.headers['x-supabase-signature'];

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { record, type } = req.body;

  // Only process INSERT events
  if (type !== "INSERT") {
    return res.json({ success: true, message: "Ignored non-INSERT event" });
  }

  console.log("📥 New lead received from Supabase:", record.name);

  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbwYjH-L7MrhHcv1WpsdD0tviAA6CqopwLXLcvZJEacKzXeZFob8wmADsxsk0mWyEced/exec?gid=1455575979";
  const BOTBIZ_URL =
    "https://dash.botbiz.io/webhook/whatsapp-workflow/106644.375783.358876.1776863417";

  const sheetPayload = new URLSearchParams({
    Name: record.name,
    "Contact No.": record.phone,
    "Call Date": record.preferred_date || "",
    Source: record.source || "Lose-weight-with-vaishnavi",
    Details: `Age: ${record.age || "N/A"} | City: ${record.city || "N/A"} | Gender: ${record.gender || "N/A"} | Weight: ${record.weight || "N/A"}`,
    "Call Time": record.preferred_time || "",
  }).toString();

  try {
    await Promise.all([
      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: sheetPayload,
      }).then(() => console.log("✅ Google Sheet submitted")),

      fetch(BOTBIZ_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: record.name,
          Mobile_No_: record.phone,
          Call_Date: record.preferred_date || "",
          Call_Time: record.preferred_time || "",
        }),
      }).then(() => console.log("✅ BotBiz submitted")),
    ]);

    res.json({ success: true, message: "Webhooks fired successfully" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({ error: "Failed to fire webhooks" });
  }
}
