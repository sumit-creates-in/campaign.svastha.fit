import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PLAN_DATA = {
  12: {
    group: {
      name: "⭐ Group Plan",
      sell: 6900,
      base: 10800,
      perMonth: 575,
      link: "https://rzp.io/rzp/FmzKCdx",
      badge: "Save ₹2k+",
      features: [
        "� Communitiy Diet Plan",
        "📺 Weekly Live with Sumit",
        "🎙️ Voice Notes",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker",
        "🔔 Daily Reminders"
      ]
    },
    personalSilver: {
      name: "👑 Personalized Silver",
      sell: 23900,
      base: 35640,
      perMonth: 1992,
      link: "https://rzp.io/rzp/P3u4HHm7",
      badge: "Save ₹11.7k",
      features: [
        "👩‍⚕️ Personal Dietitian",
        "📋 Your Own Diet Plan",
        "🥗 Community Diet Plan",
        "📺 Weekly Live with Sumit",
        "🎙️ Voice Notes",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker"
      ]
    },
    personalGold: {
      name: "💎 Personalized Gold",
      sell: 29900,
      base: 46800,
      perMonth: 2492,
      link: "https://rzp.io/rzp/UaNRicm",
      badge: "🏆 Save ₹16.9k",
      featured: true,
      features: [
        "👩‍⚕️ Personal Dietitian",
        "📋 Your Own Diet Plan",
        "📞 Call & Chat Support",
        "🥗 Community Diet Plan",
        "📺 Weekly Live with Sumit",
        "🎙️ Voice Notes",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    }
  },
  6: {
    group: {
      name: "⭐ Group Plan",
      sell: 3900,
      base: 5400,
      perMonth: 650,
      link: "https://rzp.io/rzp/rwAlm54",
      badge: "Save ₹1.5k",
      features: [
        "🥗 Community Diet Plan",
        "📺 Weekly Live with Sumit",
        "🎙️ Voice Notes",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker",
        "🔔 Daily Reminders"
      ]
    },
    personalSilver: {
      name: "👑 Personalized Silver",
      sell: 13900,
      base: 17820,
      perMonth: 2317,
      link: "https://rzp.io/rzp/euYWM5k",
      badge: "Save ₹3.9k",
      features: [
        "👩‍⚕️ Personal Dietitian",
        "📋 Your Own Diet Plan",
        "🥗 Community Diet Plan",
        "📺 Weekly Live with Sumit",
        "🎙️ Voice Notes",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker"
      ]
    },
    personalGold: {
      name: "💎 Personalized Gold",
      sell: 16900,
      base: 23400,
      perMonth: 2817,
      link: "https://rzp.io/rzp/eZ6OOmoH",
      badge: "🏆 Save ₹6.5k",
      featured: true,
      features: [
        "👩‍⚕️ Personal Dietitian",
        "📋 Your Own Diet Plan",
        "📞 Call & Chat Support",
        "🥗 Community Diet Plan",
        "📺 Weekly Live with Sumit",
        "🎙️ Voice Notes",
        "🧘 Live Yoga Classes",
        "🎬 Class Recordings",
        "⚖️ Weight Tracker",
        "✅ Habit Tracker"
      ]
    }
  }
};

const COMPARE_ROWS = [
  { feature: "Live Yoga Classes", group: true, silver: true, gold: true },
  { feature: "Class Recordings", group: true, silver: true, gold: true },
  { feature: "Weight Tracker", group: true, silver: true, gold: true },
  { feature: "Habit Tracker", group: true, silver: false, gold: true },
  { feature: "Daily Reminders", group: true, silver: false, gold: true },
  { feature: "Community Diet Plan", group: true, silver: true, gold: true },
  { feature: "Weekly Live with Sumit", group: true, silver: true, gold: true },
  { feature: "Sumit's Voice Notes", group: true, silver: true, gold: true },
  { feature: "Personal Dietitian", group: false, silver: true, gold: true },
  { feature: "Personalized Diet Plan", group: false, silver: true, gold: true },
  { feature: "Call & Chat Support", group: false, silver: true, gold: true },
  { feature: "Weekly Follow-ups", group: false, silver: 1, gold: 3 },
];


// ── HELPERS ───────────────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, "0"); }
function fmt(n) { return n.toLocaleString("en-IN"); }

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

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function TimerStrip({ timeLeft, urgent }) {
  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #d93025 0%, #c0392b 100%)",
        color: "white",
        textAlign: "center",
        padding: "14px 16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 3px 16px rgba(217,48,37,0.4)",
        animation: urgent ? "pulseBg 1s infinite" : "none",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", opacity: 0.9, marginBottom: 6 }}>
        ⚡ Offer Ends Sunday 11:30 AM
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        {days > 0 && (
          <>
            <div style={digitBoxStyle}>{pad(days)}</div>
            <div style={{ fontSize: 28, fontWeight: 800, opacity: 0.8, marginBottom: 4 }}>:</div>
          </>
        )}
        <div style={digitBoxStyle}>{pad(hours)}</div>
        <div style={{ fontSize: 28, fontWeight: 800, opacity: 0.8, marginBottom: 4 }}>:</div>
        <div style={digitBoxStyle}>{pad(minutes)}</div>
        <div style={{ fontSize: 28, fontWeight: 800, opacity: 0.8, marginBottom: 4 }}>:</div>
        <div style={digitBoxStyle}>{pad(seconds)}</div>
      </div>
      <div style={{ fontSize: 11, opacity: 0.8, marginTop: 6, letterSpacing: 0.5 }}>
        After this, prices go back to normal
      </div>
    </div>
  );
}

