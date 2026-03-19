import { motion } from "framer-motion";
import b1 from "@/assets/b1.jpeg";
import b2 from "@/assets/b2.jpeg";
import b3 from "@/assets/b3.jpeg";
import b4 from "@/assets/b4.jpeg";
import b5 from "@/assets/b5.jpeg";
import b6 from "@/assets/b6.jpeg";
import b7 from "@/assets/b7.jpeg";
import b8 from "@/assets/b8.jpeg";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "100% Healthy, Natural Fat Loss",
      image: b7
    },
    {
      title: "Lose Inches Like Magic",
      image: b8
    },
    {
      title: "Learn to Fight Type 2 Diabetes, PCOS, Hypothyriod, Hypertension, Fatty Liver, Uric Acid etc.",
      image: b5
    },
    {
      title: "Naturally Detox & Cleanse Your Body",
      image: b6
    },
    {
      title: "Learn the Right Way to Cook & Eat Food",
      image: b3
    },
    {
      title: "Get Rid of Your Cravings & Food Addiction",
      image: b4
    },
    {
      title: "Build Habits that will Help You Stay Healthy, Fit Forever",
      image: b1
    },
    {
      title: "Increased Stamina, Strength & Flexibility",
      image: b2
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Benefits You will Gain
          </h2>
        </motion.div>

        {/* Benefits Cards */}
        <div className="space-y-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-green-50 rounded-3xl p-6 md:p-8 shadow-sm border-2 border-gray-300 relative">
              {/* Number Badge */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {idx + 1}
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-2">
                {/* Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex-shrink-0 shadow-md overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 flex items-center justify-center md:justify-start">
                  <h3 className="text-base md:text-lg font-normal text-gray-900 leading-relaxed text-center md:text-left">
                    {benefit.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
