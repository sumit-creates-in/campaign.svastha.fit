import { useState, useEffect, useRef } from "react";

const PLAN_DATA = {
    3: {
        personalSilver: {
            name: "👑 Transformation Plan",
            sell: 299,
            base: 597,
            perMonth: 100,
            link: "https://buy.stripe.com/14AeVddte7eM4ptcs05c413",
            badge: "🏆 Most Popular",
            featured: true,
            features: [
                "📞 3 weekly follow-up",
                "👩‍⚕️ Personal Dietitian",
                "📋 Personalized Diet Plan",
                "📞 Call & Chat Support",
                "🥗 Community Diet Plan",
                "📺 Weekly Live with Sumit",
                "🎙️ Sumit's Voice Notes",
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
            sell: 499,
            base: 897,
            perMonth: 166,
            link: "https://buy.stripe.com/dRmfZh60M56EbRVajS5c414",
            badge: "⚡ Fastest Results",
            features: [
                "📞 Consultation with Sumit: 1",
                "🧘 1-on-1 Yoga Sessions: 12/month",
                "⚙️ Maintenance Plan",
                "📞 3 weekly follow-up",
                "👩‍⚕️ Personal Dietitian",
                "📋 Personalized Diet Plan",
                "📞 Call & Chat Support",
                "🥗 Community Diet Plan",
                "📺 Weekly Live with Sumit",
                "🎙️ Sumit's Voice Notes",
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
        personalSilver: {
            name: "👑 Transformation Plan",
            sell: 499,
            base: 1194,
            perMonth: 83,
            link: "https://buy.stripe.com/4gM6oHexibv2f47gIg5c415",
            badge: "🏆 Most Popular",
            featured: true,
            features: [
                "📞 1 weekly follow-up",
                "👩‍⚕️ Personal Dietitian",
                "📋 Personalized Diet Plan",
                "📞 Call & Chat Support",
                "🥗 Community Diet Plan",
                "📺 Weekly Live with Sumit",
                "🎙️ Sumit's Voice Notes",
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
            sell: 899,
            base: 1794,
            perMonth: 150,
            link: "https://buy.stripe.com/aFa14n3SE9mUbRVbnW5c416",
            badge: "⚡ Fastest Results",
            features: [
                "📞 Consultation with Sumit: 3",
                "🧘 1-on-1 Yoga Sessions: 12/month",
                "⚙️ Maintenance Plan",
                "📞 3 weekly follow-up",
                "👩‍⚕️ Personal Dietitian",
                "📋 Personalized Diet Plan",
                "📞 Call & Chat Support",
                "🥗 Community Diet Plan",
                "📺 Weekly Live with Sumit",
                "🎙️ Sumit's Voice Notes",
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

const BASE_COMPARE_ROWS = [
    { feature: "Consultation with Sumit", group: false, silverKey: "consultation", goldKey: "consultation" },
    { feature: "1-on-1 Yoga Sessions /month", group: false, silverKey: "yoga", goldKey: "yoga" },
    { feature: "Maintenance Plan", group: false, silver: false, gold: true },
    { feature: "Weekly Follow-ups", group: false, silverKey: "followups", goldKey: "followups" },
    { feature: "Personal Dietitian", group: false, silver: true, gold: true },
    { feature: "Personalized Diet Plan", group: false, silver: true, gold: true },
    { feature: "Call & Chat Support", group: false, silver: true, gold: true },
    { feature: "Community Diet Plan", group: true, silver: true, gold: true },
    { feature: "Weekly Live with Sumit", group: true, silver: true, gold: true },
    { feature: "Sumit's Voice Notes", group: true, silver: true, gold: true },
    { feature: "Ai chat support", group: true, silver: true, gold: true },
    { feature: "Daily Reminders", group: true, silver: true, gold: true },
    { feature: "Live Yoga Classes", group: true, silver: true, gold: true },
    { feature: "Class Recordings", group: true, silver: true, gold: true },
    { feature: "Weight Tracker", group: true, silver: true, gold: true },
    { feature: "Habit Tracker", group: true, silver: true, gold: true },
];

function getCompareRows(duration: number) {
    const silver = PLAN_DATA[duration].personalSilver.features;
    const gold = PLAN_DATA[duration].personalGold.features;

    const extractCount = (features: string[], keyword: string): number => {
        const match = features.find(f => f.toLowerCase().includes(keyword.toLowerCase()));
        if (!match) return 0;
        // Match "X weekly follow-up" style (number before keyword)
        const numBefore = match.match(/(\d+)\s+\w+\s+follow/i);
        if (numBefore) return parseInt(numBefore[1]);
        // Match ": X" or "X/month" style
        const numAfter = match.match(/:\s*(\d+)/) || match.match(/(\d+)\/month/);
        return numAfter ? parseInt(numAfter[1]) : 0;
    };

    const silverConsultation = extractCount(silver, "Consultation with Sumit:");
    const goldConsultation = extractCount(gold, "Consultation with Sumit:");
    const silverFollowups = extractCount(silver, "weekly follow-up");
    const goldFollowups = extractCount(gold, "weekly follow-up");
    const silverYoga = extractCount(silver, "1-on-1 Yoga Sessions");
    const goldYoga = extractCount(gold, "1-on-1 Yoga Sessions");

    return BASE_COMPARE_ROWS.map(row => {
        if (row.silverKey === "consultation") return { ...row, silver: silverConsultation, gold: goldConsultation };
        if (row.silverKey === "followups") return { ...row, silver: silverFollowups, gold: goldFollowups };
        if (row.silverKey === "yoga") return { ...row, silver: silverYoga, gold: goldYoga };
        return row;
    });
}


// ── HELPERS ───────────────────────────────────────────────────────────────────
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

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function TimerStrip({ timeLeft, urgent, endDate }: { timeLeft: number; urgent: boolean; endDate: Date | null }) {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    // Format: "July 19 · 11:59 PM CDT"
    const endLabel = endDate
        ? endDate.toLocaleString("en-US", {
            timeZone: "America/Chicago",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZoneName: "short",
        })
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

            {/* Countdown digits */}
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


function DurationToggle({ currentDuration, onSelect }) {
    return (
        <div style={{
            display: "inline-flex",
            background: "#f0f0f0",
            borderRadius: 50,
            padding: 4,
            marginBottom: 20,
        }}>
            {[3, 6].map((months) => {
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
                        {months === 6 && (
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

function PlanCard({ planKey, planData, duration, expired }: { planKey: string; planData: typeof PLAN_DATA[3]["personalSilver"]; duration: number; expired: boolean }) {
    const { ref, visible } = useFadeUp();
    const [showAll, setShowAll] = useState(false);
    const saving = planData.base - planData.sell;
    const isVIP = planKey === "personalGold";

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
                    <div style={{ fontSize: 11, color: "#666", textDecoration: "line-through" }}>${fmt(planData.base)}</div>
                    <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, fontWeight: 800, color: planData.featured ? "#c07000" : "#1a7a4a", lineHeight: 1 }}>
                        ${fmt(planData.sell)}
                    </div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>${fmt(planData.perMonth)}/month</div>
                </div>
                <div style={{ background: "#ffeaea", color: "#d93025", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 20 }}>
                    Save ${fmt(saving)}!
                </div>
            </div>

            <div style={{ marginBottom: planData.featured ? 3 : 6 }}>
                {(showAll ? planData.features : planData.features.slice(0, planData.featured ? 8 : 8)).map((feature) => (
                    <div key={feature} style={{ fontSize: 12, color: "#333", marginBottom: planData.featured ? 5 : 5, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#1a7a4a", fontSize: 13 }}>✓</span>
                        <span>{feature}</span>
                    </div>
                ))}
                {planData.features.length > (planData.featured ? 8 : 5) && (
                    <div
                        onClick={() => setShowAll(!showAll)}
                        style={{ fontSize: 12, color: "#1a7a4a", marginTop: 4, cursor: "pointer", fontWeight: 700 }}
                    >
                        {showAll ? "▲ Show less" : `+ ${planData.features.length - (planData.featured ? 8 : 8)} more features ▼`}
                    </div>
                )}
            </div>

            {expired ? (
                <div
                    style={{
                        display: "block",
                        width: "100%",
                        background: "#d0d0d0",
                        color: "#888",
                        borderRadius: 50,
                        padding: 13,
                        fontFamily: "'Baloo 2', cursive",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "not-allowed",
                        textAlign: "center",
                        boxSizing: "border-box" as const,
                        userSelect: "none",
                    }}
                >
                    🚫 Offer Expired
                </div>
            ) : (
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
            )}
            <div style={{ textAlign: "center", fontSize: 12, color: "#666", marginTop: 8 }}>🔒 Secure checkout · Instant access</div>
        </div>
    );
}

function CompareTable({ duration }: { duration: number }) {
    const { ref, visible } = useFadeUp();
    const rows = getCompareRows(duration);
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
                        <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 18, textAlign: "center", color: "#d97706" }}>Transformation</th>
                        <th style={{ padding: "8px 4px", fontWeight: 800, fontSize: 18, textAlign: "center", color: "#e65100" }}>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ feature, silver, gold }, i) => (
                        <tr key={feature} style={{ background: i % 2 === 0 ? "#f9fdf9" : "white" }}>
                            <td style={{ padding: "11px 4px", fontWeight: 700, fontSize: 12, color: "#1a1a2e", borderBottom: "1px solid #f0f0f0" }}>{feature}</td>
                            <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                                <span style={{ color: silver ? "#1a7a4a" : "#ddd", fontSize: typeof silver === "number" ? 13 : 18 }}>{typeof silver === "number" ? (silver === 0 ? "✗" : `${silver}x`) : silver ? "✓" : "✗"}</span>
                            </td>
                            <td style={{ padding: "11px 4px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                                <span style={{ color: gold ? "#1a7a4a" : "#ddd", fontSize: typeof gold === "number" ? 13 : 18 }}>{typeof gold === "number" ? (gold === 0 ? "✗" : `${gold}x`) : gold ? "✓" : "✗"}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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


    const getTargetDate = () => {
        return new Date("2026-07-19T23:59:59-05:00");
    };


    const getTimeUntilSunday = () => {
        const now = new Date();
        const targetDate = getTargetDate();
        return Math.floor((targetDate.getTime() - now.getTime()) / 1000);
    };


    const [endDate] = useState(getTargetDate);
    const [timeLeft, setTimeLeft] = useState(getTimeUntilSunday());
    const [expired, setExpired] = useState(false);
    const [currentDuration, setCurrentDuration] = useState(3);
    const [activeCard, setActiveCard] = useState(0);
    const cardsScrollRef = useRef<HTMLDivElement>(null);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) { setExpired(true); return; }
        const id = setInterval(() => setTimeLeft((t) => { if (t <= 1) { setExpired(true); return 0; } return t - 1; }), 1000);
        return () => clearInterval(id);
    }, [timeLeft]);

    const urgent = timeLeft <= 300;
    const plans = PLAN_DATA[currentDuration];

    // Reset scroll and active card when duration changes
    useEffect(() => {
        setActiveCard(0);
        if (cardsScrollRef.current) {
            cardsScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, [currentDuration]);

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

                <TimerStrip timeLeft={timeLeft} urgent={urgent} endDate={endDate} />

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
                            <PlanCard key={`silver-${currentDuration}`} planKey="personalSilver" planData={plans.personalSilver} duration={currentDuration} expired={expired} />
                            <PlanCard key={`gold-${currentDuration}`} planKey="personalGold" planData={plans.personalGold} duration={currentDuration} expired={expired} />
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
                    <CompareTable duration={currentDuration} />
                </section>

                <ExpiredOverlay show={expired} />
            </div>
        </>
    );
}
