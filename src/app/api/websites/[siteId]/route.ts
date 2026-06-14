import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ siteId: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId } = await params;
  const { data } = await req.json();

  const website = await prisma.website.findFirst({
    where: { id: siteId, userId: session.user.id },
  });

  if (!website) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.website.update({
    where: { id: siteId },
    data: { data },
  });

  return NextResponse.json({ success: true, slug: updated.slug });
}
