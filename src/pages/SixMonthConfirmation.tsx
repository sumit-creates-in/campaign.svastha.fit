import { useEffect } from "react";
import { CheckCircle2, MessageCircle, Smartphone } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

/**
 * /6-month-confirm — Razorpay redirects here after a successful payment for a
 * 6-month plan from /6-month-offer (Sumit's Community or Personalized; pages
 * with the plan_6m_community / plan_6m_personalized field). The team calls the
 * buyer and activates the plan in the Svastha app.
 */
const SixMonthConfirmation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
      if (typeof fbq === "function") fbq("track", "Purchase", { currency: "INR", content_name: "6 Month Plan" });
    } catch {
      /* never block the page */
    }
  }, []);

  useMeta({
    title: "Payment received — 6 Month Plan | Svastha",
    description: "Your 6 month Svastha plan is confirmed.",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12">
      <div className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" strokeWidth={2} />
        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-950 md:text-4xl">
          Payment received. Welcome!
        </h1>
        <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
          Your <strong>6 month plan</strong> is confirmed.
          Keep going with your 21 Day Challenge as usual.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="flex gap-4 rounded-2xl border-2 border-emerald-100 bg-white p-5">
            <MessageCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold text-gray-950">Our team will call you</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Within one working day (10 am – 7 pm) on the mobile number you paid
                with, to set your start date and activate your plan in the Svastha app.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border-2 border-emerald-100 bg-white p-5">
            <Smartphone className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold text-gray-950">Keep your details ready</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Your current weight, any health condition (thyroid, PCOS, sugar, BP)
                and your goal — it helps us set up your next 6 months.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Questions? WhatsApp us at{" "}
          <a href="https://wa.me/917208683034" className="font-semibold text-emerald-700 underline">
            +91 72086 83034
          </a>{" "}
          (10 am – 7 pm) or email support@svastha.fit
        </p>
      </div>
    </div>
  );
};

export default SixMonthConfirmation;
