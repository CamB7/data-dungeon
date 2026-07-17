import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { DUNGEON_TRACK, SKILL_LABELS } from "@/content/chambers";
import { WARDEN_MODEL, requireAiKey } from "@/lib/ai/warden";

export const runtime = "nodejs";

const schema = z.object({
  slug: z.string(),
  reason: z.string(),
  confidence: z.enum(["high", "medium", "low"]),
});

export async function POST(request: Request) {
  const missing = requireAiKey();
  if (missing) return missing;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const intent =
    body && typeof body === "object" && "intent" in body
      ? String((body as { intent: unknown }).intent).trim()
      : "";

  if (!intent || intent.length > 500) {
    return NextResponse.json(
      { error: "intent (1–500 chars) required." },
      { status: 400 },
    );
  }

  const catalog = DUNGEON_TRACK.map((c) => ({
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    skills: c.skills.map((s) => SKILL_LABELS[s]),
    floor: c.floorName,
    isBoss: Boolean(c.isBoss),
  }));

  try {
    const { object } = await generateObject({
      model: WARDEN_MODEL,
      schema,
      system: `You are the quest master for Data Dungeon. Pick the single best chamber slug from the catalog for the adventurer's intent. Prefer non-boss chambers unless they ask for a challenge. Reason in one short sentence.`,
      prompt: `Intent: ${intent}\n\nCatalog:\n${JSON.stringify(catalog, null, 2)}`,
    });

    const match = DUNGEON_TRACK.find((c) => c.slug === object.slug);
    if (!match) {
      // Fallback: keyword heuristic
      const lower = intent.toLowerCase();
      const fallback =
        DUNGEON_TRACK.find((c) =>
          c.skills.some((s) => lower.includes(s.replace("-", " "))),
        ) ?? DUNGEON_TRACK[0];
      return NextResponse.json({
        slug: fallback.slug,
        title: fallback.title,
        reason: "Matched by skill keywords.",
        confidence: "low",
      });
    }

    return NextResponse.json({
      slug: match.slug,
      title: match.title,
      reason: object.reason,
      confidence: object.confidence,
    });
  } catch (err) {
    console.error("[/api/dungeon/quest-start]", err);
    return NextResponse.json(
      { error: "Could not chart a quest. Try again." },
      { status: 502 },
    );
  }
}
