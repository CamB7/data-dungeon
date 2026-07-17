import { NextResponse } from "next/server";
import {
  ensureUserRow,
  getSessionUser,
  loadDbProgress,
  recordDbAttempt,
} from "@/lib/progress-server";
import { emptyProgress, type PlayerProgress } from "@/lib/progress";

export const runtime = "nodejs";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({
      authenticated: false,
      progress: emptyProgress(),
    });
  }

  await ensureUserRow(sessionUser);
  const progress = await loadDbProgress(sessionUser.id);
  return NextResponse.json({
    authenticated: true,
    progress,
    user: {
      id: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.name,
    },
  });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json(
      { error: "Sign in to sync progress." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const slug =
    body && typeof body === "object" && "slug" in body
      ? String((body as { slug: unknown }).slug)
      : "";
  const passed =
    body && typeof body === "object" && "passed" in body
      ? Boolean((body as { passed: unknown }).passed)
      : false;
  const skills =
    body && typeof body === "object" && "skills" in body
      ? ((body as { skills: unknown }).skills as string[])
      : [];
  const xp =
    body && typeof body === "object" && "xp" in body
      ? Number((body as { xp: unknown }).xp)
      : 0;

  if (!slug) {
    return NextResponse.json({ error: "slug required." }, { status: 400 });
  }

  await ensureUserRow(sessionUser);
  const progress: PlayerProgress = await recordDbAttempt({
    userId: sessionUser.id,
    slug,
    passed,
    skills,
    xp,
  });

  return NextResponse.json({ authenticated: true, progress });
}
