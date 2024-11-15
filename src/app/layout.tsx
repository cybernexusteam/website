import type { Metadata } from "next";
import { Lexend_Exa } from "next/font/google";
import "./globals.css";

const inter = Lexend_Exa({
  subsets: ['latin']
})
export const metadata: Metadata = {
  title: "CyberNexus",
  description: "Cybersecurity and technology club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={inter.className}
      >
        <div className="bg-black">
        {children}
        </div>
        
      </body>
    </html>
  );
}
