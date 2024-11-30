import '@/src/app/globals.css';
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { HeroParallax } from "./hero-parallax";

export const products = []
const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleText = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 2 },
      });
      await controls.start({ //TODO: jake we need to like do a useEffect hook here, im to tired to do it rn pls fix 
                            //EDIT: what in the world its in side a useEffect hook why am i getting random errors.
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
          <span className="flex justify-start items-end">Nexus</span>
        </motion.div>
      </div>
      <div className="w-full h-screen">
        <HeroParallax products={products} />
      </div>
    </motion.div>
  );
};

export default Hero;
