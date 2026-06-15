import BirthdayHero from "./sections/Hero";
import BirthdayEventInfo from "./sections/EventInfo";
import BirthdayRSVP from "./sections/RSVP";
import type { WebsiteData } from "@/types";

export default function BirthdayModern({ data }: { data: WebsiteData }) {
  const lang = data.settings.defaultLanguage;
  const s = data.sections;
  const c = data.content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = (section: keyof typeof c): any => c[section]?.[lang] ?? c[section]?.en ?? {};

  return (
    <main>
      {s.hero && <BirthdayHero content={get("hero")} />}
      {s.event && <BirthdayEventInfo content={get("event")} />}
      {s.rsvp && <BirthdayRSVP content={get("rsvp")} />}
      <footer className="py-8 text-center text-xs tracking-widest uppercase bg-gray-950 text-gray-600">
        <p className="text-yellow-400 text-lg mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          🎉 Made with MemoryPage
        </p>
        <p>Create your own event website</p>
      </footer>
    </main>
  );
}
