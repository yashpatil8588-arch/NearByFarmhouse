"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Heart, Sun, Moon, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { data: session } = useSession();

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">NearByFarmhouse</Link>

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

            {session ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <User size={16} />
                  <span className="text-sm text-white">{session.user?.name?.split(" ")[0]}</span>
                </button>
                {userMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                    <p className="px-4 py-2 text-xs text-gray-500 truncate">{session.user?.email}</p>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setUserMenu(false)}>Dashboard</Link>
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-white text-black text-sm rounded-full hover:bg-white/90 transition-colors">Login</Link>
            )}
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
            {session ? (
              <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 bg-red-600 text-white text-sm rounded-full">Sign out</button>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-white text-black text-sm rounded-full">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
