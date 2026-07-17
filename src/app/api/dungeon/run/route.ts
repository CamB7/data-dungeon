import { NextResponse } from "next/server";
import { getChamberBySlug } from "@/content/chambers";
import { getChamberSeed } from "@/content/chambers/seeds";
import { loadCurrentWeeklyRaid } from "@/lib/raid-store";
import { runRaidQuery } from "@/lib/sql/raid";
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

  if (slug === "weekly-raid") {
    const raid = loadCurrentWeeklyRaid();
    if (!raid) {
      return NextResponse.json(
        { error: "No raid this week. Generate one first." },
        { status: 404 },
      );
    }
    const outcome = await runRaidQuery(raid.seedSql, raid.solutionSql, sql);
    return NextResponse.json({
      ok: outcome.ok,
      error: outcome.error,
      result: outcome.result,
      passed: outcome.passed,
      message: outcome.message,
    });
  }

  if (getChamberBySlug(slug) && getChamberSeed(slug)) {
    const outcome = await runChamberQuery(slug, sql);
    return NextResponse.json({
      ok: outcome.ok,
      error: outcome.error,
      result: outcome.result,
      passed: outcome.passed,
      message: outcome.message,
    });
  }

  return NextResponse.json({ error: "Unknown chamber." }, { status: 404 });
}
