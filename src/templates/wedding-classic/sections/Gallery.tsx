"use client";
import { useState } from "react";

interface GalleryContent {
  title: string;
  subtitle: string;
  images?: string[];
}

export default function Gallery({ content }: { content: GalleryContent }) {
  const [selected, setSelected] = useState<string | null>(null);
  const images = content.images?.length ? content.images : [];

  const placeholders = Array(6).fill("/placeholder-wedding.jpg");
  const displayImages = images.length > 0 ? images : placeholders;

  return (
    <section className="py-24 px-6" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-3">Gallery</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            {content.title}
          </h2>
          <p className="mt-4 text-rose-600/70 text-sm italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            {content.subtitle}
          </p>
          <div className="w-16 h-px bg-rose-200 mx-auto mt-6" />
        </div>

        {images.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {placeholders.map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl"
                style={{
                  background: `linear-gradient(${135 + i * 20}deg, #f8e8e0, #f0d0d8)`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelected(src)}
                className="aspect-square rounded-xl overflow-hidden hover:scale-[1.02] transition-transform shadow-sm"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt=""
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
