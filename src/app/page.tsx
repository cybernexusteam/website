'use client';
import { useEffect, useState } from 'react';
import anime from 'animejs';

export default function LandingAnimation() {
  const [showMainPage, setShowMainPage] = useState(false);
  const [mainContentReady, setMainContentReady] = useState(false);
 
  useEffect(() => {
    // Create the letter elements for initial animation
    const textWrapper = document.querySelector(".ml12");
    if (textWrapper) {
      // Start with all letters hidden and positioned below
      textWrapper.innerHTML = '';
      const text = "CYBERNEXUS";
     
      for (let i = 0; i < text.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter inline-block';
        letterSpan.textContent = text[i];
        letterSpan.style.opacity = '0';
        letterSpan.style.transform = 'translateY(50px)';
        textWrapper.appendChild(letterSpan);
      }

      // Animate each letter after a brief delay
      setTimeout(() => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, i) => {
          setTimeout(() => {
            (letter as HTMLElement).style.transition = 'all 1.2s ease-out';
            (letter as HTMLElement).style.opacity = '1';
            (letter as HTMLElement).style.transform = 'translateY(0px)';
          }, 150 * i);
        });

        // Move text and background after the letters animation
        setTimeout(() => {
          moveTextAndBg();
        }, 150 * text.length + 1200);
      }, 100);
    }
   
    function moveTextAndBg() {
      // Move text fully to the right using anime.js
      anime({
        targets: ".ml12",
        translateX: ["0%", "150%"],
        duration: 2500,
        easing: "easeInOutQuart"
      });

      // White background animation with anime.js
      setTimeout(() => {
        anime({
          targets: ".moving-bg",
          translateX: ["-100%", "0%"],
          duration: 3000,
          easing: "easeInOutQuart",
          complete: function() {
            setTimeout(() => {
              setShowMainPage(true);
              // Once main page is shown, initiate content animations after a small delay
              setTimeout(() => {
                setMainContentReady(true);
              }, 100);
            }, 500);
          }
        });
      }, 400);
    }
  }, []);

  // Main page content animations
  useEffect(() => {
    if (!mainContentReady) return;

    // Step 1: Animate vertical lines dropping down
    const lineAnimation = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200
    });

    lineAnimation
      .add({
        targets: '.vertical-line',
        height: [0, '100%'],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '.line-x',
        opacity: [0, 1],
        scale: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .5)',
      }, '-=300');

    // Step 2: Cybersecurity text jumble animation
    setTimeout(() => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const targetText = "CYBERSECURITY";
      const textElement = document.querySelector('.jumble-text');
      
      if (textElement) {
        let iteration = 0;
        let interval = setInterval(() => {
          textElement.textContent = targetText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
          
          if (iteration >= targetText.length) {
            clearInterval(interval);
            
            // Step 3: Fade in "ORGANIZATION" text after jumble completes
            setTimeout(() => {
              anime({
                targets: '.org-text',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 1000,
                easing: 'easeOutQuad',
                complete: () => {
                  // Step 4: Fade in remaining elements
                  setTimeout(() => {
                    anime({
                      targets: ['.hamburger', '.small-text', '.copyright'],
                      opacity: [0, 1],
                      duration: 800,
                      delay: anime.stagger(200),
                      easing: 'easeOutQuad'
                    });
                  }, 300);
                }
              });
            }, 500);
          }
          
          iteration += 1/3;
        }, 30);
      }
    }, 1000);
  }, [mainContentReady]);
 
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {!showMainPage && (
        <>
          {/* Moving White Background */}
          <div className="moving-bg absolute top-0 left-0 w-full h-full bg-white z-40" style={{ transform: 'translateX(-100%)' }}></div>
          {/* CyberNexus Text */}
          <h1 className="ml12 text-8xl font-bold text-white absolute bottom-24 left-16 z-50 whitespace-nowrap"></h1>
        </>
      )}
      
      {showMainPage && (
        <div className="actual-landing relative w-screen h-screen bg-white">
          {/* Vertical line with X's */}
          <div className="vertical-line absolute left-32 top-0 w-px bg-black h-0 opacity-0">
            <div className="line-x absolute -left-3 top-72 opacity-0">
              <div className="w-6 h-1 bg-black transform rotate-45"></div>
              <div className="w-6 h-1 bg-black transform -rotate-45 -mt-1"></div>
            </div>
            <div className="line-x absolute -left-3 bottom-12 opacity-0">
              <div className="w-6 h-1 bg-black transform rotate-45"></div>
              <div className="w-6 h-1 bg-black transform -rotate-45 -mt-1"></div>
            </div>
          </div>
          
          {/* "A HIGH SCHOOL" text */}
          <div className="small-text absolute left-32 top-72 text-sm opacity-0 font-normal tracking-wider">
            A HIGH SCHOOL
          </div>
          
          {/* Main title */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-left w-full max-w-6xl px-8">
            <h1 className="jumble-text text-8xl font-bold tracking-tight leading-none" style={{ 
              background: 'linear-gradient(90deg, #a455ff 0%, #a4ff55 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              CYBERSECURITY
            </h1>
            <h2 className="org-text text-8xl font-bold tracking-tight text-black opacity-0 mt-0 leading-none">
              ORGANIZATION
            </h2>
          </div>
          
          {/* Hamburger menu */}
          <div className="hamburger absolute top-8 right-8 opacity-0">
            <div className="w-8 h-1 bg-black mb-2"></div>
            <div className="w-8 h-1 bg-black"></div>
          </div>
          
          {/* Copyright text */}
          <div className="copyright absolute bottom-6 right-6 text-sm opacity-0 font-light">
            Cybernexus © 2025
          </div>
          
          {/* Dotted pattern in bottom right */}
          <div className="absolute bottom-12 right-12 opacity-0" style={{ width: '60px', height: '60px' }}>
            <div className="grid grid-cols-5 gap-1">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}