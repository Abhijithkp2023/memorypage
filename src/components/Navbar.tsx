import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem", color: "#c8896a" }}
        >
          MemoryPage
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/templates"
            className="text-sm text-stone-600 hover:text-rose-600 transition-colors"
          >
            Templates
          </Link>

          {session?.user ? (
            <Link
              href="/dashboard"
              className="text-sm px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors font-medium"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-stone-600 hover:text-rose-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/templates"
                className="text-sm px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
