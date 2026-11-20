import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { detectPlatform, openChat } from "@/lib/chat";
import { InstagramGlyph, MessengerGlyph } from "@/components/masterclass/ChatGlyphs";
import { US_MASTERCLASS as MASTERCLASS, US_PRICING } from "@/config/usMasterclass";

const FAQS = [
  {
    question: "Is this Master Class only for women?",
    answer:
      "Yes. This session is just for women, so the plan, the examples and the Q&A are about what women actually deal with — hormones, a metabolism that slows down after 35, cooking for the family and still losing weight.",
  },
  {
    question: "I have PCOS / thyroid / diabetes / high BP. Is this suitable for me?",
    answer:
      "Yes — women managing these conditions are a large part of who we work with. The registration form asks what you're dealing with, and that answer reaches our team before the session.\n\nTwo things to be clear about: nothing here asks you to stop or change any medication, and this is nutrition, fasting and yoga guidance rather than medical treatment. Keep taking what your doctor prescribed and keep them in the loop.",
  },
  {
    question: "Is this really live, or a recording?",
    answer: `Really live. Sumit runs the session himself on Zoom — ${MASTERCLASS.dateLabel}, ${MASTERCLASS.timeLabelLong}. The last stretch is an open Q&A where you can ask about your own situation.`,
  },
  {
    question: "What if I can't attend live?",
    answer:
      "Register anyway. The recording is shared with everyone who registers, so you can watch when it suits you — handy if you're on the West Coast. The live Q&A is the part worth showing up for, but you won't lose the content.",
  },
  {
    question: "Which language is it in?",
    answer:
      "English, with a little Hindi here and there — mostly the names of foods like dal, roti and sabzi. You'll follow it comfortably even if you don't speak Hindi.",
  },
  {
    question: "Will the diet plan work with food available in the USA & Canada?",
    answer:
      "Yes.\n\nThe plan is based on simple Indian food that is easy to find in any American grocery store or Indian store — plus how to handle the office lunch, the Costco run and eating out without undoing your week.\n\nNo expensive supplements, meal replacements or special products.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "You land straight on a confirmation page with the link to our WhatsApp group. Please join it — your Zoom link and your reminders are shared there. Stripe also emails you a receipt right away.",
  },
  {
    question: "Will you try to sell me something at the end?",
    answer:
      "Yes — and it's fair that you know beforehand. In the last few minutes Sumit explains how you can continue with our team, in a group or with your own coach. You are under no obligation. Plenty of women take the plan from the session and follow it on their own.",
  },
  {
    question: `Why charge ${US_PRICING.standard.price}?`,
    answer:
      "Because a free room fills up with people who never turn up. A small fee means everyone in the session genuinely wants to change something — which makes the Q&A sharper.",
  },
  {
    question: "I've never fasted before. Can I still join?",
    answer:
      "Yes. The session is built for beginners. Sumit starts from what fasting actually is and how to do it safely around a normal US work day — no prior experience needed.",
  },
  {
    question: "Who should not join?",
    answer:
      "If you are pregnant, under 18, or being treated for a serious medical condition, please speak to your doctor first. The session is designed for healthy adults.",
  },
];


export const UsWomenFAQ = () => {
  const platform = useMemo(detectPlatform, []);
  const [copied, setCopied] = useState(false);
  const isFacebook = platform === "facebook";

  const handleChat = async () => {
    const didCopy = await openChat(platform);
    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }
  };

  return (
    <section className="bg-[#f5f7f0] px-4 py-20 md:py-28">
      <div className="container mx-auto max-w-3xl">
        <div style={{ height: '3rem' }} />
        <h2 className="mb-8 text-center text-2xl font-extrabold text-gray-900 md:mb-10 md:text-4xl">
          Questions people ask
        </h2>

        <Accordion type="single" collapsible className="space-y-0">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-b border-gray-300 py-2"
            >
              <AccordionTrigger className="text-left text-sm font-medium text-gray-800 hover:text-gray-950 hover:no-underline md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line pt-1 text-sm leading-relaxed text-gray-600 md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-14 text-center">
          <p className="text-lg italic text-gray-600">Still have a question?</p>
          <p className="mb-6 text-lg italic text-gray-600">
            Message us on {isFacebook ? "Messenger" : "Instagram"}
          </p>

          <Button
            onClick={handleChat}
            className={`no-heartbeat mx-auto flex items-center gap-2.5 rounded-full px-10 py-6 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.03] ${isFacebook
              ? "bg-gradient-to-r from-[#0084FF] to-[#0064E0]"
              : "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
              }`}
          >
            {isFacebook ? (
              <MessengerGlyph className="h-5 w-5" />
            ) : (
              <InstagramGlyph className="h-5 w-5" />
            )}
            Chat with us
          </Button>

          {copied && (
            <p className="mt-3 text-xs font-medium text-emerald-700">
              Message copied — just paste it in the chat.
            </p>
          )}
        </div>
      </div>

      <div style={{ height: '3rem' }} />
    </section>
  );
};
