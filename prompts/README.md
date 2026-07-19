# AI prompts — Data Dungeon

These files are the product’s AI brain. They are **not** buried in TypeScript strings — edit them here, review them in PRs, and treat them as first-class product surface.

## Critical path (cannot remove AI)

Chamber progress in Neon **only** updates after `/api/dungeon/claim` succeeds. That route:

1. Verifies the adventurer’s SQL against the chamber (or weekly raid).
2. Calls Gemini with [`warden-seal.md`](./warden-seal.md) to mint a short **loot seal**.
3. Persists the clear **only if** a non-empty seal is returned (`warden_seal` on `chamber_completions`).

If the model is down, the key is missing, or the seal is empty, loot is refused. Correct SQL alone never writes a clear. Remove Gemini (or this prompt) and the dungeon stops awarding progression — that is intentional.

Related code: `src/app/api/dungeon/claim/route.ts`, `src/lib/progress-server.ts` (`recordDbClearWithSeal`).

## Prompt map

| File | Used by | Role |
|------|---------|------|
| `warden-seal.md` | `/api/dungeon/claim` | **Critical path** — mint loot seal |
| `warden-coach.md` | `/api/warden` | Live coaching / fail review chat |
| `warden-explain.md` | `/api/dungeon/explain` (`mode=explain`) | Plain-language result narration |
| `warden-recap.md` | `/api/dungeon/explain` (`mode=recap`) | Post-clear skill recap |
| `quest-start.md` | `/api/dungeon/quest-start` | Natural-language → chamber |
| `recommend.md` | `/api/dungeon/recommend` | Adaptive next-chamber pick |
| `weekly-raid.md` | `/api/dungeon/raid` | Generate weekly SQLite chamber |

## Design principles

- **Socratic first** — coach toward the skill; never dump the full solution unless the chamber is already cleared and the user asks for a post-clear explanation.
- **Schema-bound** — never invent tables/columns outside the chamber context injected by the server.
- **Short, dungeon-light voice** — atmosphere without purple prose.
- **Deterministic where it matters** — raid `solutionSql` must be ordered; seals must name the proven skill.

Runtime loader: `src/lib/ai/load-prompt.ts` (`loadPrompt("warden-seal")`).
