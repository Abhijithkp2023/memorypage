import type { TemplateConfig } from "@/types";

export const config: TemplateConfig = {
  sectionsMeta: [
    {
      sectionKey: "hero",
      label: "Birthday Hero",
      fields: [
        { key: "name", label: "Name", type: "text", placeholder: "Priya", required: true },
        { key: "age", label: "Age", type: "text", placeholder: "25", required: true },
        { key: "date", label: "Party Date", type: "text", placeholder: "March 20, 2027", required: true },
        { key: "tagline", label: "Tagline", type: "text", placeholder: "A quarter century of awesome!" },
      ],
    },
    {
      sectionKey: "event",
      label: "Party Details",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Party Time" },
        { key: "venue", label: "Venue", type: "text", placeholder: "The Rooftop Lounge" },
        { key: "address", label: "Address", type: "text", placeholder: "12 Sky High Road, Bengaluru" },
        { key: "date", label: "Date", type: "text", placeholder: "March 20, 2027" },
        { key: "time", label: "Time", type: "text", placeholder: "7:00 PM – Midnight" },
        { key: "dresscode", label: "Dress Code", type: "text", placeholder: "Black & Gold" },
      ],
    },
    {
      sectionKey: "rsvp",
      label: "RSVP",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Join the Party" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "We'd love to celebrate with you!" },
        { key: "deadline", label: "RSVP Deadline", type: "text", placeholder: "March 10, 2027" },
      ],
    },
  ],
  id: "birthday-modern",
  name: "Birthday Modern",
  eventType: "birthday",
  description: "A bold, vibrant birthday website with dark backgrounds, neon accents and a party vibe.",
  thumbnail: "/templates/birthday-modern.jpg",
  price: 79900,
  fonts: {
    en: { heading: "Inter", body: "Inter", accent: "Playfair Display" },
  },
  defaultSections: {
    hero: true,
    story: false,
    gallery: false,
    event: true,
    rsvp: true,
    countdown: false,
  },
  defaultContent: {
    hero: {
      en: {
        name: "Priya",
        age: "25",
        date: "March 20, 2027",
        tagline: "A quarter century of awesome!",
      },
    },
    event: {
      en: {
        title: "Party Time",
        venue: "The Rooftop Lounge",
        address: "12 Sky High Road, Bengaluru",
        date: "March 20, 2027",
        time: "7:00 PM – Midnight",
        dresscode: "Black & Gold",
      },
    },
    rsvp: {
      en: {
        title: "Join the Party",
        subtitle: "We'd love to celebrate with you!",
        deadline: "March 10, 2027",
      },
    },
  },
};
