import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import sumitImage from "@/assets/sumit sharma.png";
import image2 from "@/assets/2.jpeg";
import image3 from "@/assets/3.jpeg";
import image4 from "@/assets/4.jpeg";
import image5 from "@/assets/5.jpeg";
import image6 from "@/assets/6.jpeg";
import image7 from "@/assets/7.jpeg";

interface WhatYouGetSectionProps {
  scrollToRegistration: () => void;
}

export const WhatYouGetSection = ({ scrollToRegistration }: WhatYouGetSectionProps) => {
  const benefits = [
    {
      title: "Live & Interactive Sessions by Sumit Sharma every Sunday",
      subtitle: "(Recordings will be provided)",
      description: "Learn the secrets of intermittent fasting, diet, health and wellness that Bollywood celebrities use to stay fit and look young. Learn it directly from Sumit Sharma, the ultimate intermittent fasting guru who has taught thousands of people to live healthy and fit forever.",
      link: "click here to check him out on Instagram",
      image: sumitImage,
      imageType: "photo"
    },
    {
      title: "21 Day Diet Plan (Weekly)",
      description: "Simple Home Cooked Meals like Daal Chawal, Sabji Roti",
      image: image2,
      imageType: "photo"
    },
    {
      title: "⏰ Intermittent Fasting Plan & Daily Guidance",
      image: image6,
      imageType: "photo"
    },
    {
      title: "🔥 Daily Live Yoga Classes",
      subtitle: "Timings of the live yoga classes:",
      details: [
        "Morning Classes: 5:30 am, 6:30 am, 7:30 am, 8:30 am and 9:30 am",
        "Evening Classes: 5:30 pm, 6:30 pm & 7:30 pm",
        "(Mon to Fri)",
        "Recordings of the classes will be provided."
      ],
      image: image7,
      imageType: "photo"
    },
    {
      title: "Daily Motivation & Reminders",
      image: image4,
      imageType: "photo"
    },
    {
      title: "🏆 Weight Loss Champ Contest",
      image: image5,
      imageType: "photo"
    },
    {
      title: "Become Part a Group Filled With Highly Motivated People",
      image: image3,
      imageType: "photo"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>💪</span>
            <span>What You'll Get</span>
          </h2>
        </motion.div>

        {/* Benefits Cards */}
        <div className="space-y-6 mb-12">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-sm border-2 border-gray-200 relative">
              {/* Number Badge */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-lg">
                {idx + 1}
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mt-2">
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden mx-auto md:mx-0">
                  {benefit.imageType === "photo" ? (
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl md:text-6xl">{benefit.image}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left w-full">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  {benefit.subtitle && (
                    <p className="text-xs text-gray-600 mb-2">{benefit.subtitle}</p>
                  )}
                  {benefit.description && (
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2">
                      {benefit.description}
                    </p>
                  )}
                  {benefit.link && (
                    <a href="https://www.instagram.com/sumit_sharma_coach/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                      {benefit.link}
                    </a>
                  )}
                  {benefit.details && (
                    <div className="text-xs text-gray-700 space-y-1 mt-2">
                      {benefit.details.map((detail, i) => (
                        <p key={i} className={i === benefit.details!.length - 1 ? "italic text-gray-600" : ""}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Register Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center">
          <Button
            onClick={scrollToRegistration}
            className="w-full md:w-auto bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-xl px-12 md:px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
