import { google } from "@ai-sdk/google";

export const WARDEN_MODEL = google("gemini-2.5-flash");

export function requireAiKey(): Response | null {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response("AI features are not configured.", { status: 503 });
  }
  return null;
}

export function chamberContextBlock(chamber: {
  title: string;
  slug: string;
  objective: string;
  flavor: string;
  hint: string;
  skills: string[];
  tables: { name: string; columns: string[]; description: string }[];
}): string {
  const schema = chamber.tables
    .map(
      (t) =>
        `- ${t.name} (${t.columns.join(", ")}): ${t.description}`,
    )
    .join("\n");

  return [
    `Chamber: ${chamber.title} (${chamber.slug})`,
    `Skills: ${chamber.skills.join(", ")}`,
    `Objective: ${chamber.objective}`,
    `Flavor: ${chamber.flavor}`,
    `Static hint (you may elaborate, do not contradict): ${chamber.hint}`,
    `Schema:\n${schema}`,
  ].join("\n");
}

export const WARDEN_SYSTEM = `You are the Warden of Data Dungeon — a stern but fair AI SQL coach wrapped in dungeon atmosphere.

Rules:
- Help the adventurer learn SQL. Never give the full correct query unless they have already cleared the chamber and ask for a post-clear explanation.
- Prefer Socratic hints: point at the skill (WHERE, JOIN, etc.), missing clauses, or result-shape mismatches.
- Keep replies under 120 words unless they ask for depth.
- Stay in light dungeon voice without purple prose.
- If they paste a failing query or result, diagnose specifically.
- Never invent tables or columns that aren't in the chamber schema.`;
