"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FarmhouseCard from "@/components/FarmhouseCard";
import { farmhouses } from "@/lib/data";
import { Farmhouse } from "@/lib/types";

export default function WishlistPage() {
  const [liked, setLiked] = useState<Farmhouse[]>([]);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem("likedFarmhouses") || "[]");
      setLiked(farmhouses.filter((f) => ids.includes(f.id)));
    } catch { setLiked([]); }
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        {liked.length === 0 ? (
          <p className="text-white/60">You haven&apos;t liked any farmhouses yet. Tap the heart icon on a farmhouse to save it here.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {liked.map((f) => (
              <FarmhouseCard key={f.id} farmhouse={f} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
