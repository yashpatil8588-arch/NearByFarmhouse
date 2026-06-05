"use client";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Reset password</h1>
          <p className="text-gray-500 mt-2">Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input id="email" type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-green-800 rounded-xl bg-white dark:bg-green-950 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors">
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
}
