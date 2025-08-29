"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const ellipseRef = useRef<SVGPathElement | null>(null);
  const rect1Ref = useRef<HTMLDivElement | null>(null);
  const rect2Ref = useRef<HTMLDivElement | null>(null);
  const rect3Ref = useRef<HTMLDivElement | null>(null);
  const sparkle1Ref = useRef<HTMLDivElement | null>(null);
  const sparkle2Ref = useRef<HTMLDivElement | null>(null);
  const sparkle3Ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main circle animation around text
      if (ellipseRef.current) {
        const path = ellipseRef.current;
        const length = path.getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: length * 0.3,
          strokeDashoffset: length
        });

        gsap.to(path, {
          strokeDashoffset: -length * 2,
          duration: 20,
          ease: "none",
          repeat: -1
        });
      }

      // Simple curved lines animation
      gsap.utils.toArray<SVGPathElement>(".animate-line-1, .animate-line-2").forEach((line, i) => {
        const length = line.getTotalLength();
        
        gsap.set(line, {
          strokeDasharray: length * 0.3,
          strokeDashoffset: length
        });

        gsap.to(line, {
          strokeDashoffset: -length,
          duration: 12 + i * 2,
          ease: "none",
          repeat: -1
        });
      });

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(rect1Ref.current, { 
        x: 40, 
        y: -20, 
        rotation: 3,
        duration: 6, 
        ease: "power2.inOut" 
      }, 0)
      .to(rect2Ref.current, { 
        x: -30, 
        y: 15, 
        rotation: -4,
        duration: 6, 
        ease: "power2.inOut" 
      }, 1)
      .to(rect3Ref.current, { 
        x: 25, 
        y: -25, 
        rotation: 5,
        duration: 6, 
        ease: "power2.inOut" 
      }, 2);

      const createLiquidEffect = (element: HTMLElement, gradients: string[]) => {
        let currentGradientIndex = 0;

        const animateGradients = () => {
          const currentGradient = gradients[currentGradientIndex];

          gsap.to(element, {
            backgroundImage: currentGradient, // Use backgroundImage for gradients
            duration: 4, // Slower transition duration
            ease: "sine.inOut", // Smoother easing
            onComplete: () => {
              currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
              animateGradients();
            },
          });
        };

        animateGradients();
      };

      const rect1Child = rect1Ref.current?.firstElementChild as HTMLElement;
      const rect2Child = rect2Ref.current?.firstElementChild as HTMLElement;
      const rect3Child = rect3Ref.current?.firstElementChild as HTMLElement;
      
      if (rect1Child) {
        const gradients1 = [
          "linear-gradient(120deg, #ff6ec4 0%, #7873f5 100%)",
          "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
          "linear-gradient(120deg, #5ee7df 0%, #b490ca 100%)",
        ];
        createLiquidEffect(rect1Child, gradients1);
      }

      if (rect2Child) {
        const gradients2 = [
          "linear-gradient(120deg, #ff9a9e 0%, #fad0c4 100%)",
          "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          "linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)",
        ];
        createLiquidEffect(rect2Child, gradients2);
      }

      if (rect3Child) {
        const gradients3 = [
          "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
          "linear-gradient(120deg, #ffecd2 0%, #fcb69f 100%)",
        ];
        createLiquidEffect(rect3Child, gradients3);
      }

      [sparkle1Ref.current, sparkle2Ref.current, sparkle3Ref.current].forEach((sparkle, i) => {
        if (sparkle) {
          gsap.to(sparkle, {
            rotation: 360,
            duration: 4 + i,
            ease: "none",
            repeat: -1
          });
          gsap.to(sparkle, {
            scale: 1.3,
            duration: 2 + i * 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        }
      });

      // Animate background lines to continuously move from left to right
      gsap.utils.toArray<SVGPathElement>("path").forEach((line, i) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(line, {
          strokeDashoffset: -length,
          duration: 8 + i * 1.5, // Add variance to each line's speed
          ease: "linear",
          repeat: -1,
        });
      });

      // Animate the text with quirky effects
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { scale: 0.5, opacity: 0, rotation: -45, skewX: 30 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            skewX: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.75)",
            delay: 0.5,
          }
        );
        gsap.to(textRef.current, {
          y: -10,
          duration: 0.8,
          ease: "bounce.out",
          delay: 2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#e8e8ed]">
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        viewBox="0 0 1440 800" 
        fill="none"
      >
        <path
          d="M 0 200 Q 360 100 720 200 Q 1080 300 1440 200"
          stroke="black"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M 0 300 Q 360 200 720 300 Q 1080 400 1440 300"
          stroke="black"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M 0 400 Q 360 300 720 400 Q 1080 500 1440 400"
          stroke="black"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M 0 500 Q 360 400 720 500 Q 1080 600 1440 500"
          stroke="black"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M 0 600 Q 360 500 720 600 Q 1080 700 1440 600"
          stroke="black"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
      </svg>

      <div className="relative px-16 pt-32 z-20 flex justify-start items-center min-h-[500px]">
        <h1
          ref={textRef}
          className="text-[80px] leading-[0.9] font-bold text-gray-800 max-w-[800px] tracking-[-0.03em] font-serif ml-8"
        >
          The <span className="font-extrabold">next best</span> thing<br />
          <span className="font-light">since sliced bread</span>
        </h1>
      </div>

      <div 
        ref={rect1Ref}
        className="absolute top-[240px] right-[200px] w-[620px] h-[390px] rounded-[32px] will-change-transform overflow-hidden z-10"
      >
        <div className="absolute inset-0 rounded-[32px] shadow-xl bg-[radial-gradient(circle, rgba(135,206,235,0.8) 0%, rgba(221,160,221,0.6) 50%, rgba(255,179,71,0.4) 100%)]"></div>
      </div>

      <div 
        ref={rect2Ref}
        className="absolute top-[530px] right-[730px] w-[100px] h-[160px] rounded-[28px] will-change-transform overflow-hidden z-15"
      >
        <div className="absolute inset-0 rounded-[28px] shadow-xl bg-[radial-gradient(circle, rgba(50,205,50,0.8) 0%, rgba(255,215,0,0.6) 50%, rgba(255,99,71,0.4) 100%)]"></div>
      </div>

      <div 
        ref={rect3Ref}
        className="absolute top-[190px] right-[140px] w-[120px] h-[180px] rounded-[24px] will-change-transform overflow-hidden z-10"
      >
        <div className="absolute inset-0 rounded-[24px] shadow-lg bg-[radial-gradient(circle, rgba(135,206,235,0.8) 0%, rgba(65,105,225,0.6) 50%, rgba(30,144,255,0.4) 100%)]"></div>
      </div>

      <div 
        ref={sparkle1Ref}
        className="absolute top-[200px] left-[400px] w-3 h-3 bg-yellow-400 rounded-full opacity-80 z-30"
        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
      />
      
      <div 
        ref={sparkle2Ref}
        className="absolute top-[450px] right-[200px] w-4 h-4 bg-pink-400 rounded-full opacity-70 z-30"
        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
      />
      
      <div 
        ref={sparkle3Ref}
        className="absolute top-[350px] left-[500px] w-2 h-2 bg-blue-400 rounded-full opacity-90 z-30"
        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
      />
    </section>
  );
}