const digitBoxStyle = {
  background: "rgba(255,255,255,0.2)",
  borderRadius: 10,
  padding: "8px 14px",
  fontFamily: "'Baloo 2', cursive",
  fontSize: 32,
  fontWeight: 800,
  minWidth: 60,
  lineHeight: 1,
};

function Hero() {
  return (
    <div
      style={{
        background: "linear-gradient(160deg, #1a7a4a 0%, #0f5c37 100%)",
        color: "white",
        padding: "32px 20px 36px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative circles */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />

      <div style={{ display: "inline-block", background: "#f5a623", color: "#1a1a2e", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 16 }}>
        🎉 Week 2 Special — Only for You
      </div>
      <h1 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
        You've Done <span style={{ color: "#f5a623" }}>7 Days!</span>
        <br />Now Let's Finish Strong 💪
      </h1>
      <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 340, margin: "0 auto 20px", lineHeight: 1.6 }}>
        You've already proven you can do it. Now get the right support to reach your goal — at a price that's only available <strong>RIGHT NOW.</strong>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 8 }}>
        {[{ num: "5000+", desc: "People\nTransformed" }, { num: "4.9★", desc: "Average\nRating" }, { num: "93%", desc: "See Results\nin 30 Days" }].map(({ num, desc }) => (
          <div key={num} style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, fontWeight: 800, color: "#f5a623", display: "block" }}>{num}</span>
            <span style={{ fontSize: 11, opacity: 0.8, lineHeight: 1.3, whiteSpace: "pre-line" }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FomoBar({ html }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        background: "#fff8e1",
        borderLeft: "4px solid #f5a623",
        padding: "12px 16px",
        margin: "8px 16px 16px",
        borderRadius: "0 10px 10px 0",
        fontSize: 14,
        fontWeight: 700,
        color: "#7a5000",
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div style={{ width: 10, height: 10, background: "#d93025", borderRadius: "50%", flexShrink: 0, animation: "blink 1.2s infinite" }} />
      <span dangerouslySetInnerHTML={{ __html: html }} />
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

function PlanCard({ planKey, planData, duration }) {
  const { ref, visible } = useFadeUp();
  const saving = planData.base - planData.sell;

  return (
    <div
      ref={ref}
      style={{
        background: planData.featured ? "linear-gradient(150deg, #fffdf5 0%, #fff8e6 100%)" : "white",
        borderRadius: 18,
        padding: "24px 20px",
        boxShadow: planData.featured ? "0 8px 28px rgba(245,166,35,0.22)" : "0 4px 18px rgba(0,0,0,0.08)",
        border: `2px solid ${planData.featured ? "#f5a623" : "#eee"}`,
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        minWidth: 280,
        width: "85vw",
        maxWidth: 380,
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
    >
      {planData.badge && (
        <div style={{ position: "absolute", top: -1, right: 18, background: planData.featured ? "#f5a623" : "#2d9f63", color: "white", fontSize: 10, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", padding: "4px 12px", borderRadius: "0 0 10px 10px" }}>
          {planData.badge}
        </div>
      )}

      <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>
        {planData.name}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, color: "#666", textDecoration: "line-through" }}>₹{fmt(planData.base)}</div>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 32, fontWeight: 800, color: planData.featured ? "#c07000" : "#1a7a4a", lineHeight: 1 }}>
            ₹{fmt(planData.sell)}
          </div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>₹{fmt(planData.perMonth)}/month</div>
        </div>
        <div style={{ background: "#ffeaea", color: "#d93025", fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 20 }}>
          Save ₹{fmt(saving)}!
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        {planData.features.slice(0, 5).map((feature) => (
          <div key={feature} style={{ fontSize: 13, color: "#333", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#1a7a4a", fontSize: 14 }}>✓</span>
            <span>{feature}</span>
          </div>
        ))}
        {planData.features.length > 5 && (
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>+ {planData.features.length - 5} more features</div>
        )}
      </div>

      <a
        href={planData.link}
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
          padding: 15,
          fontFamily: "'Baloo 2', cursive",
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: planData.featured ? "0 4px 16px rgba(245,166,35,0.45)" : "0 4px 16px rgba(26,122,74,0.35)",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        Get This Plan →
      </a>
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
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "center", color: "#1565c0" }}>Group</th>
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "center", color: "#d97706" }}>Silver</th>
            <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 11, textAlign: "center", color: "#e65100" }}>Gold</th>
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

function TestimonialCard({ avatar, stars, text, name, detail }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        borderLeft: "4px solid #2d9f63",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div style={{ color: "#f5a623", fontSize: 16, marginBottom: 8 }}>{"★".repeat(stars)}</div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#333", marginBottom: 10 }}>"{text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: "#e6f7ee", flexShrink: 0 }}>{avatar}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{name}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{detail}</div>
        </div>
      </div>
    </div>
  );
}

