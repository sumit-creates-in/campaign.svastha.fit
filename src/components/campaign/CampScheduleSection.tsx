import { motion } from "framer-motion";
import { Calendar, Clock, Video, CheckCircle2 } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

const CampScheduleSection = ({ orientationDisplay }: { orientationDisplay?: string }) => {
  const orientationTopics = [
    "How the 14-day program works",
    "Fat loss habits",
    "Correct yoga practice",
    "Getting best results"
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="w-full px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Camp Schedule
          </h2>
        </motion.div>

        <div className="grid gap-4">
          {/* Day 0 - Orientation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-lg border-2 border-blue-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg whitespace-nowrap w-fit">
                Day 0
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Orientation Session</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-md">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">22 March (Sunday)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-md">
                <Clock className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">
                    {orientationDisplay || "10:00 AM Eastern Time (ET)"}
                    {!orientationDisplay && (
                      <ReactCountryFlag countryCode="US" svg style={{ width: "1.1em", height: "1.1em", marginLeft: "0.5em" }} />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-900">Live on Zoom</p>
              </div>
              <p className="text-gray-700 mb-4 font-semibold">What will be covered:</p>
              <div className="space-y-2">
                {orientationTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Day 1 - Camp Begins */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 shadow-lg border-2 border-green-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-lg whitespace-nowrap w-fit">
                Day 1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Camp Begins</h3>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <p className="text-lg text-gray-700">
                <span className="font-semibold">23 March</span> - Your transformation journey starts!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampScheduleSection;
