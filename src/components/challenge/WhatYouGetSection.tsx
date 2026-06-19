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
  isUae?: boolean;
  isInternational?: boolean;
}

// IST base times (24h format) for yoga classes
const IST_MORNING_HOURS = [5.5, 6.5, 7.5, 8.5, 9.5]; // 5:30 AM - 9:30 AM IST
const IST_EVENING_HOURS = [17.5, 18.5, 19.5]; // 5:30 PM - 7:30 PM IST

function formatTime12h(hour24: number): string {
  // Normalize to 0-24 range
  let h = ((hour24 % 24) + 24) % 24;
  const minutes = Math.round((h % 1) * 60);
  const hourInt = Math.floor(h);
  const period = hourInt >= 12 ? "pm" : "am";
  const hour12 = hourInt === 0 ? 12 : hourInt > 12 ? hourInt - 12 : hourInt;
  return minutes === 0 ? `${hour12}:00 ${period}` : `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function getUSTimezoneInfo(): { name: string; offsetFromIST: number } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Map common US/Canada timezones
    if (tz.includes("America/New_York") || tz.includes("America/Detroit") || tz.includes("America/Toronto") || tz.includes("US/Eastern")) {
      return { name: "Eastern Time (ET)", offsetFromIST: -9.5 };
    }
    if (tz.includes("America/Chicago") || tz.includes("America/Winnipeg") || tz.includes("US/Central")) {
      return { name: "Central Time (CT)", offsetFromIST: -10.5 };
    }
    if (tz.includes("America/Denver") || tz.includes("America/Edmonton") || tz.includes("US/Mountain")) {
      return { name: "Mountain Time (MT)", offsetFromIST: -11.5 };
    }
    if (tz.includes("America/Los_Angeles") || tz.includes("America/Vancouver") || tz.includes("US/Pacific")) {
      return { name: "Pacific Time (PT)", offsetFromIST: -12.5 };
    }
    // Fallback: compute offset from browser
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetFromUTC = -offsetMinutes / 60;
    const offsetFromIST = offsetFromUTC - 5.5;
    const tzAbbr = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
    return { name: tzAbbr || "Your Local Time", offsetFromIST };
  } catch {
    // Default to ET
    return { name: "Eastern Time (ET)", offsetFromIST: -9.5 };
  }
}

function getInternationalTimings(): { subtitle: string; details: string[] } {
  const { name, offsetFromIST } = getUSTimezoneInfo();

  const morningLocal = IST_MORNING_HOURS.map(h => formatTime12h(h + offsetFromIST));
  const eveningLocal = IST_EVENING_HOURS.map(h => formatTime12h(h + offsetFromIST));

  const morningStr = morningLocal.slice(0, -1).join(", ") + " and " + morningLocal[morningLocal.length - 1];
  const eveningStr = eveningLocal.slice(0, -1).join(", ") + " & " + eveningLocal[eveningLocal.length - 1];

  return {
    subtitle: `Timings of the live yoga classes (${name}):`,
    details: [
      `Morning Classes: ${morningStr}`,
      `Evening Classes: ${eveningStr}`,
      "(Mon to Fri)",
      "Recordings of the classes will be provided."
    ]
  };
}

export const WhatYouGetSection = ({ scrollToRegistration, isUae = false, isInternational = false }: WhatYouGetSectionProps) => {
  const internationalTimings = isInternational ? getInternationalTimings() : null;

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
      subtitle: isInternational
        ? internationalTimings!.subtitle
        : isUae
          ? "Timings of the live yoga classes (Gulf Standard Time (GST)):"
          : "Timings of the live yoga classes:",
      details: isInternational
        ? internationalTimings!.details
        : isUae ? [
        "Morning Classes: 4:00 am, 5:00 am, 6:00 am, 7:00 am and 8:00 am",
        "Evening Classes: 4:00 pm, 5:00 pm & 6:00 pm",
        "(Mon to Fri)",
        "Recordings of the classes will be provided."
      ] : [
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
