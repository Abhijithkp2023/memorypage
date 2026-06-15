"use client";

interface HeroContent {
  person1: string;
  person2: string;
  date: string;
  tagline: string;
}

export default function EngagementHero({ content }: { content: HeroContent }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff9f5 0%, #fdeef0 50%, #f5e6f8 100%)" }}
    >
      {/* Petal shapes */}
      {["#f9d5e5", "#eeac99", "#e06377", "#c83349", "#f9d5e5"].map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            background: c,
            top: `${5 + i * 20}%`,
            right: `${2 + i * 12}%`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.5em] text-pink-400 mb-6">We said yes ✦</p>
        <h1
          className="text-6xl md:text-8xl leading-none mb-4"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#6b2737" }}
        >
          {content.person1} &amp; {content.person2}
        </h1>
        <div className="w-24 h-px bg-pink-200 mx-auto my-6" />
        <p
          className="text-xl md:text-2xl italic mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: "#9b4a5c" }}
        >
          {content.tagline}
        </p>
        <div className="inline-flex items-center gap-3 border border-pink-200 rounded-full px-6 py-3">
          <span className="text-2xl">💍</span>
          <span className="text-sm uppercase tracking-widest text-pink-500">{content.date}</span>
        </div>
      </div>
    </section>
  );
}
