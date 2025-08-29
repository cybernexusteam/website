"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FutureTube() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);
  const tubeInnerRef = useRef<HTMLDivElement>(null);
  const overlayLeftRef = useRef<HTMLDivElement>(null);
  const overlayRightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const tube = tubeRef.current;
    const tubeInner = tubeInnerRef.current;
    const section = sectionRef.current;
    
    if (!stage || !tubeInner || !section || !tube) return;

    const numLines = 10;
    const fontSize = 4;
    const angle = 360 / numLines;
    let radius = 0;
    let origin = '';

    function set3D() {
      const width = window.innerWidth;
      const fontSizePx = (width / 100) * fontSize;
      radius = (fontSizePx / 2) / Math.sin((180 / numLines) * (Math.PI / 180));
      origin = `50% 50% -${radius}px`;
    }

    function cloneNode() {
      const originalLine = tubeInner.querySelector('.line');
      if (!originalLine) return;

      // Clear any existing clones first
      const existingClones = tubeInner.querySelectorAll('.line:not(:first-child)');
      existingClones.forEach(clone => clone.remove());

      // Add class to original
      originalLine.classList.add('line--1');

      // Create clones
      for (let i = 0; i < (numLines - 1); i++) {
        const newClone = originalLine.cloneNode(true) as HTMLElement;
        const lineClass = `line--${i + 2}`;
        newClone.classList.add(lineClass);
        tubeInner.appendChild(newClone);
      }
    }

    function positionTxt() {
      const lines = tubeInner.querySelectorAll('.line');
      gsap.set(lines, {
        rotationX: function(index) {
          return -angle * index;
        },
        z: radius,
        transformOrigin: origin
      });
    }

    function setProps(targets: Element[]) {
      targets.forEach(function(target) {
        const element = target as HTMLElement;
        const paramSet = gsap.quickSetter(element, "css");
        const degrees = gsap.getProperty(element, "rotateX") as number;
        const radians = degrees * (Math.PI / 180);
        const conversion = Math.abs(Math.cos(radians) / 2 + 0.5);
        const fontW = 200 + 700 * conversion;
        const fontS = `${100 + 700 * conversion}%`;

        paramSet({
          opacity: conversion + 0.1,
          fontWeight: fontW,
          fontStretch: fontS
        });
      });
    }

    function scrollRotate() {
      // Get lines within this specific section
      const lines = tubeInner.querySelectorAll('.line');
      
      // First, fade in overlay text when section comes into view
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top center",
        onEnter: () => {
          gsap.to([overlayLeftRef.current, overlayRightRef.current], {
            opacity: 1,
            duration: 1
          });
        }
      });

      // Main animation: rotation + zoom with pinning
      gsap.to(lines, {
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          onStart: () => {
            // Fade out overlay text when main animation starts
            gsap.to([overlayLeftRef.current, overlayRightRef.current], {
              opacity: 0,
              duration: 2
            });
          }
        },
        rotateX: "+=1080", // Full rotation like original
        onUpdate: function() {
          setProps(this.targets());
        }
      });

      // Perspective zoom - creates the dramatic zoom-in effect
      gsap.to(tube, {
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "top top",
          end: "+=300%"
        },
        perspective: '1vw', // Much stronger zoom than original 100vw
        ease: 'expo.out'
      });

      // Screen shake effect during intense zoom phase
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "150% top",
          end: "+=150%",
          onUpdate: (self) => {
            // Increase shake intensity as zoom progresses
            const progress = self.progress;
            const shakeIntensity = progress * 5; // Max 5px shake
            const randomX = (Math.random() - 0.5) * shakeIntensity;
            const randomY = (Math.random() - 0.5) * shakeIntensity;
            
            gsap.set(section, {
              x: randomX,
              y: randomY
            });
          },
          onComplete: () => {
            // Reset position after shake
            gsap.set(section, { x: 0, y: 0 });
          }
        }
      });
    }

    function init() {
      cloneNode();
      set3D();
      
      const handleResize = () => {
        set3D();
        positionTxt();
      };
      
      window.addEventListener('resize', handleResize);
      
      positionTxt();
      const lines = Array.from(tubeInner.querySelectorAll('.line'));
      setProps(lines);
      scrollRotate();
      
      // Show stage after initialization - like the original
      gsap.to(stage, { autoAlpha: 1, duration: 2, delay: 2 });

      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }

    const cleanup = init();

    return cleanup;
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="w-full h-screen bg-white relative overflow-hidden"
    >
      {/* Overlay Text */}
      <div 
        ref={overlayLeftRef}
        className="absolute top-1/2 left-[5%] transform -translate-y-1/2 text-black pointer-events-none opacity-0 z-10"
        style={{
          fontFamily: 'var(--font-bandeins-strange, system-ui)',
          fontSize: '5vw',
          fontWeight: '900',
          textTransform: 'uppercase',
          textAlign: 'left'
        }}
      >
        Dare <br />to
      </div>
      
      <div 
        ref={overlayRightRef}
        className="absolute top-1/2 right-[5%] transform -translate-y-1/2 text-black pointer-events-none opacity-0 z-10"
        style={{
          fontFamily: 'var(--font-bandeins-strange, system-ui)',
          fontSize: '5vw',
          fontWeight: '900',
          textTransform: 'uppercase',
          textAlign: 'right'
        }}
      >
        Enter <br />the
      </div>

      {/* Main Stage */}
      <div 
        ref={stageRef}
        className="flex items-center justify-center w-full h-full"
        style={{ visibility: 'hidden' }}
      >
        <div 
          ref={tubeRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            perspective: '100vw'
          }}
        >
          <div 
            ref={tubeInnerRef}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h1 
              className="line absolute top-1/2 left-1/2 m-0 uppercase leading-none text-black"
              style={{
                transform: 'translate(-50%, -50%)',
                fontFamily: 'var(--font-bandeins-strange, system-ui)',
                fontSize: 'calc(4 * 1vw)', // Start small, will grow dramatically
                fontStretch: '800%',
                fontWeight: '800',
                transformStyle: 'preserve-3d',
                willChange: 'transform, font-size' // Optimize for animations
              }}
            >
              Future?
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
