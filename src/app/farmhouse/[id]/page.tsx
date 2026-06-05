"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { farmhouses } from "@/lib/data";
import { Star, MapPin, Users, Calendar, Wifi, Car, Flame, Trees, Snowflake, Gamepad2, Waves, Heart, Share2, ArrowLeft, CheckCircle } from "lucide-react";

const amenityIcons: Record<string, React.ReactNode> = {
  "Swimming Pool": <Waves size={18} />,
  "WiFi": <Wifi size={18} />,
  "Parking": <Car size={18} />,
  "BBQ Area": <Flame size={18} />,
  "Garden": <Trees size={18} />,
  "AC Rooms": <Snowflake size={18} />,
  "Games": <Gamepad2 size={18} />,
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function FarmhouseDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const farmhouse = farmhouses.find((f) => f.id === id);
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const fmtDate = (d: string) => { const [y, m, day] = d.split("-"); return `${day}/${m}/${y}`; };

  if (!farmhouse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Farmhouse not found</h1>
          <Link href="/" className="text-green-700 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
  const totalAmount = farmhouse.price * nights;
  const tokenAmount = Math.round(totalAmount * 0.1);
  const balanceAmount = totalAmount - tokenAmount;

  async function handleBooking() {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setLoading(true);

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    await new Promise((r) => (script.onload = r));

    // Create order
    const res = await fetch("/api/booking/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount, farmhouseId: id, checkIn, checkOut, guests }),
    });

    if (!res.ok) { setLoading(false); return; }
    const data = await res.json();

    // Open Razorpay checkout
    const options = {
      key: data.key,
      amount: data.amount * 100,
      currency: "INR",
      name: "NearByFarmhouse",
      description: `Token for ${farmhouse!.name}`,
      order_id: data.orderId,
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        // Confirm booking
        const confirmRes = await fetch("/api/booking/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            farmhouseId: id,
            checkIn,
            checkOut,
            guests,
            totalAmount,
          }),
        });
        if (confirmRes.ok) {
          setBooked(true);
        }
        setLoading(false);
      },
      prefill: { name: session.user.name, email: session.user.email },
      theme: { color: "#15803d" },
      modal: { ondismiss: () => setLoading(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  if (booked) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <CheckCircle size={64} className="mx-auto text-green-600" />
            <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
            <p className="text-gray-500">You paid <span className="font-semibold text-green-700">₹{tokenAmount.toLocaleString()}</span> as token amount.</p>
            <p className="text-gray-500">Remaining <span className="font-semibold">₹{balanceAmount.toLocaleString()}</span> to be paid at the farmhouse.</p>
            <div className="pt-4 space-x-3">
              <Link href="/dashboard" className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors inline-block">View Bookings</Link>
              <Link href="/" className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-green-900 transition-colors inline-block">Home</Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700">
              <ArrowLeft size={16} /> Back
            </Link>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-green-900" aria-label="Share"><Share2 size={18} /></button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-green-900" aria-label="Save"><Heart size={18} /></button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-2xl overflow-hidden mb-8">
            <div className="relative h-56 sm:h-72 md:h-[400px]">
              <Image src={farmhouse.images[selectedImage]} alt={farmhouse.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2 md:gap-3">
              {farmhouse.images.slice(0, 4).map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`relative h-20 sm:h-32 md:h-[194px] rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-green-500" : "border-transparent"}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="25vw" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{farmhouse.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {farmhouse.location}</span>
                  <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {farmhouse.rating} ({farmhouse.reviews} reviews)</span>
                  <span className="flex items-center gap-1"><Users size={14} /> Up to {farmhouse.guests} guests</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {farmhouse.daysAvailable} days available</span>
                </div>
              </div>

              <div className="flex gap-3">
                <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${farmhouse.withFood ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"}`}>
                  {farmhouse.withFood ? "🍽 With Food" : "🚫 Without Food"}
                </span>
                <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${farmhouse.isPrivate ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}>
                  {farmhouse.isPrivate ? "🔒 Fully Private" : "👥 Shared Property"}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">About this farmhouse</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{farmhouse.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {farmhouse.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 p-3 rounded-xl bg-beige-50 dark:bg-green-950 border border-beige-200 dark:border-green-800">
                      <span className="text-green-700 dark:text-green-400">{amenityIcons[a] || "•"}</span>
                      <span className="text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-beige-50 dark:bg-green-950 border border-beige-200 dark:border-green-800">
                <Image src={farmhouse.owner.avatar} alt={farmhouse.owner.name} width={48} height={48} className="rounded-full" />
                <div className="flex-1">
                  <p className="font-medium">{farmhouse.owner.name}</p>
                  <p className="text-sm text-gray-500">Property Owner</p>
                </div>
                <a href={`https://wa.me/${farmhouse.owner.phone.replace("+", "")}?text=Hi, I'm interested in ${farmhouse.name}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors">Contact</a>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Location</h2>
                <div className="h-64 rounded-2xl bg-gray-100 dark:bg-green-950 flex items-center justify-center border border-gray-200 dark:border-green-800">
                  <div className="text-center text-gray-400">
                    <MapPin size={32} className="mx-auto mb-2" />
                    <p className="text-sm">{farmhouse.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div id="book" className="lg:block">
              <div className="sticky top-24 p-4 sm:p-6 rounded-2xl bg-white dark:bg-green-950 border border-gray-200 dark:border-green-800 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-700 dark:text-green-400">₹{farmhouse.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400"> /night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{farmhouse.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Check-in</label>
                      <div className="relative w-full mt-1">
                        <span className="block px-3 py-2 pr-9 border border-gray-200 dark:border-green-800 rounded-xl bg-green-900 text-white text-sm">{fmtDate(checkIn)}</span>
                        <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                        <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Check-out</label>
                      <div className="relative w-full mt-1">
                        <span className="block px-3 py-2 pr-9 border border-gray-200 dark:border-green-800 rounded-xl bg-green-900 text-white text-sm">{fmtDate(checkOut)}</span>
                        <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                        <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Guests</label>
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full mt-1 px-3 py-2 border border-gray-200 dark:border-green-800 rounded-xl bg-green-900 text-white text-sm outline-none focus:border-green-500">
                      {Array.from({ length: farmhouse.guests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t border-gray-100 dark:border-green-800 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">₹{farmhouse.price.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span><span>₹{totalAmount.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100 dark:border-green-800"><span>Total</span><span>₹{totalAmount.toLocaleString()}</span></div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">Pay now (10%)</span><span className="font-semibold text-green-700 dark:text-green-400">₹{tokenAmount.toLocaleString()}</span></div>
                    <div className="flex justify-between text-gray-500"><span>Pay at farmhouse</span><span>₹{balanceAmount.toLocaleString()}</span></div>
                  </div>

                  <button onClick={handleBooking} disabled={loading} className="w-full py-3 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors disabled:opacity-50">
                    {loading ? "Processing..." : `Pay ₹${tokenAmount.toLocaleString()} to Book`}
                  </button>
                  <p className="text-xs text-center text-gray-400">Remaining ₹{balanceAmount.toLocaleString()} payable at farmhouse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton phone={farmhouse.owner.phone.replace("+", "")} />
    </>
  );
}
