import Link from "next/link";
import { ArrowRight, Check, Sparkles, Globe, Edit3 } from "lucide-react";
import Navbar from "@/components/Navbar";

const EVENT_TYPES = [
  { emoji: "💍", label: "Wedding", count: "1 template" },
  { emoji: "🎂", label: "Birthday", count: "Coming soon" },
  { emoji: "💝", label: "Engagement", count: "Coming soon" },
  { emoji: "🎊", label: "Anniversary", count: "Coming soon" },
  { emoji: "👶", label: "Baby Shower", count: "Coming soon" },
  { emoji: "🏠", label: "Housewarming", count: "Coming soon" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a template",
    desc: "Pick from our beautifully designed templates crafted for your event type.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Customize content",
    desc: "Add your names, date, story, photos, and event details. No coding needed.",
    icon: Edit3,
  },
  {
    step: "03",
    title: "Pay & publish instantly",
    desc: "Complete a one-time payment and your website goes live immediately.",
    icon: Globe,
  },
];

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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        className="flex-1 flex items-center justify-center pt-28 pb-20 px-6"
        style={{
          background: "linear-gradient(160deg, #fff8f5 0%, #fdf0f8 50%, #f5f0ff 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-rose-100 rounded-full px-4 py-2 text-sm text-rose-500 mb-8 shadow-sm">
            <Sparkles size={14} />
            Beautiful event websites in minutes
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-stone-900">
            Create your{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.1em", color: "#c8896a" }}>
              perfect
            </span>
            <br />
            event website
          </h1>

          <p className="text-lg md:text-xl text-stone-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            From weddings to birthdays, create a stunning website for your special occasion.
            No technical skills needed — just your love and our templates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90 shadow-lg shadow-rose-200"
              style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
            >
              Browse Templates
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/w/demo-wedding"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-stone-700 text-sm font-medium border border-stone-200 bg-white hover:border-rose-200 transition-all"
            >
              View Demo Site
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-8 tracking-wide">
            One-time payment · Published instantly · Shareable link · No subscriptions
          </p>
        </div>
      </section>

      {/* Event types */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-300 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-stone-800 mb-3">
              Every occasion, beautifully covered
            </h2>
            <p className="text-stone-500">Templates designed for every milestone in life</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {EVENT_TYPES.map(({ emoji, label, count }) => (
              <div
                key={label}
                className="rounded-2xl p-5 text-center border border-stone-100 hover:border-rose-200 hover:shadow-md transition-all cursor-default"
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="text-sm font-medium text-stone-700">{label}</p>
                <p className="text-xs text-stone-400 mt-1">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-20 px-6"
        style={{ background: "linear-gradient(160deg, #fff8f5 0%, #fdf6f0 100%)" }}
      >
        <div className="max-w-300 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-stone-800 mb-3">How it works</h2>
            <p className="text-stone-500">Three simple steps to your beautiful event website</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
                  style={{ background: "linear-gradient(135deg, #f8e8e0, #f0d0d0)" }}
                >
                  <Icon size={22} style={{ color: "#c8896a" }} />
                </div>
                <div className="text-xs font-mono text-rose-300 mb-2 tracking-widest">{step}</div>
                <h3 className="text-xl font-medium text-stone-800 mb-3">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-stone-800 mb-4">
                Everything you need,{" "}
                <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>nothing you don&apos;t</span>
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

              <Link
                href="/templates"
                className="block w-full py-4 rounded-2xl text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #c8896a, #a87060)", color: "#fff" }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #fdf0f8 0%, #fff8f5 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-5xl mb-4"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c8896a" }}
          >
            Your story deserves a beautiful home
          </p>
          <p className="text-stone-500 mb-8">
            Join hundreds of couples and families who chose MemoryPage for their special day.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90 shadow-lg shadow-rose-200"
            style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
          >
            Create Your Website
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-stone-100 bg-white">
        <div className="max-w-300 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-400">
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.4rem", color: "#c8896a" }}>
            MemoryPage
          </p>
          <p>© 2026 MemoryPage. Made with love.</p>
        </div>
      </footer>
    </div>
  );
}
