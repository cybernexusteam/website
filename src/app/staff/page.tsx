"use client";

import { LeNavbar } from "@/src/components/ui/Nav";
import { AnimatePresence, motion } from "framer-motion";

export default function staff() {
  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col items-center justify-center overflow-hidden h-screen w-screen">
        <LeNavbar />
        <div className="w-full h-[100vh] bg-black text-white ">
          <h1 className="text-6xl font-bold mb-4">Welcome to Cybernexus</h1>
          <p className="text-xl mb-8">Join us in exploring the fascinating world of cybersecurity and technology. Our club is dedicated to providing a supportive and engaging environment for all members.</p>
          <div className="flex flex-col gap-4">
            <p>At Cybernexus, we offer a variety of resources to help you develop your skills and knowledge in cybersecurity. From hands-on workshops to guest lectures from industry experts, our events are designed to challenge and inspire you.</p>
            <p>In addition to our events, we also provide a platform for members to collaborate and share their experiences. Whether you're a beginner or an experienced professional, Cybernexus has something for everyone.</p>
            <p>Whether you're interested in ethical hacking, cybersecurity law, or emerging technologies, Cybernexus can help you achieve your goals. Join us today and take the first step towards becoming a leader in the field of cybersecurity.</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

//move div down 10 pixels
