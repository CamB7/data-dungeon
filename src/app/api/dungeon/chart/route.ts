import { generateText } from "ai";
import { NextResponse } from "next/server";
import { chartOverviewFallback } from "@/lib/charted-progress";
import { loadPrompt } from "@/lib/ai/load-prompt";
import { WARDEN_MODEL, requireAiKey } from "@/lib/ai/warden";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AI_TIMEOUT_MS = 25_000;

type ChartPayload = {
  chambersCleared: number;
  totalChambers: number;
  trackMasteryPct: number;
  languageMasteryPct: number;
  avgClearTimeLabel: string;
  passRatePct: number;
  conceptsLearned: string[];
  weakSkills: Record<string, number>;
  topSkills: { label: string; score: number }[];
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const payload = body as ChartPayload;
  if (typeof payload.chambersCleared !== "number") {
    return NextResponse.json({ error: "Missing chart stats." }, { status: 400 });
  }

  const respondFallback = () =>
    NextResponse.json({
      overview: chartOverviewFallback(
        {
          chambersCleared: payload.chambersCleared,
          totalChambers: payload.totalChambers,
          trackMasteryPct: payload.trackMasteryPct,
          passRatePct: payload.passRatePct,
          conceptsLearnedCount: payload.conceptsLearned.length,
        },
        payload.weakSkills,
      ),
      source: "fallback",
    });

  const missing = requireAiKey();
  if (missing) {
    return respondFallback();
  }

  try {
    const system = loadPrompt("chart-overview");
    const { text } = await generateText({
      model: WARDEN_MODEL,
      system,
      prompt: JSON.stringify(payload, null, 2),
      abortSignal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });

    const overview = text.trim();
    if (!overview) return respondFallback();

    return NextResponse.json({
      overview,
      source: "ai",
    });
  } catch (err) {
    console.error("[/api/dungeon/chart]", err);
    return respondFallback();
  }
}
