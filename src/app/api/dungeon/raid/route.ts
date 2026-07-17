import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { WARDEN_MODEL, requireAiKey } from "@/lib/ai/warden";
import { weekKey, type WeeklyRaidStored } from "@/lib/progress";
import {
  loadCurrentWeeklyRaid,
  publicRaid,
  writeWeeklyRaid,
} from "@/lib/raid-store";

export const runtime = "nodejs";

const raidSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  flavor: z.string(),
  objective: z.string(),
  skills: z.array(z.string()).min(1).max(4),
  xp: z.number().int().min(40).max(120),
  tables: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        columns: z.array(z.string()).min(2),
      }),
    )
    .min(1)
    .max(3),
  starterQuery: z.string(),
  hint: z.string(),
  seedSql: z.string(),
  solutionSql: z.string(),
});

export async function GET() {
  const existing = loadCurrentWeeklyRaid();
  if (existing) {
    return NextResponse.json({ raid: publicRaid(existing) });
  }
  return NextResponse.json({ raid: null, weekKey: weekKey() });
}

export async function POST(request: Request) {
  const missing = requireAiKey();
  if (missing) return missing;

  let force = false;
  try {
    const body = await request.json();
    force = Boolean(body?.force);
  } catch {
    // empty ok
  }

  const existing = loadCurrentWeeklyRaid();
  if (existing && !force) {
    return NextResponse.json({ raid: publicRaid(existing), reused: true });
  }

  const key = weekKey();

  try {
    const { object } = await generateObject({
      model: WARDEN_MODEL,
      schema: raidSchema,
      system: `Create one SQLite-compatible SQL practice chamber for Data Dungeon.
Rules:
- seedSql must CREATE TABLE + INSERT with 3–8 rows; SQLite types only (INTEGER, TEXT).
- solutionSql must be a single SELECT that returns a deterministic ordered result (include ORDER BY).
- Theme: dungeon / prison / loot / guilds.
- Difficulty: intermediate (WHERE + JOIN or GROUP BY).
- Never use PostgreSQL-only features.`,
      prompt: `Generate this week's raid for ${key}. Make it distinct from basic SELECT *.`,
    });

    const raid: WeeklyRaidStored = {
      weekKey: key,
      slug: "weekly-raid",
      title: object.title,
      subtitle: object.subtitle,
      flavor: object.flavor,
      objective: object.objective,
      skills: object.skills,
      xp: object.xp,
      tables: object.tables,
      starterQuery: object.starterQuery,
      hint: object.hint,
      seedSql: object.seedSql,
      solutionSql: object.solutionSql,
      generatedAt: Date.now(),
    };

    writeWeeklyRaid(raid);
    return NextResponse.json({ raid: publicRaid(raid), reused: false });
  } catch (err) {
    console.error("[/api/dungeon/raid]", err);
    return NextResponse.json(
      { error: "Could not generate this week's raid." },
      { status: 502 },
    );
  }
}
