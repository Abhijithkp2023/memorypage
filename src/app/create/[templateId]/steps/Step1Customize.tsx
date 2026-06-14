"use client";
import type { TemplateConfig, WebsiteData } from "@/types";

interface Props {
  template: TemplateConfig;
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
  onSlugChange: (groom: string, bride: string) => void;
  onNext: () => void;
}

export default function Step1Customize({ template, data, onChange, onSlugChange, onNext }: Props) {
  const lang = "en";
  const hero = (data.content.hero?.[lang] ?? {}) as Record<string, string>;
  const story = (data.content.story?.[lang] ?? {}) as Record<string, string>;
  const event = (data.content.event?.[lang] ?? {}) as Record<string, string>;
  const countdown = (data.content.countdown?.[lang] ?? {}) as Record<string, string>;

  const setHeroField = (key: string, value: string) => {
    const updated = {
      ...data,
      content: {
        ...data.content,
        hero: {
          ...data.content.hero,
          [lang]: { ...hero, [key]: value },
        },
      },
    };
    onChange(updated);
    if (key === "groom" || key === "bride") {
      onSlugChange(
        key === "groom" ? value : hero.groom ?? "",
        key === "bride" ? value : hero.bride ?? ""
      );
    }
  };

  const setStoryField = (key: string, value: string) => {
    onChange({
      ...data,
      content: {
        ...data.content,
        story: {
          ...data.content.story,
          [lang]: { ...story, [key]: value },
        },
      },
    });
  };

  const setEventField = (key: string, value: string) => {
    onChange({
      ...data,
      content: {
        ...data.content,
        event: {
          ...data.content.event,
          [lang]: { ...event, [key]: value },
        },
      },
    });
  };

  const setCountdownField = (key: string, value: string) => {
    onChange({
      ...data,
      content: {
        ...data.content,
        countdown: {
          ...data.content.countdown,
          [lang]: { ...countdown, [key]: value },
        },
      },
    });
  };

  const toggleSection = (key: keyof WebsiteData["sections"]) => {
    onChange({
      ...data,
      sections: { ...data.sections, [key]: !data.sections[key] },
    });
  };

  const canProceed = hero.groom && hero.bride && hero.date;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-2xl font-light text-stone-800 mb-6">
          Customize your{" "}
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            {template.name}
          </span>
        </h2>

        {/* Hero section */}
        <div className="space-y-5">
          <h3 className="text-xs uppercase tracking-widest text-rose-400">The Couple</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Groom&apos;s Name *</label>
              <input
                type="text"
                value={hero.groom ?? ""}
                onChange={(e) => setHeroField("groom", e.target.value)}
                placeholder="Alex"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Bride&apos;s Name *</label>
              <input
                type="text"
                value={hero.bride ?? ""}
                onChange={(e) => setHeroField("bride", e.target.value)}
                placeholder="Sarah"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Wedding Date *</label>
              <input
                type="date"
                value={countdown.targetDate ?? ""}
                onChange={(e) => {
                  setCountdownField("targetDate", e.target.value);
                  const d = new Date(e.target.value);
                  setHeroField(
                    "date",
                    d.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                  );
                }}
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Tagline</label>
              <input
                type="text"
                value={hero.tagline ?? ""}
                onChange={(e) => setHeroField("tagline", e.target.value)}
                placeholder="Two hearts, one forever"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
              />
            </div>
          </div>

          {/* Slug preview */}
          {data.slug && (
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm">
              <span className="text-stone-400">Your site will be at: </span>
              <span className="text-rose-600 font-medium">memorypage.app/w/{data.slug}</span>
            </div>
          )}
        </div>
      </div>

      {/* Story section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h3 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Your Love Story</h3>
        <textarea
          rows={4}
          value={story.text ?? ""}
          onChange={(e) => setStoryField("text", e.target.value)}
          placeholder="Tell your love story here..."
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors resize-none"
        />
      </div>

      {/* Event details */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h3 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Event Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Ceremony Venue</label>
            <input
              type="text"
              value={event.ceremonyVenue ?? ""}
              onChange={(e) => setEventField("ceremonyVenue", e.target.value)}
              placeholder="St. Mary's Cathedral"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Ceremony Time</label>
            <input
              type="text"
              value={event.ceremonyTime ?? ""}
              onChange={(e) => setEventField("ceremonyTime", e.target.value)}
              placeholder="11:00 AM"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Reception Venue</label>
            <input
              type="text"
              value={event.receptionVenue ?? ""}
              onChange={(e) => setEventField("receptionVenue", e.target.value)}
              placeholder="The Grand Ballroom"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Reception Time</label>
            <input
              type="text"
              value={event.receptionTime ?? ""}
              onChange={(e) => setEventField("receptionTime", e.target.value)}
              placeholder="7:00 PM"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Section toggles */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h3 className="text-xs uppercase tracking-widest text-rose-400 mb-5">Page Sections</h3>
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
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    enabled ? "bg-rose-400 border-rose-400" : "border-stone-300"
                  }`}
                >
                  {enabled && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="capitalize">{key}</span>
              </button>
            )
          )}
        </div>
      </div>

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
