import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
    // Lax allows the OAuth challenge cookie on the top-level redirect back from Google/GitHub.
    sameSite: "lax",
  },
});
