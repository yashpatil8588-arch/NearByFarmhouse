import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, farmhouseId, checkIn, checkOut, guests, totalAmount } = await req.json();

  // Verify payment signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const tokenAmount = Math.round(totalAmount * 0.1);
  const balanceAmount = totalAmount - tokenAmount;

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      total: totalAmount,
      tokenAmount,
      balanceAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "CONFIRMED",
      userId: session.user.id,
      farmhouseId,
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
