import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQSection = ({ isInternational = false }: { isInternational?: boolean }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this beginner friendly?",
      answer: "Yes. All sessions are designed for beginners.",
    },
    {
      question: "What food will I eat?",
      answer: "Simple home food like dal, roti, sabji and rice.",
    },
    {
      question: "Can I join from outside India?",
      answer: "Yes. You can join anywhere from the world.",
    },
    {
      question: "What if I miss a session?",
      answer: "Recordings will be shared.",
    },
    {
      question: "What if I don't lose weight?",
      answer: "You will receive 100% refund of ₹99.",
    },
  ];

  const filteredFaqs = isInternational
    ? faqs.filter(f => f.question !== "What if I miss a session?")
    : faqs;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${openIndex === index ? "transform rotate-180" : ""
                    }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
