'use client'

import { NavbarDemo } from "@/components/ui/Nav";
import { motion } from "framer-motion"
import "./globals.css";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <motion.div
        initial={{opacity:0, y: 20}}
        animate={{opacity:1, y: 0}}
        transition={{type:"string", duration:2, delay:2}}
      >
        <NavbarDemo/>
      </motion.div>
      <div className="flex items-center justify-center h-full">
        <div className="text-4xl font-bold text-black dark:text-white w-1/2 grid grid-cols-2 grid-rows-1 gap-0 h-16">
          <motion.div
            initial={{opacity:0, y: -20}}
            animate={{opacity:1, y: 0}}
            transition={{type:"string", duration:1}}
          >
            <span className="flex items-start justify-end garet-book-font">Cyber</span>
          </motion.div>
          <motion.div
            initial={{opacity:0, y: 20}}
            animate={{opacity:1, y: 0}}
            transition={{type:"string", duration:0.8, delay:0.8}}
          >
            <span className="flex justify-start items-end garet-book-font">Nexus</span>
          </motion.div>
        </div>
      </div>
    </div>  
  );
}