"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phone = "919876543210" }: { phone?: string }) {
  return (
    <a
      href={`https://wa.me/${phone}?text=Hi, I'm interested in booking a farmhouse.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-white text-black rounded-full shadow-lg hover:bg-white/90 hover:scale-110 transition-all duration-300"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
