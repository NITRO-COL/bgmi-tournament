"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn: isAdminUser } = useAdminAuth();
  const adminLink = isAdminUser ? '/admin/dashboard' : '/admin/login';

  return (
    <header className="bg-blue-800/80 backdrop-blur-sm py-4 border-b border-blue-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/bgmi-logo.png" 
              alt="Battleground Arena Tournament Organizer Logo" 
              width={60} 
              height={60} 
              className="rounded-full"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-blue-100 hover:text-blue-300 transition">Home</Link>
          <Link href="/teams" className="text-blue-100 hover:text-blue-300 transition">Leaderboard</Link>
          <Link 
            href={adminLink} 
            className="bg-blue-700 hover:bg-blue-600 text-blue-100 px-4 py-2 rounded-lg transition"
          >
            Admin
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-blue-100 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800/90 backdrop-blur-sm py-4 px-4 absolute top-full left-0 right-0 border-b border-blue-700 z-50">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-blue-100 hover:text-blue-300 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/teams" 
              className="text-blue-100 hover:text-blue-300 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link 
              href={adminLink} 
              className="bg-blue-700 hover:bg-blue-600 text-blue-100 px-4 py-2 rounded-lg transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}