"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, MapPin } from "lucide-react";
import { Farmhouse } from "@/lib/types";
import { useState, useEffect } from "react";

function getLikedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("likedFarmhouses") || "[]");
  } catch { return []; }
}

function toggleLikedId(id: string): boolean {
  const ids = getLikedIds();
  const index = ids.indexOf(id);
  if (index === -1) { ids.push(id); } else { ids.splice(index, 1); }
  localStorage.setItem("likedFarmhouses", JSON.stringify(ids));
  return index === -1;
}

export default function FarmhouseCard({ farmhouse }: { farmhouse: Farmhouse }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getLikedIds().includes(farmhouse.id));
  }, [farmhouse.id]);

  return (
    <div className="group bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-32 sm:h-56 overflow-hidden">
        <Link href={`/farmhouse/${farmhouse.id}`}>
          <Image
            src={farmhouse.image}
            alt={farmhouse.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <button
          onClick={() => setLiked(toggleLikedId(farmhouse.id))}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-sm"
          aria-label="Add to wishlist"
        >
          <Heart size={14} className={`sm:w-[18px] sm:h-[18px] ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex flex-wrap gap-1 sm:gap-2">
          <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${farmhouse.withFood ? "bg-green-600 text-white" : "bg-orange-500 text-white"}`}>
            {farmhouse.withFood ? "Food" : "No Food"}
          </span>
          <span className={`hidden sm:inline px-2 py-1 text-xs font-medium rounded-full ${farmhouse.isPrivate ? "bg-purple-600 text-white" : "bg-blue-500 text-white"}`}>
            {farmhouse.isPrivate ? "Private" : "Shared"}
          </span>
        </div>
      </div>

      <div className="p-2.5 sm:p-4 space-y-1 sm:space-y-2 text-center">
        <div className="flex items-start justify-center gap-1">
          <h3 className="font-semibold text-xs sm:text-lg truncate">{farmhouse.name}</h3>
          <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm shrink-0">
            <Star size={10} className="sm:w-[14px] sm:h-[14px] fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{farmhouse.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 text-white/60 text-[10px] sm:text-sm">
          <MapPin size={10} className="sm:w-[14px] sm:h-[14px] shrink-0" />
          <span className="truncate">{farmhouse.location}</span>
        </div>

        <div className="pt-1 sm:pt-2">
          <span className="text-sm sm:text-xl font-bold text-white">₹{farmhouse.price.toLocaleString()}</span>
          <span className="text-[10px] sm:text-sm text-white/50"> /night</span>
        </div>

        <div className="flex gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          <Link href={`/farmhouse/${farmhouse.id}`} className="flex-1 flex items-center justify-center py-1 sm:py-1.5 text-[9px] sm:text-xs border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors">
            View
          </Link>
          <Link href={`/farmhouse/${farmhouse.id}#book`} className="flex-1 flex items-center justify-center py-1 sm:py-1.5 text-[9px] sm:text-xs bg-white text-black rounded-full hover:bg-white/90 transition-colors">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
