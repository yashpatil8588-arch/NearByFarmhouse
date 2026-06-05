"use client";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <section className="relative h-[45vh] sm:h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Find Your Perfect<br />
          <span className="text-white/80">Farmhouse Escape</span>
        </h1>
        <p className="text-sm sm:text-lg text-white/70 mb-4 sm:mb-6 max-w-2xl mx-auto">
          Discover luxury farmhouses with private pools, scenic views, and premium amenities for unforgettable getaways.
        </p>

        <div className="glass rounded-xl p-1.5 sm:p-2 md:p-3 max-w-3xl mx-auto">
          <div className="flex flex-row gap-1.5 sm:gap-2">
            <div className="flex-1 flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-3 bg-white/80 dark:bg-green-950/80 rounded-lg sm:rounded-xl">
              <MapPin size={12} className="sm:w-[18px] sm:h-[18px] text-green-700 shrink-0" />
              <input
                type="text"
                placeholder="Where?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-[10px] sm:text-sm outline-none placeholder-gray-400"
              />
            </div>
            <div className="flex-1 flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-3 bg-white/80 dark:bg-green-950/80 rounded-lg sm:rounded-xl">
              <Calendar size={12} className="sm:w-[18px] sm:h-[18px] text-green-700 shrink-0" />
              <input
                type="text"
                placeholder="Dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-transparent text-[10px] sm:text-sm outline-none placeholder-gray-400"
              />
            </div>
            <div className="flex-1 flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-3 bg-white/80 dark:bg-green-950/80 rounded-lg sm:rounded-xl">
              <Users size={12} className="sm:w-[18px] sm:h-[18px] text-green-700 shrink-0" />
              <input
                type="text"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-[10px] sm:text-sm outline-none placeholder-gray-400"
              />
            </div>
            <button className="flex items-center justify-center p-2 sm:px-4 sm:py-3 bg-white text-black rounded-lg sm:rounded-xl hover:bg-white/90 transition-colors">
              <Search size={14} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline text-sm font-medium">Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
