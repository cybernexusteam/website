"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const slides = [
  {
    title: "Lorem Ipsum Dolor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    title: "Consectetur Adipiscing",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "Sed Do Eiusmod",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    title: "Tempor Incididunt",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blackBoxRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const blackBox = blackBoxRef.current;
    const rightText = rightTextRef.current;
    const leftText = leftTextRef.current;
    const dots = dotsRef.current;
    
    if (!section || !blackBox || !rightText || !leftText) return;

    // Set initial positions
    gsap.set(blackBox, { x: '100%' }); // Start way to the right
    gsap.set(leftText, { opacity: 1, x: 0 }); // Text on left (opposite of box)
    gsap.set(rightText, { opacity: 0, x: 50 });
    gsap.set(dots, { backgroundColor: '#d1d5db' });
    if (dots[0]) gsap.set(dots[0], { backgroundColor: '#000000' });

    // Update initial content
    if (leftText.querySelector('h2')) leftText.querySelector('h2')!.textContent = slides[0].title;
    if (leftText.querySelector('p')) leftText.querySelector('p')!.textContent = slides[0].text;

    // Pin section for 4 cycles
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400%",
      pin: true,
      pinSpacing: true
    });

    // Main timeline for smooth continuous movement
    const mainTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentSlideIndex = Math.floor(progress * 4);
          const slideProgress = (progress * 4) % 1;
          
          // Update active dot
          dots.forEach((dot, index) => {
            gsap.to(dot, {
              backgroundColor: index === currentSlideIndex ? '#000000' : '#d1d5db',
              duration: 0.1
            });
          });
        }
      }
    });

    // Cycle 1: Box right to left, text left to right
    mainTL.to(blackBox, { x: '-100%', duration: 1, ease: 'power2.inOut' }, 0)
           .to(leftText, { opacity: 0, x: -50, duration: 0.3 }, 0.2)
           .to(rightText, { 
             opacity: 1, 
             x: 0, 
             duration: 0.4,
             onStart: () => {
               if (rightText.querySelector('h2')) rightText.querySelector('h2')!.textContent = slides[1].title;
               if (rightText.querySelector('p')) rightText.querySelector('p')!.textContent = slides[1].text;
             }
           }, 0.3);

    // Cycle 2: Box left to right, text right to left  
    mainTL.to(blackBox, { x: '100%', duration: 1, ease: 'power2.inOut' }, 1)
           .to(rightText, { opacity: 0, x: 50, duration: 0.3 }, 1.2)
           .to(leftText, { 
             opacity: 1, 
             x: 0, 
             duration: 0.4,
             onStart: () => {
               if (leftText.querySelector('h2')) leftText.querySelector('h2')!.textContent = slides[2].title;
               if (leftText.querySelector('p')) leftText.querySelector('p')!.textContent = slides[2].text;
             }
           }, 1.3);

    // Cycle 3: Box right to left, text left to right
    mainTL.to(blackBox, { x: '-100%', duration: 1, ease: 'power2.inOut' }, 2)
           .to(leftText, { opacity: 0, x: -50, duration: 0.3 }, 2.2)
           .to(rightText, { 
             opacity: 1, 
             x: 0, 
             duration: 0.4,
             onStart: () => {
               if (rightText.querySelector('h2')) rightText.querySelector('h2')!.textContent = slides[3].title;
               if (rightText.querySelector('p')) rightText.querySelector('p')!.textContent = slides[3].text;
             }
           }, 2.3);

    // Cycle 4: Box left to right, text right to left (final)
    mainTL.to(blackBox, { x: '100%', duration: 1, ease: 'power2.inOut' }, 3)
           .to(rightText, { opacity: 0, x: 50, duration: 0.3 }, 3.2)
           .to(leftText, { 
             opacity: 1, 
             x: 0, 
             duration: 0.4,
             onStart: () => {
               if (leftText.querySelector('h2')) leftText.querySelector('h2')!.textContent = slides[0].title;
               if (leftText.querySelector('p')) leftText.querySelector('p')!.textContent = slides[0].text;
             }
           }, 3.3);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full h-screen bg-white relative overflow-hidden"
    >
      {/* Black rectangle - moves right to left, bigger size */}
      <div 
        ref={blackBoxRef}
        className="absolute w-[800px] h-120 bg-black rounded-2xl shadow-2xl"
        style={{ 
          top: '60%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Left text - shows when box is on right */}
      <div 
        ref={leftTextRef}
        className="absolute left-16 top-1/2 transform -translate-y-1/2 max-w-lg opacity-0"
      >
        <h2 className="text-5xl font-black text-black mb-6 leading-tight">
          {slides[0].title}
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          {slides[0].text}
        </p>
      </div>

      {/* Right text - shows when box is on left */}
      <div 
        ref={rightTextRef}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 max-w-lg opacity-1"
      >
        <h2 className="text-5xl font-black text-black mb-6 leading-tight">
          {slides[0].title}
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          {slides[0].text}
        </p>
      </div>
      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <div 
            key={index}
            ref={el => { if (el) dotsRef.current[index] = el; }}
            className="w-3 h-3 rounded-full bg-gray-300 transition-colors duration-300"
          />
        ))}
      </div>
    </div>
  );
}
