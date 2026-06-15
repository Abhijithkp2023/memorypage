"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TemplateConfig, WebsiteData } from "@/types";
import WeddingClassic from "@/templates/wedding-classic";
import BirthdayModern from "@/templates/birthday-modern";
import EngagementBloom from "@/templates/engagement-bloom";
import { formatCurrency } from "@/lib/utils";

function buildDemoData(template: TemplateConfig): WebsiteData {
  return {
    slug: "preview",
    template: template.id,
    settings: { defaultLanguage: "en", enabledLanguages: ["en"] },
    sections: { ...template.defaultSections },
    content: JSON.parse(JSON.stringify(template.defaultContent)),
  };
}

function TemplateRenderer({ data }: { data: WebsiteData }) {
  if (data.template === "wedding-classic") return <WeddingClassic data={data} />;
  if (data.template === "birthday-modern") return <BirthdayModern data={data} />;
  if (data.template === "engagement-bloom") return <EngagementBloom data={data} />;
  return null;
}

export default function PreviewClient({ template }: { template: TemplateConfig }) {
  const router = useRouter();
  const data = buildDemoData(template);

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-300 mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-stone-500 hover:text-stone-800 text-sm flex items-center gap-1.5 transition-colors"
            >
              ← Back
            </button>
            <div className="w-px h-4 bg-stone-200" />
            <span className="text-sm text-stone-500">
              Previewing{" "}
              <span className="text-stone-800 font-medium">{template.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500">{formatCurrency(template.price / 100)}</span>
            <Link
              href={`/create/${template.id}`}
              className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
            >
              Use This Template →
            </Link>
          </div>
        </div>
      </div>

      {/* Full template preview */}
      <div className="pt-14">
        <TemplateRenderer data={data} />
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Link
          href={`/create/${template.id}`}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-sm font-semibold shadow-2xl transition-all hover:scale-105 hover:shadow-rose-200"
          style={{
            background: "linear-gradient(135deg, #c8896a, #a87060)",
            boxShadow: "0 8px 32px rgba(168, 112, 96, 0.4)",
          }}
        >
          <span>Use This Template</span>
          <span className="text-white/70">—</span>
          <span>{formatCurrency(template.price / 100)}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
