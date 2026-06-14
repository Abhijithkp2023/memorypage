import Link from "next/link";
import { signOut } from "@/lib/auth";
import type { Session } from "next-auth";

interface Props {
  user: Session["user"];
}

export default function DashboardNav({ user }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem", color: "#c8896a" }}
        >
          MemoryPage
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-400 hidden sm:block">{user?.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-sm px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:border-rose-200 hover:text-rose-600 transition-all"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
