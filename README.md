# Data Dungeon

Learn SQL by clearing chambers — not copying answers. Write real queries in a browser SQL sandbox, get coached by an AI Warden, and earn progression only when the Warden **seals** your loot.

**Live demo:** [https://data-dungeon-phi.vercel.app](https://data-dungeon-phi.vercel.app)

> Do not use `data-dungeon.vercel.app` — that domain belongs to a different project.

## What it does

- **74 chambers** across **six live sections** (floors 1–25): The Lockward, Salt Crypts, Index Spire, Null Cathedral, The Fractured Loom, and The Query Throne.
- **AI-critical path:** a correct result set does not clear a chamber. `/api/dungeon/claim` calls Gemini with [`prompts/warden-seal.md`](prompts/warden-seal.md) and only writes to Neon when a non-empty seal is returned.
- **Warden chat** for hints and fail reviews ([`prompts/warden-coach.md`](prompts/warden-coach.md)).
- **Charted progression** — clear times, concepts learned, daily pace, Warden overview, and a **what to improve** drill list.
- **Neon Postgres** for per-adventurer progress; **Neon Auth** (email + Google).

## 90-second demo script

Use [Cell Block Zero](https://data-dungeon-phi.vercel.app/dungeon/chamber/cell-block-zero) (chamber 1):

1. Open the live URL → **Sign up** (or sign in).
2. **Dungeon** → **The Lockward** → **Cell Block Zero**.
3. Run the starter query with a deliberate mistake (e.g. wrong column) → read the fail message → **Warden** auto-reviews.
4. Fix the query → **Run** until the result passes → **Claim loot (AI seal)**.
5. Open **Chart** → show Warden overview and **What to improve**.

## Tech stack

| Layer | Choice |
|-------|--------|
| App | Next.js 14 (App Router), TypeScript, Tailwind |
| SQL | sql.js in-browser + server-side chamber validation |
| AI | Google Gemini via Vercel AI SDK (`@ai-sdk/google`) |
| DB | Neon Postgres + Drizzle ORM |
| Auth | Neon Auth |
| Hosting | Vercel |

## Local development

### Prerequisites

- Node.js 20+
- Neon project (database + auth)
- Google AI API key (required to **claim** chamber loot)

### Setup

```bash
git clone https://github.com/CamB7/data-dungeon.git
cd data-dungeon
npm install
cp .env.local.example .env.local
# Fill in every value in .env.local (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.local.example` to `.env.local`:

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | Neon pooled Postgres connection string |
| `NEON_AUTH_BASE_URL` | Yes | Neon Auth project URL |
| `NEON_AUTH_COOKIE_SECRET` | Yes | Session cookie secret (32+ random bytes) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes for claims | Gemini — chamber clears fail without it |
| `SLACK_WEBHOOK_URL` | Optional | Slack notifications for clears and feedback |

Never commit `.env.local`. It is gitignored.

### Database migrations

SQL migrations live in `drizzle/`. Apply with Drizzle Kit against your Neon database:

```bash
npm run db:push
```

Migration files (run in order):

| File | What it does |
|------|----------------|
| `0000_confused_phalanx.sql` | Core `users` table |
| `0001_sync_users_from_neon_auth.sql` | Neon Auth → `users` sync trigger |
| `0002_chamber_completions.sql` | Completions, attempts, `weak_skills` |
| `0003_feedback_and_seal.sql` | Feedback table, `warden_seal` column |

To roll back manually, drop objects in reverse order (no automated down migrations). Inspect `drizzle/meta/_journal.json` for the applied set.

## AI prompts (repo-visible)

All system prompts are markdown in [`prompts/`](prompts/) — not buried in TypeScript. See [`prompts/README.md`](prompts/README.md).

Loader: `src/lib/ai/load-prompt.ts`.

## Project structure

```
src/
  app/                 # Routes and API routes
  content/chambers/    # Chamber definitions, seeds, sections
  components/          # UI
  lib/
    ai/                # Warden model + prompt helpers
    sql/               # Sandbox + validation
    theme.ts           # Section theming
prompts/               # AI system prompts (first-class product surface)
drizzle/               # SQL migrations
```

## Deployment (Vercel)

1. Import the GitHub repo in Vercel.
2. Set the same env vars as `.env.local`.
3. Production URL: **`https://data-dungeon-phi.vercel.app`** (project alias).
4. **Deployment protection:** preview and production deployments should be publicly reachable for demos. If Vercel SSO blocks visitors, disable it:

   ```bash
   vercel project protection disable data-dungeon --sso
   ```

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run db:push      # Push schema to Neon
npm run db:studio    # Drizzle Studio
```

## License

Private / course project — see repository owner for reuse terms.
