import React, { useEffect, useRef, useState } from "react";
import "../styles/Loseweightwithvaishnavi.css";
import vaishnaviImg from "../assets/vaishnavi.jpeg";
import vaishnaviPoster from "../assets/vaishnaviposter.jpeg";
import svasthaLogo from "../assets/svastha.png";

// Custom scrollable dropdown for step forms
const ScrollSelect: React.FC<{
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
}> = ({ name, value, placeholder, options, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="scroll-select-wrap" ref={ref}>
      <div
        className={`scroll-select-trigger underline-input${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        style={{ color: value ? "#333" : "#aaa", cursor: "pointer", userSelect: "none" }}
      >
        <span>{value || placeholder}</span>
        <span className="scroll-select-arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="scroll-select-list">
          {options.map((opt) => (
            <div
              key={opt}
              className={`scroll-select-option${value === opt ? " selected" : ""}`}
              onClick={() => { onChange(name, opt); setOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [modalStep, setModalStep] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const [formData, setFormData] = useState({
    name: "", age: "", phone: "", countryCode: "+91", city: "", gender: "", weight: "",
    weightLossReason: "",
    healthCondition: "",
    healthConditionOther: "",
    pastAttempts: "",
    weightGainCause: "",
    profession: "",
    busyness: "",
    paidPlans: "",
    languages: [] as string[],
    preferredDate: "",
    preferredTime: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const WEIGHT_LOSS_REASONS = [
    "Improve physical appearance",
    "Become healthier",
    "Feel better day to day",
  ];

  const HEALTH_CONDITIONS = [
    "None",
    "Thyroid (Hypo/Hyper)",
    "Fatty Liver",
    "PCOS / PCOD",
    "Type 2 Diabetes",
    "High Blood Pressure",
    "Hormonal Imbalance",
    "Other",
  ];

  const PAST_ATTEMPTS = [
    "Never tried to lose weight earlier",
    "Paid diet plans",
    "Gym membership",
    "Slimming pills / Meal replacement kits / Shakes",
    "Green tea",
    "Yoga / Dance / Aerobics",
    "Others",
  ];

  const WEIGHT_GAIN_CAUSES = [
    "Busy work",
    "Covid-lockdown",
    "Pregnancy",
    "Health conditions (PCOD / Thyroid etc.)",
    "Unhealthy eating habits",
    "Lack of physical activity",
    "Stress / Emotional eating",
    "Others",
  ];

  const PROFESSIONS = [
    "Student (School/College)",
    "Early Career Professional (0–3 years experience)",
    "Mid-Level Professional (3–8 years experience)",
    "Senior Professional/Manager (8+ years experience)",
    "Business Owner / Entrepreneur",
    "Homemaker / Stay-at-home parent",
    "Retired",
    "Self-Employed / Freelancer",
  ];

  const BUSYNESS_OPTIONS = [
    "I barely have any time for myself",
    "I am busy but try to reserve some time each day to relax",
    "I am not too busy and keep some time for different things",
    "My schedule is fairly open & flexible",
  ];

  const LANGUAGES = ["Hindi", "English"];

  const TIME_SLOTS = (() => {
    const slots: string[] = [];
    for (let h = 10; h <= 19; h++) {
      for (const m of [0, 30]) {
        if (h === 19 && m === 30) break;
        const hour12 = h > 12 ? h - 12 : h;
        const ampm = h < 12 ? "AM" : "PM";
        const label = `${hour12}:${m === 0 ? "00" : "30"} ${ampm}`;
        slots.push(label);
      }
    }
    return slots;
  })();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => {
      const current = prev.languages;
      if (current.includes(lang)) return { ...prev, languages: current.filter((l) => l !== lang) };
      if (current.length >= 2) return prev; // max 2
      return { ...prev, languages: [...current, lang] };
    });
    if (formErrors.languages) setFormErrors((prev) => ({ ...prev, languages: "" }));
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (formData.countryCode === "+91") {
      if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, "")))
        errors.phone = "Enter a valid 10-digit Indian WhatsApp number";
    } else {
      if (!/^\d{5,15}$/.test(formData.phone.replace(/\s/g, "")))
        errors.phone = "Enter a valid WhatsApp number";
    }
    if (!formData.age.trim() || Number.isNaN(Number(formData.age)) || Number(formData.age) <= 0)
      errors.age = "Enter a valid age";
    if (!formData.gender) errors.gender = "Please select gender";
    return errors;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.weightLossReason) errors.weightLossReason = "Please select a reason";
    if (!formData.healthCondition) errors.healthCondition = "Please select an option";
    return errors;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!formData.pastAttempts) errors.pastAttempts = "Please select an option";
    if (!formData.weightGainCause) errors.weightGainCause = "Please select an option";
    return errors;
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!formData.profession) errors.profession = "Please select an option";
    if (!formData.busyness) errors.busyness = "Please select an option";
    return errors;
  };

  const validateStep5 = () => {
    const errors: Record<string, string> = {};
    if (!formData.paidPlans) errors.paidPlans = "Please select an option";
    return errors;
  };

  const validateStep6 = () => {
    const errors: Record<string, string> = {};
    if (!formData.preferredDate) errors.preferredDate = "Please select a date";
    if (!formData.preferredTime) errors.preferredTime = "Please select a time";
    if (formData.languages.length === 0) errors.languages = "Please select at least 1 language";
    return errors;
  };

  const WEBHOOK_URL = "https://campaigns.svastha.fit/wp-json/uap/v2/uap-203-204";

  const submitToWebhook = async (data: typeof formData) => {
    const payload = {
      name: data.name,
      phone: `${data.countryCode.replace("+", "")}${data.phone}`,
      whatsapp: `${data.countryCode}${data.phone}`,
      age: data.age,
      city: data.city,
      gender: data.gender,
      weight: data.weight,
      weightLossReason: data.weightLossReason,
      healthCondition: data.healthCondition === "Other" ? `Other: ${data.healthConditionOther}` : data.healthCondition,
      pastAttempts: data.pastAttempts,
      weightGainCause: data.weightGainCause,
      profession: data.profession,
      busyness: data.busyness,
      paidPlans: data.paidPlans,
      preferredDate: data.preferredDate ? (() => { const [y, m, d] = data.preferredDate.split("-"); return `${d}-${m}-${y}`; })() : "",
      preferredTime: data.preferredTime,
      languages: data.languages.join(", "),
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Webhook error:", err);
    }
  };

  const handleStep1Next = (onNext: () => void) => {
    const errors = validateStep1();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    onNext();
  };

  const handleStep2Next = (onNext: () => void) => {
    const errors = validateStep2();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    onNext();
  };

  const handleStep3Next = (onNext: () => void) => {
    const errors = validateStep3();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    onNext();
  };

  const handleStep4Next = (onNext: () => void) => {
    const errors = validateStep4();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    onNext();
  };

  const handleStep5Next = (onNext: () => void) => {
    const errors = validateStep5();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    onNext();
  };

  const handleStep2Submit = async (onSuccess: () => void) => {
    const errors = validateStep6();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setIsSubmitting(true);
    await submitToWebhook(formData);
    setIsSubmitting(false);
    onSuccess();
  };

  // FAQ toggle
  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setModalSuccess(false);
      setModalStep(1);
    }, 350);
  };

  const toggleFAQ = (index: number) => {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item, i) => {
      if (i === index) item.classList.toggle("open");
      else item.classList.remove("open");
    });
  };

  useEffect(() => {
    // scroll animation (same as HTML)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".feature-card, .pain-card, .step-card, .faq-item")
      .forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateY(24px)";
        element.style.transition = "0.5s";
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Show sticky bar when pain section is visible
    const handleScroll = () => {
      const painSection = document.querySelector('.pain-section');
      if (painSection) {
        const rect = painSection.getBoundingClientRect();
        setShowStickyBar(rect.top < window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="vaishnavi-page">
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          Svas<span>tha</span>
        </div>
        <button className="nav-cta" onClick={() => setModalOpen(true)}>
          Book Free Consultation
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo-wrap">
            <img src={svasthaLogo} alt="Svastha" className="hero-logo" />
            <span className="hero-logo-text">Svastha</span>
          </div>
          <div className="hero-tag">
            Weight Loss & Metabolic Health Expert
          </div>

          <h1>
            Finally <em>Lose Weight</em> That Stays Off — Without the Gym or
            Starving
          </h1>

          <div className="hero-poster">
            <img src={vaishnaviPoster} alt="Vaishnavi Poster" style={{ width: "100%", maxHeight: "500px", objectFit: "cover", display: "block", borderRadius: "12px", margin: "75px 0 16px" }} />
          </div>

          <p className="hero-sub">
            Vaishnavi lost 20 kg with home-cooked Indian food alone. Now she
            helps people with PCOS, thyroid, diabetes, high BP & more shed weight
            and reclaim their health — naturally.
          </p>

          <ul className="hero-checks">
            <li>Lose weight even with thyroid, PCOS, or diabetes</li>
            <li>No gym, no crash diets — eat your roti, dal & sabzi</li>
            <li>Personalized plan built for your body & conditions</li>
            <li>1-on-1 guidance from someone who's walked this path</li>
          </ul>

          <div className="hero-cta-group">
            <button
              className="btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Book Your Free Consultation →
            </button>
            <p className="urgency-note" style={{ marginTop: "10px", marginBottom: "75px" }}>
              <strong>Only 8 spots left</strong> for April intake — Limited
              availability
            </p>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="hero-visual">
          <div className="floating-badge">
            🌿 Trusted
            <br />
            Approach
          </div>

          <div className="dietitian-card">
            <div className="dietitian-avatar">
              <img src={vaishnaviImg} alt="Vaishnavi" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            </div>
            <div className="dietitian-name">Vaishnavi</div>
            <div className="dietitian-title">
              Certified Dietitian · Weight Loss & Metabolic Health
            </div>

            <div className="stat-row">
              <div className="stat-box">
                <div className="num">20kg</div>
                <div className="label">Lost by Vaishnavi herself</div>
              </div>
              <div className="stat-box">
                <div className="num">6</div>
                <div className="label">Conditions she specialises in</div>
              </div>
              <div className="stat-box">
                <div className="num">0</div>
                <div className="label">Supplements or pills</div>
              </div>
              <div className="stat-box">
                <div className="num">1-on-1</div>
                <div className="label">Personal coaching</div>
              </div>
            </div>

            <div className="story-badge">
              She didn't just study it — she lived it. Vaishnavi lost 20 kg and
              reversed her PCOS eating Indian home food.
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar" style={{ marginBottom: "75px" }}>
        <div className="trust-item">🇮🇳 India-based, India-focused food plans</div>
        <div className="trust-item">🔬 Works with thyroid, diabetes, PCOS & more</div>
        <div className="trust-item">🕊️ Zero supplements, zero pills</div>
        <div className="trust-item">🤝 Personal 1-on-1 with Vaishnavi</div>
      </div>
      {/* PAIN SECTION */}
      <section className="pain-section">
        <div className="pain-header">
          <div className="section-label">YOU'RE NOT ALONE</div>
          <h2 className="section-title">Sound Familiar?</h2>
          <p className="section-sub">
            Millions of Indians are trying hard to lose weight but getting nowhere —
            because their health conditions are working against them. Here's what we
            hear every day:
          </p>

          <div className="conditions-banner">
            <div className="conditions-label">VAISHNAVI SPECIALISES IN WEIGHT LOSS FOR PEOPLE WITH:</div>
            <div className="conditions-pills">
              <span className="cond-pill">🔵 PCOS / PCOD</span>
              <span className="cond-pill">🟣 Thyroid (Hypo & Hyper)</span>
              <span className="cond-pill">🔴 Type 2 Diabetes</span>
              <span className="cond-pill">🟠 High Blood Pressure</span>
              <span className="cond-pill">🟡 Fatty Liver</span>
              <span className="cond-pill">🟢 Hormonal Imbalance</span>
            </div>
          </div>
        </div>

        <div className="pain-grid">
          <div className="pain-cards">
            <div className="pain-card">
              <span className="pain-emoji">😩</span>
              <div className="pain-card-content">
                <h3>"I'm eating healthy but the weight won't move"</h3>
                <p>When thyroid or insulin resistance is involved, generic "healthy eating" doesn't work. You need a plan designed for your metabolism.</p>
              </div>
            </div>
            <div className="pain-card">
              <span className="pain-emoji">💊</span>
              <div className="pain-card-content">
                <h3>"My doctor only gives me medicine — nothing about food"</h3>
                <p>Medication manages symptoms. The right nutrition actually addresses root causes — and helps the weight come off in the process.</p>
              </div>
            </div>
            <div className="pain-card">
              <span className="pain-emoji">🏋️</span>
              <div className="pain-card-content">
                <h3>"I'm working out but gaining weight instead of losing"</h3>
                <p>With hormonal conditions, over-exercising spikes cortisol and makes things worse. Smarter eating beats harder training every time.</p>
              </div>
            </div>
            <div className="pain-card">
              <span className="pain-emoji">😔</span>
              <div className="pain-card-content">
                <h3>"Every plan I try works for others, not for me"</h3>
                <p>Because those plans weren't built for your body. What works for a healthy person won't work when your hormones or blood sugar are off.</p>
              </div>
            </div>
          </div>

          <div className="solution-box">
            <h3>What actually works when you have a health condition?</h3>
            <p className="solution-intro">
              Vaishnavi figured this out by healing her own body — and has since
              helped people with thyroid, diabetes, BP, fatty liver & PCOS lose real
              weight. The secret isn't more restriction. It's smarter nutrition built for your
              condition.
            </p>
            <ul className="solution-points">
              <li>→ Condition-specific Indian meal planning</li>
              <li>→ Blood sugar & insulin management through food</li>
              <li>→ Anti-inflammatory eating from your own kitchen</li>
              <li>→ Hormonal balance without medication dependence</li>
              <li>→ Sustainable habits — not another 30-day reset</li>
            </ul>
          </div>
        </div>
        <div style={{ marginBottom: "75px" }} />
      </section>

      {/* VAISHNAVI'S STORY SECTION */}
      <section className="about-section" style={{ marginTop: "75px" }}>
        <div className="section-label">Meet your guide</div>
        <h2 className="section-title">Vaishnavi's Story</h2>
        <p className="section-sub">
          She didn't become an expert from reading textbooks. She became one by
          healing her own body — and understanding what it really takes to lose
          weight when your health is fighting you.
        </p>

        <div className="about-grid">
          <div className="about-image-wrap">
            <div className="about-main-card">
              <img src={vaishnaviImg} alt="Vaishnavi" className="about-avatar-large" style={{ borderRadius: '50%', objectFit: 'cover', width: '120px', height: '120px', marginTop: '24px' }} />
              <div className="dietitian-name">Vaishnavi</div>
              <div className="dietitian-title">Certified Dietitian · Weight Loss & Metabolic Health Coach</div>
              <div className="about-quote">
                "The weight isn't the problem. Your body's signals are. Fix those, and everything changes."
              </div>
              <div className="achievement-strip">
                <div className="ach-pill">🎓 Certified Dietitian</div>
                <div className="ach-pill">💪 20kg Lost</div>
                <div className="ach-pill">🌿 Metabolic Expert</div>
              </div>
            </div>
          </div>

          <div className="about-content">
            <p style={{ color: 'var(--mid)', lineHeight: '1.8', marginBottom: '28px' }}>
              Vaishnavi was diagnosed with PCOS in her early 20s — struggling with irregular
              cycles, unexplained weight gain, fatigue, and a body that felt like it was working
              against her. Doctors prescribed medication. The internet prescribed confusion.
            </p>
            <p style={{ color: 'var(--mid)', lineHeight: '1.8', marginBottom: '32px' }}>
              Instead of accepting it as a lifelong condition, she went deep into nutrition
              science and applied it to herself. The result: 20 kg lost, PCOS reversed, and
              hormones balanced — all through food and lifestyle. She now applies the same
              deep understanding of metabolic health to help people struggling with thyroid
              issues, type 2 diabetes, high blood pressure, fatty liver, and hormonal
              imbalances lose weight and feel like themselves again.
            </p>
            <ul className="timeline">
              <li>
                <h4>Diagnosed with PCOS</h4>
                <p>Irregular cycles, unexplained weight gain, fatigue — the classic PCOS spiral.</p>
              </li>
              <li>
                <h4>Studied nutrition & hormonal health deeply</h4>
                <p>Certified as a dietitian; combined clinical knowledge with lived experience.</p>
              </li>
              <li>
                <h4>Reversed her PCOS & lost 20 kg naturally</h4>
                <p>No supplements, no pills, no starvation — using Indian food, smart nutrition, and lifestyle shifts.</p>
              </li>
              <li>
                <h4>Founded Svastha to help others do the same</h4>
                <p>Now helping women across India reclaim their health, one consultation at a time.</p>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginBottom: "100px" }} />
      </section>

      {/* WHAT YOU GET SECTION */}
      <section className="what-you-get">
        <div className="section-label">What's included</div>
        <h2 className="section-title">Your Complete Svastha Program</h2>
        <p className="section-sub">
          Everything you need to lose weight sustainably — built around your body, your conditions, your food, your life.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🩺</span>
            <h3>Condition-Aware Health Assessment</h3>
            <p>A deep review of your symptoms, hormones, blood sugar, thyroid levels, and lifestyle — before a single meal is planned.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🍱</span>
            <h3>Personalized Indian Meal Plan</h3>
            <p>Your plan is built around dals, sabzis, rotis and the foods you actually love and can cook at home.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Weekly Plan Adjustments</h3>
            <p>Your plan evolves with you. Vaishnavi reviews your progress weekly and adapts accordingly.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📞</span>
            <h3>Direct 1-on-1 with Vaishnavi</h3>
            <p>You talk directly to Vaishnavi — not an assistant, not a bot. Real guidance from someone who's been there.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌙</span>
            <h3>Metabolic & Hormonal Balancing</h3>
            <p>Nutrition strategies that address the root cause of your weight gain — whether it's thyroid, insulin, cortisol, or hormonal imbalance.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3>WhatsApp Support</h3>
            <p>Got a question between sessions? Reached for the wrong snack? Just message. Vaishnavi's got you.</p>
          </div>
        </div>
        <div style={{ marginBottom: "100px" }} />
      </section>

      {/* CONDITIONS REVERSAL SECTION */}
      <section className="reversal-section">
        <div className="section-label">The bonus you didn't expect</div>
        <h2 className="section-title">Lose Weight. And Watch These Change Too.</h2>
        <p className="section-sub">
          Most clients come to Vaishnavi to lose weight. What they don't expect is what happens to their health conditions along the way.
        </p>

        <div className="reversal-grid">
          <div className="reversal-card">
            <div className="reversal-icon">🔵</div>
            <h4>PCOS / PCOD</h4>
            <p>Cycles regularise. Cysts reduce. Energy returns. Many clients see their PCOS markers improve significantly within 3–4 months.</p>
          </div>
          <div className="reversal-card">
            <div className="reversal-icon">🟣</div>
            <h4>Thyroid (Hypo & Hyper)</h4>
            <p>The right foods reduce inflammation and support thyroid function — making the medication work better and weight loss possible again.</p>
          </div>
          <div className="reversal-card">
            <div className="reversal-icon">🔴</div>
            <h4>Type 2 Diabetes</h4>
            <p>Blood sugar levels stabilise. Insulin sensitivity improves. Many clients reduce dependence on medication under their doctor's supervision.</p>
          </div>
          <div className="reversal-card">
            <div className="reversal-icon">🟠</div>
            <h4>High Blood Pressure</h4>
            <p>A low-sodium, anti-inflammatory Indian diet directly supports healthy BP — often improving readings within weeks of starting the program.</p>
          </div>
          <div className="reversal-card">
            <div className="reversal-icon">🟡</div>
            <h4>Fatty Liver</h4>
            <p>Liver health responds powerfully to the right nutrition. Reduced fat intake and anti-inflammatory foods help reverse early-stage fatty liver.</p>
          </div>
          <div className="reversal-card">
            <div className="reversal-icon">🟢</div>
            <h4>Hormonal Imbalance</h4>
            <p>Food directly impacts oestrogen, cortisol, insulin and more. Balanced hormones make weight loss feel effortless — not impossible.</p>
          </div>
        </div>

        <div className="reversal-disclaimer">
          ⚠️ Results vary by individual. Vaishnavi's nutritional guidance complements — and does not replace — medical treatment from your doctor.
        </div>
        <div style={{ marginBottom: "100px" }} />
      </section>

      {/* COMPARISON SECTION */}
      <section className="compare-section">
        <div className="section-label">Why Svastha</div>
        <h2 className="section-title">How We're Different</h2>
        <p className="section-sub">
          Not all dietitians understand PCOS. Not all PCOS coaches are dietitians. Vaishnavi is both — and she's lived it.
        </p>

        <div className="compare-table">
          <div className="compare-head">
            <span>Feature</span>
            <span>Svastha (Vaishnavi)</span>
            <span>Generic Dietitians</span>
            <span>Instagram Coaches</span>
          </div>
          <div className="compare-row">
            <span>PCOS-specific nutrition expertise</span>
            <span className="yes">✓ Deep specialist knowledge</span>
            <span className="maybe">⚡ Sometimes</span>
            <span className="no">✗ Rarely verified</span>
          </div>
          <div className="compare-row">
            <span>Indian food & home-cooked meals</span>
            <span className="yes">✓ Built around Indian cuisine</span>
            <span className="maybe">⚡ Generic plans</span>
            <span className="no">✗ Western-focused</span>
          </div>
          <div className="compare-row">
            <span>Direct 1-on-1 access</span>
            <span className="yes">✓ Always Vaishnavi, no juniors</span>
            <span className="no">✗ Often assistants</span>
            <span className="maybe">⚡ Group sessions mostly</span>
          </div>
          <div className="compare-row">
            <span>Personally reversed PCOS</span>
            <span className="yes">✓ 20kg lost, PCOS reversed</span>
            <span className="no">✗ Textbook only</span>
            <span className="no">✗ Unverified claims</span>
          </div>
          <div className="compare-row">
            <span>Cycle-synced eating</span>
            <span className="yes">✓ Core of the program</span>
            <span className="no">✗ Not included</span>
            <span className="maybe">⚡ Surface level</span>
          </div>
          <div className="compare-row">
            <span>Zero supplements pushed</span>
            <span className="yes">✓ 100% food-first approach</span>
            <span className="maybe">⚡ Sometimes</span>
            <span className="no">✗ Often product upsells</span>
          </div>
        </div>
        <div style={{ marginBottom: "75px" }} />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="process-section">
        <div className="section-label">The process</div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">
          Simple, structured, and designed for real life — not a perfect routine.
        </p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">📋</div>
            <div className="step-num">01</div>
            <h4>Free Consultation Call</h4>
            <p>Tell Vaishnavi about your health, goals, symptoms, and lifestyle. No judgment — just understanding.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🧬</div>
            <div className="step-num">02</div>
            <h4>Your Metabolic Deep Dive</h4>
            <p>A full review of your health conditions, hormones, and eating patterns. Your plan gets built from scratch — for your body specifically.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🍽️</div>
            <div className="step-num">03</div>
            <h4>Start Eating Smarter</h4>
            <p>Receive your personalized Indian meal plan. Begin eating for your hormones — not against them.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">📈</div>
            <div className="step-num">04</div>
            <h4>Track, Adjust, Succeed</h4>
            <p>Weekly check-ins with Vaishnavi, plan updates as you progress, and real visible results over time.</p>
          </div>
        </div>
        <div style={{ marginBottom: "100px" }} />
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-label">Questions</div>
        <h2 className="section-title">Frequently Asked</h2>

        <div className="faq-grid">
          <div className="faq-item">
            <div className="faq-q" onClick={() => toggleFAQ(0)}>
              I have thyroid / diabetes / high BP. Can this still work for me?
            </div>
            <div className="faq-a">
              Yes — this is exactly who Vaishnavi works with. Her expertise is in weight loss for people with metabolic and hormonal conditions. Generic plans fail because they don't account for your body's specific challenges. Vaishnavi's approach is built around them.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-q" onClick={() => toggleFAQ(1)}>
              Will I have to stop eating Indian food?
            </div>
            <div className="faq-a">
              The opposite — the program is built around Indian home food. Roti, dal, sabzi, rice, curd. Vaishnavi believes in food as medicine, not food as punishment.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-q" onClick={() => toggleFAQ(2)}>
              Do I need to buy supplements or powders?
            </div>
            <div className="faq-a">
              Never. Svastha is 100% food-first. Vaishnavi doesn't sell or recommend any supplements — your results come from what's already in your kitchen.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-q" onClick={() => toggleFAQ(3)}>
              I have a very busy schedule. Will this work for me?
            </div>
            <div className="faq-a">
              Absolutely. Plans are designed for real Indian households — quick meals, manageable habits, and no need for hours in the gym. Busy women and working professionals are exactly who this is built for.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-q" onClick={() => toggleFAQ(4)}>
              How long before I see results?
            </div>
            <div className="faq-a">
              Most clients notice energy improvements within 2–3 weeks. Visible weight loss typically starts by week 4–6. Conditions like thyroid or diabetes may see improved markers within 8–12 weeks, depending on your starting point.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-q" onClick={() => toggleFAQ(5)}>
              I'm already on medication. Is this safe?
            </div>
            <div className="faq-a">
              Yes. Vaishnavi's nutritional guidance complements your medical treatment — it never replaces it. Many clients find their medications work better once their nutrition supports their body's needs. Always continue treatment as advised by your doctor.
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "100px" }} />
      </section>

      {/* CTA SECTION */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-left" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <div className="form-label">FREE CONSULTATION</div>
            <h2 className="form-heading">Ready to Start Your Healing Journey?</h2>
            <p className="form-description">
              Book a free 20-minute call with Vaishnavi. Tell her your story. See if this is
              right for you — zero pressure.
            </p>
            <ul className="form-benefits">
              <li>100% free — no credit card, no commitment</li>
              <li>You'll speak directly with Vaishnavi</li>
              <li>Personalized advice even in the free call</li>
              <li>Only 8 April spots remaining</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <strong>Svastha</strong> · Guided by Vaishnavi, Certified Dietitian · Weight Loss & Metabolic Health Coach
        <br />
        Specialising in PCOS, Thyroid, Type 2 Diabetes, High BP, Fatty Liver & Hormonal Imbalance
        <br />
        © 2025 Svastha. All rights reserved. · Results vary by individual. Nutritional guidance complements but does not replace medical treatment.
        <br />
        <a href="#consultForm" style={{ color: 'var(--sage-light)', textDecoration: 'none' }}>
          Book a Free Consultation
        </a>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div className={`modal-overlay active${modalClosing ? " closing" : ""}`} onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>

            {!modalSuccess ? (
              <div className="lead-form">
                <h3 className="form-title">Let's Get Started!</h3>

                <div className="progress-bar-container">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${(modalStep / 6) * 100}%` }}></div>
                  </div>
                </div>

                {modalStep === 1 && (
                  <div className="form-fields">
                    <div className="form-row">
                      <div className="form-group">
                        <label>YOUR NAME *</label>
                        <input type="text" name="name" placeholder="Priya Sharma" value={formData.name} onChange={handleFormChange} />
                        {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label>AGE *</label>
                        <input type="number" name="age" placeholder="28" value={formData.age} onChange={handleFormChange} />
                        {formErrors.age && <span className="form-error">{formErrors.age}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>CITY *</label>
                      <input type="text" name="city" placeholder="Jaipur, Delhi, Mumbai..." value={formData.city} onChange={handleFormChange} />
                      {formErrors.city && <span className="form-error">{formErrors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label>WHATSAPP NUMBER *</label>
                      <div className="phone-input-wrap">
                        <select
                          className="phone-country-select"
                          value={formData.countryCode}
                          onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value, phone: "" }))}
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+60">🇲🇾 +60</option>
                          <option value="+64">🇳🇿 +64</option>
                          <option value="+27">🇿🇦 +27</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+82">🇰🇷 +82</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+92">🇵🇰 +92</option>
                          <option value="+880">🇧🇩 +880</option>
                          <option value="+94">🇱🇰 +94</option>
                          <option value="+977">🇳🇵 +977</option>
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          placeholder={formData.countryCode === "+91" ? "98765 43210" : "Enter number"}
                          value={formData.phone}
                          maxLength={formData.countryCode === "+91" ? 10 : 15}
                          onChange={(e) => {
                            const limit = formData.countryCode === "+91" ? 10 : 15;
                            const digits = e.target.value.replace(/\D/g, "").slice(0, limit);
                            setFormData((prev) => ({ ...prev, phone: digits }));
                            if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: "" }));
                          }}
                        />
                      </div>
                      {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label>GENDER *</label>
                      <select name="gender" value={formData.gender} onChange={handleFormChange}>
                        <option value="">Select gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                      {formErrors.gender && <span className="form-error">{formErrors.gender}</span>}
                    </div>
                    <button className="submit-btn" onClick={() => handleStep1Next(() => setModalStep(2))}>
                      Next →
                    </button>
                  </div>
                )}

                {modalStep === 2 && (
                  <div className="form-fields step2-fields">
                    <div className="form-group underline-field">
                      <label className="step2-label">What is your current weight? (kg)</label>
                      <input type="number" name="weight" placeholder="e.g. 72" value={formData.weight} onChange={handleFormChange} className="underline-input" />
                    </div>

                    <div className="form-group underline-field">
                      <label className="step2-label">Why do you want to lose weight? <span className="req">*</span></label>
                      <ScrollSelect name="weightLossReason" value={formData.weightLossReason} placeholder="Choose an option" options={WEIGHT_LOSS_REASONS} onChange={handleSelectChange} error={formErrors.weightLossReason} />
                    </div>

                    <div className="form-group underline-field">
                      <label className="step2-label">Do you have any of the following health conditions? <span className="req">*</span></label>
                      <ScrollSelect name="healthCondition" value={formData.healthCondition} placeholder="Choose an option" options={HEALTH_CONDITIONS} onChange={handleSelectChange} error={formErrors.healthCondition} />
                      {formData.healthCondition === "Other" && (
                        <input type="text" name="healthConditionOther" placeholder="Please specify..." value={formData.healthConditionOther} onChange={handleFormChange} className="underline-input" style={{ marginTop: "12px" }} />
                      )}
                    </div>

                    <div className="step2-btn-row">
                      <button className="step2-btn prev" onClick={() => setModalStep(1)}>Prev</button>
                      <button className="step2-btn next" onClick={() => handleStep2Next(() => setModalStep(3))}>Next</button>
                    </div>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="form-fields step2-fields">
                    <div className="form-group underline-field">
                      <label className="step2-label">Have you attempted any of the following in the past to lose weight? <span className="req">*</span></label>
                      <ScrollSelect name="pastAttempts" value={formData.pastAttempts} placeholder="Choose an option" options={PAST_ATTEMPTS} onChange={handleSelectChange} error={formErrors.pastAttempts} />
                    </div>

                    <div className="form-group underline-field">
                      <label className="step2-label">What led to your weight gain? <span className="req">*</span></label>
                      <ScrollSelect name="weightGainCause" value={formData.weightGainCause} placeholder="Choose an option" options={WEIGHT_GAIN_CAUSES} onChange={handleSelectChange} error={formErrors.weightGainCause} />
                    </div>

                    <div className="step2-btn-row">
                      <button className="step2-btn prev" onClick={() => setModalStep(2)}>Prev</button>
                      <button className="step2-btn next" onClick={() => handleStep3Next(() => setModalStep(4))}>Next</button>
                    </div>
                  </div>
                )}

                {modalStep === 4 && (
                  <div className="form-fields step2-fields">
                    <div className="form-group underline-field">
                      <label className="step2-label">What is your current profession? <span className="req">*</span></label>
                      <ScrollSelect name="profession" value={formData.profession} placeholder="Choose an option" options={PROFESSIONS} onChange={handleSelectChange} error={formErrors.profession} />
                    </div>

                    <div className="form-group underline-field">
                      <label className="step2-label">How busy are you on an average day? <span className="req">*</span></label>
                      <ScrollSelect name="busyness" value={formData.busyness} placeholder="Choose an Option" options={BUSYNESS_OPTIONS} onChange={handleSelectChange} error={formErrors.busyness} />
                    </div>

                    <div className="step2-btn-row">
                      <button className="step2-btn prev" onClick={() => setModalStep(3)}>Prev</button>
                      <button className="step2-btn next" onClick={() => handleStep4Next(() => setModalStep(5))}>Next</button>
                    </div>
                  </div>
                )}

                {modalStep === 5 && (
                  <div className="form-fields step2-fields">
                    <div className="form-group underline-field">
                      <label className="step2-label">Are you ok with paid plans? <span className="req">*</span></label>
                      <ScrollSelect name="paidPlans" value={formData.paidPlans} placeholder="Choose an Option" options={["Yes", "No"]} onChange={handleSelectChange} error={formErrors.paidPlans} />
                    </div>

                    <div className="step2-btn-row">
                      <button className="step2-btn prev" onClick={() => setModalStep(4)}>Prev</button>
                      <button className="step2-btn next" onClick={() => handleStep5Next(() => setModalStep(6))}>Next</button>
                    </div>
                  </div>
                )}

                {modalStep === 6 && (
                  <div className="form-fields step2-fields">
                    <div className="form-group underline-field">
                      <label className="step2-label">Preferred Date for Call <span className="req">*</span></label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleFormChange}
                        className="underline-input"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {formErrors.preferredDate && <span className="form-error">{formErrors.preferredDate}</span>}
                    </div>

                    <div className="form-group underline-field">
                      <label className="step2-label">Preferred Time for Call <span className="req">*</span></label>
                      <ScrollSelect name="preferredTime" value={formData.preferredTime} placeholder="Select date and time" options={TIME_SLOTS} onChange={handleSelectChange} error={formErrors.preferredTime} />
                    </div>

                    <div className="form-group underline-field">
                      <label className="step2-label">
                        Please select the languages in which you would like to speak to your counsellor (minimum 1 language and maximum 2 languages) <span className="req">*</span>
                      </label>
                      <select
                        className="underline-input"
                        value=""
                        onChange={(e) => { if (e.target.value) toggleLanguage(e.target.value); }}
                      >
                        <option value="">Choose your Preferred Languages</option>
                        {LANGUAGES.map((lang) => (
                          <option
                            key={lang}
                            value={lang}
                            disabled={!formData.languages.includes(lang) && formData.languages.length >= 2}
                          >
                            {formData.languages.includes(lang) ? `✓ ${lang}` : lang}
                          </option>
                        ))}
                      </select>
                      {formData.languages.length > 0 && (
                        <div className="selected-langs">
                          {formData.languages.map((l) => (
                            <span key={l} className="lang-tag">
                              {l} <button type="button" onClick={() => toggleLanguage(l)}>×</button>
                            </span>
                          ))}
                        </div>
                      )}
                      {formErrors.languages && <span className="form-error">{formErrors.languages}</span>}
                    </div>

                    <button className="step2-btn next" style={{ width: "100%", padding: "16px" }} disabled={isSubmitting} onClick={() => handleStep2Submit(() => setModalSuccess(true))}>
                      {isSubmitting ? (
                        <span className="btn-spinner">
                          <span className="spinner" /> Submitting...
                        </span>
                      ) : "Book your consultation"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="success-box">
                <div className="success-icon">🌿</div>
                <h3 className="success-title">You're in! Our team  will call you soon.</h3>
                <p className="success-message">
                  Check your WhatsApp. Our team member personally reviews every submission and will reach out within 24 hours to schedule your free consultation.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR */}
      {showStickyBar && (
        <div className="sticky-bottom-bar">
          <button className="sticky-cta-btn" onClick={() => setModalOpen(true)}>
            Book Your Free Consultation →
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
