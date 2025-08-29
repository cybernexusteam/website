"use client";
import { motion } from "motion/react";
import React from "react";

export const LoaderOne = () => {
  const transition = (x: number) => {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: x * 0.2,
      ease: "easeInOut",
    };
  };
  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(0)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
      />
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(1)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
      />
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(2)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
      />
    </div>
  );
};

export const LoaderTwo = () => {
  const transition = (x: number) => {
    return {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: x * 0.2,
      ease: "easeInOut",
    };
  };
  return (
    <div className="flex items-center">
      <motion.div
        transition={transition(0)}
        initial={{
          x: 0,
        }}
        animate={{
          x: [0, 20, 0],
        }}
        className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
      <motion.div
        initial={{
          x: 0,
        }}
        animate={{
          x: [0, 20, 0],
        }}
        transition={transition(0.4)}
        className="h-4 w-4 -translate-x-2 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
      <motion.div
        initial={{
          x: 0,
        }}
        animate={{
          x: [0, 20, 0],
        }}
        transition={transition(0.8)}
        className="h-4 w-4 -translate-x-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
    </div>
  );
};

export const LoaderThree = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-80 h-40 flex items-center justify-center">
        {/* Static Border Background - Lowest layer */}
        <div className="absolute inset-0 border-2 border-gray-700/40 rounded-2xl z-0" />
        
        {/* Rainbow Glowing Effect - Behind text */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-500/15 via-pink-500/15 to-yellow-400/15 rounded-2xl blur-sm z-10"
          animate={{ 
            opacity: [0.2, 0.5, 0.8, 0.5, 0.2],
            scale: [1, 1.02, 1.05, 1.02, 1],
          }}
          transition={{
            duration: 4,
            ease: [0.4, 0.0, 0.2, 1], // Ultra smooth cubic-bezier
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        
        {/* Main RL Text - Middle layer */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-white z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94], // GSAP-style easeOutQuart
          }}
        >
          RL
        </motion.div>
        
        {/* SVG Tracing Line - Simple continuous trace */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-30" 
          viewBox="0 0 320 160"
          fill="none"
        >
          {/* Single continuous line that traces around the rectangle */}
          <motion.rect
            x="2"
            y="2" 
            width="316"
            height="156"
            rx="16"
            ry="16"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ 
              strokeDasharray: "1400",
              strokeDashoffset: "1400"
            }}
            animate={{ 
              strokeDashoffset: "0"
            }}
            transition={{
              duration: 3,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.8
            }}
          />
          {/* Glow effect */}
          <motion.rect
            x="2"
            y="2" 
            width="316"
            height="156"
            rx="16"
            ry="16"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="blur-sm opacity-60"
            initial={{ 
              strokeDasharray: "1400",
              strokeDashoffset: "1400"
            }}
            animate={{ 
              strokeDashoffset: "0"
            }}
            transition={{
              duration: 3,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.8
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export const LoaderFour = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="relative font-bold text-black [perspective:1000px] dark:text-white">
      <motion.span
        animate={{
          skew: [0, -40, 0],
          scaleX: [1, 2, 1],
        }}
        transition={{
          duration: 0.05,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2,
          ease: "linear",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        className="relative z-20 inline-block"
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#00e571]/50 blur-[0.5px] dark:text-[#00e571]"
        animate={{
          x: [-2, 4, -3, 1.5, -2],
          y: [-2, 4, -3, 1.5, -2],
          opacity: [0.3, 0.9, 0.4, 0.8, 0.3],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#8b00ff]/50 dark:text-[#8b00ff]"
        animate={{
          x: [0, 1, -1.5, 1.5, -1, 0],
          y: [0, -1, 1.5, -0.5, 0],
          opacity: [0.4, 0.8, 0.3, 0.9, 0.4],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          times: [0, 0.3, 0.6, 0.8, 1],
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export const LoaderFive = ({ text }: { text: string }) => {
  return (
    <div className="font-sans font-bold [--shadow-color:var(--color-neutral-500)] dark:[--shadow-color:var(--color-neutral-100)]">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              "0 0 0 var(--shadow-color)",
              "0 0 1px var(--shadow-color)",
              "0 0 0 var(--shadow-color)",
            ],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.05,
            ease: "easeInOut",
            repeatDelay: 2,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};
