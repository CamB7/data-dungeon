import { NextResponse } from "next/server";
import { getChamberBySlug } from "@/content/chambers";
import { getChamberSeed } from "@/content/chambers/seeds";
import { runChamberQuery } from "@/lib/sql/sandbox";

export const runtime = "nodejs";

export async function POST(request: Request) {
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
  const sql =
    body && typeof body === "object" && "sql" in body
      ? String((body as { sql: unknown }).sql)
      : "";

  if (!slug || !sql.trim()) {
    return NextResponse.json(
      { error: "slug and sql are required." },
      { status: 400 },
    );
  }

  if (!getChamberBySlug(slug) || !getChamberSeed(slug)) {
    return NextResponse.json({ error: "Unknown chamber." }, { status: 404 });
  }

  try {
    const outcome = await runChamberQuery(slug, sql);
    return NextResponse.json({
      ok: outcome.ok,
      error: outcome.error,
      result: outcome.result,
      passed: outcome.passed,
      message: outcome.message,
    });
  } catch (err) {
    console.error("[/api/dungeon/run]", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "The SQL sandbox failed to start. Try again in a moment.",
      },
      { status: 500 },
    );
  }
}
