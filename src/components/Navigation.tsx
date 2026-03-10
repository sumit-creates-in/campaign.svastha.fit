import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import svasthaLogo from "@/assets/svastha.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="py-5 bg-transparent">
      {/* <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3 flex-shrink min-w-0"
          >
            <img
              src={svasthaLogo}
              alt="Svastha Wellness"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover flex-shrink-0"
            />
            <span className="text-base sm:text-lg md:text-2xl font-bold text-primary whitespace-nowrap">
              Svastha
            </span>
          </motion.div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navigation;
