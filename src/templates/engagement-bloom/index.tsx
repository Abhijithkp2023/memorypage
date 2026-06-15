import EngagementHero from "./sections/Hero";
import EngagementStory from "./sections/Story";
import EngagementRSVP from "./sections/RSVP";
import type { WebsiteData } from "@/types";

export default function EngagementBloom({ data }: { data: WebsiteData }) {
  const lang = data.settings.defaultLanguage;
  const s = data.sections;
  const c = data.content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = (section: keyof typeof c): any => c[section]?.[lang] ?? c[section]?.en ?? {};

  return (
    <main>
      {s.hero && <EngagementHero content={get("hero")} />}
      {s.story && <EngagementStory content={get("story")} />}
      {s.rsvp && <EngagementRSVP content={get("rsvp")} />}
      <footer className="py-8 text-center text-xs tracking-widest uppercase" style={{ background: "#fff9fc", color: "#d4a0aa" }}>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem", color: "#c83349", marginBottom: "0.5rem" }}>
          Made with love
        </p>
        <p>Created with MemoryPage</p>
      </footer>
    </main>
  );
}
