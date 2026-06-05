"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import FarmhouseCard from "@/components/FarmhouseCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { farmhouses, categories } from "@/lib/data";
import { SlidersHorizontal, X } from "lucide-react";

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [showFilters, setShowFilters] = useState(false);
  const [foodFilter, setFoodFilter] = useState("all");
  const [privacyFilter, setPrivacyFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = [...farmhouses];

    if (search) list = list.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") list = list.filter((f) => f.category === category);
    if (foodFilter === "with") list = list.filter((f) => f.withFood);
    if (foodFilter === "without") list = list.filter((f) => !f.withFood);
    if (privacyFilter === "private") list = list.filter((f) => f.isPrivate);
    if (privacyFilter === "shared") list = list.filter((f) => !f.isPrivate);
    list = list.filter((f) => f.price >= priceRange[0] && f.price <= priceRange[1]);

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [search, category, sort, priceRange, foodFilter, privacyFilter]);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">All Farmhouses</h1>

          {/* Search and controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500 bg-white dark:bg-green-950"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500 bg-white dark:bg-green-950"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-green-900 transition-colors">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-6 p-4 rounded-2xl border border-gray-200 dark:border-green-800 bg-beige-50 dark:bg-green-950 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-green-900"><X size={16} /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-green-800 rounded-xl text-sm bg-white dark:bg-green-900 outline-none">
                    <option value="All">All Categories</option>
                    {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Food</label>
                  <select value={foodFilter} onChange={(e) => setFoodFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-green-800 rounded-xl text-sm bg-white dark:bg-green-900 outline-none">
                    <option value="all">All</option>
                    <option value="with">With Food</option>
                    <option value="without">Without Food</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Privacy</label>
                  <select value={privacyFilter} onChange={(e) => setPrivacyFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-green-800 rounded-xl text-sm bg-white dark:bg-green-900 outline-none">
                    <option value="all">All</option>
                    <option value="private">Private Only</option>
                    <option value="shared">Shared Only</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Max Price: ₹{priceRange[1].toLocaleString()}</label>
                  <input type="range" min={1000} max={15000} step={500} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-green-700" />
                </div>
              </div>
            </div>
          )}

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            <button onClick={() => setCategory("All")} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${category === "All" ? "bg-green-700 text-white" : "bg-beige-50 dark:bg-green-950 border border-gray-200 dark:border-green-800 hover:bg-beige-100 dark:hover:bg-green-900"}`}>
              All
            </button>
            {categories.map((c) => (
              <button key={c.name} onClick={() => setCategory(c.name)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${category === c.name ? "bg-green-700 text-white" : "bg-beige-50 dark:bg-green-950 border border-gray-200 dark:border-green-800 hover:bg-beige-100 dark:hover:bg-green-900"}`}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filtered.map((f) => <FarmhouseCard key={f.id} farmhouse={f} />)}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-400">
              <p className="text-lg">No farmhouses match your filters</p>
              <button onClick={() => { setCategory("All"); setSearch(""); setFoodFilter("all"); setPrivacyFilter("all"); setPriceRange([0, 15000]); }} className="mt-4 text-sm text-green-700 hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
