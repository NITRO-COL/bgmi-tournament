import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// Preload key resources
export const metadata: Metadata = {
  title: "Battleground Arena Tournament Organizer",
  description: "Join the ultimate battleground tournament and compete for exciting prizes",
  icons: {
    icon: '/bgmi-logo.png',
  },
  // Add performance optimizations
  other: {
    "google-site-verification": "your-verification-code-here",
  }
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-blue-900 to-blue-950`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <footer className="bg-gray-800/80 backdrop-blur-sm py-8 border-t border-gray-700 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Image 
                  src="/bgmi-logo.png" 
                  alt="Battleground Arena Tournament Organizer Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                  priority={true}
                />
                <span className="text-xl font-bold text-blue-100">Battleground Arena</span>
              </div>
              <div className="text-blue-200 text-center md:text-right">
                <p>&copy; 2025 Battleground Arena Tournament Organizer. All rights reserved.</p>
                <p className="mt-1">Designed for competitive gaming enthusiasts</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}