"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border)]">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight text-[var(--text-primary)] hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>
          James Hou
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-[var(--text-secondary)]">
          <Link href="/#about" className="hover:text-[var(--text-primary)] transition-colors">About</Link>
          <Link href="/programming" className="hover:text-[var(--text-primary)] transition-colors">Programming</Link>
          <Link href="/engineering" className="hover:text-[var(--text-primary)] transition-colors">Engineering</Link>
          <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-[var(--text-primary)] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="flex flex-col space-y-4 pb-2 text-base font-medium text-[var(--text-secondary)]">
          <Link href="/#about" className="hover:text-[var(--text-primary)] transition-colors" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/programming" className="hover:text-[var(--text-primary)] transition-colors" onClick={() => setIsOpen(false)}>Programming</Link>
          <Link href="/engineering" className="hover:text-[var(--text-primary)] transition-colors" onClick={() => setIsOpen(false)}>Engineering</Link>
          <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
