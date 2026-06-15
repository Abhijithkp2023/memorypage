"use client";

interface HeroContent {
  name: string;
  age: string;
  date: string;
  tagline: string;
}

export default function BirthdayHero({ content }: { content: HeroContent }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      {/* Confetti dots */}
      {["#f7c948", "#e94560", "#53d8fb", "#ff6b9d", "#a8edea"].map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-30"
          style={{
            width: `${12 + i * 8}px`,
            height: `${12 + i * 8}px`,
            background: c,
            top: `${10 + i * 18}%`,
            left: `${5 + i * 20}%`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="text-6xl mb-6">🎂</div>
        <p className="text-xs uppercase tracking-[0.4em] text-yellow-300 mb-4">
          It&apos;s a celebration!
        </p>
        <h1
          className="text-6xl md:text-8xl font-bold leading-none mb-4"
          style={{ color: "#f7c948", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
        >
          {content.name}
        </h1>
        <div
          className="text-8xl md:text-9xl font-black leading-none mb-6"
          style={{ color: "rgba(255,255,255,0.08)", fontFamily: "'Inter', sans-serif" }}
        >
          {content.age}
        </div>
        <p
          className="text-xl md:text-2xl text-white/80 mb-6 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {content.tagline}
        </p>
        <div className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
          {content.date}
        </div>
      </div>
    </section>
  );
}
