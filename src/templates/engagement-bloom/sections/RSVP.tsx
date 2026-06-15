"use client";
import { useState } from "react";

interface RSVPContent {
  title: string;
  subtitle: string;
  deadline: string;
}

export default function EngagementRSVP({ content }: { content: RSVPContent }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-6" style={{ background: "#fdeef0" }}>
      <div className="max-w-lg mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-400 mb-3">RSVP</p>
        <h2
          className="text-4xl mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: "#3d1a22" }}
        >
          {content.title}
        </h2>
        <p className="text-pink-500/70 italic mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          {content.subtitle}
        </p>
        <p className="text-xs text-pink-400 mb-10">Please respond by {content.deadline}</p>

        {submitted ? (
          <div className="bg-white rounded-3xl p-10 border border-pink-100">
            <div className="text-5xl mb-4">💌</div>
            <p className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#3d1a22" }}>
              Thank you, {name}!
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="bg-white rounded-3xl p-8 space-y-5 text-left border border-pink-100 shadow-sm"
          >
            <div>
              <label className="block text-xs uppercase tracking-widest text-pink-400 mb-2">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border-b-2 border-pink-100 focus:border-pink-300 outline-none py-3 text-sm bg-transparent text-gray-800 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-pink-400 mb-3">Will you join us?</label>
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAttending(v)}
                    className={`flex-1 py-3 rounded-xl text-sm transition-all border ${
                      attending === v
                        ? "border-pink-400 bg-pink-400 text-white"
                        : "border-pink-200 text-pink-400 hover:border-pink-300"
                    }`}
                  >
                    {v === "yes" ? "With pleasure" : "Regretfully no"}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={!name || !attending}
              className="w-full py-4 rounded-xl text-sm uppercase tracking-widest text-white disabled:opacity-40 transition-all"
              style={{ background: "linear-gradient(135deg, #e06377, #c83349)" }}
            >
              Send RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
