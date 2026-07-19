import fs from "fs";
import path from "path";

const cache = new Map<string, string>();

export type PromptName =
  | "warden-coach"
  | "warden-seal"
  | "warden-explain"
  | "warden-recap"
  | "quest-start"
  | "recommend"
  | "weekly-raid";

/**
 * Load a system prompt from /prompts/*.md (visible in the repo, not baked into code).
 * Cached in-memory per serverless isolate.
 */
export function loadPrompt(name: PromptName): string {
  const cached = cache.get(name);
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "prompts", `${name}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing prompt file: prompts/${name}.md`);
  }

  const text = fs.readFileSync(filePath, "utf8").trim();
  if (!text) {
    throw new Error(`Empty prompt file: prompts/${name}.md`);
  }

  cache.set(name, text);
  return text;
}
