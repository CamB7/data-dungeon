import { generateText } from "ai";
import { NextResponse } from "next/server";
import { getChamberBySlug } from "@/content/chambers";
import { WARDEN_MODEL, chamberContextBlock, requireAiKey } from "@/lib/ai/warden";
import { serializeResultPreview, type QueryResult } from "@/lib/sql/sandbox";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const missing = requireAiKey();
  if (missing) return missing;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const mode =
    body && typeof body === "object" && "mode" in body
      ? String((body as { mode: unknown }).mode)
      : "explain";

  const slug =
    body && typeof body === "object" && "slug" in body
      ? String((body as { slug: unknown }).slug)
      : "";
  const chamber = getChamberBySlug(slug);

  const result =
    body && typeof body === "object" && "result" in body
      ? ((body as { result: QueryResult }).result as QueryResult)
      : null;
  const sql =
    body && typeof body === "object" && "sql" in body
      ? String((body as { sql: unknown }).sql)
      : "";

  if (!result) {
    return NextResponse.json({ error: "result required." }, { status: 400 });
  }

  const context = chamber
    ? chamberContextBlock(chamber)
    : "Weekly raid chamber (schema may vary).";

  const prompt =
    mode === "recap"
      ? `The adventurer CLEARED this chamber. Write a 2–3 sentence loot recap: what SQL skill they practiced and why it matters. Dungeon voice, no full query dump.\n\n${context}\n\nTheir winning SQL:\n${sql}\n\nResult:\n${serializeResultPreview(result)}`
      : `Explain what this result set means in plain English tied to the chamber story. 2–4 sentences. Do not reveal the solution query.\n\n${context}\n\nTheir SQL:\n${sql}\n\nResult:\n${serializeResultPreview(result)}`;

  try {
    const { text } = await generateText({
      model: WARDEN_MODEL,
      system:
        "You are the Warden of Data Dungeon. Be clear, brief, and slightly atmospheric.",
      prompt,
    });
    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/dungeon/explain]", err);
    return NextResponse.json(
      { error: "Could not explain the result." },
      { status: 502 },
    );
  }
}
