import { useState, useEffect, useRef } from "react";

const PLAN_DATA = {
    group: {
        name: "🌿 Group Plan",
        sell: 590,
        base: 1990,
        link: "https://rzp.io/rzp/VaRHemD", // Payment link — to be added
        badge: "🏆 Most Popular",
        featured: true,
        features: [
            "🧘 Live Yoga Classes",
            "🎬 Class Recordings",
            "🤖 AI Chat Support",
            "🗫 Daily Reminders",
            "⚖️ Weight Tracker",
            "✅ Habit Tracker",
            "👥 Community Group Access",
            "📋 Community Diet Plan",
        ]
    },
    personalized: {
        name: "💎 Personalized Plan",
        sell: 1990,
        base: 4990,
        link: "https://rzp.io/rzp/BVtiuuK", // Payment link — to be added
        badge: "⚡ Best Results",
        featured: false,
        features: [
            "👩‍⚕️ Personal Dietitian",
            "📋 Personalized Diet Plan",
            "📞 1 Weekly Follow-up",
            "📞 Call & Chat Support",
            "🤖 AI Chat Support",
            "🗫 Daily Reminders",
            "🧘 Live Yoga Classes",
            "🎬 Class Recordings",
            "⚖️ Weight Tracker",
            "✅ Habit Tracker",
        ]
    }
};

const EXPIRED_PLAN_DATA = {
    group: {
        ...PLAN_DATA.group,
        sell: 890,
        link: "https://pages.razorpay.com/pl_QHg0K5EhmJMBP8/view", // Payment link after offer ends — to be added
    },
    personalized: {
        ...PLAN_DATA.personalized,
        sell: 2790,
        link: "https://pages.razorpay.com/pl_QHfwHt0q52MdOJ/view", // Payment link after offer ends — to be added
    }
};

const COMPARE_ROWS = [
    { feature: "Live Yoga Classes", group: true, personalized: true },
    { feature: "Class Recordings", group: true, personalized: true },
    { feature: "AI Chat Support", group: true, personalized: true },
    { feature: "Daily Reminders", group: true, personalized: true },
    { feature: "Weight Tracker", group: true, personalized: true },
    { feature: "Habit Tracker", group: true, personalized: true },
    { feature: "Community Group Access", group: true, personalized: true },
    { feature: "General Diet Guidance", group: true, personalized: true },
    { feature: "Personal Dietitian", group: false, personalized: true },
    { feature: "Personalized Diet Plan", group: false, personalized: true },
    { feature: "Weekly Follow-up", group: false, personalized: true },
    { feature: "Call & Chat Support", group: false, personalized: true },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function fmt(n: number) { return n.toLocaleString("en-IN"); }

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
const WEBHOOK_URL = "https://svastha-automator-webhook-production.up.railway.app/api/webhooks/xnWibTPsDVpsn9U3EbEcOu";

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    mobile: `${countryCode}${mobile.trim()}`,
                    source: "JoinsSvastha - Free Consultation",
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

// ── TIMER STRIP ───────────────────────────────────────────────────────────────
function TimerStrip({ timeLeft, urgent, endDate }: { timeLeft: number; urgent: boolean; endDate: Date | null }) {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    const endLabel = endDate
        ? (() => {
            const opts: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", month: "long", day: "numeric" };
            const datePart = endDate.toLocaleDateString("en-IN", opts);
            const timePart = endDate.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZoneName: "short",
            });
            return `${datePart} at ${timePart}`;
        })()
        : "";

    const bgStyle = urgent
        ? { animation: "pulseBg 1s infinite" }
        : { background: "linear-gradient(135deg, #d93025 0%, #c0392b 100%)" };

    return (
        <div
            style={{
                ...bgStyle,
                color: "white",
                textAlign: "center",
                padding: "10px 16px 12px",
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "0 3px 16px rgba(217,48,37,0.4)",
            }}
        >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", opacity: 0.9, marginBottom: 6 }}>
                ⚡ Special Offer Ends In
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 6 }}>
                {[
                    { val: days, label: "Days" },
                    { val: hours, label: "Hrs" },
                    { val: minutes, label: "Min" },
                    { val: seconds, label: "Sec" },
                ].map(({ val, label }, i) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: i < 3 ? 8 : 0 }}>
                        <div
                            style={{
                                background: "rgba(0,0,0,0.25)",
                                borderRadius: 8,
                                padding: "4px 10px",
                                minWidth: 48,
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Baloo 2', cursive", lineHeight: 1.1, letterSpacing: 1 }}>
                                {pad(val)}
                            </div>
                            <div style={{ fontSize: 9, opacity: 0.8, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                        </div>
                        {i < 3 && (
                            <div style={{ fontSize: 20, fontWeight: 800, opacity: 0.7, animation: "blink 1s infinite", marginLeft: -4, marginRight: -4 }}>:</div>
                        )}
                    </div>
                ))}
            </div>

            {endLabel && (
                <div style={{ fontSize: 10, opacity: 0.75, letterSpacing: 0.4 }}>
                    Offer ends {endLabel}
                </div>
            )}
        </div>
    );
}

