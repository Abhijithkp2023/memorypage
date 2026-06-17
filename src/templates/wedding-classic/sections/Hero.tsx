"use client";

import { cloudinaryUrl } from "@/lib/cloudinary-url";

interface HeroContent {
  groom: string;
  bride: string;
  date: string;
  tagline: string;
  heroImage?: string;
}

export default function Hero({ content }: { content: HeroContent }) {
  const bgImage = content.heroImage
    ? cloudinaryUrl(content.heroImage, { width: 1920 })
    : undefined;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: bgImage
          ? `url(${bgImage})`
          : "linear-gradient(135deg, #fdf6f0 0%, #f8e8e8 50%, #f0e8f0 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {content.heroImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Decorative leaf/floral element */}
        <div className="text-5xl mb-6 opacity-60">✦</div>

        <p
          className="text-sm uppercase tracking-[0.4em] mb-4"
          style={{
            color: content.heroImage ? "#f0d9c8" : "#a8745a",
            fontFamily: "Inter, sans-serif",
          }}
        >
          We are getting married
        </p>

        <h1
          className="text-7xl md:text-8xl lg:text-9xl leading-none mb-6"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: content.heroImage ? "#fff" : "#5c3d2e",
          }}
        >
          {content.groom} & {content.bride}
        </h1>

        <div
          className="w-32 h-px mx-auto mb-6"
          style={{ background: content.heroImage ? "rgba(255,255,255,0.5)" : "#d4a574" }}
        />

        <p
          className="text-xl md:text-2xl mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: content.heroImage ? "#f8f0e8" : "#7a5a48",
            fontStyle: "italic",
          }}
        >
          {content.tagline}
        </p>

        <p
          className="text-base tracking-widest uppercase mt-6"
          style={{
            fontFamily: "Inter, sans-serif",
            color: content.heroImage ? "#e8d5c0" : "#a8745a",
          }}
        >
          {content.date}
        </p>

        {/* Scroll cue */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={content.heroImage ? "rgba(255,255,255,0.7)" : "#a8745a"}
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
