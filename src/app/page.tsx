"use client";

import { LeNavbar } from "@/src/components/ui/Nav";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "../components/ui/Hero";


export default function Home() {
  const ScrollCue = () => {
    return (
      <div className="fixed bottom-8 right-8 animate-bounce">
        <div className="w-6 h-11 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full animate-scrollDown" />
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col items-center justify-center overflow-hidden">
      < LeNavbar />
      <Hero/>
      <ScrollCue />
      <div className="w-full h-[100vh]">
        <h1 className="text-4xl font-bold text-black dark:text-white">Welcome to Cybernexus</h1>
        <p className="text-lg text-black dark:text-white">A place where you can learn about cybersecurity and technology</p>
      </div>
    </motion.div>
    </AnimatePresence>
    
  );
}
