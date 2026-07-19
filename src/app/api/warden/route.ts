import { streamText, type ModelMessage } from "ai";
import { getChamberBySlug } from "@/content/chambers";
import {
  WARDEN_MODEL,
  chamberContextBlock,
  requireAiKey,
  wardenCoachSystem,
} from "@/lib/ai/warden";
import { serializeResultPreview, type QueryResult } from "@/lib/sql/sandbox";

export const runtime = "nodejs";

type ClientMessage = { role: "user" | "assistant"; content: string };

function parseMessages(raw: unknown): ClientMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ClientMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string" || !content.trim()) continue;
    out.push({ role, content: content.trim().slice(0, 2000) });
  }
  return out.slice(-20);
}

export async function POST(request: Request) {
  const missing = requireAiKey();
  if (missing) return missing;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON.", { status: 400 });
  }

  const slug =
    body && typeof body === "object" && "slug" in body
      ? String((body as { slug: unknown }).slug)
      : "";
  const chamber = getChamberBySlug(slug);
  if (!chamber && slug !== "weekly-raid") {
    return new Response("Unknown chamber.", { status: 404 });
  }

  const messages = parseMessages(
    body && typeof body === "object" && "messages" in body
      ? (body as { messages: unknown }).messages
      : [],
  );
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return new Response("Need a user message.", { status: 400 });
  }

  const failContext =
    body && typeof body === "object" && "failContext" in body
      ? (body as {
          failContext?: {
            sql?: string;
            result?: QueryResult;
            message?: string;
          };
        }).failContext
      : undefined;

  let system = wardenCoachSystem();
  if (chamber) {
    system += `\n\n${chamberContextBlock(chamber)}`;
  } else {
    system +=
      "\n\nThis is the weekly AI-generated raid. Use any schema details the user provides.";
  }

  if (failContext?.sql) {
    system += `\n\nLatest failed attempt SQL:\n${failContext.sql}`;
  }
  if (failContext?.result) {
    system += `\n\nTheir result preview:\n${serializeResultPreview(failContext.result)}`;
  }
  if (failContext?.message) {
    system += `\n\nJudge message: ${failContext.message}`;
  }

  try {
    const result = streamText({
      model: WARDEN_MODEL,
      system,
      messages: messages as ModelMessage[],
    });
    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[/api/warden]", err);
    return new Response("The Warden is silent. Try again.", { status: 502 });
  }
}