function Guarantee() {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 20,
        padding: "24px 20px",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(26,122,74,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
      <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>100% Safe to Join</h3>
      <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>
        If you follow the program and don't see any results in the first 30 days, reach out to us. We've helped 5,000+ people — we'll make sure it works for you too.
      </p>
    </div>
  );
}

function FinalCTA({ timeLeft }) {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  return (
    <div style={{ background: "linear-gradient(160deg, #1a7a4a, #0f5c37)", color: "white", padding: "32px 20px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
        Don't Let This Offer<br /><span style={{ color: "#f5a623" }}>Slip Away</span> ⏳
      </h2>
      <p style={{ fontSize: 15, opacity: 0.85, marginBottom: 20 }}>
        This special price is ONLY available while the timer is running. Once it hits zero — offer is gone forever.
      </p>
      <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 20, fontWeight: 700, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 20px", margin: "0 auto 20px", display: "inline-block", color: "#f5a623" }}>
        ⏱ {pad(m)}:{pad(s)} remaining
      </div>
      <div style={{ background: "#fff8e1", border: "2px solid #f5a623", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 14, fontWeight: 700, color: "#7a5000" }}>
        <div style={{ width: 10, height: 10, background: "#d93025", borderRadius: "50%", animation: "blink 1.2s infinite" }} />
        <span>🔥 <strong>47 people</strong> are looking at this right now</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a href="https://rzp.io/rzp/dAjZcUT" target="_blank" rel="noreferrer"
          style={{ background: "linear-gradient(135deg,#f5a623,#d4840a)", boxShadow: "0 6px 20px rgba(245,166,35,0.5)", color: "white", border: "none", borderRadius: 50, padding: 18, fontFamily: "'Baloo 2', cursive", fontSize: 18, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>
          👑 Personalized Plan – 12 Months ₹14,999
        </a>
        <a href="https://rzp.io/rzp/7vgo0f2W" target="_blank" rel="noreferrer"
          style={{ background: "linear-gradient(135deg, #2d9f63, #1a7a4a)", boxShadow: "0 6px 20px rgba(26,122,74,0.4)", color: "white", border: "none", borderRadius: 50, padding: 18, fontFamily: "'Baloo 2', cursive", fontSize: 18, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>
          ⭐ Group Plan – 12 Months ₹4,999
        </a>
      </div>
      <p style={{ marginTop: 16, fontSize: 13, opacity: 0.7 }}>🔒 Secure payment · Instant access · Safe &amp; trusted</p>
    </div>
  );
}

function ExpiredOverlay({ show }) {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", borderRadius: 24, padding: "36px 24px", textAlign: "center", maxWidth: 360, width: "100%" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>⏰</div>
        <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Offer Has Expired</h2>
        <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>This special offer has ended. Please contact us to check if a new offer is available for you.</p>
        <p style={{ marginTop: 16, fontSize: 13, color: "#999" }}>Thank you for your interest!</p>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function WeightLossOffer() {
  // Calculate time until Sunday 11:30 AM
  const getTimeUntilSunday = () => {
    const now = new Date();
    const targetDate = new Date();

    // Set target to next Sunday at 11:30 AM
    const daysUntilSunday = (7 - now.getDay()) % 7; // 0 if today is Sunday
    targetDate.setDate(now.getDate() + daysUntilSunday);
    targetDate.setHours(11, 30, 0, 0);

    // If we're past 11:30 AM on Sunday, set to next Sunday
    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 7);
    }

    return Math.floor((targetDate.getTime() - now.getTime()) / 1000);
  };

  const [timeLeft, setTimeLeft] = useState(getTimeUntilSunday());
  const [expired, setExpired] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(12);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) { setExpired(true); return; }
    const id = setInterval(() => setTimeLeft((t) => { if (t <= 1) { setExpired(true); return 0; } return t - 1; }), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const urgent = timeLeft <= 300;
  const plans = PLAN_DATA[currentDuration];

  return (
    <>
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

        <TimerStrip timeLeft={timeLeft} urgent={urgent} />

        {/* Duration Toggle */}
        <section style={{ padding: "20px 16px 0" }}>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 6 }}> Choose Your Plan</div>
          <div style={{ textAlign: "center", color: "#666", fontSize: 14, marginBottom: 20 }}>Pick what suits you best</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DurationToggle currentDuration={currentDuration} onSelect={setCurrentDuration} />
          </div>

          {/* Plan Cards */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: 14,
            overflowX: "auto",
            paddingBottom: 10,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch"
          }}>
            <PlanCard planKey="group" planData={plans.group} duration={currentDuration} />
            <PlanCard planKey="personalSilver" planData={plans.personalSilver} duration={currentDuration} />
            <PlanCard planKey="personalGold" planData={plans.personalGold} duration={currentDuration} />
          </div>
        </section>

        {/* Compare Table */}
        <section style={{ padding: "20px 16px" }}>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>What's Included?</div>
          <div style={{ textAlign: "center", color: "#666", fontSize: 14, marginBottom: 20 }}>See everything side by side</div>
          <CompareTable />
        </section>

        <ExpiredOverlay show={expired} />
      </div>
    </>
  );
}
