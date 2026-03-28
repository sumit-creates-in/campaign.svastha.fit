import React, { useEffect, useState } from "react";
import "../styles/Loseweightwithvaishnavi.css";

const LandingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // FAQ toggle
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

  return (
    <>
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
          <div className="hero-tag">
            Weight Loss & Metabolic Health Expert
          </div>

          <h1>
            Finally <em>Lose Weight</em> That Stays Off — Without the Gym or
            Starving
          </h1>

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
            <p className="urgency-note">
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
            <div className="dietitian-avatar">V</div>
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
      <div className="trust-bar">
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
      </section>

      {/* VAISHNAVI'S STORY SECTION */}
      <section className="about-section">
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
              <div className="about-avatar-large">V</div>
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
      </section>

      {/* FORM */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-left">
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

          <div className="form-right">
            {!formSuccess ? (
              <div className="lead-form">
                <h3 className="form-title">Book Your Free Call</h3>
                <p className="form-subtitle">Vaishnavi will personally reach out within 24 hours.</p>

                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>YOUR NAME *</label>
                      <input type="text" placeholder="Priya Sharma" />
                    </div>
                    <div className="form-group">
                      <label>AGE *</label>
                      <input type="text" placeholder="28" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>WHATSAPP NUMBER *</label>
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>

                  <div className="form-group">
                    <label>CITY *</label>
                    <input type="text" placeholder="Jaipur, Delhi, Mumbai..." />
                  </div>

                  <div className="form-group">
                    <label>PRIMARY GOAL *</label>
                    <select>
                      <option>Select your goal</option>
                      <option>Weight Loss</option>
                      <option>PCOS Management</option>
                      <option>Thyroid Management</option>
                      <option>Diabetes Control</option>
                      <option>General Health</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>HOW LONG HAVE YOU BEEN STRUGGLING WITH THIS?</label>
                    <select>
                      <option>Choose one</option>
                      <option>Less than 6 months</option>
                      <option>6 months - 1 year</option>
                      <option>1-3 years</option>
                      <option>3+ years</option>
                    </select>
                  </div>

                  <button
                    className="submit-btn"
                    onClick={() => setFormSuccess(true)}
                  >
                    Book My Free Consultation →
                  </button>

                  <p className="form-disclaimer">
                    By submitting, you agree to be contacted on WhatsApp. We respect your privacy and never
                    share your information.
                  </p>
                </div>
              </div>
            ) : (
              <div className="success-box">
                <div className="success-icon">🌿</div>
                <h3 className="success-title">You're in! Vaishnavi will call you soon.</h3>
                <p className="success-message">
                  Check your WhatsApp. Vaishnavi personally reviews every submission and will reach out within 24 hours to schedule your free consultation.
                </p>
              </div>
            )}
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
        <div
          className="modal-overlay active"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            {!modalSuccess ? (
              <>
                <h2>Book Free Consultation</h2>

                <button
                  className="submit-btn"
                  onClick={() => {
                    setModalSuccess(true);
                    setTimeout(() => {
                      setModalOpen(false);
                      setModalSuccess(false);
                    }, 3000);
                  }}
                >
                  Submit
                </button>
              </>
            ) : (
              <div className="success-box">Booked 🎉</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
