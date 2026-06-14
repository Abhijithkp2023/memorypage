import { notFound } from "next/navigation";
import WeddingClassic from "@/templates/wedding-classic";
import type { WebsiteData } from "@/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const DEMO_DATA: WebsiteData = {
  slug: "demo-wedding",
  template: "wedding-classic",
  settings: { defaultLanguage: "en", enabledLanguages: ["en"] },
  sections: { hero: true, story: true, gallery: true, event: true, rsvp: true, countdown: true },
  content: {
    hero: {
      en: {
        groom: "Arjun",
        bride: "Meera",
        date: "February 14, 2027",
        tagline: "Two souls, one journey",
      },
    },
    story: {
      en: {
        title: "Our Love Story",
        text: "We first met at a friend's wedding — the universe has a wonderful sense of humor. What started as a chance encounter turned into daily conversations, shared dreams, and an unbreakable bond. Today, we're writing our own love story.",
        groomName: "Arjun",
        brideName: "Meera",
      },
    },
    gallery: {
      en: { title: "Our Moments", subtitle: "A glimpse into our journey" },
    },
    event: {
      en: {
        title: "Wedding Details",
        ceremonyTitle: "Ceremony",
        ceremonyVenue: "The Royal Palace",
        ceremonyAddress: "1 Palace Road, Mumbai, Maharashtra",
        ceremonyTime: "10:00 AM",
        receptionTitle: "Reception",
        receptionVenue: "Ocean View Banquet",
        receptionAddress: "Marine Drive, Mumbai, Maharashtra",
        receptionTime: "7:30 PM",
      },
    },
    countdown: {
      en: { title: "Counting Down to Forever", targetDate: "2027-02-14" },
    },
    rsvp: {
      en: {
        title: "Join Our Celebration",
        subtitle: "We would be honoured to have you",
        deadline: "January 14, 2027",
      },
    },
  },
};

async function getWebsiteData(slug: string): Promise<WebsiteData | null> {
  // Serve demo statically without DB
  if (slug === "demo-wedding") return DEMO_DATA;

  try {
    const { prisma } = await import("@/lib/prisma");
    const website = await prisma.website.findUnique({
      where: { slug, isPublished: true },
    });
    if (!website) return null;
    return website.data as unknown as WebsiteData;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getWebsiteData(slug);
  if (!data) return { title: "Not Found" };

  const lang = data.settings.defaultLanguage;
  const heroContent = (data.content.hero?.[lang] ?? data.content.hero?.en ?? {}) as Record<string, string>;
  const title = heroContent.groom && heroContent.bride
    ? `${heroContent.groom} & ${heroContent.bride}`
    : slug;

  return {
    title: `${title} | MemoryPage`,
    description: `Join us for our special celebration`,
  };
}

export default async function WebsitePage({ params }: Props) {
  const { slug } = await params;
  const data = await getWebsiteData(slug);

  if (!data) notFound();

  if (data.template === "wedding-classic") {
    return <WeddingClassic data={data} />;
  }

  notFound();
}
