import { motion } from "framer-motion";
import { Target, Battery, Sprout, BookOpen, Users } from "lucide-react";

const WhoShouldJoinSection = () => {
  const audience = [
    {
      icon: Target,
      title: "People wanting natural fat loss",
      description: "No extreme diets or gym required",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Battery,
      title: "Low energy individuals",
      description: "Feel more energetic and alive",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Sprout,
      title: "Beginners in yoga",
      description: "Perfect for those just starting out",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: BookOpen,
      title: "People wanting healthy habits",
      description: "Build sustainable lifestyle changes",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Users,
      title: "Anyone needing guidance & motivation",
      description: "Get the support you deserve",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who Should Join?
          </h2>
          <p className="text-xl text-gray-600">
            This camp is perfect for you if you are...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${item.bgColor} p-4 rounded-full w-fit mb-4`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <p className="text-2xl font-bold text-green-700">
              If any of these resonate with you, this camp is for you!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoShouldJoinSection;
