import { useEffect } from "react";
import { motion } from "framer-motion";
import "./SmokeIntro.css";

interface SmokeIntroProps {
  onFinish: () => void;
}

export default function SmokeIntro({ onFinish }: SmokeIntroProps) {
  // automatically advance after a few seconds
  useEffect(() => {
    const timer = setTimeout(onFinish, 6000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="smoke-container">
      <div className="black-overlay"></div>
      {/* Smoke Video */}
      <video autoPlay muted loop className="smoke-video">
        <source src="/smoke.mp4" type="video/mp4" />
      </video>

      {/* Text Content */}
      <motion.div
        className="content absolute z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="font-heading font-bold text-gradient lowercase" style={{ fontSize: '200px' }}>
          vantage
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          AI Role-Readiness & Upskilling Engine
        </p>
      </motion.div>
    </div>
  );
}
