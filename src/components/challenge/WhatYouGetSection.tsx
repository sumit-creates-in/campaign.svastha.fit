import { useState, useEffect } from "react";
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
const IST_MORNING_HOURS = [17.5, 18.5, 19.5]; // 5:30 PM - 7:30 PM IST (now showing as Morning)
const IST_EVENING_HOURS = [5.5, 6.5, 7.5, 8.5, 9.5]; // 5:30 AM - 9:30 AM IST (now showing as Evening)

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
    if (tz.includes("Asia/Kolkata") || tz.includes("Asia/Calcutta")) {
      return { name: "Calcutta/Asia", offsetFromIST: 0 };
    }
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
    let tzAbbr = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
    if (Math.abs(offsetFromIST) < 0.01) {
      tzAbbr = "Calcutta/Asia";
    } else if (tzAbbr && (tzAbbr.includes("GMT+5:30") || tzAbbr.includes("GMT+0530") || tzAbbr.includes("GMT+5") || tzAbbr.includes("GMT+05:30") || tzAbbr.includes("IST"))) {
      tzAbbr = "Calcutta/Asia";
    }
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
  const [tzInfo, setTzInfo] = useState<{ name: string; offsetFromIST: number }>({
    name: "Eastern Time (ET)",
    offsetFromIST: -9.5,
  });

  useEffect(() => {
    if (isInternational) {
      setTzInfo(getUSTimezoneInfo());
    }
  }, [isInternational]);

  const morningLocal = IST_MORNING_HOURS.map(h => formatTime12h(h + tzInfo.offsetFromIST));
  const eveningLocal = IST_EVENING_HOURS.map(h => formatTime12h(h + tzInfo.offsetFromIST));

  const morningStr = morningLocal.slice(0, -1).join(", ") + " & " + morningLocal[morningLocal.length - 1];
  const eveningStr = eveningLocal.slice(0, -1).join(", ") + " & " + eveningLocal[eveningLocal.length - 1];

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
        ? `Timings of the live yoga classes (${tzInfo.name}):`
        : isUae
          ? "Timings of the live yoga classes (Gulf Standard Time (GST)):"
          : "Timings of the live yoga classes:",
      details: isInternational
        ? [
            `Morning Classes: ${morningStr}`,
            `Evening Classes: ${eveningStr}`,
            "(Mon to Fri)",
            "Recordings of the classes will be provided."
          ]
        : isUae ? [
          "Morning Classes: 4:00 pm, 5:00 pm & 6:00 pm",
          "Evening Classes: 4:00 am, 5:00 am, 6:00 am, 7:00 am and 8:00 am",
          "(Mon to Fri)",
          "Recordings of the classes will be provided."
        ] : [
          "Morning Classes: 5:30 pm, 6:30 pm & 7:30 pm",
          "Evening Classes: 5:30 am, 6:30 am, 7:30 am, 8:30 am and 9:30 am",
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
          {benefits.map((benefit, idx) => {
            if (idx === 3 && isInternational) {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-sm border-2 border-gray-200 relative"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-lg z-10">
                    {idx + 1}
                  </div>

                  <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center mt-2">
                    {/* Left Column: Vertical Image with badge */}
                    <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-md flex-shrink-0 mx-auto">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Bottom Play Badge */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl py-2 px-3 shadow-lg border border-gray-100 flex items-center gap-2.5 z-10">
                        <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-emerald-600 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5 text-[#2E7D32]">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-gray-900 leading-tight">Live & Interactive</span>
                          <span className="text-[10px] text-gray-500 leading-tight">Recordings provided</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Timings and Info */}
                    <div className="flex-1 w-full space-y-4 text-left">
                      {/* Live & Interactive top badge */}
                      <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 12h8" />
                          <path d="M12 8v8" />
                        </svg>
                        <span>LIVE & INTERACTIVE</span>
                      </div>

                      {/* Main Title & Subtitle */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                          <span className="text-2xl">🔥</span> Daily Live Yoga Classes
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Join our expert-led yoga sessions from the comfort of your home. Choose a time that fits your schedule!
                        </p>
                      </div>

                      {/* morning classes block */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F5F7EF]/60 border border-[#E2E6D5] rounded-2xl p-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2E7D32] shadow-sm flex-shrink-0 border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-bold text-gray-900 block">Morning Classes</span>
                        </div>
                        <div className="text-sm text-gray-700 font-medium sm:text-right">
                          {morningStr}
                        </div>
                      </div>

                      {/* evening classes block */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F5F7EF]/60 border border-[#E2E6D5] rounded-2xl p-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2E7D32] shadow-sm flex-shrink-0 border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-bold text-gray-900 block">Evening Classes</span>
                        </div>
                        <div className="text-sm text-gray-700 font-medium sm:text-right">
                          {eveningStr}
                        </div>
                      </div>

                      {/* info block */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* timezone */}
                        <div className="flex items-center gap-3 bg-[#F8F9FA] border border-gray-200/60 rounded-2xl p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                          </svg>
                          <span className="text-xs text-gray-600 text-left">
                            All timings shown in <span className="font-bold text-[#2E7D32]">{tzInfo.name}</span>
                          </span>
                        </div>

                        {/* days */}
                        <div className="flex items-center gap-3 bg-[#F8F9FA] border border-gray-200/60 rounded-2xl p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                          <span className="text-xs text-gray-600 font-bold text-left">
                            Monday to Friday
                          </span>
                        </div>
                      </div>

                      {/* recordings text */}
                      <div className="flex items-center gap-3 bg-[#EAF5ED]/60 border border-[#D0E7D2] rounded-2xl p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#2E7D32] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 8-6 4 6 4V8Z" />
                          <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                        </svg>
                        <span className="text-xs text-gray-700 text-left">
                          Can't make it live? No worries! <span className="font-bold text-[#2E7D32]">Recordings</span> of all classes will be provided.
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-sm border-2 border-gray-200 relative"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-lg z-10">
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
            );
          })}
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
