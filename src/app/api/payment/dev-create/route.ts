import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getTemplateConfig } from "@/templates/registry";
import type { WebsiteData } from "@/types";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    const { templateId, websiteData, email, password } = await req.json() as {
      templateId: string;
      websiteData: WebsiteData;
      email: string;
      password: string;
    };

    const template = getTemplateConfig(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const hashed = await bcrypt.hash(password, 12);
      user = await prisma.user.create({ data: { email, password: hashed } });
    }

    // Find or create template record
    let tmpl = await prisma.template.findUnique({ where: { slug: templateId } });
    if (!tmpl) {
      tmpl = await prisma.template.create({
        data: {
          slug: template.id,
          name: template.name,
          eventType: template.eventType,
          description: template.description,
          thumbnail: template.thumbnail,
          price: template.price,
        },
      });
    }

    // Create website (slug must be unique)
    const website = await prisma.website.create({
      data: {
        slug: websiteData.slug,
        userId: user.id,
        templateId: tmpl.id,
        data: websiteData as unknown as import("@prisma/client").Prisma.JsonObject,
      },
    });

    return NextResponse.json({ success: true, slug: website.slug });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create website";
    // Unique constraint on slug
    if (msg.includes("Unique constraint") || msg.includes("slug")) {
      return NextResponse.json({ error: "That URL slug is already taken. Go back and change the names slightly." }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
