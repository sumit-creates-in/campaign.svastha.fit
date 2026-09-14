import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { detectPlatform, openChat } from "@/lib/chat";
import { InstagramGlyph, MessengerGlyph } from "./ChatGlyphs";
import { MASTERCLASS, PRICING } from "@/config/masterclass";

const FAQS = [
  {
    question:
      "I have PCOS / thyroid / diabetes / fatty liver / BP. Is this suitable for me?",
    answer:
      "Yes — and you will be in the majority, not the minority. People managing these conditions are most of who we work with, and Sumit is a certified dietitian, so the plan was shaped around exactly these situations rather than adapted for them afterwards.\n\nThe registration form asks what you're dealing with, and that answer reaches our dietitian team before the session. Two things to be clear about: nothing here asks you to stop or change any medication, and this is nutrition, fasting and yoga guidance rather than medical treatment. Keep taking what your doctor prescribed and keep them in the loop.",
  },
  {
    question: "Is this really live, or a recording?",
    answer: `Really live. Sumit runs the session himself on Zoom on ${MASTERCLASS.dateLabel} at ${MASTERCLASS.timeLabel}, and the last stretch is an open Q&A where you can ask about your own situation.`,
  },
  {
    question: "Will you try to sell me something at the end?",
    answer:
      "Yes — and it's fair that you know beforehand. In the last few minutes Sumit explains the 21 Day Challenge and how to join it. You are under no obligation. Plenty of people take the plan from the session, follow it on their own, and get results. That's a perfectly good outcome and the plan is yours either way.",
  },
  {
    question: `Why charge ${PRICING.price} if it's a master class?`,
    answer:
      "Because a free room fills up with people who never turn up. The token fee means everyone in the session actually wants to change something — which makes the Q&A sharper and the group stronger. It also keeps the class small enough that questions get answered.",
  },
  {
    question: "I've never fasted before. Can I still join?",
    answer:
      "Yes. The session is built for beginners. Sumit starts from what fasting actually is and how to do it safely around normal Indian meal timings — no prior experience needed.",
  },
  {
    question: `What if I can't attend at ${MASTERCLASS.timeLabel}?`,
    answer:
      "Register anyway. The recording is sent to everyone who registers, so you can watch when it suits you. The live Q&A is the part worth showing up for, but you won't lose the content.",
  },
  {
    question: "Do I need to know yoga already?",
    answer:
      "No. Our teachers run the classes for complete beginners and give an easier version of every posture. If you can stand up and sit down, you can start. You practise at home on Zoom — no gym, no equipment.",
  },
  {
    question: "Will the diet be expensive or hard to cook?",
    answer:
      "It's daal, chawal, roti and sabji — food already in your kitchen, cooked the way your family already eats. No supplements, no imported ingredients, no cooking a separate meal for yourself.",
  },
  {
    question: "How do I get the Zoom link?",
    answer:
      "It comes to the WhatsApp number you register with, along with the 21-Day Starter Plan. You'll get a reminder on the day of the session too, so please use a number you actually check.",
  },
  {
    question: "I live outside India. Can I join?",
    answer: `Yes. ${MASTERCLASS.timeLabel} works comfortably across the Gulf, and everyone gets the recording. The live yoga classes run on India time, and many of our members abroad join the morning slot or use the recordings.`,
  },
];

export const MasterClassFAQ = () => {
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
            className={`no-heartbeat mx-auto flex items-center gap-2.5 rounded-full px-10 py-6 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.03] ${
              isFacebook
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
    </section>
  );
};
