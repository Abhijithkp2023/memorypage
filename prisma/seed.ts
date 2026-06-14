// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Seed demo website
  const tmpl = await prisma.template.upsert({
    where: { slug: "wedding-classic" },
    update: {},
    create: {
      slug: "wedding-classic",
      name: "Classic Elegance",
      eventType: "wedding",
      description: "A timeless and elegant wedding website.",
      thumbnail: "/templates/wedding-classic.jpg",
      price: 99900,
    },
  });

  // Demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@memorypage.app" },
    update: {},
    create: {
      email: "demo@memorypage.app",
      password: "$2b$12$demohashedpassword",
    },
  });

  // Demo website
  await prisma.website.upsert({
    where: { slug: "demo-wedding" },
    update: {},
    create: {
      slug: "demo-wedding",
      userId: user.id,
      templateId: tmpl.id,
      data: {
        slug: "demo-wedding",
        template: "wedding-classic",
        settings: { defaultLanguage: "en", enabledLanguages: ["en"] },
        sections: {
          hero: true,
          story: true,
          gallery: true,
          event: true,
          rsvp: true,
          countdown: true,
        },
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
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
