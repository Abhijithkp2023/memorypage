import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { WebsiteData } from "@/types";
import { ExternalLink, Edit, Calendar } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const websites = await prisma.website.findMany({
    where: { userId: session.user.id },
    include: { template: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <DashboardNav user={session.user} />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-300 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-light text-stone-800">Your Websites</h1>
              <p className="text-stone-500 text-sm mt-1">Manage your event websites</p>
            </div>
            <Link
              href="/templates"
              className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
            >
              + New Website
            </Link>
          </div>

          {websites.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-stone-200">
              <div className="text-5xl mb-4">💍</div>
              <h2 className="text-xl font-light text-stone-600 mb-2">No websites yet</h2>
              <p className="text-stone-400 text-sm mb-6">
                Create your first event website in minutes.
              </p>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
              >
                Browse Templates
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((site) => {
                const data = site.data as unknown as WebsiteData;
                const lang = data.settings.defaultLanguage;
                const hero = data.content.hero?.[lang] ?? data.content.hero?.en ?? {};

                return (
                  <div
                    key={site.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-all"
                  >
                    <div
                      className="h-36 flex items-center justify-center px-6"
                      style={{
                        background: "linear-gradient(135deg, #fdf6f0 0%, #f8e8e8 50%, #f0e8f0 100%)",
                      }}
                    >
                      <div className="text-center">
                        <p
                          className="text-2xl"
                          style={{ fontFamily: "'Great Vibes', cursive", color: "#5c3d2e" }}
                        >
                          {(hero as Record<string, string>).groom} & {(hero as Record<string, string>).bride}
                        </p>
                        <p className="text-xs text-rose-400 mt-1 uppercase tracking-widest">
                          {site.template.eventType}
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-2 h-2 rounded-full ${site.isPublished ? "bg-green-400" : "bg-stone-300"}`}
                        />
                        <span className="text-xs text-stone-500">
                          {site.isPublished ? "Published" : "Draft"}
                        </span>
                        <span className="text-xs text-stone-300 ml-auto flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(site.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <p className="text-xs text-rose-500 mb-4 truncate">
                        memorypage.app/w/{site.slug}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/w/${site.slug}`}
                          target="_blank"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-600 hover:border-rose-200 hover:text-rose-600 transition-all"
                        >
                          <ExternalLink size={12} />
                          View
                        </Link>
                        <Link
                          href={`/dashboard/${site.id}/edit`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs text-white hover:opacity-90 transition-all"
                          style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
                        >
                          <Edit size={12} />
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
