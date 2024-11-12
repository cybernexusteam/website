import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MovingText = () => {
    const firstText = useRef(null);

    const secondText = useRef(null);
  
    const thirdText = useRef(null);
    const slider = useRef(null);
    const ScrollCue = () => {
      return (
        <div className="fixed bottom-8 right-8 animate-bounce">
          <div className="w-6 h-11 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full animate-scrollDown" />
          </div>
        </div>
      );
    };

  useEffect(() => {
    let xPercent = 0;
    let direction = -1;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-700px",
    });

    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
      gsap.set(thirdText.current, { xPercent: xPercent });
      xPercent += 0.4 * direction;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:2, delay:3}}
    className="relative flex h-[270px] w-full z-10 overflow-hidden">
      <div className="absolute w-full">
        <div ref={slider} className="relative whitespace-nowrap">
          {/* Wrap both text elements together to prevent overlap */}
          <div className="flex">
            <p
              ref={firstText}
              className="relative m-0 text-white text-[230px] font-medium pr-[45px]"
            >
              CYBERNEXUS
            </p>
            <p
              ref={secondText}
              className="relative m-0 text-white text-[230px] font-medium pr-[45px]"
            >
              CYBERNEXUS
            </p>
            <p
              ref={thirdText}
              className="relative m-0 text-white text-[230px] font-medium pr-[45px]"
            >
              CYBERNEXUS
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovingText;