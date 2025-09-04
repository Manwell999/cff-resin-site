"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-resin-blue/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#home" className="hover:text-resin-blue-light transition-colors">Home</Link>
            <Link href="#showcase" className="hover:text-resin-blue-light transition-colors">Gallery</Link>
            <Link href="#about" className="hover:text-resin-blue-light transition-colors">About</Link>
            <Link href="#why" className="hover:text-resin-blue-light transition-colors">Why Choose Us</Link>
            <Link href="/store" className="hover:text-resin-blue-light transition-colors">Store</Link>
            <Link href="#contact" className="hover:text-resin-blue-light transition-colors">Contact</Link>
            <Link href="#calculator" className="rounded-full px-4 py-2 bg-resin-blue text-white hover:bg-resin-blue-light transition-colors resin-glow">Calculator</Link>
          </nav>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
            onClick={() => setOpen(v => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden py-2 border-t border-resin-blue/20">
            <div className="flex flex-col gap-2 py-2">
              <Link href="#home" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>Home</Link>
              <Link href="#showcase" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>Gallery</Link>
              <Link href="#about" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>About</Link>
              <Link href="#why" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>Why Choose Us</Link>
              <Link href="/store" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>Store</Link>
              <Link href="#contact" className="px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>Contact</Link>
              <Link href="#calculator" className="px-2 py-2 rounded bg-resin-blue text-white hover:bg-resin-blue-light transition-colors" onClick={() => setOpen(false)}>Calculator</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


