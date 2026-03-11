import { motion } from "framer-motion";
import { Users, MessageSquare, TrendingUp, Heart } from "lucide-react";

const CommunitySection = () => {
  const benefits = [
    {
      icon: MessageSquare,
      title: "Daily reminders",
      description: "Never miss a session",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: MessageSquare,
      title: "Voice guidance",
      description: "Expert tips every day",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Heart,
      title: "Motivation",
      description: "Stay inspired together",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: TrendingUp,
      title: "Progress updates",
      description: "Track your journey",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="py-20 px-0 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Community Support
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our exclusive WhatsApp group and connect with like-minded individuals on the same journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className={`${benefit.bgColor} p-4 rounded-full w-fit mx-auto mb-4`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">Success Stories Shared Daily</h3>
          <p className="text-lg opacity-90">
            Get inspired by real transformations from community members
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
