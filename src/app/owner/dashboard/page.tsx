"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Plus, Edit, Trash2, IndianRupee, CalendarDays, Home, BarChart3, X } from "lucide-react";

const mockListings = [
  { id: "1", name: "Sunset Valley Farmhouse", location: "Lonavala", price: 8500, bookings: 12, earnings: 102000, status: "active" },
  { id: "2", name: "Green Meadows Retreat", location: "Karjat", price: 5500, bookings: 8, earnings: 44000, status: "active" },
];

const mockBookings = [
  { id: "b1", guest: "Anil Kumar", farmhouse: "Sunset Valley Farmhouse", checkIn: "2026-06-10", checkOut: "2026-06-12", guests: 6, total: 17000, status: "confirmed" },
  { id: "b2", guest: "Meera Singh", farmhouse: "Green Meadows Retreat", checkIn: "2026-06-15", checkOut: "2026-06-17", guests: 4, total: 11000, status: "pending" },
];

export default function OwnerDashboard() {
  const [tab, setTab] = useState<"listings" | "bookings" | "earnings" | "add">("listings");
  const [showAddForm, setShowAddForm] = useState(false);

  const totalEarnings = mockListings.reduce((s, l) => s + l.earnings, 0);
  const totalBookings = mockListings.reduce((s, l) => s + l.bookings, 0);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
          <p className="text-gray-500 mb-8">Manage your farmhouse listings and bookings</p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Listings", value: mockListings.length, icon: <Home size={20} />, color: "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300" },
              { label: "Total Bookings", value: totalBookings, icon: <CalendarDays size={20} />, color: "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
              { label: "Total Earnings", value: `₹${totalEarnings.toLocaleString()}`, icon: <IndianRupee size={20} />, color: "bg-beige-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
              { label: "Avg Rating", value: "4.7", icon: <BarChart3 size={20} />, color: "bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
            ].map((stat) => (
              <div key={stat.label} className={`p-4 rounded-2xl border border-gray-100 dark:border-green-800 ${stat.color}`}>
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <div>
                    <p className="text-xs opacity-70">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-green-800">
            {(["listings", "bookings", "earnings"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? "border-green-700 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t}
              </button>
            ))}
            <button onClick={() => setShowAddForm(true)} className="ml-auto flex items-center gap-1 px-4 py-2 text-sm bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors">
              <Plus size={16} /> Add Farmhouse
            </button>
          </div>

          {/* Listings Tab */}
          {tab === "listings" && (
            <div className="space-y-4">
              {mockListings.map((l) => (
                <div key={l.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-green-800 hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-semibold">{l.name}</h3>
                    <p className="text-sm text-gray-500">{l.location} • ₹{l.price.toLocaleString()}/night • {l.bookings} bookings</p>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-green-900" aria-label="Edit"><Edit size={16} /></button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-red-500" aria-label="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bookings Tab */}
          {tab === "bookings" && (
            <div className="space-y-4">
              {mockBookings.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl border border-gray-100 dark:border-green-800">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <p className="font-semibold">{b.guest}</p>
                      <p className="text-sm text-gray-500">{b.farmhouse} • {b.guests} guests</p>
                      <p className="text-sm text-gray-500">{b.checkIn} → {b.checkOut}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">₹{b.total.toLocaleString()}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${b.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{b.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Earnings Tab */}
          {tab === "earnings" && (
            <div className="space-y-4">
              {mockListings.map((l) => (
                <div key={l.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-green-800">
                  <div>
                    <p className="font-semibold">{l.name}</p>
                    <p className="text-sm text-gray-500">{l.bookings} bookings completed</p>
                  </div>
                  <p className="text-xl font-bold text-green-700">₹{l.earnings.toLocaleString()}</p>
                </div>
              ))}
              <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-300">Total Earnings</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">₹{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Add Farmhouse Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white dark:bg-green-950 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Add New Farmhouse</h2>
                <button onClick={() => setShowAddForm(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-green-900"><X size={20} /></button>
              </div>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Farmhouse Name" className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                <input placeholder="Location" className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Price/night (₹)" className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                  <input type="number" placeholder="Max guests" className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                </div>
                <input type="number" placeholder="Available days" className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500" />
                <textarea placeholder="Description" rows={3} className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500 resize-none" />
                <div className="grid grid-cols-2 gap-3">
                  <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500">
                    <option>With Food</option>
                    <option>Without Food</option>
                  </select>
                  <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-green-800 rounded-xl text-sm outline-none focus:border-green-500">
                    <option>Private</option>
                    <option>Shared</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Images</label>
                  <input type="file" multiple accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {["Swimming Pool", "WiFi", "Parking", "BBQ Area", "Garden", "AC Rooms", "Games"].map((a) => (
                      <label key={a} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-green-800 text-xs cursor-pointer hover:bg-green-50 dark:hover:bg-green-900">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded text-green-600" />
                        {a}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors">
                  Add Farmhouse
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
