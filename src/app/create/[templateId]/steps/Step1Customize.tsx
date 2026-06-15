"use client";
import type { TemplateConfig, WebsiteData, SectionToggles } from "@/types";
import SectionCard from "./SectionCard";

interface Props {
  template: TemplateConfig;
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
  onSlugChange: (a: string, b: string) => void;
  onNext: () => void;
}

export default function Step1Customize({ template, data, onChange, onNext }: Props) {
  const lang = "en";

  function getSectionContent(sectionKey: string): Record<string, string> {
    const block = data.content[sectionKey as keyof typeof data.content];
    return (block?.[lang] ?? block?.en ?? {}) as Record<string, string>;
  }

  function setSectionField(sectionKey: string, key: string, value: string) {
    const block = data.content[sectionKey as keyof typeof data.content] ?? {};
    const existing = (block[lang] ?? block.en ?? {}) as Record<string, string>;
    onChange({
      ...data,
      content: {
        ...data.content,
        [sectionKey]: { ...block, [lang]: { ...existing, [key]: value } },
      },
    });
  }

  function toggleSection(sectionKey: keyof SectionToggles) {
    onChange({
      ...data,
      sections: { ...data.sections, [sectionKey]: !data.sections[sectionKey] },
    });
  }

  // Find a required field across hero to check if we can proceed
  const heroContent = getSectionContent("hero");
  const requiredKeys = template.sectionsMeta
    .find((m) => m.sectionKey === "hero")
    ?.fields.filter((f) => f.required)
    .map((f) => f.key) ?? [];
  const canProceed = requiredKeys.every((k) => !!heroContent[k]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-stone-800 mb-1">
          Customize your{" "}
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            {template.name}
          </span>
        </h2>
        <p className="text-sm text-stone-400">
          Toggle sections on or off, then fill in your details below each preview.
        </p>
      </div>

      {template.sectionsMeta.map((meta) => {
        const sectionKey = meta.sectionKey as keyof SectionToggles;
        // Only show sections this template actually has in defaultSections
        if (!(sectionKey in template.defaultSections)) return null;

        const enabled = data.sections[sectionKey];
        const content = getSectionContent(meta.sectionKey);

        return (
          <SectionCard
            key={meta.sectionKey}
            meta={meta}
            templateId={template.id}
            enabled={enabled}
            content={content}
            onToggle={() => toggleSection(sectionKey)}
            onChange={(key, value) => setSectionField(meta.sectionKey, key, value)}
          />
        );
      })}

      {data.slug && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm">
          <span className="text-stone-400">Your site will be at: </span>
          <span className="text-rose-600 font-medium">memorypage.app/w/{data.slug}</span>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full py-4 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
      >
        Continue to Account →
      </button>
    </div>
  );
}
