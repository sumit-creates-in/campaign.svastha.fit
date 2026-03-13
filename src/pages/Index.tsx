import { motion } from "framer-motion";
import { useMeta } from "@/hooks/useMeta";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import JourneySection from "@/components/JourneySection";
import ScheduleSection from "@/components/ScheduleSection";
import RegistrationSection from "@/components/RegistrationSection";
import FAQSection from "@/components/FAQSection";
import ScrollToTop from "@/components/ScrollToTop";
import InstructorsSection from "@/components/InstructorsSection";

const Index = () => {
  // Set meta tags for 21-Day Ultimate Yoga Camp
  useMeta({
    title: "Ultimate 21-Day Yoga Camp | Transform Your Life in 21 Days",
    description: "Join our transformative 21-Day Yoga Camp starting November 17, 2025. Daily live online classes, expert instructors, and a supportive community. Register now!",
    ogTitle: "Ultimate 21-Day Yoga Camp | Svastha Wellness",
    ogDescription: "Transform your life with our 21-day yoga camp. Daily live classes, expert instructors, and supportive community.",
    ogImage: "/src/assets/svastha.png",
    twitterTitle: "Ultimate 21-Day Yoga Camp | Svastha Wellness",
    twitterDescription: "Transform your life with our 21-day yoga camp. Daily live classes, expert instructors, and supportive community.",
    twitterImage: "/src/assets/svastha.png"
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyJoinSection />
      <JourneySection />
      <ScheduleSection />
      <RegistrationSection />
      <InstructorsSection />
      <FAQSection />
      <ScrollToTop />

      <footer className="bg-foreground/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © 2025 Svastha X StrongByYoga. All rights reserved. | Transform your
            life through yoga.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
