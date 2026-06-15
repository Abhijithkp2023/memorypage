"use client";
import type { TemplateConfig, WebsiteData } from "@/types";
import WeddingClassic from "@/templates/wedding-classic";
import BirthdayModern from "@/templates/birthday-modern";
import EngagementBloom from "@/templates/engagement-bloom";

function TemplateRenderer({ data }: { data: WebsiteData }) {
  if (data.template === "wedding-classic") return <WeddingClassic data={data} />;
  if (data.template === "birthday-modern") return <BirthdayModern data={data} />;
  if (data.template === "engagement-bloom") return <EngagementBloom data={data} />;
  return null;
}

interface Props {
  template: TemplateConfig;
  data: WebsiteData;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2Preview({ template, data, onBack, onNext }: Props) {
  const enabledSections = Object.entries(data.sections)
    .filter(([, on]) => on)
    .map(([key]) => key);

  return (
    <div className="relative -mx-6 -mt-6">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1.5 transition-colors"
          >
            ← Edit
          </button>
          <div className="w-px h-4 bg-stone-200" />
          <div className="flex items-center gap-2 flex-wrap">
            {enabledSections.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 capitalize"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
        >
          Looks good — Continue →
        </button>
      </div>

      {/* Full template render */}
      <TemplateRenderer data={data} />

      {/* Floating bottom CTA */}
      <div className="sticky bottom-6 flex justify-center pointer-events-none">
        <button
          onClick={onNext}
          className="pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-sm font-semibold shadow-2xl transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #c8896a, #a87060)",
            boxShadow: "0 8px 32px rgba(168, 112, 96, 0.4)",
          }}
        >
          Looks great — Continue to Account
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
