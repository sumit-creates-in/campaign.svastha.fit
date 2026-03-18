import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMeta } from "@/hooks/useMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, Users, Star, Trophy, Heart, Zap, 
  Target, TrendingDown, Award, Shield, Phone, Mail, 
  Calendar, ChevronRight, Sparkles, Scale, Utensils,
  Stethoscope, Activity, Briefcase, Home, Users2,
  Frown, UserCheck, ChefHat, HandHeart, User, Clock
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import sumitImage from "@/assets/sumit sharma.png";
import ankitImage from "@/assets/ankit sharma.webp";
import anishaImage from "@/assets/Anisha.jpeg";
import muskanImage from "@/assets/muskan lalwani.jpeg";
import venikaImage from "@/assets/venika agarwal.jpeg";
import { watch } from "fs";
import { register } from "module";
import { watch } from "fs";
import { register } from "module";
import { register } from "module";

// Form validation schema
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  countryCode: z.string(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
];

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
      // TODO: Integrate with Supabase edge function: create-challenge-payment
      // For now, redirect to Razorpay payment
      const paymentUrl = `https://pages.razorpay.com/pl_CHALLENGE21DAY/view?name=${encodeURIComponent(data.name)}&phone=${data.phone}&contact=${data.phone}`;
      
      toast.success("Redirecting to payment...");
      
      // Open payment in new tab
      window.open(paymentUrl, "_blank");
      
      // After successful payment, redirect to: /download?challenge=true&phone=${data.phone}
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative py-12 md:py-16 px-4 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-500 text-white px-8 py-2 rounded-full text-xl md:text-2xl font-bold tracking-wide">
              SVASTHA.FIT
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-emerald-500 text-2xl">✦</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 italic">
                ULTIMATE
              </h1>
              <span className="text-emerald-500 text-2xl">✦</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-600 mb-2">
              21 Day
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-emerald-600">
              Weight Loss Challenge
            </h3>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Main Headline */}
              <div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 whitespace-nowrap">
                  Lose up to 10 Kg's 🔥
                </h4>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  In Just 21 Days!
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">With Natural Food Like</span> Daal, Rice, Roti, Sabji 🌾
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Start Burning Fat For</span> Energy 🔥
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Learn 5 Ultimate</span> Golden Habits 🌟
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Learn The</span> Right Way of Fasting 🍽️
                  </p>
                </div>
                <div className="flex items-start gap-3 border-b-2 border-gray-200 pb-2">
                  <span className="text-emerald-600 text-xl flex-shrink-0">✦</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Join Live</span> Yoga Classes from Home 🧘
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  onClick={scrollToRegistration}
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Register Now
                </Button>
                <p className="text-center md:text-left mt-3 text-lg font-semibold text-gray-700">
                  Fee: Rs. 990/- only
                </p>
                <p className="text-center md:text-left mt-1 text-sm text-emerald-600 font-medium flex items-center justify-center md:justify-start gap-2">
                  <Users className="w-4 h-4" />
                  6733 people joined
                </p>
              </div>
            </motion.div>

            {/* Right Column - Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full order-first lg:order-last"
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-100" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/0zkAOy4AP38"
                  title="Ultimate 21 Day Weight Loss Challenge"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-700">
                LIVE Weight Loss Leaderboard
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Track your progress & stay motivated to be #1!
            </p>
          </motion.div>

          {/* Podium Layout */}
          <div className="flex items-end justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 max-w-[200px]"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-gray-300 text-center">
                <div className="text-6xl mb-3">🥈</div>
                <div className="text-emerald-600 font-bold text-xl mb-2">2nd Place</div>
                <div className="text-gray-700 font-semibold text-lg">-10 kg</div>
              </div>
            </motion.div>

            {/* 1st Place - Taller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 max-w-[220px]"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 shadow-2xl border-4 border-emerald-500 text-center transform scale-110">
                <div className="text-7xl mb-4">🏆</div>
                <div className="text-emerald-700 font-bold text-2xl mb-2">1st Place</div>
                <div className="text-gray-900 font-bold text-xl">-12 kg</div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 max-w-[200px]"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-orange-300 text-center">
                <div className="text-6xl mb-3">🥉</div>
                <div className="text-emerald-600 font-bold text-xl mb-2">3rd Place</div>
                <div className="text-gray-700 font-semibold text-lg">-9 kg</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
          </motion.div>

          {/* Video 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/S4C-v8OCHZ8"
                  title="Success Story 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Lost 6.5 kg in 6 days!
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  "I couldn't believe the results! The combination of diet and yoga worked wonders. 
                  I feel more energetic and confident than ever before."
                </p>
                <p className="font-semibold text-emerald-600">- Jyoti</p>
              </div>
            </motion.div>
          </div>

          {/* Video 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Amazing Transformation!
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  "The support from the community and coaches made all the difference. 
                  I learned sustainable habits that I'll keep for life."
                </p>
                <p className="font-semibold text-emerald-600">- Aanchal</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/is5v451Bw18"
                  title="Success Story 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-700">
                How It Works
              </h2>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              Everything you need for complete health transformation
            </p>
          </motion.div>

          {/* Cards Container - Horizontal Scroll on Mobile */}
          <div className="mb-12">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 flex md:flex-none overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {[
                { 
                  step: "1", 
                  icon: "✓", 
                  title: "Join the Challenge", 
                  desc: "Secure your spot by registering right now! Get instant access to our exclusive community.",
                  bgColor: "from-blue-50 to-blue-100",
                  iconBg: "bg-blue-500"
                },
                { 
                  step: "2", 
                  icon: "📅", 
                  title: "Attend Live Session", 
                  desc: "Join the live session on 4th Jan 2026 to learn everything about the course and get started.",
                  bgColor: "from-green-50 to-green-100",
                  iconBg: "bg-green-500"
                },
                { 
                  step: "3", 
                  icon: "📖", 
                  title: "Follow The Plan", 
                  desc: "Start following the personalized plan. Get daily reminders & motivation via WhatsApp Group.",
                  bgColor: "from-orange-50 to-orange-100",
                  iconBg: "bg-orange-500"
                },
                { 
                  step: "4", 
                  icon: "🏆", 
                  title: "Transform & Win", 
                  desc: "Track your progress on the leaderboard & push yourself to the top! Celebrate your success.",
                  bgColor: "from-purple-50 to-purple-100",
                  iconBg: "bg-purple-500"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex-shrink-0 w-[280px] md:w-auto snap-center"
                >
                  <Card className={`h-full bg-gradient-to-br ${item.bgColor} border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <CardContent className="p-6">
                      {/* Icon */}
                      <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md`}>
                        {item.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      
                      {/* Description */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A complete transformation system designed for busy people
              </p>
            </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "21-Day Transformation Guide",
                description: "Step-by-step daily instructions, meal plans, and yoga sequences",
                value: "$47"
              },
              {
                icon: PlayCircle,
                title: "Daily Yoga Videos",
                description: "21 unique yoga sessions from beginner to advanced levels",
                value: "$97"
              },
              {
                icon: Utensils,
                title: "Nutrition Masterclass",
                description: "Learn the science of healthy eating and meal preparation",
                value: "$67"
              },
              {
                icon: MessageCircle,
                title: "Private Community Access",
                description: "24/7 support from coaches and fellow participants",
                value: "$37"
              },
              {
                icon: Clock,
                title: "Live Weekly Coaching",
                description: "3 live group coaching sessions with Q&A",
                value: "$147"
              },
              {
                icon: Gift,
                title: "Bonus Resources",
                description: "Meditation tracks, recipe book, and habit tracker",
                value: "$77"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <item.icon className="w-12 h-12 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Value: {item.value}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-purple-100 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Value</h3>
              <div className="text-4xl font-bold text-gray-400 line-through mb-2">$472</div>
              <div className="text-5xl font-bold text-purple-600 mb-4">$97</div>
              <p className="text-gray-600">Limited time offer - Save $375!</p>
            </div>
          </motion.div>
        </div>
      </section>      <div className="font-bold text-gray-900">78</div>
                      <div className="text-sm text-gray-600">following</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4 text-sm text-gray-800 leading-relaxed">
                <p className="mb-1">🏋️ Weight Loss Expert | 🥗 Dietitian | 🧘 Yoga Teacher</p>
                <p className="mb-1">⭐ Follow me to learn secrets of intermittent fasting</p>
                <p className="mb-1">📚 Plans, Courses & Services</p>
                <p className="text-blue-600 mb-2">🔗 strongbyyoga.com/healthy-life-by-sumit...</p>
                <p className="text-gray-600">👥 Fasting Champs 1K members</p>
              </div>

              {/* Professional Dashboard */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-semibold text-gray-900 mb-1">Professional dashboard</div>
              <div className="text-5xl font-bold text-purple-600 mb-4">$97</div>
              <p className="text-gray-600">Limited time offer - Save $375!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUMIT SHARMA SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Instagram Profile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-xl border-4 border-emerald-100 max-w-sm mx-auto lg:mx-0"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={sumitImage} 
                      alt="Sumit Sharma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">sumit_sharma_coach</div>
                    <div className="text-sm text-gray-600">Sumit Sharma</div>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  Follow
                </Button>
              </div>

              {/* Stats */}
              <div className="flex justify-around mb-4 text-center">
                <div>
                  <div className="font-bold text-gray-900">1,234</div>
                  <div className="text-sm text-gray-600">posts</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">130K</div>
                  <div className="text-sm text-gray-600">followers</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">78</div>
                  <div className="text-sm text-gray-600">following</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4 text-sm text-gray-800 leading-relaxed">
                <p className="mb-1">🏋️ Weight Loss Expert | 🥗 Dietitian | 🧘 Yoga Teacher</p>
                <p className="mb-1">⭐ Follow me to learn secrets of intermittent fasting</p>
                <p className="mb-1">📚 Plans, Courses & Services</p>
                <p className="text-blue-600 mb-2">🔗 strongbyyoga.com/healthy-life-by-sumit...</p>
                <p className="text-gray-600">👥 Fasting Champs 1K members</p>
              </div>

              {/* Professional Dashboard */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-semibold text-gray-900 mb-1">Professional dashboard</div>
                <div className="text-xs text-gray-600">3.4M views in the last 30 days</div>
              </div>

              {/* Follow Button */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-center">
                <div className="text-white font-semibold">📷 130K+ Followers</div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Sumit Sharma
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="text-emerald-600 font-semibold">
                    Certified Dietitian | Yoga Teacher | Lifestyle Coach | Intermittent Fasting Expert | Founder: Svastha
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Get trained by the best</span>
                </div>

                <div className="text-gray-700 leading-relaxed mb-6">
                  <p className="mb-4">
                    Sumit is a well-accomplished name in the wellness industry. With an extensive experience of over <span className="font-bold">10 years</span>, he has successfully helped <span className="font-bold">thousands of people</span> transform their life. He is known for his work in holistic lifestyle changes and all-natural solutions.
                  </p>
                </div>

                <Button
                  onClick={scrollToRegistration}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Register Now - Learn from Sumit
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MORE MENTORS SECTION */}
      <section className="py-20 px-4 bg-white">
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              More Mentors are here...
            </h2>
          </motion.div>

          <div className="md:grid md:grid-cols-4 md:gap-8 md:max-w-4xl md:mx-auto flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {/* Mentor 1 - Anisha Ghosh */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center flex-shrink-0 w-[200px] md:w-auto snap-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-pink-100 to-purple-100">
                <img 
                  src={anishaImage} 
                  alt="Anisha Ghosh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Anisha Ghosh</h3>
              <p className="text-sm text-gray-600">(Dietitian)</p>
            </motion.div>

            {/* Mentor 2 - Muskan Lalwani */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center flex-shrink-0 w-[200px] md:w-auto snap-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-blue-100 to-teal-100">
                <img 
                  src={muskanImage} 
                  alt="Muskan Lalwani" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Muskan Lalwani</h3>
              <p className="text-sm text-gray-600">(Dietitian)</p>
            </motion.div>

            {/* Mentor 3 - Ankit Sharma */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center flex-shrink-0 w-[200px] md:w-auto snap-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-green-100 to-emerald-100">
                <img 
                  src={ankitImage} 
                  alt="Ankit Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ankit Sharma</h3>
              <p className="text-sm text-gray-600">(Fitness Trainer)</p>
            </motion.div>

            {/* Mentor 4 - Venika Agarwal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center flex-shrink-0 w-[200px] md:w-auto snap-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-orange-100 to-yellow-100">
                <img 
                  src={venikaImage} 
                  alt="Venika Agarwal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Venika Agarwal </h3>
              <p className="text-sm text-gray-600">(Dietitian)</p>
            </motion.div>
          </div>

          {/* Scroll indicator for mobile */}
          <div className="md:hidden text-center mt-4">
            <p className="text-sm text-gray-500">← Swipe to see all mentors →</p>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">💪</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                What You'll Get
              </h2>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Card 1 - Live Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-yellow-400 rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src={sumitImage} 
                    alt="Sumit Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Live & Interactive Sessions by Sumit Sharma every Sunday
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">(Recordings will be provided)</p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Learn the secrets of intermittent fasting, diet, health and wellness that Bollywood celebrities use to stay fit and look young. Learn it directly from Sumit Sharma, the ultimate intermittent fasting guru who has taught thousands of people to live healthy and fit forever.
                  </p>
                  <a href="https://www.instagram.com/sumit_sharma_coach/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    click here to check him out on Instagram
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Diet Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop" 
                    alt="Diet Plan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    21 Day Diet Plan (Weekly)
                  </h3>
                  <p className="text-lg text-gray-700 font-medium">
                    Simple Home Cooked Meals like Daal Chawal, Sabji Roti
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Intermittent Fasting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-yellow-400 rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=400&fit=crop" 
                    alt="Intermittent Fasting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">⏱️</span>
                    Intermittent Fasting Plan & Daily Guidance
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Daily Live Yoga Classes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop" 
                    alt="Yoga Classes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">🔥</span>
                    Daily Live Yoga Classes
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-semibold">Timings of the live yoga classes:</p>
                    <p><span className="font-medium">Morning Classes:</span> 5:30 am, 6:30 am, 7:30 am, 8:30 am and 9:30 am</p>
                    <p><span className="font-medium">Evening Classes:</span> 5:30 pm, 6:30 pm & 7:30 pm</p>
                    <p className="text-gray-600 italic">(Mon to Fri)</p>
                    <p className="font-medium">Recordings of the classes will be provided.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5 - Daily Motivation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop" 
                    alt="Daily Motivation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Daily Motivation & Reminders
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 6 - Weight Loss Contest */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop" 
                    alt="Weight Loss Contest" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">🏅</span>
                    Weight Loss Cham Contest
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 7 - Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop" 
                    alt="Community" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Become Part a Group Filled With Highly Motivated People
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Register Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={scrollToRegistration}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lose up to <span className="text-emerald-600">10 Kg in 21 Days</span>
            </h2>
            <p className="text-xl text-gray-600">Transform your body with our proven system</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, title: "Rapid Fat Loss", desc: "Scientifically designed program for maximum fat burning" },
              { icon: Heart, title: "Improved Health", desc: "Better energy, sleep, and overall wellness" },
              { icon: Target, title: "Sustainable Results", desc: "Learn habits that last a lifetime" },
              { icon: Users, title: "Community Support", desc: "Join 4000+ members on the same journey" },
              { icon: Award, title: "Expert Guidance", desc: "Certified dietitian and yoga instructors" },
              { icon: Sparkles, title: "Confidence Boost", desc: "Feel amazing in your own skin" }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 border-emerald-100">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-emerald-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Who is this for?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Frown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tried Losing Weight but Failed
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lost Weight but it Came Back
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Crave Sugar & Carbs
              </h3>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Frown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gut Issues
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Chronic Diseases
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hormonal Imbalance
              </h3>
            </motion.div>

            {/* Row 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Working Professionals
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Home Makers
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                For Parents
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS YOU WILL GAIN SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Benefits You will Gain
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2017/05/11/19/44/fresh-2305192_1280.jpg" 
                    alt="Healthy Natural Fat Loss" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">🥗</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    100% Healthy, Natural Fat Loss
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg" 
                    alt="Lose Inches Like Magic" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">📏</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Lose Inches Like Magic
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg" 
                    alt="Fight Health Issues" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">🩺</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Learn to Fight Type 2 Diabetes, PCOS, Hypothyriod, Hypertension, Fatty Liver, Uric Acid etc.
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2017/03/05/00/34/panorama-2117310_1280.jpg" 
                    alt="Naturally Detox & Cleanse Your Body" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">🌿</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Naturally Detox & Cleanse Your Body
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_1280.jpg" 
                    alt="Learn the Right Way to Cook & Eat Food" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">🍳</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Learn the Right Way to Cook & Eat Food
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1840425_1280.jpg" 
                    alt="Get Rid of Your Cravings & Food Addiction" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">🧘</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Get Rid of Your Cravings & Food Addiction
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 7 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2016/11/29/06/15/adult-1867743_1280.jpg" 
                    alt="Build Habits that will Help You Stay Healthy, Fit Forever" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">👨‍👩‍👧‍👦</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Build Habits that will Help You Stay Healthy, Fit Forever
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Benefit 8 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg" 
                    alt="Increased Stamina, Strength & Flexibility" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-emerald-200 flex items-center justify-center text-emerald-600 text-2xl">💪</div>';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                    Increased Stamina, Strength & Flexibility
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - TRANSFORMATIONS */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600">Join thousands who transformed their lives</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-6 text-center"
              >
                <div className="bg-white rounded-lg p-4 mb-4 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Trophy className="w-16 h-16 text-emerald-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">-{5 + idx} Kg</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">Member #{idx}</p>
                <p className="text-sm text-gray-600">Lost weight in 21 days</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">💪</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                What You'll Get
              </h2>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Card 1 - Live Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-yellow-400 rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src={sumitImage} 
                    alt="Sumit Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Live & Interactive Sessions by Sumit Sharma every Sunday
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">(Recordings will be provided)</p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Learn the secrets of intermittent fasting, diet, health and wellness that Bollywood celebrities use to stay fit and look young. Learn it directly from Sumit Sharma, the ultimate intermittent fasting guru who has taught thousands of people to live healthy and fit forever.
                  </p>
                  <a href="https://www.instagram.com/sumit_sharma_coach/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    click here to check him out on Instagram
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Diet Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop" 
                    alt="Diet Plan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    21 Day Diet Plan (Weekly)
                  </h3>
                  <p className="text-lg text-gray-700 font-medium">
                    Simple Home Cooked Meals like Daal Chawal, Sabji Roti
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Intermittent Fasting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-yellow-400 rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=400&fit=crop" 
                    alt="Intermittent Fasting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">⏱️</span>
                    Intermittent Fasting Plan & Daily Guidance
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Daily Live Yoga Classes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop" 
                    alt="Yoga Classes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">🔥</span>
                    Daily Live Yoga Classes
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-semibold">Timings of the live yoga classes:</p>
                    <p><span className="font-medium">Morning Classes:</span> 5:30 am, 6:30 am, 7:30 am, 8:30 am and 9:30 am</p>
                    <p><span className="font-medium">Evening Classes:</span> 5:30 pm, 6:30 pm & 7:30 pm</p>
                    <p className="text-gray-600 italic">(Mon to Fri)</p>
                    <p className="font-medium">Recordings of the classes will be provided.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5 - Daily Motivation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop" 
                    alt="Daily Motivation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Daily Motivation & Reminders
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 6 - Weight Loss Contest */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop" 
                    alt="Weight Loss Contest" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">🏅</span>
                    Weight Loss Cham Contest
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 7 - Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-3xl flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop" 
                    alt="Community" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Become Part a Group Filled With Highly Motivated People
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Register Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={scrollToRegistration}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section id="registration" className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Register Now
            </h2>
            <p className="text-xl opacity-90">Start your transformation journey today!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base text-gray-900 font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="mt-2 h-12 text-lg"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-base text-gray-900 font-semibold">
                  Phone Number *
                </Label>
                <div className="flex gap-2 mt-2">
                  <Select
                    value={watch("countryCode")}
                    onValueChange={(value) => setValue("countryCode", value)}
                  >
                    <SelectTrigger className="w-28 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_CODES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1 relative">
                    <Input
                      id="phone"
                      {...register("phone")}
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      className="h-12 text-lg pr-16"
                      maxLength={10}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setValue("phone", digitsOnly);
                      }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">
                      {watch("phone")?.length || 0}/10
                    </div>
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-gray-900">Challenge Period</span>
                </div>
                <p className="text-gray-700">April 10 - April 30, 2026 (21 Days)</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-2">₹990</p>
                  <p className="text-gray-600">One-time payment • Lifetime access to recordings</p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xl py-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Register Now - Pay ₹990
                <Zap className="ml-2 w-6 h-6" />
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">Instant Access</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">4067+ Members</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">Expert Guidance</span>
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-lg opacity-90">
              🔒 Your payment is 100% secure with Razorpay
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              FAQs
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How much weight can I lose in 21 days?",
                a: "Most participants lose between 5-10 kg in 21 days. Results vary based on your starting weight, commitment level, and how closely you follow the program. Our average member loses 7.5 kg."
              },
              {
                q: "Do I need any prior yoga experience?",
                a: "Not at all! Our program is designed for complete beginners. Our expert instructors will guide you through every pose and modification to suit your fitness level."
              },
              {
                q: "What if I miss a live class?",
                a: "No worries! All live classes are recorded and available for you to access anytime. You'll have lifetime access to all recordings."
              },
              {
                q: "Is the diet plan vegetarian/non-vegetarian?",
                a: "We provide both vegetarian and non-vegetarian options. The diet plan is customized based on your preferences, lifestyle, and dietary restrictions."
              },
              {
                q: "How much time do I need to dedicate daily?",
                a: "You'll need approximately 30-45 minutes for yoga practice and 15-20 minutes for meal prep. The program is designed to fit into busy schedules."
              },
              {
                q: "What equipment do I need?",
                a: "Just a yoga mat and comfortable clothing! All exercises can be done at home with no special equipment required."
              },
              {
                q: "Is there a refund policy?",
                a: "Yes! If you're not satisfied within the first 3 days, we offer a full refund, no questions asked. We're confident you'll love the program."
              },
              {
                q: "Will I get personal attention?",
                a: "Absolutely! You'll have access to our WhatsApp support group where our team of experts answers your questions daily. Plus, you can ask questions during live classes."
              },
              {
                q: "What happens after 21 days?",
                a: "You'll have learned sustainable habits and have lifetime access to all recordings. Many members continue with our advanced programs or maintain their results independently."
              },
              {
                q: "Is this suitable for people with health conditions?",
                a: "We recommend consulting your doctor before starting any new fitness program. Our team can provide modifications for most common conditions, but medical clearance is important."
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <AccordionItem value={`item-${idx}`} className="bg-emerald-50 rounded-lg px-6 border-2 border-emerald-100">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-emerald-600">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 4067+ people who have already transformed their bodies and lives
            </p>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-white/30">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-4xl font-bold mb-2">21 Days</div>
                  <div className="opacity-90">To Transform</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">₹990</div>
                  <div className="opacity-90">One-time Fee</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="opacity-90">Success Rate</div>
                </div>
              </div>

              <Button
                onClick={scrollToRegistration}
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-2xl px-16 py-8 rounded-full shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
              >
                Join the Challenge Now
                <ChevronRight className="ml-2 w-8 h-8" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">svastha</h3>
              <p className="text-gray-400">Transforming lives through yoga and nutrition</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@svastha.fit</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
                <div>Refund Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2026 Svastha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Ultimate21DayChallenge;
