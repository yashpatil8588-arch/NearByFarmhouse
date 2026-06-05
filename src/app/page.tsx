import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FarmhouseCard from "@/components/FarmhouseCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { farmhouses, categories } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8">Browse by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`/listings?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all"
            >
              <span className="text-xl sm:text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-[10px] sm:text-sm font-medium text-center">{cat.name}</span>
              <span className="text-[9px] sm:text-xs text-white/50">{cat.count} stays</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Farmhouses */}
      <section className="max-w-7xl xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Farmhouses</h2>
          <a href="/listings" className="text-sm text-white/70 font-medium hover:text-white">View all →</a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {farmhouses.map((f) => (
            <FarmhouseCard key={f.id} farmhouse={f} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white/5 border-y border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Own a farmhouse? List it with us.</h2>
          <p className="text-white/70 mb-8">Reach thousands of travelers looking for their perfect getaway. Start earning today.</p>
          <a href="/signup" className="inline-block px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
            Become a Host
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
