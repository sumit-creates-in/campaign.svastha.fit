import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, UserCheck, Calendar, ClipboardList, Users } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "Join the Challenge",
      desc: "Secure your spot by registering right now!"
    },
    {
      icon: Calendar,
      title: "Attend Live Session",
      desc: "Join the live session batch start date to learn everything about the course."
    },
    {
      icon: ClipboardList,
      title: "Follow The Plan",
      desc: "Start following the plan from next day. Get daily reminders & motivation via WhatsApp Group."
    },
    {
      icon: Users,
      title: "Transform",
      desc: "Track progress on the LIVE leaderboard & push yourself to the top!"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-3xl">
              🔄
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl relative">
                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10">
                  {idx + 1}
                </div>
                
                <CardContent className="p-6 text-center flex flex-col items-center pt-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <item.icon className="w-9 h-9 text-green-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 mb-3">{item.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
