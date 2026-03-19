import { motion } from "framer-motion";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Build Habits that will Help You Stay Healthy, Fit Forever",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop"
    },
    {
      title: "Increased Stamina, Strength & Flexibility",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop"
    },
    {
      title: "Learn the Right Way to Cook & Eat Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop"
    },
    {
      title: "Get Rid of Your Cravings & Food Addiction",
      image: "https://images.unsplash.com/photo-1599447292023-fa1c56d39a1d?w=400&h=400&fit=crop"
    },
    {
      title: "Learn to Fight Type 2 Diabetes, PCOS, Hypothyriod, Hypertension, Fatty Liver, Uric Acid etc.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop"
    },
    {
      title: "Naturally Detox & Cleanse Your Body",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=400&fit=crop"
    },
    {
      title: "100% Healthy, Natural Fat Loss",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop"
    },
    {
      title: "Lose Inches Like Magic",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop"
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
              className="bg-gradient-to-r from-green-50/80 via-emerald-50/80 to-teal-50/80 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/50">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6">
                {/* Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex-shrink-0 shadow-md overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 flex items-center text-center md:text-left">
                  <h3 className="text-base md:text-lg font-normal text-gray-900 leading-relaxed">
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
