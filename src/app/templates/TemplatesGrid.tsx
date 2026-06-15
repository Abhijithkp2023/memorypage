"use client";
import { useState } from "react";
import Link from "next/link";
import type { TemplateConfig, EventType } from "@/types";
import { formatCurrency } from "@/lib/utils";

const FILTER_LABELS: Record<string, string> = {
  all: "All Events",
  wedding: "Wedding",
  birthday: "Birthday",
  engagement: "Engagement",
  anniversary: "Anniversary",
  "baby-shower": "Baby Shower",
  housewarming: "Housewarming",
  other: "Other",
};

interface Props {
  templates: TemplateConfig[];
}

export default function TemplatesGrid({ templates }: Props) {
  const [active, setActive] = useState<"all" | EventType>("all");

  // Derive filter options from the real templates (always show All + types that exist)
  const availableTypes = Array.from(new Set(templates.map((t) => t.eventType)));
  const filters = ["all", ...availableTypes] as ("all" | EventType)[];

  const visible = active === "all" ? templates : templates.filter((t) => t.eventType === active);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              active === f
                ? "text-white border-transparent"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:text-stone-700"
            }`}
            style={
              active === f
                ? { background: "linear-gradient(135deg, #c8896a, #a87060)", border: "none" }
                : {}
            }
          >
            {FILTER_LABELS[f] ?? f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((template) => {
          const heroEn = (template.defaultContent?.hero?.en ?? {}) as Record<string, string>;
          const previewLine1 =
            heroEn.groom && heroEn.bride
              ? `${heroEn.groom} & ${heroEn.bride}`
              : heroEn.name
              ? heroEn.name
              : heroEn.person1 && heroEn.person2
              ? `${heroEn.person1} & ${heroEn.person2}`
              : template.name;
          const previewLine2 = heroEn.date ?? "";

          return (
            <div
              key={template.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-stone-100"
            >
              {/* Template preview thumbnail */}
              <div
                className="h-56 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #fdf6f0 0%, #f8e8e8 50%, #f0e8f0 100%)",
                }}
              >
                <div className="text-center px-6">
                  <p
                    className="text-3xl"
                    style={{ fontFamily: "'Great Vibes', cursive", color: "#5c3d2e" }}
                  >
                    {previewLine1}
                  </p>
                  {previewLine2 && (
                    <p className="text-xs uppercase tracking-widest text-rose-400 mt-2">
                      {previewLine2}
                    </p>
                  )}
                  <div className="w-12 h-px bg-rose-200 mx-auto mt-3" />
                </div>
                <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-xs text-stone-600 capitalize">
                  {template.eventType}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-xl font-medium text-stone-800">{template.name}</h3>
                  <span
                    className="text-xl font-light shrink-0 ml-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#5c3d2e" }}
                  >
                    {formatCurrency(template.price / 100)}
                  </span>
                </div>
                <p className="text-sm text-stone-500 mb-5 leading-relaxed">
                  {template.description}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={`/templates/preview/${template.id}`}
                    className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium transition-all text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/create/${template.id}`}
                    className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium transition-all text-white hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Coming soon — only show when not actively filtering */}
        {active === "all" &&
          ["Anniversary Gold", "Baby Shower Bloom", "Housewarming Warm"].map((name) => (
            <div
              key={name}
              className="bg-white rounded-3xl overflow-hidden border border-dashed border-stone-200 opacity-60"
            >
              <div className="h-56 flex items-center justify-center" style={{ background: "#fafafa" }}>
                <p className="text-stone-300 text-sm uppercase tracking-widest">Coming Soon</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-400 mb-1">{name}</h3>
                <p className="text-sm text-stone-300">Available soon</p>
              </div>
            </div>
          ))}

        {/* Empty state when a filter returns nothing */}
        {visible.length === 0 && (
          <div className="col-span-3 text-center py-24 text-stone-400">
            <p className="text-4xl mb-4">✦</p>
            <p className="text-sm uppercase tracking-widest">
              No templates yet for this category
            </p>
            <p className="text-xs mt-2 text-stone-300">Check back soon</p>
          </div>
        )}
      </div>
    </>
  );
}
