"use client";

import { NavbarDemo } from "../components/ui/Nav";
import Hero  from "../components/ui/Hero"
import { AnimatePresence, motion } from "framer-motion";


export default function Home() {
  

  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col items-center justify-center overflow-hidden">
      <NavbarDemo />
      <Hero/>
      <div className="w-full h-[100vh]">
        <h1 className="text-4xl font-bold text-black dark:text-white">Welcome to Cybernexus</h1>
        <p className="text-lg text-black dark:text-white">A place where you can learn about cybersecurity and technology</p>
      </div>
    </motion.div>
    </AnimatePresence>
    
  );
}
