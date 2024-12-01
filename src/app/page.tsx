"use client";

import Header from "@/src/components/header";
import StickyCursor from "@/src/components/stickyCursor";
import { BackgroundGradient } from "@/src/components/ui/background-gradient";
import { FlipWords } from "@/src/components/ui/flip-words";
import Hero from "@/src/components/ui/Hero";
import { LayoutGrid } from "@/src/components/ui/layout-grid";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from 'react';



const SkeletonOne = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">What is Cybersecurity?</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. 
    It's all about keeping information safe!
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Why Does It Matter?</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    In today's digital world, cybersecurity helps prevent data breaches, identity theft, and ensures the privacy of individuals and organizations.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Types of Cybersecurity</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    Cybersecurity isn't just about firewalls. 
    It includes network security, encryption, ethical hacking, and more!
    </p>
  </div>
);

const SkeletonFour = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">How You Can Get Involved</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    Interested in learning more? Just keep exploring our website to find out how you can get involved in the world of cybersecurity!
    </p>
  </div>
);

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
    "https://unsplash.com/photos/_Kmtj6UIlGo/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMyODcwNzQwfA&force=true",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
    "https://unsplash.com/photos/gpjvRZyavZc/download?ixid=M3wxMjA3fDB8MXxjb2xsZWN0aW9ufDIwfDMxMzkxNjd8fHx8fDJ8fDE3MzI4NzE0MDB8&force=true",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
    "https://unsplash.com/photos/ZiQkhI7417A/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMyODY5NDAxfA&force=true",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
    "https://unsplash.com/photos/B3l0g6HLxr8/download?force=true",
  },
];

export default function Home() {
  const words = ["Cybersecurity", "Ethical Hacking", "Networking", "Programming", "Linux"];
  const titleRef = useRef<HTMLHeadingElement>(null);

  const ScrollCue = () => (
    <div className="bottom-8 animate-bounce">
      <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
        <div className="w-1 h-3 bg-white rounded-full animate-scrollDown" />
      </div>
    </div>
  );

    const stickyElement = useRef(null);

  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col items-center justify-center overflow-hidden">
      
        <Hero/>

        <Header 
        ref={stickyElement} 
        />
        <StickyCursor stickyElement={stickyElement} />

        <div className="w-full h-[100vh] p-20 bg-black relative">
          <h1 
            ref={titleRef}
            className="text-8xl font-bold text-white text-center cursor-none"
          >
            Welcome to CyberNexus
          </h1>
          <div className="text-2xl text-white text-center mt-3 mb-3">
            A place where you can learn and grow in the world of{" "}
            <span className="text-[#00ccb1]">
              <FlipWords words={words} duration={2500} className="inline-block" />
            </span>
          </div>

          <BackgroundGradient
            animate={true}
            className="absolute inset-x-0 top-[500px] !z-[1] opacity-30 blur-3xl bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
          />
          <LayoutGrid cards={cards} />
        </div>

        <div className="w-full py-80 bg-black">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-white">Join Us Today!</h1>
            <p className="text-xl text-white mt-4 max-w-lg text-center">
              CyberNexus is a community of cybersecurity enthusiasts who are passionate about learning and growing together. 
              Join us today and take the first step towards becoming a leader in the field of cybersecurity!
            </p>
      </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
