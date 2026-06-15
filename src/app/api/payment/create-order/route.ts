import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getTemplateConfig } from "@/templates/registry";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const { templateId } = await req.json();

    const template = getTemplateConfig(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: template.price,
      currency: "INR",
      receipt: `mp_${Date.now()}`,
    });

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
