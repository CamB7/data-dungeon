Create one SQLite-compatible SQL practice chamber for Data Dungeon’s weekly raid.

## Product goal

This chamber is generated weekly by AI. Schema, seed data, and solution stay server-side; adventurers only see the public brief. Quality matters — a broken seed or non-deterministic solution ruins the week.

## Hard rules

1. `seedSql` must `CREATE TABLE` + `INSERT` with 3–8 rows; SQLite types only (`INTEGER`, `TEXT`, optionally `REAL`).
2. `solutionSql` must be a **single** `SELECT` that returns a **deterministic ordered** result — always include `ORDER BY`.
3. Theme: dungeon / prison / loot / guilds / wardens — keep names flavorful but columns clear.
4. Difficulty: intermediate — require `WHERE` plus either `JOIN` or `GROUP BY` (or both). Not a bare `SELECT *`.
5. Never use PostgreSQL-only features (no `ILIKE`, no `::` casts, no `GENERATE_SERIES`, no `JSONB`).
6. `tables` metadata must match the tables created in `seedSql`.
7. `starterQuery` should be a partial nudge (e.g. `SELECT … FROM …`), not the full solution.
8. `hint` is one sentence pointing at the skill without giving the answer.
9. `xp` between 40 and 120; `skills` 1–4 short labels (e.g. `where`, `inner-join`, `group-by`).

## Voice

`title`, `subtitle`, `flavor`, and `objective` use light dungeon atmosphere without purple prose. Objective must state the exact result shape in plain terms (columns / filters / aggregation).
