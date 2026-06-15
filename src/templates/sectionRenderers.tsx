import type { JSX } from "react";

// Wedding Classic
import WeddingHero from "./wedding-classic/sections/Hero";
import WeddingStory from "./wedding-classic/sections/Story";
import WeddingGallery from "./wedding-classic/sections/Gallery";
import WeddingEventDetails from "./wedding-classic/sections/EventDetails";
import WeddingCountdown from "./wedding-classic/sections/Countdown";
import WeddingRSVP from "./wedding-classic/sections/RSVP";

// Birthday Modern
import BirthdayHero from "./birthday-modern/sections/Hero";
import BirthdayEventInfo from "./birthday-modern/sections/EventInfo";
import BirthdayRSVP from "./birthday-modern/sections/RSVP";

// Engagement Bloom
import EngagementHero from "./engagement-bloom/sections/Hero";
import EngagementStory from "./engagement-bloom/sections/Story";
import EngagementRSVP from "./engagement-bloom/sections/RSVP";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionRenderer = (content: any) => JSX.Element;

const renderers: Record<string, Record<string, SectionRenderer>> = {
  "wedding-classic": {
    hero: (c) => <WeddingHero content={c} />,
    story: (c) => <WeddingStory content={c} />,
    gallery: (c) => <WeddingGallery content={c} />,
    event: (c) => <WeddingEventDetails content={c} />,
    countdown: (c) => <WeddingCountdown content={c} />,
    rsvp: (c) => <WeddingRSVP content={c} />,
  },
  "birthday-modern": {
    hero: (c) => <BirthdayHero content={c} />,
    event: (c) => <BirthdayEventInfo content={c} />,
    rsvp: (c) => <BirthdayRSVP content={c} />,
  },
  "engagement-bloom": {
    hero: (c) => <EngagementHero content={c} />,
    story: (c) => <EngagementStory content={c} />,
    rsvp: (c) => <EngagementRSVP content={c} />,
  },
};

export function getSectionRenderer(
  templateId: string,
  sectionKey: string
): SectionRenderer | null {
  return renderers[templateId]?.[sectionKey] ?? null;
}
