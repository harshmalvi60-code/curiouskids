"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Hydrated from "@/components/Hydrated";
import { useStore } from "@/lib/store";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function Checkout() {
  const router = useRouter();
  const unlock = useStore((s) => s.unlock);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const configured = !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  async function pay() {
    setBusy(true);
    setMsg(null);
    try {
      const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!ok) throw new Error("Could not load payment library.");

      const res = await fetch("/api/razorpay/order", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Curious Kids Universe",
        description: "Lifetime access — 6 worlds",
        order_id: data.orderId,
        theme: { color: "#8B6CFF" },
        handler: async (resp: any) => {
          const v = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resp),
          });
          const vr = await v.json();
          if (vr.verified) {
            unlock();
            router.push("/universe");
          } else {
            setMsg("Payment could not be verified. Please contact support.");
          }
        },
      });
      rzp.open();
    } catch (e: any) {
      setMsg(e.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="view">
      <Link className="back" href="/">
        ‹ Back
      </Link>
      <div className="hero" style={{ paddingTop: 20 }}>
        <div className="badge-top">✦</div>
        <h1>
          Unlock the <span className="g">whole universe.</span>
        </h1>
        <p className="sub">
          One payment. Six worlds. Yours forever. No subscription, no ads, works offline.
        </p>
      </div>

      <div className="price">
        <div className="big">₹499</div>
        <div className="small">Once. That&apos;s it. Less than one pizza, a lifetime of curiosity.</div>
        {configured ? (
          <button className="btn block" onClick={pay} disabled={busy}>
            {busy ? "Opening payment…" : "▸ Pay ₹499 with UPI / Card"}
          </button>
        ) : (
          <>
            <button
              className="btn block"
              onClick={() => {
                unlock();
                router.push("/universe");
              }}
            >
              ▸ Unlock (demo)
            </button>
            <p className="small" style={{ marginTop: 12 }}>
              Add your Razorpay keys to <code>.env</code> to enable live ₹499 payments.
            </p>
          </>
        )}
        {msg && (
          <p className="small" style={{ color: "var(--coral)", marginTop: 12 }}>
            {msg}
          </p>
        )}
      </div>
      <div className="foot">Curious Kids Universe · A Yuvaan Technologies product</div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Hydrated>
      <Checkout />
    </Hydrated>
  );
}
