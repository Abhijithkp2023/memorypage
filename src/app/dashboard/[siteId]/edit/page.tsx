import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { WebsiteData } from "@/types";
import EditWebsite from "./EditWebsite";
import DashboardNav from "@/components/DashboardNav";

interface Props {
  params: Promise<{ siteId: string }>;
}

export default async function EditPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { siteId } = await params;

  const website = await prisma.website.findFirst({
    where: { id: siteId, userId: session.user.id },
  });

  if (!website) notFound();

  const data = website.data as unknown as WebsiteData;

  return (
    <div className="min-h-screen bg-stone-50">
      <DashboardNav user={session.user} />
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-stone-800">Edit Website</h1>
            <p className="text-stone-500 text-sm mt-1">
              memorypage.app/w/{website.slug}
            </p>
          </div>
          <EditWebsite siteId={siteId} initialData={data} />
        </div>
      </div>
    </div>
  );
}
