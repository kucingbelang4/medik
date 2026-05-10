'use client';

import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-surface shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-margin py-md max-w-7xl mx-auto">
        {/* Logo and Nav */}
        <div className="flex items-center gap-xl">
          <Link href="/" className="flex items-center gap-md">
            <span className="font-h3 text-h3 font-bold text-primary tracking-tight">Medik</span>
          </Link>
          <nav className="hidden md:flex items-center gap-md">
            <Link href="/search" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-98">
              Medicines
            </Link>
            <Link href="/illnesses" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-98">
              Illnesses
            </Link>
            <Link href="/a-z" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-98">
              A-Z Index
            </Link>
          </nav>
        </div>

        {/* Search & User */}
        <div className="flex items-center gap-sm">
          <div className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 w-64">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full p-0 font-body-md text-body-md" 
              type="text" 
              placeholder="Search..."
              aria-label="Global search"
            />
          </div>
          <button className="material-symbols-outlined text-primary p-2" aria-label="Account">account_circle</button>
        </div>
      </div>
    </header>
  );
}

export default Header;