// ── PLAN CARD ─────────────────────────────────────────────────────────────────
function PlanCard({ planKey, planData, expired, onConsult }: {
    planKey: "group" | "personalized";
    planData: typeof PLAN_DATA["group"];
    expired: boolean;
    onConsult: () => void;
}) {
    const { ref, visible } = useFadeUp();
    const [showAll, setShowAll] = useState(false);

    const activePlan = expired ? EXPIRED_PLAN_DATA[planKey] : planData;
    const saving = planData.base - activePlan.sell;

    return (
        <div
            ref={ref}
            style={{
                background: planData.featured ? "linear-gradient(150deg, #fffdf5 0%, #fff8e6 100%)" : "white",
                borderRadius: 18,
                padding: "16px 16px",
                boxShadow: planData.featured
                    ? "0 8px 28px rgba(245,166,35,0.22)"
                    : "0 8px 28px rgba(45,159,99,0.22)",
                border: `2px solid ${planData.featured ? "#f5a623" : "#2d9f63"}`,
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
                <div style={{
                    position: "absolute", top: -1, right: 18,
                    background: planData.featured ? "#f5a623" : "#2d9f63",
                    color: "white", fontSize: 10, fontWeight: 800,
                    letterSpacing: 0.5, textTransform: "uppercase",
                    padding: "4px 12px", borderRadius: "0 0 10px 10px"
                }}>
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
                        ₹{fmt(activePlan.sell)}
                    </div>
                    {expired && (
                        <div style={{ fontSize: 10, color: "#d93025", fontWeight: 700, marginTop: 2 }}>Offer Ended</div>
                    )}
                </div>
                <div style={{ background: "#ffeaea", color: "#d93025", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 20 }}>
                    Save ₹{fmt(saving)}!
                </div>
            </div>

            <div style={{ marginBottom: 6 }}>
                {(showAll ? planData.features : planData.features.slice(0, 8)).map((feature) => (
                    <div key={feature} style={{ fontSize: 12, color: "#333", marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#1a7a4a", fontSize: 13 }}>✓</span>
                        <span>{feature}</span>
                    </div>
                ))}
                {planData.features.length > 8 && (
                    <div
                        onClick={() => setShowAll(!showAll)}
                        style={{ fontSize: 12, color: "#1a7a4a", marginTop: 4, cursor: "pointer", fontWeight: 700 }}
                    >
                        {showAll ? "▲ Show less" : `+ ${planData.features.length - 8} more features ▼`}
                    </div>
                )}
            </div>

            {activePlan.link ? (
                <a
                    href={activePlan.link}
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
                        boxShadow: planData.featured
                            ? "0 4px 16px rgba(245,166,35,0.45)"
                            : "0 4px 16px rgba(26,122,74,0.35)",
                        textDecoration: "none",
                        textAlign: "center",
                        boxSizing: "border-box" as const,
                    }}
                >
                    Get {planData.name.replace(/[⭐👑💎🌿]/g, "").trim()} →
                </a>
            ) : (
                <button
                    disabled
                    style={{
                        display: "block",
                        width: "100%",
                        background: "#ccc",
                        color: "white",
                        borderRadius: 50,
                        padding: 13,
                        fontFamily: "'Baloo 2', cursive",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "not-allowed",
                        border: "none",
                        boxSizing: "border-box" as const,
                        textAlign: "center",
                    }}
                >
                    Coming Soon
                </button>
            )}

            {/* Free Consultation Button — always visible */}
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

            <div style={{ textAlign: "center", fontSize: 12, color: "#666", marginTop: 8 }}>🔒 Secure checkout · Instant access</div>
        </div>
    );
}

// ── COMPARE TABLE ─────────────────────────────────────────────────────────────
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
                        <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 18, textAlign: "center", color: "#d97706" }}>Group</th>
                        <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 18, textAlign: "center", color: "#1a7a4a" }}>Personalized</th>
                    </tr>
                </thead>
                <tbody>
                    {COMPARE_ROWS.map(({ feature, group, personalized }, i) => (
                        <tr key={feature} style={{ background: i % 2 === 0 ? "#f9fdf9" : "white" }}>
                            <td style={{ padding: "11px 4px", fontWeight: 700, fontSize: 12, color: "#1a1a2e", borderBottom: "1px solid #f0f0f0" }}>{feature}</td>
                            <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                                <span style={{ color: group ? "#1a7a4a" : "#ddd", fontSize: 18 }}>{group ? "✓" : "✗"}</span>
                            </td>
                            <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                                <span style={{ color: personalized ? "#1a7a4a" : "#ddd", fontSize: 18 }}>{personalized ? "✓" : "✗"}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function JoinsSvasthaCommunity() {

    const getTargetDate = () => {
        // Aug 23, 2026 at 11:00 AM IST = 05:30 UTC
        return new Date("2026-08-23T05:30:00Z");
    };

    const getTimeUntilEnd = () => {
        const now = new Date();
        const targetDate = getTargetDate();
        return Math.floor((targetDate.getTime() - now.getTime()) / 1000);
    };

    const [endDate] = useState(getTargetDate);
    const [timeLeft, setTimeLeft] = useState(getTimeUntilEnd());
    const [expired, setExpired] = useState(() => getTimeUntilEnd() <= 0);
    const [activeCard, setActiveCard] = useState(0);
    const [showConsultModal, setShowConsultModal] = useState(false);
    const cardsScrollRef = useRef<HTMLDivElement>(null);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) { setExpired(true); return; }
        const id = setInterval(() => setTimeLeft((t) => {
            if (t <= 1) { setExpired(true); return 0; }
            return t - 1;
        }), 1000);
        return () => clearInterval(id);
    }, [timeLeft]);

    const urgent = timeLeft <= 300;

    return (
        <>
            {showConsultModal && <ConsultModal onClose={() => setShowConsultModal(false)} />}
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

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
        *::-webkit-scrollbar { height: 0px; width: 0px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: transparent; }
        * { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

            <div style={{ maxWidth: 720, margin: "0 auto", background: "#f4faf7", minHeight: "100vh", boxShadow: "0 0 60px rgba(0,0,0,0.15)", overflow: "hidden", fontFamily: "'Nunito', sans-serif" }}>

                <TimerStrip timeLeft={timeLeft} urgent={urgent} endDate={endDate} />

                {/* Header */}
                <section style={{ padding: "24px 16px 0", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.2, marginBottom: 8, marginTop: 10 }}>
                        Ultimate 21 Day Weight Loss Challenge
                    </div>
                    <div style={{ color: "#555", fontSize: 14, marginBottom: 4 }}>
                        Choose the plan that fits your journey 🌿
                    </div>
                    {!expired && (
                        <div style={{ display: "inline-block", background: "#ffeaea", color: "#d93025", fontSize: 12, fontWeight: 800, padding: "4px 14px", borderRadius: 20, marginBottom: 16 }}>
                            🔥 Limited-time offer — prices increase when the timer hits zero!
                        </div>
                    )}
                </section>

                {/* Plan Cards */}
                <section style={{ padding: "16px 16px 0" }}>
                    <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>Choose Your Plan</div>
                    <div style={{ textAlign: "center", color: "#666", fontSize: 14, marginBottom: 20 }}>Pick what suits you best</div>

                    <div style={{ position: "relative" }}>
                        <div
                            ref={cardsScrollRef}
                            onScroll={(e) => {
                                const el = e.currentTarget;
                                const cardWidth = el.scrollWidth / 2;
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
                            <PlanCard planKey="group" planData={PLAN_DATA.group} expired={expired} onConsult={() => setShowConsultModal(true)} />
                            <PlanCard planKey="personalized" planData={PLAN_DATA.personalized} expired={expired} onConsult={() => setShowConsultModal(true)} />
                        </div>

                        <div style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 6 }}>← swipe to see more plans →</div>

                        {/* Dot indicators */}
                        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
                            {[0, 1].map((i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        const el = cardsScrollRef.current;
                                        if (!el) return;
                                        const cardWidth = el.scrollWidth / 2;
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
                                    const cardWidth = el.scrollWidth / 2;
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
                                    const cardWidth = el.scrollWidth / 2;
                                    const next = Math.min(1, activeCard + 1);
                                    el.scrollTo({ left: cardWidth * next, behavior: "smooth" });
                                    setActiveCard(next);
                                }}
                                disabled={activeCard === 1}
                                style={{
                                    background: activeCard === 1 ? "#eee" : "#1a7a4a",
                                    color: activeCard === 1 ? "#aaa" : "white",
                                    border: "none",
                                    borderRadius: 50,
                                    width: 40,
                                    height: 40,
                                    fontSize: 18,
                                    cursor: activeCard === 1 ? "default" : "pointer",
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
