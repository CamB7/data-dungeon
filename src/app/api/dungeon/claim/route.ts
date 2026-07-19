import { generateText } from "ai";
import { NextResponse } from "next/server";
import { getChamberBySlug } from "@/content/chambers";
import {
  WARDEN_MODEL,
  chamberContextBlock,
  requireAiKey,
  wardenSealSystem,
} from "@/lib/ai/warden";
import {
  ensureUserRow,
  getSessionUser,
  recordDbClearWithSeal,
} from "@/lib/progress-server";
import { notifySlack } from "@/lib/slack";
import { runChamberQuery, serializeResultPreview } from "@/lib/sql/sandbox";
import { loadCurrentWeeklyRaid } from "@/lib/raid-store";
import { runRaidQuery } from "@/lib/sql/raid";

export const runtime = "nodejs";

/**
 * Critical AI path: correct SQL alone does not clear a chamber.
 * The Warden must mint a loot seal (prompts/warden-seal.md) via Gemini
 * before Neon progress updates. See prompts/README.md.
 */
export async function POST(request: Request) {
  const missing = requireAiKey();
  if (missing) return missing;

  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json(
      { error: "Sign in to claim loot. Progress is per-adventurer." },
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
  const sql =
    body && typeof body === "object" && "sql" in body
      ? String((body as { sql: unknown }).sql)
      : "";

  if (!slug || !sql.trim()) {
    return NextResponse.json({ error: "slug and sql required." }, { status: 400 });
  }

  let outcome;
  if (slug === "weekly-raid") {
    const raid = loadCurrentWeeklyRaid();
    if (!raid) {
      return NextResponse.json({ error: "No weekly raid." }, { status: 404 });
    }
    outcome = await runRaidQuery(raid.seedSql, raid.solutionSql, sql);
  } else {
    if (!getChamberBySlug(slug)) {
      return NextResponse.json({ error: "Unknown chamber." }, { status: 404 });
    }
    outcome = await runChamberQuery(slug, sql);
  }

  if (!outcome.ok || !outcome.passed || !outcome.result) {
    return NextResponse.json(
      {
        error: outcome.error ?? "Query does not clear this chamber yet.",
        passed: false,
      },
      { status: 400 },
    );
  }

  const chamber = getChamberBySlug(slug);
  const xp = chamber?.xp ?? (slug === "weekly-raid" ? 75 : 25);
  const skills = chamber?.skills ?? ["boss"];

  const context = chamber
    ? chamberContextBlock(chamber)
    : "Weekly AI-generated raid chamber.";

  let seal: string;
  try {
    const { text } = await generateText({
      model: WARDEN_MODEL,
      system: wardenSealSystem(),
      prompt: `${context}\n\nWinning SQL:\n${sql}\n\nResult preview:\n${serializeResultPreview(outcome.result)}\n\nAdventurer: ${sessionUser.name ?? sessionUser.email}`,
    });
    seal = text.trim();
    if (!seal) throw new Error("Empty seal");
  } catch (err) {
    console.error("[/api/dungeon/claim] seal failed", err);
    return NextResponse.json(
      {
        error:
          "The Warden could not seal this chamber. AI clearance is required to claim loot — try again.",
      },
      { status: 502 },
    );
  }

  await ensureUserRow(sessionUser);
  const progress = await recordDbClearWithSeal({
    userId: sessionUser.id,
    slug,
    skills,
    xp,
    wardenSeal: seal,
  });

  const title = chamber?.title ?? "Weekly Raid";
  await notifySlack(
    `🗝 *${sessionUser.name ?? sessionUser.email}* cleared *${title}* (+${xp} XP)\n>${seal.replace(/\n/g, " ")}`,
  );

  return NextResponse.json({
    ok: true,
    seal,
    progress,
    message: "Loot sealed by the Warden.",
  });
}
