import { NextRequest, NextResponse } from "next/server";
import { getTemplateConfig } from "@/templates/registry";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { templateId } = await req.json();

    const template = getTemplateConfig(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID!;
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;

    // Call Razorpay REST API directly — no npm package needed
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: template.price,
        currency: "INR",
        receipt: `mp_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err?.error?.description ?? "Razorpay order creation failed");
    }

    const order = await response.json();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
