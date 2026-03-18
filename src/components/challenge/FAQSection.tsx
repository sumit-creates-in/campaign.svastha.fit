import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What will happen after I register?",
      answer: "After registration, you'll receive a confirmation email with access to our WhatsApp group, course materials, and schedule for the live sessions."
    },
    {
      question: "Is it possible to lose weight within 21 days?",
      answer: "Yes! Our proven program has helped 6733+ people lose an average of 7.5 kg in 21 days through a combination of proper diet, yoga, and lifestyle changes."
    },
    {
      question: "Is it safe to lose weight within 21 days?",
      answer: "Absolutely! Our program focuses on natural, sustainable weight loss through healthy eating and yoga. It's designed by certified experts and is completely safe."
    },
    {
      question: "What happens after 21 Days?",
      answer: "You'll have learned sustainable habits that you can continue for life. We also offer ongoing support and advanced programs to help you maintain your results."
    },
    {
      question: "What kind of diet plan will be provided?",
      answer: "You'll get a personalized Indian diet plan with natural foods like daal, rice, roti, and sabji. No expensive supplements or exotic ingredients required!"
    },
    {
      question: "When will I receive confirmation email?",
      answer: "You'll receive your confirmation email within 24 hours of registration with all the details to get started."
    },
    {
      question: "I am in different country/time zone. How will it work for me?",
      answer: "All live sessions are recorded and available for replay. You can follow the program at your own pace and still get full support through our WhatsApp group."
    },
    {
      question: "I don't know how to do yoga. Can I join?",
      answer: "Yes! Our program is designed for complete beginners. We'll guide you step-by-step through each yoga pose and provide modifications for all levels."
    },
    {
      question: "I don't want to do yoga or workout. Will I still lose weight?",
      answer: "While yoga enhances results, our diet plan alone can help you lose weight. However, we highly recommend yoga for better health and faster results."
    },
    {
      question: "Who should not join this program?",
      answer: "Pregnant women, people with serious medical conditions, or those under 18 should consult their doctor before joining. This program is for healthy adults."
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#f5f7f0]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-600 mb-8 italic">
            FAQ's
          </h2>

          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`} 
                className="border-b border-gray-300 py-3">
                <AccordionTrigger className="text-left text-sm md:text-base font-normal text-gray-600 hover:text-gray-900 hover:no-underline [&[data-state=open]>svg]:rotate-90">
                  <span className="flex items-start gap-2">
                    <span className="text-gray-500 mt-0.5 text-xs">▸</span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pt-2 pl-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Chat with us section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16">
          <p className="text-xl text-gray-600 italic mb-1">
            Still have concerns?
          </p>
          <p className="text-xl text-gray-600 italic mb-6">
            Chat with us
          </p>
          <Button
            onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base px-8 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            <MessageCircle className="w-5 h-5" />
            Chat with us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
