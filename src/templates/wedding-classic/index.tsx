import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Gallery from "./sections/Gallery";
import EventDetails from "./sections/EventDetails";
import Countdown from "./sections/Countdown";
import RSVP from "./sections/RSVP";
import type { WebsiteData } from "@/types";

interface Props {
  data: WebsiteData;
}

export default function WeddingClassic({ data }: Props) {
  const lang = data.settings.defaultLanguage;
  const s = data.sections;
  const c = data.content;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = (section: keyof typeof c): any =>
    c[section]?.[lang] ?? c[section]?.en ?? {};

  return (
    <main>
      {s.hero && <Hero content={get("hero")} />}
      {s.countdown && <Countdown content={get("countdown")} />}
      {s.story && <Story content={get("story")} />}
      {s.gallery && <Gallery content={get("gallery")} />}
      {s.event && <EventDetails content={get("event")} />}
      {s.rsvp && <RSVP content={get("rsvp")} />}

      <footer
        className="py-8 text-center text-xs tracking-widest uppercase"
        style={{ background: "#fdf6f0", color: "#c8a090" }}
      >
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem", color: "#a87060", marginBottom: "0.5rem" }}>
          Made with love
        </p>
        <p>Created with MemoryPage</p>
      </footer>
    </main>
  );
}
