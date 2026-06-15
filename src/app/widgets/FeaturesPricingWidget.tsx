import { Check } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

const FEATURES = [
  "Beautiful, mobile-first design",
  "Upload your own photos",
  "Multi-language support",
  "RSVP collection",
  "Countdown timer",
  "Share with a single link",
  "Your site at memorypage.app/w/your-name",
  "One-time payment, no subscriptions",
];

export default function FeaturesPricingWidget() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-350 mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-light text-stone-800 mb-4">
              Everything you need,{" "}
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                nothing you don&apos;t
              </span>
            </h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Clean, fast, and beautifully designed. No bloat, no subscriptions, no surprises.
            </p>
            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-stone-600">
                  <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-rose-500" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl p-8 text-center shadow-xl"
            style={{ background: "linear-gradient(135deg, #5c3d2e, #7a4f3a)" }}
          >
            <p className="text-rose-200 text-sm uppercase tracking-widest mb-4">Wedding Classic</p>
            <div
              className="text-6xl mb-2 text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              ₹999
            </div>
            <p className="text-rose-200 text-sm mb-8">One-time payment · No renewal</p>

            <ul className="space-y-3 text-left mb-8">
              {[
                "Full website, published instantly",
                "RSVP collection included",
                "Photo gallery with lightbox",
                "Live countdown timer",
                "Unlimited views forever",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-rose-100">
                  <Check size={14} className="text-rose-300 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <PrimaryButton href="/templates" size="lg" className="w-full">
              Get Started →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
