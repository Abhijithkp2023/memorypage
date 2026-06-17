"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import type { WebsiteData } from "@/types";
import { Check } from "lucide-react";

interface Props {
  siteId: string;
  initialData: WebsiteData;
}

export default function EditWebsite({ siteId, initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<WebsiteData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const lang = "en";
  const hero = (data.content.hero?.[lang] ?? {}) as Record<string, string | string[]>;
  const story = (data.content.story?.[lang] ?? {}) as Record<string, string | string[]>;
  const gallery = (data.content.gallery?.[lang] ?? {}) as Record<string, string | string[]>;
  const event = (data.content.event?.[lang] ?? {}) as Record<string, string>;

  const setField = (
    section: keyof WebsiteData["content"],
    key: string,
    value: string | string[]
  ) => {
    setData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          [lang]: {
            ...((prev.content[section]?.[lang] as Record<string, string | string[]>) ?? {}),
            [key]: value,
          },
        },
      },
    }));
  };

  const toggleSection = (key: keyof WebsiteData["sections"]) => {
    setData((prev) => ({
      ...prev,
      sections: { ...prev.sections, [key]: !prev.sections[key] },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/websites/${siteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero content */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-xs uppercase tracking-widest text-rose-400 mb-5">The Couple</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Groom&apos;s Name</label>
            <input
              value={(hero.groom as string) ?? ""}
              onChange={(e) => setField("hero", "groom", e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Bride&apos;s Name</label>
            <input
              value={(hero.bride as string) ?? ""}
              onChange={(e) => setField("hero", "bride", e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Display Date</label>
            <input
              value={(hero.date as string) ?? ""}
              onChange={(e) => setField("hero", "date", e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Tagline</label>
            <input
              value={(hero.tagline as string) ?? ""}
              onChange={(e) => setField("hero", "tagline", e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div className="col-span-2">
            <ImageUpload
              label="Hero Background Photo"
              value={(hero.heroImage as string) ?? ""}
              onChange={(val) => setField("hero", "heroImage", val)}
            />
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Love Story</h2>
        <textarea
          rows={4}
          value={(story.text as string) ?? ""}
          onChange={(e) => setField("story", "text", e.target.value)}
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors resize-none mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <ImageUpload
            label="Groom Photo"
            value={(story.groomImage as string) ?? ""}
            onChange={(val) => setField("story", "groomImage", val)}
          />
          <ImageUpload
            label="Bride Photo"
            value={(story.brideImage as string) ?? ""}
            onChange={(val) => setField("story", "brideImage", val)}
          />
        </div>
      </div>

      {/* Gallery */}
      {data.sections.gallery && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
          <h2 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Photo Gallery</h2>
          <ImageUpload
            label="Gallery Photos"
            value={(gallery.images as string[]) ?? []}
            onChange={(val) => setField("gallery", "images", val)}
            multiple
            maxCount={12}
          />
        </div>
      )}

      {/* Event details */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Event Details</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "ceremonyVenue", label: "Ceremony Venue" },
            { key: "ceremonyTime", label: "Ceremony Time" },
            { key: "ceremonyAddress", label: "Ceremony Address" },
            { key: "receptionVenue", label: "Reception Venue" },
            { key: "receptionTime", label: "Reception Time" },
            { key: "receptionAddress", label: "Reception Address" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs text-stone-500 mb-1.5">{label}</label>
              <input
                value={event[key] ?? ""}
                onChange={(e) => setField("event", key, e.target.value)}
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section toggles */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Page Sections</h2>
        <div className="grid grid-cols-2 gap-3">
          {(Object.entries(data.sections) as [keyof WebsiteData["sections"], boolean][]).map(
            ([key, enabled]) => (
              <button
                key={key}
                onClick={() => toggleSection(key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                  enabled
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-stone-200 text-stone-400 hover:border-stone-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    enabled ? "bg-rose-400 border-rose-400" : "border-stone-300"
                  }`}
                >
                  {enabled && <Check size={10} color="white" />}
                </div>
                <span className="capitalize">{key}</span>
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex-1 py-4 rounded-2xl text-stone-600 text-sm font-medium border border-stone-200 hover:border-stone-300 transition-all bg-white"
        >
          ← Dashboard
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-grow-[2] flex-1 py-4 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
        >
          {saved ? (
            <>
              <Check size={14} /> Saved!
            </>
          ) : saving ? (
            "Saving..."
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
