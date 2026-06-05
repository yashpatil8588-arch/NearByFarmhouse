import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { totalAmount, farmhouseId, checkIn, checkOut, guests } = await req.json();

  const tokenAmount = Math.round(totalAmount * 0.1); // 10% token

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: tokenAmount * 100, // Razorpay expects paise
    currency: "INR",
    receipt: `booking_${farmhouseId}_${Date.now()}`,
    notes: { farmhouseId, checkIn, checkOut, guests: String(guests), userId: session.user.id, totalAmount: String(totalAmount) },
  });

  return NextResponse.json({
    orderId: order.id,
    amount: tokenAmount,
    totalAmount,
    balanceAmount: totalAmount - tokenAmount,
    key: process.env.RAZORPAY_KEY_ID,
  });
}
