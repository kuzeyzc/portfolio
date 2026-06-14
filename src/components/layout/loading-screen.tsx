"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOAD_DURATION = 2.5;
const EXIT_DURATION = 0.6;

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const blockWheel = (e: Event) => e.preventDefault();
    const blockTouch = (e: Event) => e.preventDefault();
    document.addEventListener("wheel", blockWheel, { passive: false });
    document.addEventListener("touchmove", blockTouch, { passive: false });

    const unlock = () => {
      html.style.overflow = "";
      body.style.overflow = "";
      document.removeEventListener("wheel", blockWheel);
      document.removeEventListener("touchmove", blockTouch);
      window.scrollTo(0, 0);
    };

    const controls = animate(0, 100, {
      duration: LOAD_DURATION,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (value) => setCount(Math.round(value)),
      onComplete: () => setIsExiting(true),
    });

    return () => {
      controls.stop();
      unlock();
    };
  }, []);

  const handleFadeComplete = () => {
    if (!isExiting) return;
    sessionStorage.setItem("raj-portfolio-loaded", "true");
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#F4F4F5]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
      onAnimationComplete={handleFadeComplete}
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-[#0A0A0A]">
        RAJ DESAI
      </span>

      <span className="font-mono text-xs tabular-nums tracking-[0.2em] text-neutral-500">
        [ {String(count).padStart(3, "0")} ]
      </span>

      <div className="relative h-[1px] w-32 overflow-hidden bg-gray-300">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: LOAD_DURATION, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
}
