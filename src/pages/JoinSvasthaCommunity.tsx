import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PLAN_DATA = {
  12: {
    group: {
      name: "⭐ Community Plan",
      sell: 6990,
      base: 36000,
      perMonth: 666,
      link: "https://rzp.io/rzp/gzYKXmHl",
      features: [
        "🥗 Community Diet Plan",
        "🎥 Weekly Live with Sumit",
        "🗣️ Sumit's Voice Notes",
        "🤖 Ai Chat Support",
        "🗫 Daily Remainder",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    },
    personalSilver: {
      name: "👑 Transformation Plan",
      sell: 23990,
      base: 48000,
      perMonth: 2083,
      link: "https://rzp.io/rzp/NBM0DyPd",
      badge: "🏆 Most Popular",
      featured: true,
      features: [
        "📞 Consultation with Sumit: 1",
        "📞 1 weekly follow-up",
        "👩‍⚕️ Personal Dietitian",
        "📋 Personalized Diet Plan",
        "📞 Call & Chat Support",
        "🥗 Community Diet Plan",
        "🎥 Weekly Live with Sumit",
        "🗣️ Sumit's Voice Notes",
        "🤖 Ai Chat Support",
        "🗫 Daily Remainder",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    },
    personalGold: {
      name: "💎 VIP Transformation Plan",
      sell: 53990,
      base: 180000,
      perMonth: 4583,
      link: "https://rzp.io/rzp/Zg4ilA1q",
      badge: "⚡ Fastest Results",
      features: [
        "📞 Consultation with Sumit: 3",
        "🧘 1-on-1 Yoga Sessions: 12/month",
        "⚙️ Maintenance Plan",
        "🍹 Juice Detox",
        "📞 3 weekly follow-up",
        "👩‍⚕️ Personal Dietitian",
        "📋 Personalized Diet Plan",
        "📞 Call & Chat Support",
        "🥗 Community Diet Plan",
        "🎥 Weekly Live with Sumit",
        "🗣️ Sumit's Voice Notes",
        "🤖 Ai Chat Support",
        "🗫 Daily Remainder",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    }
  },
  6: {
    group: {
      name: "⭐ Community Plan",
      sell: 4990,
      base: 18000,
      perMonth: 998,
      link: "https://rzp.io/rzp/pMRx9dlC",
      features: [
        "🥗 Community Diet Plan",
        "🎥 Weekly Live with Sumit",
        "🗣️ Sumit's Voice Notes",
        "🤖 Ai Chat Support",
        "🗫 Daily Remainder",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    },
    personalSilver: {
      name: "👑 Transformation Plan",
      sell: 13990,
      base: 24000,
      perMonth: 2498,
      link: "https://rzp.io/rzp/gO7e1wT",
      badge: "🏆 Most Popular",
      featured: true,
      features: [
        "📞 Consultation with Sumit: 1",
        "📞 1 weekly follow-up",
        "👩‍⚕️ Personal Dietitian",
        "📋 Personalized Diet Plan",
        "📞 Call & Chat Support",
        "🥗 Community Diet Plan",
        "🎥 Weekly Live with Sumit",
        "🗣️ Sumit's Voice Notes",
        "🤖 Ai Chat Support",
        "🗫 Daily Remainder",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    },
    personalGold: {
      name: "💎 VIP Transformation Plan",
      sell: 33990,
      base: 90000,
      perMonth: 5832,
      link: "https://rzp.io/rzp/ms0tzWQp",
      badge: "⚡ Fastest Results",
      features: [
        "📞 Consultation with Sumit: 3",
        "🧘 1-on-1 Yoga Sessions: 12/month",
        "⚙️ Maintenance Plan",
        "🍹 Juice Detox",
        "📞 3 weekly follow-up",
        "👩‍⚕️ Personal Dietitian",
        "📋 Personalized Diet Plan",
        "📞 Call & Chat Support",
        "🥗 Community Diet Plan",
        "🎥 Weekly Live with Sumit",
        "🗣️ Sumit's Voice Notes",
        "🤖 Ai Chat Support",
        "🗫 Daily Remainder",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    }
  }
};

const NEW_LINKS = {
  12: {


    group: "https://rzp.io/rzp/rwAlm54",
    personalSilver: "https://rzp.io/rzp/euYWM5k",
    personalGold: "https://rzp.io/rzp/eZ6OOmoH",

  },

  6: {

    group: "https://rzp.io/rzp/FmzKCdx",
    personalSilver: "https://rzp.io/rzp/P3u4HHm7",
    personalGold: "https://rzp.io/rzp/UaNRicm",

  },

}

const COMPARE_ROWS = [
  {
    feature: "Consultation with Sumit",
    group: false,
    silver: 1,
    gold: 3,
  },
  {
    feature: "1-on-1 Yoga Sessions /month",
    group: false,
    silver: false,
    gold: "12x",
  },
  {
    feature: "Maintenance Plan",
    group: false,
    silver: false,
    gold: true,
  },
  {
    feature: "Juice Detox",
    group: false,
    silver: false,
    gold: true,
  },
  {
    feature: "Weekly Follow-ups",
    group: false,
    silver: 1,
    gold: 3,
  },
  {
    feature: "Personal Dietitian",
    group: false,
    silver: true,
    gold: true,
  },
  {
    feature: "Personalized Diet Plan",
    group: false,
    silver: true,
    gold: true,
  },
  {
    feature: "Call & Chat Support",
    group: false,
    silver: true,
    gold: true,
  },
  {
    feature: "Community Diet Plan",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Weekly Live with Sumit",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Sumit's Voice Notes",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "AI Chat Support",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Daily Reminders",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Live Yoga Classes",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Class Recordings",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Weight Tracker",
    group: true,
    silver: true,
    gold: true,
  },
  {
    feature: "Habit Tracker",
    group: true,
    silver: true,
    gold: true,
  },
];


// ── HELPERS ───────────────────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, "0"); }
function fmt(n: number) { return n.toLocaleString("en-IN"); }

// ── FADE-UP HOOK ──────────────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

// ── COUNTRY CODES ─────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+1", flag: "🇺🇸", label: "USA/Canada" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia" },
];

// ── CONSULTATION MODAL ────────────────────────────────────────────────────────
const WEBHOOK_URL = `${import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/consult-lead`;

function ConsultModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    if (mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          mobile: `${countryCode}${mobile.trim()}`,
          source: "JoinSvastha - Free Consultation",
        }),
      });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: "28px 24px",
        width: "100%",
        maxWidth: 380,
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        position: "relative",
        fontFamily: "'Nunito', sans-serif",
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 16,
            background: "none", border: "none",
            fontSize: 22, cursor: "pointer", color: "#888", lineHeight: 1,
          }}
        >×</button>

        {success ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 20, fontWeight: 800, color: "#1a7a4a", marginBottom: 8 }}>
              We'll reach out soon!
            </div>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
              Thanks {name.split(" ")[0]}! Our team will call you within 24 hours.
            </div>
            <button
              onClick={onClose}
              style={{
                background: "linear-gradient(135deg,#2d9f63,#1a7a4a)",
                color: "white", border: "none", borderRadius: 50,
                padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >Done</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>
              Get Free Consultation
            </div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
              Our expert will call you and help you choose the best plan.
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#444", display: "block", marginBottom: 6 }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%", padding: "11px 14px", borderRadius: 10,
                    border: "1.5px solid #ddd", fontSize: 14, outline: "none",
                    fontFamily: "'Nunito', sans-serif",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2d9f63")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#444", display: "block", marginBottom: 6 }}>
                  Mobile Number
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {/* Country code dropdown */}
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      padding: "11px 8px",
                      borderRadius: 10,
                      border: "1.5px solid #ddd",
                      fontSize: 13,
                      fontFamily: "'Nunito', sans-serif",
                      background: "#f9f9f9",
                      color: "#333",
                      cursor: "pointer",
                      outline: "none",
                      flexShrink: 0,
                      minWidth: 95,
                    }}
                  >
                    {COUNTRY_CODES.map(({ code, flag }) => (
                      <option key={code} value={code}>{flag} {code}</option>
                    ))}
                  </select>

                  {/* 10-digit input */}
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={mobile}
                    maxLength={10}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    style={{
                      flex: 1,
                      padding: "11px 14px",
                      borderRadius: 10,
                      border: "1.5px solid #ddd",
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "'Nunito', sans-serif",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box" as const,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2d9f63")}
                    onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                  />
                </div>
                <div style={{ fontSize: 11, color: mobile.length === 10 ? "#1a7a4a" : "#aaa", textAlign: "right", marginTop: 4 }}>
                  {mobile.length}/10 digits
                </div>
              </div>

              {error && (
                <div style={{ fontSize: 12, color: "#d93025", marginBottom: 12, fontWeight: 600 }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "#aaa" : "linear-gradient(135deg,#2d9f63,#1a7a4a)",
                  color: "white", border: "none", borderRadius: 50,
                  padding: "13px", fontSize: 16, fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Baloo 2', cursive",
                  boxShadow: loading ? "none" : "0 4px 16px rgba(26,122,74,0.35)",
                  transition: "all 0.2s",
                }}
              >
                {loading ? "Submitting…" : "Book My Free Call →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function TimerStrip({ timeLeft, expired }: { timeLeft: number; expired: boolean }) {
  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        background: expired
          ? "linear-gradient(135deg, #555 0%, #333 100%)"
          : "linear-gradient(135deg, #d93025 0%, #c0392b 100%)",
        color: "white",
        textAlign: "center",
        padding: "12px 16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: expired
          ? "0 3px 16px rgba(0,0,0,0.4)"
          : "0 3px 16px rgba(217,48,37,0.4)",
      }}
    >
      {expired ? (
        <>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
            ⏰ Offer Ended
          </div>
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4, letterSpacing: 0.5 }}>
            Prices have increased — new rates apply
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", opacity: 0.9 }}>
            ⚡ Offer Ends — 16 August 2026 · 11:30 AM IST
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
            {[
              { label: "Days", value: pad(days) },
              { label: "Hours", value: pad(hours) },
              { label: "Mins", value: pad(minutes) },
              { label: "Secs", value: pad(seconds) },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, lineHeight: 1, letterSpacing: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: 9, opacity: 0.8, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 6, letterSpacing: 0.5 }}>
            After this, prices go back to normal
          </div>
        </>
      )}
    </div>
  );
}


