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
      const msg = err?.error?.description ?? err?.error?.code ?? JSON.stringify(err);
      console.error("Razorpay error:", msg);
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    const order = await response.json();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create order";
    console.error("create-order error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
