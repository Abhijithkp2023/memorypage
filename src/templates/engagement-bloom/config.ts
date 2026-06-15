import type { TemplateConfig } from "@/types";

export const config: TemplateConfig = {
  sectionsMeta: [
    {
      sectionKey: "hero",
      label: "The Couple",
      fields: [
        { key: "person1", label: "Person 1 Name", type: "text", placeholder: "Rohan", required: true },
        { key: "person2", label: "Person 2 Name", type: "text", placeholder: "Neha", required: true },
        { key: "date", label: "Date", type: "text", placeholder: "February 14, 2027", required: true },
        { key: "tagline", label: "Tagline", type: "text", placeholder: "We said yes to forever" },
      ],
    },
    {
      sectionKey: "story",
      label: "The Proposal",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "The Proposal" },
        { key: "text", label: "Your Story", type: "textarea", placeholder: "Tell the story of the proposal..." },
        { key: "proposalPlace", label: "Proposal Place", type: "text", placeholder: "Taj Mahal, Agra" },
        { key: "proposalDate", label: "Proposal Date", type: "text", placeholder: "February 14, 2027" },
      ],
    },
    {
      sectionKey: "rsvp",
      label: "RSVP",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Join Our Celebration" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Your presence would mean the world" },
        { key: "deadline", label: "RSVP Deadline", type: "text", placeholder: "January 31, 2027" },
      ],
    },
  ],
  id: "engagement-bloom",
  name: "Engagement Bloom",
  eventType: "engagement",
  description: "A soft, romantic engagement announcement with floral tones and elegant typography.",
  thumbnail: "/templates/engagement-bloom.jpg",
  price: 89900,
  fonts: {
    en: { heading: "Playfair Display", body: "Inter", accent: "Great Vibes" },
  },
  defaultSections: {
    hero: true,
    story: true,
    gallery: false,
    event: false,
    rsvp: true,
    countdown: false,
  },
  defaultContent: {
    hero: {
      en: {
        person1: "Rohan",
        person2: "Neha",
        date: "February 14, 2027",
        tagline: "We said yes to forever",
      },
    },
    story: {
      en: {
        title: "The Proposal",
        text: "On a starlit evening at our favourite spot, Rohan got down on one knee and everything else faded away. It was a moment neither of us will ever forget.",
        proposalPlace: "Taj Mahal, Agra",
        proposalDate: "February 14, 2027",
      },
    },
    rsvp: {
      en: {
        title: "Join Our Celebration",
        subtitle: "Your presence would mean the world to us",
        deadline: "January 31, 2027",
      },
    },
  },
};
