"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { resetPageScroll, useLenis } from "@/components/providers/smooth-scroll-provider";

interface LoadingScreenProps {
  onComplete: () => void;
}

const TEXT = "NORTH BOUND";
const CHAR_STAGGER = 0.25;
const HOLD_MS = 500;
const EXIT_DURATION = 0.8;
const CURSOR_BLINK_DURATION = 0.85;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: CHAR_STAGGER,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.05, ease: "linear" as const },
  },
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const lenis = useLenis();
  const [typingComplete, setTypingComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const typingDoneRef = useRef(false);
  const exitDoneRef = useRef(false);

  useLayoutEffect(() => {
    resetPageScroll(lenis);
  }, [lenis]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    lenis?.stop();
    resetPageScroll(lenis);

    const blockWheel = (e: Event) => e.preventDefault();
    const blockTouch = (e: Event) => e.preventDefault();
    document.addEventListener("wheel", blockWheel, { passive: false });
    document.addEventListener("touchmove", blockTouch, { passive: false });

    return () => {
      document.removeEventListener("wheel", blockWheel);
      document.removeEventListener("touchmove", blockTouch);
    };
  }, [lenis]);

  useLayoutEffect(() => {
    if (!isExiting) return;
    resetPageScroll(lenis);
  }, [isExiting, lenis]);

  const handleTypingComplete = () => {
    if (typingDoneRef.current) return;
    typingDoneRef.current = true;
    setTypingComplete(true);
    window.setTimeout(() => {
      resetPageScroll(lenis);
      setIsExiting(true);
    }, HOLD_MS);
  };

  const handleFadeComplete = () => {
    if (!isExiting || exitDoneRef.current) return;
    exitDoneRef.current = true;

    resetPageScroll(lenis);
    lenis?.start();

    sessionStorage.setItem("raj-portfolio-loaded", "true");
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex w-full items-center justify-center text-center bg-[#F4F4F5]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: EXIT_DURATION, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={handleFadeComplete}
      aria-busy={!isExiting}
      aria-label="Loading"
      style={{ pointerEvents: isExiting ? "none" : "auto" }}
    >
      <div className="w-full max-w-[90vw]">
        <h1
          className="hero-name-line font-display font-bold text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.82] tracking-[-0.04em] whitespace-nowrap"
          style={{ color: "var(--text)" }}
          aria-label={TEXT}
        >
          <motion.span
            className="inline-flex items-baseline justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={handleTypingComplete}
          >
            {TEXT.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={charVariants}
                className="char inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}

            {typingComplete && (
              <motion.span
                aria-hidden
                className="inline-block shrink-0 self-center"
                style={{
                  width: "0.045em",
                  height: "0.72em",
                  marginLeft: "0.04em",
                  marginBottom: "0.05em",
                  backgroundColor: "var(--text)",
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: CURSOR_BLINK_DURATION,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1],
                }}
              />
            )}
          </motion.span>
        </h1>
      </div>
    </motion.div>
  );
}
