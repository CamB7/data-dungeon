import { google } from "@ai-sdk/google";
import { loadPrompt } from "@/lib/ai/load-prompt";

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

/** Live coach system prompt — sourced from prompts/warden-coach.md */
export function wardenCoachSystem(): string {
  return loadPrompt("warden-coach");
}

/** Critical-path loot seal — sourced from prompts/warden-seal.md */
export function wardenSealSystem(): string {
  return loadPrompt("warden-seal");
}
