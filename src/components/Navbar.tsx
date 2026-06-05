"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart, User, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            NearByFarmhouse
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link>
            <Link href="/listings" className="text-sm text-white/80 hover:text-white transition-colors">Listings</Link>
            <Link href="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors">Dashboard</Link>
            <button onClick={toggleDark} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Toggle dark mode">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Wishlist">
              <Heart size={18} />
            </Link>
            <Link href="/login" className="px-4 py-2 bg-white text-black text-sm rounded-full hover:bg-white/90 transition-colors">
              Login
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-3">
          <Link href="/" className="block py-2 text-sm text-white" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/listings" className="block py-2 text-sm text-white" onClick={() => setOpen(false)}>Listings</Link>
          <Link href="/dashboard" className="block py-2 text-sm text-white" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/wishlist" className="block py-2 text-sm text-white" onClick={() => setOpen(false)}>Wishlist</Link>
          <div className="flex gap-2 pt-2">
            <button onClick={toggleDark} className="p-2 rounded-full bg-white/10">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/login" className="px-4 py-2 bg-white text-black text-sm rounded-full">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
