export type EventType =
  | "wedding"
  | "birthday"
  | "engagement"
  | "anniversary"
  | "baby-shower"
  | "housewarming"
  | "other";

export interface SectionToggles {
  hero: boolean;
  story: boolean;
  gallery: boolean;
  event: boolean;
  rsvp: boolean;
  countdown: boolean;
}

export interface ContentBlock {
  [lang: string]: Record<string, string | string[]>;
}

export interface WebsiteData {
  id?: string;
  slug: string;
  template: string;
  settings: {
    defaultLanguage: string;
    enabledLanguages: string[];
  };
  sections: SectionToggles;
  content: {
    hero?: ContentBlock;
    story?: ContentBlock;
    gallery?: ContentBlock;
    event?: ContentBlock;
    rsvp?: ContentBlock;
    countdown?: ContentBlock;
  };
}

export interface SectionField {
  key: string;
  label: string;
  type: "text" | "date" | "textarea" | "image" | "images";
  placeholder?: string;
  required?: boolean;
  maxCount?: number;
}

export interface SectionMeta {
  sectionKey: keyof SectionToggles;
  label: string;
  fields: SectionField[];
}

export interface TemplateConfig {
  id: string;
  name: string;
  eventType: EventType;
  description: string;
  thumbnail: string;
  price: number;
  fonts: {
    [lang: string]: {
      heading: string;
      body: string;
      accent: string;
    };
  };
  defaultSections: SectionToggles;
  defaultContent: WebsiteData["content"];
  sectionsMeta: SectionMeta[];
}