function DurationToggle({ currentDuration, onSelect }) {
  return (
    <div style={{
      display: "inline-flex",
      background: "#f0f0f0",
      borderRadius: 50,
      padding: 4,
      marginBottom: 20,
    }}>
      {[12, 6].map((months) => {
        const active = currentDuration === months;
        return (
          <button
            key={months}
            onClick={() => onSelect(months)}
            style={{
              border: "none",
              background: active ? "white" : "transparent",
              borderRadius: 50,
              padding: "12px 32px",
              fontFamily: "'Baloo 2', cursive",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              color: active ? "#1a7a4a" : "#666",
              boxShadow: active ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.25s",
              position: "relative",
              minWidth: 140,
            }}
          >
            {months === 12 && (
              <div style={{ position: "absolute", top: -8, right: 8, background: "#f5a623", color: "white", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 8 }}>
                BEST DEAL
              </div>
            )}
            {months} Months
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ planKey, planData, duration, expired, onConsult }: {
  planKey: string;
  planData: {
    name: string; sell: number; base: number; perMonth: number; link: string;
    featured?: boolean; badge?: string; features: string[];
  };
  duration: number;
  expired: boolean;
  onConsult: () => void;
}) {
  const { ref, visible } = useFadeUp();
  const [showAll, setShowAll] = useState(false);
  const isVIP = planKey === "personalGold";

  const finalSell = expired ? planData.sell + 1000 : planData.sell;

  const finalLink = expired ? NEW_LINKS[duration][planKey] : planData.link;

  const saving = planData.base - finalSell;


  return (
    <div
      ref={ref}
      style={{
        background: planData.featured ? "linear-gradient(150deg, #fffdf5 0%, #fff8e6 100%)" : "white",
        borderRadius: 18,
        padding: "16px 16px",
        boxShadow: planData.featured ? "0 8px 28px rgba(245,166,35,0.22)" : isVIP ? "0 8px 28px rgba(45,159,99,0.22)" : "0 4px 18px rgba(0,0,0,0.08)",
        border: `2px solid ${planData.featured ? "#f5a623" : isVIP ? "#2d9f63" : "#eee"}`,
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : planData.featured ? "scale(1.05)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        width: "78vw",
        maxWidth: planData.featured ? 340 : 300,
        minWidth: planData.featured ? 280 : 240,
        boxSizing: "border-box" as const,
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
    >
      {planData.badge && (
        <div style={{ position: "absolute", top: -1, right: 18, background: planData.featured ? "#f5a623" : "#2d9f63", color: "white", fontSize: 10, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", padding: "4px 12px", borderRadius: "0 0 10px 10px" }}>
          {planData.badge}
        </div>
      )}

      <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>
        {planData.name}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "#666", textDecoration: "line-through" }}>₹{fmt(planData.base)}</div>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, fontWeight: 800, color: planData.featured ? "#c07000" : "#1a7a4a", lineHeight: 1 }}>
            ₹{fmt(finalSell)}
          </div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>₹{fmt(planData.perMonth)}/month</div>
        </div>
        <div style={{ background: "#ffeaea", color: "#d93025", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 20 }}>
          Save ₹{fmt(saving)}!
        </div>
      </div>

      <div style={{ marginBottom: planData.featured ? 12 : 6 }}>
        {(showAll ? planData.features : planData.features.slice(0, planData.featured ? 8 : 5)).map((feature) => (
          <div key={feature} style={{ fontSize: 12, color: "#333", marginBottom: planData.featured ? 5 : 3, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#1a7a4a", fontSize: 13 }}>✓</span>
            <span>{feature}</span>
          </div>
        ))}
        {planData.features.length > (planData.featured ? 8 : 5) && (
          <div
            onClick={() => setShowAll(!showAll)}
            style={{ fontSize: 12, color: "#1a7a4a", marginTop: 4, cursor: "pointer", fontWeight: 700 }}
          >
            {showAll ? "▲ Show less" : `+ ${planData.features.length - (planData.featured ? 8 : 5)} more features ▼`}
          </div>
        )}
      </div>

      <a
        href={finalLink}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          width: "100%",
          background: planData.featured
            ? "linear-gradient(135deg, #f5a623, #d4840a)"
            : "linear-gradient(135deg, #2d9f63, #1a7a4a)",
          color: "white",
          borderRadius: 50,
          padding: 13,
          fontFamily: "'Baloo 2', cursive",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: planData.featured ? "0 4px 16px rgba(245,166,35,0.45)" : "0 4px 16px rgba(26,122,74,0.35)",
          textDecoration: "none",
          textAlign: "center",
          boxSizing: "border-box" as const,
        }}
      >
        Get {planData.name.replace(/[⭐👑💎]/g, '').trim()} →
      </a>

      {/* Consultation button — only shown after offer expires */}
      {expired && (
        <button
          onClick={onConsult}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            background: "transparent",
            color: "#1a7a4a",
            border: "2px solid #1a7a4a",
            borderRadius: 50,
            padding: 11,
            fontFamily: "'Baloo 2', cursive",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            textAlign: "center",
            boxSizing: "border-box" as const,
            marginTop: 8,
          }}
        >
          📞 Get Free Consultation
        </button>
      )}

      <div style={{ textAlign: "center", fontSize: 12, color: "#666", marginTop: 8 }}>🔒 Secure checkout · Instant access</div>
    </div>
  );
}

function CompareTable() {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 20,
        padding: "24px 16px",
        boxShadow: "0 8px 32px rgba(26,122,74,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        overflowX: "auto",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "left", minWidth: 120 }}></th>
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "center", color: "#1565c0" }}>Community</th>
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "center", color: "#d97706" }}>Transformation</th>
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "center", color: "#e65100" }}>VIP</th>
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map(({ feature, group, silver, gold }, i) => (
            <tr key={feature} style={{ background: i % 2 === 0 ? "#f9fdf9" : "white" }}>
              <td style={{ padding: "11px 4px", fontWeight: 700, fontSize: 12, color: "#1a1a2e", borderBottom: "1px solid #f0f0f0" }}>{feature}</td>
              <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ color: group ? "#1a7a4a" : "#ddd", fontSize: 18 }}>{group ? "✓" : "✗"}</span>
              </td>
              <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ color: silver ? "#1a7a4a" : "#ddd", fontSize: typeof silver === "number" ? 13 : 18 }}>{typeof silver === "number" ? `${silver}x` : silver ? "✓" : "✗"}</span>
              </td>
              <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ color: gold ? "#1a7a4a" : "#ddd", fontSize: typeof gold === "number" ? 13 : 18 }}>{typeof gold === "number" ? `${gold}x` : gold ? "✓" : "✗"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function WeightLossOffer() {
  // Fixed target: 2 August 2026, 12:00 PM IST (UTC+5:30) = 2 August 2026 06:30:00 UTC
  const TARGET_UTC_MS = Date.UTC(2026, 7, 16, 6, 0, 0);

  // const TARGET_UTC_MS = Date.now() - 1000;



  const getTimeUntilTarget = () =>
    Math.max(0, Math.floor((TARGET_UTC_MS - Date.now()) / 1000));

  const [timeLeft, setTimeLeft] = useState(getTimeUntilTarget);
  const [expired, setExpired] = useState(() => getTimeUntilTarget() <= 0);
  const [currentDuration, setCurrentDuration] = useState(12);
  const [activeCard, setActiveCard] = useState(0);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const cardsScrollRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    if (expired) return;
    if (timeLeft <= 0) { setExpired(true); return; }
    const id = setInterval(() => {
      const remaining = getTimeUntilTarget();
      setTimeLeft(remaining);
      if (remaining <= 0) { setExpired(true); }
    }, 1000);
    return () => clearInterval(id);
  }, [expired]); // eslint-disable-line react-hooks/exhaustive-deps

  const plans = PLAN_DATA[currentDuration];

  return (
    <>
      {showConsultModal && <ConsultModal onClose={() => setShowConsultModal(false)} />}
      {/* Google Fonts - Only for this page */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Keyframe animations injected via <style> */}
      <style>{`
        @keyframes pulseBg {
          0%,100% { background: linear-gradient(135deg,#d93025,#c0392b); }
          50% { background: linear-gradient(135deg,#ff3b2f,#d93025); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50% { opacity:0.3; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; background: #c8ddd0; color: #1a1a2e; font-size: 16px; line-height: 1.5; }
        
        /* Hide scrollbar for horizontal scroll */
        *::-webkit-scrollbar {
          height: 0px;
          width: 0px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: transparent;
        }
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", background: "#f4faf7", minHeight: "100vh", boxShadow: "0 0 60px rgba(0,0,0,0.15)", overflow: "hidden", fontFamily: "'Nunito', sans-serif" }}>

        <TimerStrip timeLeft={timeLeft} expired={expired} />

        {/* Duration Toggle */}
        <section style={{ padding: "20px 16px 0" }}>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 6 }}> Choose Your Plan</div>
          <div style={{ textAlign: "center", color: "#666", fontSize: 14, marginBottom: 20 }}>Pick what suits you best</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DurationToggle currentDuration={currentDuration} onSelect={setCurrentDuration} />
          </div>

          {/* Plan Cards */}
          <div style={{ position: "relative", marginTop: 8 }}>
            <div
              ref={cardsScrollRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                const cardWidth = el.scrollWidth / 3;
                setActiveCard(Math.round(el.scrollLeft / cardWidth));
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                overflowX: "auto",
                paddingBottom: 6,
                paddingLeft: 4,
                paddingRight: 4,
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              <PlanCard planKey="group" planData={plans.group} duration={currentDuration} expired={expired} onConsult={() => setShowConsultModal(true)} />
              <PlanCard planKey="personalSilver" planData={plans.personalSilver} duration={currentDuration} expired={expired} onConsult={() => setShowConsultModal(true)} />
              <PlanCard planKey="personalGold" planData={plans.personalGold} duration={currentDuration} expired={expired} onConsult={() => setShowConsultModal(true)} />
            </div>

            {/* Scroll hint label */}
            <div style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 6 }}>← swipe to see more plans →</div>

            {/* Dot indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  onClick={() => {
                    const el = cardsScrollRef.current;
                    if (!el) return;
                    const cardWidth = el.scrollWidth / 3;
                    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                    setActiveCard(i);
                  }}
                  style={{
                    width: activeCard === i ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: activeCard === i ? "#1a7a4a" : "#ccc",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 12 }}>
              <button
                onClick={() => {
                  const el = cardsScrollRef.current;
                  if (!el) return;
                  const cardWidth = el.scrollWidth / 3;
                  const next = Math.max(0, activeCard - 1);
                  el.scrollTo({ left: cardWidth * next, behavior: "smooth" });
                  setActiveCard(next);
                }}
                disabled={activeCard === 0}
                style={{
                  background: activeCard === 0 ? "#eee" : "#1a7a4a",
                  color: activeCard === 0 ? "#aaa" : "white",
                  border: "none",
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  fontSize: 18,
                  cursor: activeCard === 0 ? "default" : "pointer",
                  fontWeight: 700,
                }}
              >‹</button>
              <button
                onClick={() => {
                  const el = cardsScrollRef.current;
                  if (!el) return;
                  const cardWidth = el.scrollWidth / 3;
                  const next = Math.min(2, activeCard + 1);
                  el.scrollTo({ left: cardWidth * next, behavior: "smooth" });
                  setActiveCard(next);
                }}
                disabled={activeCard === 2}
                style={{
                  background: activeCard === 2 ? "#eee" : "#1a7a4a",
                  color: activeCard === 2 ? "#aaa" : "white",
                  border: "none",
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  fontSize: 18,
                  cursor: activeCard === 2 ? "default" : "pointer",
                  fontWeight: 700,
                }}
              >›</button>
            </div>
          </div>
        </section>

        {/* Compare Table */}
        <section style={{ padding: "20px 16px" }}>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>What's Included?</div>
          <div style={{ textAlign: "center", color: "#666", fontSize: 14, marginBottom: 20 }}>See everything side by side</div>
          <CompareTable />

          {/* CTA below compare table — always visible */}
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
              Not sure which plan is right for you?
            </div>
            <button
              onClick={() => setShowConsultModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg, #2d9f63, #1a7a4a)",
                color: "white",
                border: "none",
                borderRadius: 50,
                padding: "14px 32px",
                fontFamily: "'Baloo 2', cursive",
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(26,122,74,0.35)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(26,122,74,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "none";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(26,122,74,0.35)";
              }}
            >
              📞 Get Free Consultation
            </button>
            <div style={{ fontSize: 11, color: "#999", marginTop: 10 }}>
              Our expert will help you pick the best plan — no obligation
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
