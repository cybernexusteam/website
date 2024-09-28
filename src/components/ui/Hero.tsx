import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import MovingText from "./MovingText";
import { HeroParallax } from "./hero-parallax";

export const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },
   
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },
   
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },
   
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
  ];
const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleText = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 2 },
      });
      await controls.start({
        opacity: 0,
        y: -20,
        transition: { duration: 1 },
      });
    };
    handleText();
  }, [controls]);
  
  return (
    <motion.div
      id="logo"
      className="flex items-center justify-center w-full h-screen"
    >
      <div className="absolute text-4xl font-bold text-black dark:text-white grid grid-cols-2 grid-rows-1 gap-0 h-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          transition={{ type: "spring", duration: 1 }}
          className="bg-transparent col-start-1"
        >
          <span className="flex items-start justify-end">Cyber</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ type: "spring", duration: 1, delay: 1 }}
        >
          <span className="flex justify-start items-end">nexus</span>
        </motion.div>
      </div>
      <div className="w-full h-screen">
        <HeroParallax products={products} />
      </div>
    </motion.div>
  );
};

export default Hero;
