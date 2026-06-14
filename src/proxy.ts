import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Lightweight auth for middleware (no DB/pg calls)
const { auth } = NextAuth({
  providers: [Credentials({ credentials: {}, authorize: async () => null })],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/dashboard") && !req.auth) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
