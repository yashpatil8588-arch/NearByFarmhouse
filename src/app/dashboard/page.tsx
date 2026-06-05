"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { CalendarDays, Heart, User, X } from "lucide-react";

const userBookings = [
  { id: "1", farmhouse: "Sunset Valley Farmhouse", location: "Lonavala", checkIn: "2026-06-10", checkOut: "2026-06-12", guests: 4, total: 17500, status: "confirmed" as const },
  { id: "2", farmhouse: "Green Meadows Retreat", location: "Karjat", checkIn: "2026-07-01", checkOut: "2026-07-03", guests: 6, total: 11500, status: "pending" as const },
  { id: "3", farmhouse: "Party Palace Farmhouse", location: "Nashik", checkIn: "2026-05-20", checkOut: "2026-05-22", guests: 15, total: 24500, status: "cancelled" as const },
];

const favorites = [
  { id: "1", name: "Sunset Valley Farmhouse", location: "Lonavala", price: 8500, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
  { id: "4", name: "Pawsome Farm Stay", location: "Alibaug", price: 6800, image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&q=80" },
];

export default function UserDashboard() {
  const [tab, setTab] = useState<"bookings" | "favorites" | "profile">("bookings");

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-500 mb-8">Manage your bookings and preferences</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-green-800">
            {([
              { key: "bookings" as const, label: "My Bookings", icon: <CalendarDays size={16} /> },
              { key: "favorites" as const, label: "Favorites", icon: <Heart size={16} /> },
              { key: "profile" as const, label: "Profile", icon: <User size={16} /> },
            ]).map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? "border-green-700 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Bookings */}
          {tab === "bookings" && (
            <div className="space-y-4">
              {userBookings.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl border border-gray-100 dark:border-green-800 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{b.farmhouse}</h3>
                      <p className="text-sm text-gray-500">{b.location} • {b.guests} guests</p>
                      <p className="text-sm text-gray-500">{b.checkIn} → {b.checkOut}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-green-700 dark:text-green-400">₹{b.total.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                        b.status === "confirmed" ? "bg-green-100 text-green-700" :
                        b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>{b.status}</span>
                      {b.status !== "cancelled" && (
                        <button className="block text-xs text-red-500 hover:underline mt-1">Cancel booking</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Favorites */}
          {tab === "favorites" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((f) => (
                <div key={f.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-green-800 hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{f.name}</h3>
                    <p className="text-sm text-gray-500">{f.location}</p>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400 mt-1">₹{f.price.toLocaleString()}/night</p>
                  </div>
                  <button className="self-start p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600" aria-label="Remove from favorites">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {tab === "profile" && (
            <div className="max-w-md space-y-4">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input defaultValue="Rahul Sharma" className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input defaultValue="rahul@example.com" type="email" className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input defaultValue="+91 9876543210" type="tel" className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                </div>
                <button type="submit" className="px-6 py-2.5 bg-green-700 text-white text-sm rounded-xl font-medium hover:bg-green-800 transition-colors">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
