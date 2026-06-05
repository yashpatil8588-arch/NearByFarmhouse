"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Users, Home, ShieldCheck, BarChart3, Check, X, Trash2, IndianRupee } from "lucide-react";

const adminUsers = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", role: "user", joined: "2026-01-15" },
  { id: "u2", name: "Rajesh Sharma", email: "rajesh@example.com", role: "owner", joined: "2025-11-20" },
  { id: "u3", name: "Priya Patel", email: "priya@example.com", role: "owner", joined: "2025-12-05" },
  { id: "u4", name: "Anil Kumar", email: "anil@example.com", role: "user", joined: "2026-03-10" },
];

const pendingListings = [
  { id: "p1", name: "Mountain View Cottage", owner: "Vikram Joshi", location: "Mahabaleshwar", price: 6000, submitted: "2026-06-01" },
  { id: "p2", name: "Lake House Retreat", owner: "Sneha Kulkarni", location: "Lavasa", price: 9000, submitted: "2026-06-02" },
];

const analytics = { totalUsers: 1250, totalOwners: 85, totalListings: 142, totalBookings: 890, revenue: 4520000 };

export default function AdminPanel() {
  const [tab, setTab] = useState<"overview" | "users" | "approvals" | "payments">("overview");

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={24} className="text-green-700" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-gray-500 mb-8">Manage platform users, listings, and analytics</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-green-800 overflow-x-auto">
            {([
              { key: "overview" as const, label: "Analytics", icon: <BarChart3 size={16} /> },
              { key: "users" as const, label: "Users", icon: <Users size={16} /> },
              { key: "approvals" as const, label: "Approvals", icon: <Home size={16} /> },
              { key: "payments" as const, label: "Payments", icon: <IndianRupee size={16} /> },
            ]).map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${tab === t.key ? "border-green-700 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Users", value: analytics.totalUsers.toLocaleString(), color: "text-blue-700" },
                  { label: "Owners", value: analytics.totalOwners.toString(), color: "text-purple-700" },
                  { label: "Listings", value: analytics.totalListings.toString(), color: "text-green-700" },
                  { label: "Bookings", value: analytics.totalBookings.toLocaleString(), color: "text-orange-700" },
                  { label: "Revenue", value: `₹${(analytics.revenue / 100000).toFixed(1)}L`, color: "text-green-700" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-2xl border border-gray-100 dark:border-green-800 text-center">
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="p-8 rounded-2xl border border-gray-100 dark:border-green-800 text-center">
                <BarChart3 size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm">Booking & revenue analytics charts will be displayed here</p>
                <p className="text-xs text-gray-300 mt-1">Integration with chart library coming soon</p>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === "users" && (
            <div className="space-y-3">
              <div className="hidden sm:grid grid-cols-5 gap-4 px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                <span>Name</span><span>Email</span><span>Role</span><span>Joined</span><span className="text-right">Actions</span>
              </div>
              {adminUsers.map((u) => (
                <div key={u.id} className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 items-center p-4 rounded-2xl border border-gray-100 dark:border-green-800 hover:shadow-sm transition-shadow">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-sm text-gray-500 truncate">{u.email}</span>
                  <span className={`inline-block w-fit px-2 py-0.5 text-xs rounded-full ${u.role === "owner" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role}</span>
                  <span className="text-sm text-gray-400">{u.joined}</span>
                  <div className="text-right">
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600" aria-label="Remove user"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Approvals */}
          {tab === "approvals" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Approval ({pendingListings.length})</h3>
              {pendingListings.map((l) => (
                <div key={l.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10">
                  <div>
                    <h4 className="font-semibold">{l.name}</h4>
                    <p className="text-sm text-gray-500">by {l.owner} • {l.location} • ₹{l.price.toLocaleString()}/night</p>
                    <p className="text-xs text-gray-400 mt-1">Submitted: {l.submitted}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors">
                      <Check size={14} /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-full hover:bg-red-50 transition-colors">
                      <X size={14} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payments */}
          {tab === "payments" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl border border-gray-100 dark:border-green-800 text-center">
                  <p className="text-xs text-gray-500">Platform Revenue</p>
                  <p className="text-2xl font-bold text-green-700">₹{(analytics.revenue / 100000).toFixed(1)}L</p>
                </div>
                <div className="p-4 rounded-2xl border border-gray-100 dark:border-green-800 text-center">
                  <p className="text-xs text-gray-500">Pending Payouts</p>
                  <p className="text-2xl font-bold text-orange-600">₹1.2L</p>
                </div>
                <div className="p-4 rounded-2xl border border-gray-100 dark:border-green-800 text-center">
                  <p className="text-xs text-gray-500">This Month</p>
                  <p className="text-2xl font-bold text-blue-700">₹3.8L</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-100 dark:border-green-800 text-center text-gray-400">
                <IndianRupee size={32} className="mx-auto mb-2" />
                <p className="text-sm">Razorpay payment integration details and transaction history will appear here</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
