'use client';

import { Lexend_Exa } from "next/font/google";
import { useRef } from "react";
import Header from "../components/header";
import StickyCursor from "../components/stickyCursor";
import "./globals.css";

const inter = Lexend_Exa({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const stickyElement = useRef(null);

  return (
    <html lang="en" className="dark">
      <body
      
      className={inter.className}
      >
        <Header 
        ref={stickyElement} 
        />
        <StickyCursor stickyElement={stickyElement} />
        <div className="bg-black">
        {children}
        </div>
        
      </body>
    </html>
  );
}
