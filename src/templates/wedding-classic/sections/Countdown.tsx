"use client";
import { useEffect, useState } from "react";

interface CountdownContent {
  title: string;
  targetDate: string;
}

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown({ content }: { content: CountdownContent }) {
  // Start with zeros to avoid SSR/client hydration mismatch
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(content.targetDate));
    const t = setInterval(() => setTime(getTimeLeft(content.targetDate)), 1000);
    return () => clearInterval(t);
  }, [content.targetDate]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: "linear-gradient(135deg, #5c3d2e, #7a4f3a)" }}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200 mb-4">The Big Day</p>
        <h2
          className="text-3xl md:text-4xl text-white mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {content.title}
        </h2>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {units.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div
                className="rounded-2xl py-5 px-2 mb-2"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <span
                  className="text-4xl md:text-5xl font-light text-white block"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  suppressHydrationWarning
                >
                  {mounted ? String(value).padStart(2, "0") : "00"}
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest text-rose-200">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
