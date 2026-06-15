import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getTemplateConfig } from "@/templates/registry";
import type { WebsiteData } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      email,
      password,
      websiteData,
      templateId,
    } = body as {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
      email: string;
      password: string;
      websiteData: WebsiteData;
      templateId: string;
    };

    // Verify signature
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      console.error("Signature mismatch", { expected, got: razorpay_signature });
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

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

    // Create website
    const website = await prisma.website.create({
      data: {
        slug: websiteData.slug,
        userId: user.id,
        templateId: tmpl.id,
        data: websiteData as unknown as import("@prisma/client").Prisma.JsonObject,
      },
    });

    // Record payment
    await prisma.payment.create({
      data: {
        userId: user.id,
        websiteId: website.id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: template.price,
        status: "paid",
      },
    });

    return NextResponse.json({ success: true, slug: website.slug });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("verify error:", msg);
    // Surface slug conflict clearly
    if (msg.includes("Unique constraint") || msg.toLowerCase().includes("slug")) {
      return NextResponse.json(
        { error: "That website URL is already taken. Go back and adjust the name or date." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
