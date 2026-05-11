import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full px-margin py-xl flex flex-col md:flex-row justify-between items-center gap-md max-w-7xl mx-auto bg-surface-container-low mt-xl">
      <div className="flex flex-col md:items-start items-center gap-xs">
        <span className="font-h3 text-h3 text-primary font-bold">Medik</span>
        <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 Medik Health Platform. Professional Clinical Reliability.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-md">
        <Link href="/accessibility" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline transition-all">
          Accessibility
        </Link>
        <Link href="/privacy" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline transition-all">
          Privacy Policy
        </Link>
        <Link href="/medical-board" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline transition-all">
          Medical Board
        </Link>
        <Link href="/contact" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline transition-all">
          Contact
        </Link>
      </div>
    </footer>
  );
}

export default Footer;