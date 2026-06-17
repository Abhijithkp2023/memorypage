"use client";
import ImageUpload from "@/components/ImageUpload";
import { getSectionRenderer } from "@/templates/sectionRenderers";
import type { SectionMeta, SectionToggles } from "@/types";

type SectionContent = Record<string, string | string[]>;

interface Props {
  meta: SectionMeta;
  templateId: string;
  enabled: boolean;
  content: SectionContent;
  onToggle: () => void;
  onChange: (key: string, value: string | string[]) => void;
}

export default function SectionCard({
  meta,
  templateId,
  enabled,
  content,
  onToggle,
  onChange,
}: Props) {
  const render = getSectionRenderer(templateId, meta.sectionKey as string);

  return (
    <div
      className={`rounded-3xl overflow-hidden border transition-all ${
        enabled ? "border-stone-200 shadow-sm" : "border-stone-100 opacity-50"
      } bg-white`}
    >
      {/* Section header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-400 font-medium">
          {meta.label}
        </p>
        {/* Toggle switch */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={enabled ? "Disable section" : "Enable section"}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            enabled ? "bg-rose-400" : "bg-stone-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Live section preview — zoom shrinks layout so no clipping */}
      {render && (
        <div className="relative border-b border-stone-100 bg-stone-50">
          <div className="pointer-events-none" style={{ zoom: 0.4 }}>
            {render(content)}
          </div>
          {!enabled && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-stone-400">
                Section disabled
              </span>
            </div>
          )}
        </div>
      )}

      {/* Form fields — only shown when enabled */}
      {enabled && (
        <div className="p-6 grid grid-cols-2 gap-4">
          {meta.fields.map((field) => {
            const isFullWidth =
              field.type === "textarea" || field.type === "image" || field.type === "images";

            return (
              <div key={field.key} className={isFullWidth ? "col-span-2" : ""}>
                {field.type === "image" || field.type === "images" ? (
                  <ImageUpload
                    label={
                      field.label +
                      (field.required ? " *" : "")
                    }
                    value={
                      field.type === "images"
                        ? (content[field.key] as string[] | undefined) ?? []
                        : (content[field.key] as string | undefined) ?? ""
                    }
                    onChange={(val) => onChange(field.key, val)}
                    multiple={field.type === "images"}
                    maxCount={field.maxCount ?? 12}
                  />
                ) : (
                  <>
                    <label className="block text-xs text-stone-500 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-rose-400 ml-0.5">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={(content[field.key] as string) ?? ""}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={(content[field.key] as string) ?? ""}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
