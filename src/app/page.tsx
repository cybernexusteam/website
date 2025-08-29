"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GradientBackground } from "@/components/GradientBackground";
import LoaderThreeDemo from "../components/loader-three-demo";
import FutureTube from "@/components/FutureTube";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageAnimations, setStartPageAnimations] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setShowLoader(false);
      setStartPageAnimations(true);
    }, 4600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* Initial Landing Page */}
      <div className="relative min-h-screen overflow-hidden">
        {showLoader && (
          <div
            className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <LoaderThreeDemo />
          </div>
        )}

        <GradientBackground />

        <div
          className={`relative z-10 min-h-screen flex flex-col transition-opacity duration-800 ${
            showLoader ? "opacity-0" : "opacity-100"
          }`}
        >
          <nav className={`flex items-center justify-between px-8 py-6 relative ${
            startPageAnimations ? "animate-slide-down" : ""
          }`}>
            <Image
              src="/logogo.svg"
              alt="RexLabs Logo"
              width={48}
              height={48}
              className={`w-12 h-12 ${
                startPageAnimations ? "animate-fade-in" : ""
              }`}
            />
            
            <div className="hidden md:flex items-center space-x-8 text-lg font-bold text-black">
              <span className={`cursor-pointer hover:text-gray-700 transition-colors ${
                startPageAnimations ? "animate-sparkle-in animation-delay-200" : ""
              }`}>
                Work
              </span>
              <span className={`cursor-pointer hover:text-gray-700 transition-colors ${
                startPageAnimations ? "animate-sparkle-in animation-delay-400" : ""
              }`}>
                Our Crew
              </span>
              <span className={`cursor-pointer hover:text-gray-700 transition-colors ${
                startPageAnimations ? "animate-sparkle-in animation-delay-600" : ""
              }`}>
                Projects
              </span>
              <span className={`cursor-pointer hover:text-gray-700 transition-colors ${
                startPageAnimations ? "animate-sparkle-in animation-delay-800" : ""
              }`}>
                Contact
              </span>
            </div>

            <button className="md:hidden p-2">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-black"></div>
                <div className="w-full h-0.5 bg-black"></div>
                <div className="w-full h-0.5 bg-black"></div>
              </div>
            </button>
          </nav>

          <main className="flex-1 flex items-center justify-center px-8">
            <div className="text-center max-w-6xl mx-auto">
              <div className={`mb-8 ${
                startPageAnimations ? "animate-title-dramatic animation-delay-1000" : "opacity-0"
              }`}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight leading-none text-black">
                  The next best thing since sliced bread
                </h1>
              </div>

              <div className={`mb-12 ${
                startPageAnimations ? "animate-fade-in animation-delay-1200" : "opacity-0"
              }`}>
              </div>

              <div className={`${
                startPageAnimations ? "animate-fade-in animation-delay-1400" : "opacity-0"
              }`}>
                <button className="px-10 py-5 bg-black/10 backdrop-blur-sm border-2 border-black/20 rounded-full text-xl font-bold hover:bg-black/20 transition-all duration-300 hover:scale-105 hover:border-black/30 text-black">
                  Explore Our Work
                </button>
              </div>
            </div>
          </main>

          <footer className={`flex items-center justify-between px-8 py-6 text-gray-600 ${
            startPageAnimations ? "animate-fade-in animation-delay-1600" : "opacity-0"
          }`}>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="font-semibold">&copy; 2025 RexLabs. All rights reserved.</p>
              <div className="flex space-x-6 text-sm font-medium">
                <span className="hover:text-black cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-black cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-black cursor-pointer transition-colors">Contact</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm font-semibold">Follow us</span>
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer transition-colors"></div>
                <div className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer transition-colors"></div>
                <div className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer transition-colors"></div>
              </div>
            </div>
          </footer>
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10 p-4">
          <div className="flex justify-center space-x-8 text-sm font-semibold text-white">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Work</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Team</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Projects</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>

      {/* Future Tube Section */}
      <FutureTube />

      {/* About Section with Sliding Content */}
      <AboutSection />

      {/* Additional Content */}
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-8">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
            Ready to Build?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's create something extraordinary together. The future starts now.
          </p>
        </div>
      </div>
    </>
  );
}
