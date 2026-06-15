"use client";
import { useState } from "react";
import type { TemplateConfig, WebsiteData } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  template: TemplateConfig;
  data: WebsiteData;
  email: string;
  password: string;
  devMode: boolean;
  onBack: () => void;
  onSuccess: (slug: string) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function Step3Payment({ template, data, email, password, devMode, onBack, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDevSkip = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payment/dev-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template.id, websiteData: data, email, password }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to create website");
      }
      onSuccess(data.slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template.id }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to create order");
      }
      const { orderId, amount, currency } = await res.json();
      await loadRazorpay();
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: orderId,
        name: "MemoryPage",
        description: `${template.name} — ${data.slug}`,
        prefill: { email },
        theme: { color: "#c8896a" },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                email,
                password,
                websiteData: data,
                templateId: template.id,
              }),
            });
            const result = await verifyRes.json();
            if (verifyRes.ok && result.success) {
              onSuccess(result.slug ?? data.slug);
            } else {
              setError(result.error ?? "Payment verification failed.");
            }
          } catch {
            setError("Network error during verification. Please contact support.");
          }
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-2xl font-light text-stone-800 mb-6">Review & Pay</h2>

        {devMode && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700 mb-6 flex items-center gap-2">
            <span className="text-base">🛠</span>
            <span><strong>Dev mode</strong> — Use the dev tools below to skip payment or test Razorpay with a test card.</span>
          </div>
        )}

        {/* Order summary */}
        <div className="rounded-2xl bg-stone-50 p-5 mb-6">
          <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">{template.name}</span>
              <span className="font-medium text-stone-800">{formatCurrency(template.price / 100)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-400">Website URL</span>
              <span className="text-rose-600 text-xs">memorypage.app/w/{data.slug}</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between font-medium">
              <span className="text-stone-800">Total</span>
              <span className="text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatCurrency(template.price / 100)}
              </span>
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="rounded-2xl bg-rose-50 p-5 mb-6 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-rose-400 mb-3">Account Details</h3>
          <p className="text-stone-600">
            Account will be created with: <span className="font-medium text-stone-800">{email}</span>
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 mb-4">
            {error}
          </div>
        )}

        {/* Primary pay button — always shown */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
        >
          {loading ? "Processing..." : `Pay ${formatCurrency(template.price / 100)} & Publish`}
        </button>

        <p className="text-xs text-center text-stone-400 mt-3">
          Secured by Razorpay · One-time payment · No subscription
        </p>

        {/* Dev tools — skip & test Razorpay */}
        {devMode && (
          <div className="mt-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 space-y-3">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-medium flex items-center gap-1.5">
              🛠 Dev Tools
            </p>

            <button
              onClick={handleDevSkip}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all border border-amber-300 text-amber-700 hover:bg-amber-100 disabled:opacity-60"
            >
              {loading ? "Creating..." : "⚡ Skip Payment & Publish"}
            </button>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 disabled:opacity-60"
            >
              {loading ? "Opening..." : "🧪 Test Razorpay Checkout"}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        disabled={loading}
        className="w-full py-4 rounded-2xl text-stone-600 text-sm font-medium border border-stone-200 hover:border-stone-300 transition-all bg-white"
      >
        ← Back
      </button>
    </div>
  );
}

function loadRazorpay(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}
