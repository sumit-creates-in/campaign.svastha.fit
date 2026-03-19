import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
            onClick={() => window.open('https://api.whatsapp.com/send/?phone=%2B917208683034&text=Hi%2C+I+want+to+know+more+about+Ultimate+21+Day+Weight+Loss+Challenge&type=phone_number&app_absent=0', '_blank')}
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-base px-8 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            <WhatsAppIcon className="w-6 h-6" />
            Chat with us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
