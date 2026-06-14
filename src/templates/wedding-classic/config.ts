import type { TemplateConfig } from "@/types";

export const config: TemplateConfig = {
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
