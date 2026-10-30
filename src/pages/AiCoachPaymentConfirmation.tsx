import { useEffect } from "react";
import { CheckCircle2, MessageCircle, Smartphone } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

/**
 * /reg-confirm-ai-coach — Razorpay redirects here after a successful payment
 * for the Personalized 21 Day Plan with AI Coach (pages with the
 * `plan_ai_coach` field, see src/config/personalizedOffer.ts).
 *
 * Deliberately simple: the AI Coach onboarding flow (built separately) sends
 * the next steps on WhatsApp. Update the "What happens next" text once that
 * flow is final.
 */
const AiCoachPaymentConfirmation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
      if (typeof fbq === "function") fbq("track", "Purchase", { currency: "INR", content_name: "21 Day Personalized Plan — AI Coach" });
    } catch {
      /* never block the page */
    }
  }, []);

  useMeta({
    title: "Payment received — Personalized Plan with AI Coach",
    description: "Your Personalized 21 Day Weight Loss Plan with AI Coach is confirmed.",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12">
      <div className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" strokeWidth={2} />
        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-950 md:text-4xl">
          Payment received. Welcome!
        </h1>
        <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
          Your <strong>Personalized 21 Day Weight Loss Plan with AI Coach</strong> is
          confirmed. You start today.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="flex gap-4 rounded-2xl border-2 border-emerald-100 bg-white p-5">
            <MessageCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold text-gray-950">Watch your WhatsApp</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Your next steps come to the mobile number you paid with. Please keep
                WhatsApp handy and reply to the first message so we know it reached you.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border-2 border-emerald-100 bg-white p-5">
            <Smartphone className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold text-gray-950">Keep your details ready</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Your current weight, height, any health condition (thyroid, PCOS,
                sugar, BP) and your daily routine — your plan is built from these.
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

export default AiCoachPaymentConfirmation;
