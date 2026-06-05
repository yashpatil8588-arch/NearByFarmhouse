import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "NearByFarmhouse - Premium Farmhouse Stays",
  description: "Discover and book luxury farmhouses for unforgettable getaways. Private pools, scenic views, and premium amenities.",
  keywords: "farmhouse, booking, luxury stay, private pool, weekend getaway",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
