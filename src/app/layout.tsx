import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const hostGrotesk = Host_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-host-grotesk"
});

export const metadata: Metadata = {
  title: "RexLabs",
  description: "cheese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}