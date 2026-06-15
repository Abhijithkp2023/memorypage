import type { TemplateConfig } from "@/types";

export const config: TemplateConfig = {
  sectionsMeta: [
    {
      sectionKey: "hero",
      label: "The Couple",
      fields: [
        { key: "groom", label: "Groom's Name", type: "text", placeholder: "Alex", required: true },
        { key: "bride", label: "Bride's Name", type: "text", placeholder: "Sarah", required: true },
        { key: "date", label: "Wedding Date", type: "text", placeholder: "December 14, 2026", required: true },
        { key: "tagline", label: "Tagline", type: "text", placeholder: "Two hearts, one forever" },
      ],
    },
    {
      sectionKey: "story",
      label: "Love Story",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Our Love Story" },
        { key: "text", label: "Your Story", type: "textarea", placeholder: "Tell your love story..." },
        { key: "groomName", label: "Groom's Name", type: "text", placeholder: "Alex" },
        { key: "brideName", label: "Bride's Name", type: "text", placeholder: "Sarah" },
      ],
    },
    {
      sectionKey: "gallery",
      label: "Photo Gallery",
      fields: [
        { key: "title", label: "Gallery Title", type: "text", placeholder: "Our Moments" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "A glimpse into our journey" },
      ],
    },
    {
      sectionKey: "event",
      label: "Event Details",
      fields: [
        { key: "ceremonyVenue", label: "Ceremony Venue", type: "text", placeholder: "St. Mary's Cathedral" },
        { key: "ceremonyAddress", label: "Ceremony Address", type: "text", placeholder: "123 Church Street" },
        { key: "ceremonyTime", label: "Ceremony Time", type: "text", placeholder: "11:00 AM" },
        { key: "receptionVenue", label: "Reception Venue", type: "text", placeholder: "The Grand Ballroom" },
        { key: "receptionAddress", label: "Reception Address", type: "text", placeholder: "456 Hotel Avenue" },
        { key: "receptionTime", label: "Reception Time", type: "text", placeholder: "7:00 PM" },
      ],
    },
    {
      sectionKey: "countdown",
      label: "Countdown",
      fields: [
        { key: "title", label: "Countdown Title", type: "text", placeholder: "Counting Down to Forever" },
        { key: "targetDate", label: "Target Date", type: "date", placeholder: "2026-12-14" },
      ],
    },
    {
      sectionKey: "rsvp",
      label: "RSVP",
      fields: [
        { key: "title", label: "RSVP Title", type: "text", placeholder: "Join Our Celebration" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "We would be honored to have you" },
        { key: "deadline", label: "RSVP Deadline", type: "text", placeholder: "November 14, 2026" },
      ],
    },
  ],
  id: "wedding-classic",
  name: "Classic Elegance",
  eventType: "wedding",
  description: "A timeless and elegant wedding website with floral accents and romantic typography.",
  thumbnail: "/templates/wedding-classic.jpg",
  price: 99900,
  fonts: {
    en: {
      heading: "Playfair Display",
      body: "Inter",
      accent: "Great Vibes",
    },
    hi: {
      heading: "Tiro Devanagari Hindi",
      body: "Noto Sans Devanagari",
      accent: "Hind",
    },
  },
  defaultSections: {
    hero: true,
    story: true,
    gallery: true,
    event: true,
    rsvp: true,
    countdown: true,
  },
  defaultContent: {
    hero: {
      en: {
        groom: "Alex",
        bride: "Sarah",
        date: "December 14, 2026",
        tagline: "Two hearts, one forever",
      },
    },
    story: {
      en: {
        title: "Our Love Story",
        text: "We met on a beautiful summer afternoon and knew from that moment that something special had begun. Through laughter, adventures, and countless memories, our love has grown stronger every day.",
        groomName: "Alex",
        brideName: "Sarah",
      },
    },
    gallery: {
      en: {
        title: "Our Moments",
        subtitle: "A glimpse into our journey",
      },
    },
    event: {
      en: {
        title: "Wedding Details",
        ceremonyTitle: "Ceremony",
        ceremonyVenue: "St. Mary's Cathedral",
        ceremonyAddress: "123 Church Street, Mumbai",
        ceremonyTime: "11:00 AM",
        receptionTitle: "Reception",
        receptionVenue: "The Grand Ballroom",
        receptionAddress: "456 Hotel Avenue, Mumbai",
        receptionTime: "7:00 PM",
      },
    },
    countdown: {
      en: {
        title: "Counting Down to Forever",
        targetDate: "2026-12-14",
      },
    },
    rsvp: {
      en: {
        title: "Join Our Celebration",
        subtitle: "We would be honored to have you",
        deadline: "November 14, 2026",
      },
    },
  },
};
