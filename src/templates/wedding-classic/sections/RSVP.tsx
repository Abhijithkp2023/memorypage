"use client";
import { useState } from "react";

interface RSVPContent {
  title: string;
  subtitle: string;
  deadline: string;
}

export default function RSVP({ content }: { content: RSVPContent }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState("1");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6" style={{ background: "#fff" }}>
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-3">RSVP</p>
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
        >
          {content.title}
        </h2>
        <p
          className="text-lg mb-2 italic"
          style={{ fontFamily: "'Playfair Display', serif", color: "#a87060" }}
        >
          {content.subtitle}
        </p>
        <p className="text-sm text-rose-400/70 mb-12">Kindly respond by {content.deadline}</p>
        <div className="w-16 h-px bg-rose-200 mx-auto mb-12" />

        {submitted ? (
          <div className="py-16">
            <div className="text-6xl mb-4">💌</div>
            <h3
              className="text-2xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
            >
              Thank you, {name}!
            </h3>
            <p className="text-rose-500/70">
              {attending === "yes"
                ? "We are so excited to celebrate with you!"
                : "We will miss you and appreciate you letting us know."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-xs uppercase tracking-widest text-rose-400 mb-2">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b-2 border-rose-100 focus:border-rose-300 outline-none py-3 text-sm bg-transparent transition-colors"
                style={{ color: "#3d2b1f" }}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-rose-400 mb-4">
                Will you be attending?
              </label>
              <div className="flex gap-4">
                {(["yes", "no"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAttending(val)}
                    className={`flex-1 py-3 rounded-xl text-sm uppercase tracking-widest transition-all border ${
                      attending === val
                        ? "border-rose-400 bg-rose-400 text-white"
                        : "border-rose-200 text-rose-400 hover:border-rose-300"
                    }`}
                  >
                    {val === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                  </button>
                ))}
              </div>
            </div>

            {attending === "yes" && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-rose-400 mb-2">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border-b-2 border-rose-100 focus:border-rose-300 outline-none py-3 text-sm bg-transparent"
                  style={{ color: "#3d2b1f" }}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={!name || !attending}
              className="w-full py-4 rounded-xl text-sm uppercase tracking-[0.2em] transition-all disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #c8896a, #a87060)",
                color: "#fff",
              }}
            >
              Send RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
