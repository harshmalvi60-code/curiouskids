import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Creates a Razorpay order for the one-time ₹499 unlock.
// Requires RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET in env.
export async function POST() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const amount = Number(process.env.NEXT_PUBLIC_PRICE_PAISE || "49900");

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay keys not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 501 }
    );
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: `cku_${Date.now()}`,
      notes: { product: "Curious Kids Universe" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Order creation failed", detail: text }, { status: 502 });
  }
  const order = await res.json();
  return NextResponse.json({ orderId: order.id, amount, keyId });
}
