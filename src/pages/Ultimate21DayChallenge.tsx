import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Import all sections
import {
  HeroSection,
  LeaderboardSection,
  JyotiTestimonialSection,
  HowItWorksSection,
  AanchalTestimonialSection,
  WhatYouGetSection,
  MoreMentorsSection,
  BenefitsSection,
  TransformationsSection,
  WhoIsThisForSection,
  YogaTeachersSection,
  VideoTestimonialsSection,
  RegistrationFormSection,
  FAQSection,
  type RegistrationFormData,
} from "@/components/challenge";

// Form validation schema
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
}).required();

const Ultimate21DayChallenge = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: "Ultimate 21 Day Weight Loss Challenge | Lose up to 10 Kg | Svastha",
    description: "Join the Ultimate 21 Day Weight Loss Challenge. 4067+ transformations, 7.5 kg average loss, 98% success rate. Expert guidance, diet plans, yoga classes. Register for ₹990.",
    ogTitle: "Ultimate 21 Day Weight Loss Challenge | Svastha",
    ogDescription: "Transform your body in 21 days. Proven system with 4067+ success stories. Diet plan + Yoga + WhatsApp support. Register now for ₹990.",
    ogImage: "/src/assets/hero-yoga.jpg",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      countryCode: "+91",
    },
  });

  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const paymentUrl = `https://pages.razorpay.com/pl_CHALLENGE21DAY/view?name=${encodeURIComponent(data.name)}&phone=${data.phone}&contact=${data.phone}`;
      toast.success("Redirecting to payment...");
      window.open(paymentUrl, "_blank");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-x-hidden">
      <HeroSection scrollToRegistration={scrollToRegistration} />
      <LeaderboardSection />
      <JyotiTestimonialSection />
      <HowItWorksSection />
      <AanchalTestimonialSection />
      <WhatYouGetSection scrollToRegistration={scrollToRegistration} />
      <MoreMentorsSection />
      <BenefitsSection />
      <TransformationsSection />
      <WhoIsThisForSection />
      <YogaTeachersSection />
      <VideoTestimonialsSection />
      <RegistrationFormSection
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
      <FAQSection />
    </div>
  );
};

export default Ultimate21DayChallenge;
