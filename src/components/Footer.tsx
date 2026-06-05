import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70 py-12 border-t border-white/10">
      <div className="max-w-7xl xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">NearByFarmhouse</h3>
            <p className="text-sm">Premium farmhouse stays for unforgettable getaways. Book luxury private farmhouses with ease.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <div className="space-y-2 text-sm">
              <Link href="/listings" className="block hover:text-white transition-colors">All Listings</Link>
              <Link href="/listings?cat=luxury" className="block hover:text-white transition-colors">Luxury Stays</Link>
              <Link href="/listings?cat=pool" className="block hover:text-white transition-colors">Private Pool</Link>
              <Link href="/listings?cat=party" className="block hover:text-white transition-colors">Party Venues</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              <Link href="/careers" className="block hover:text-white transition-colors">Careers</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Host</h4>
            <div className="space-y-2 text-sm">
              <Link href="/owner/dashboard" className="block hover:text-white transition-colors">List Your Farmhouse</Link>
              <Link href="/owner/dashboard" className="block hover:text-white transition-colors">Owner Dashboard</Link>
              <Link href="/help" className="block hover:text-white transition-colors">Help Center</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          © 2026 NearByFarmhouse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
