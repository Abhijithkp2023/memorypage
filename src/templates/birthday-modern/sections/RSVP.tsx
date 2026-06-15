"use client";
import { useState } from "react";

interface RSVPContent {
  title: string;
  subtitle: string;
  deadline: string;
}

export default function BirthdayRSVP({ content }: { content: RSVPContent }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-6" style={{ background: "#1a1a2e" }}>
      <div className="max-w-lg mx-auto text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h2
          className="text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {content.title}
        </h2>
        <p className="text-white/60 mb-2">{content.subtitle}</p>
        <p className="text-yellow-400 text-sm mb-10">RSVP by {content.deadline}</p>

        {submitted ? (
          <div className="bg-white/10 rounded-3xl p-10">
            <div className="text-5xl mb-4">🥳</div>
            <p className="text-white text-xl font-semibold">See you there, {name}!</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="bg-white/10 rounded-3xl p-8 space-y-5 text-left"
          >
            <div>
              <label className="block text-xs uppercase tracking-widest text-yellow-300 mb-2">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400 placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-yellow-300 mb-3">Will you join the party?</label>
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAttending(v)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold uppercase transition-all ${
                      attending === v
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-white/10 text-white/60 hover:bg-white/20"
                    }`}
                  >
                    {v === "yes" ? "Count me in!" : "Can't make it"}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={!name || !attending}
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-yellow-400 text-gray-900 disabled:opacity-40 transition-all hover:bg-yellow-300"
            >
              Send RSVP 🎈
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
