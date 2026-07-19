import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { DUNGEON_TRACK, SKILL_LABELS } from "@/content/chambers";
import { loadPrompt } from "@/lib/ai/load-prompt";
import { WARDEN_MODEL, requireAiKey } from "@/lib/ai/warden";

export const runtime = "nodejs";

const schema = z.object({
  slug: z.string(),
  reason: z.string(),
  focusSkill: z.string(),
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

  const cleared =
    body && typeof body === "object" && "cleared" in body
      ? ((body as { cleared: unknown }).cleared as string[])
      : [];
  const weakSkills =
    body && typeof body === "object" && "weakSkills" in body
      ? ((body as { weakSkills: unknown }).weakSkills as Record<string, number>)
      : {};
  const recentFails =
    body && typeof body === "object" && "recentFails" in body
      ? ((body as { recentFails: unknown }).recentFails as string[])
      : [];

  const remaining = DUNGEON_TRACK.filter((c) => !cleared.includes(c.slug));
  if (!remaining.length) {
    return NextResponse.json({
      slug: "weekly-raid",
      title: "Weekly Raid",
      reason: "Track cleared — take on this week's AI raid.",
      focusSkill: "boss",
    });
  }

  const catalog = remaining.map((c) => ({
    slug: c.slug,
    title: c.title,
    skills: c.skills.map((s) => SKILL_LABELS[s]),
    floor: c.floor,
  }));

  try {
    const { object } = await generateObject({
      model: WARDEN_MODEL,
      schema,
      system: loadPrompt("recommend"),
      prompt: JSON.stringify({ weakSkills, recentFails, catalog }, null, 2),
    });

    const match =
      remaining.find((c) => c.slug === object.slug) ?? remaining[0];

    return NextResponse.json({
      slug: match.slug,
      title: match.title,
      reason: object.reason,
      focusSkill: object.focusSkill,
    });
  } catch (err) {
    console.error("[/api/dungeon/recommend]", err);
    // Heuristic fallback
    const weak = Object.entries(weakSkills).sort((a, b) => b[1] - a[1])[0]?.[0];
    const match =
      remaining.find((c) => weak && c.skills.includes(weak as never)) ??
      remaining[0];
    return NextResponse.json({
      slug: match.slug,
      title: match.title,
      reason: weak
        ? `You struggle with ${weak} — this chamber drills it.`
        : "Next chamber on the path.",
      focusSkill: weak ?? match.skills[0],
    });
  }
}
