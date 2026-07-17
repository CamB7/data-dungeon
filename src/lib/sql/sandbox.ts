import fs from "fs";
import path from "path";
import initSqlJs, { type Database, type SqlValue } from "sql.js";
import { getChamberSeed } from "@/content/chambers/seeds";

export type QueryRow = Record<string, string | number | null>;

export type QueryResult = {
  columns: string[];
  rows: QueryRow[];
};

export type RunOutcome = {
  ok: boolean;
  error?: string;
  result?: QueryResult;
  expected?: QueryResult;
  passed?: boolean;
  message?: string;
};

let sqlPromise: Promise<Awaited<ReturnType<typeof initSqlJs>>> | null = null;

async function getSql() {
  if (!sqlPromise) {
    const wasmPath = path.join(
      process.cwd(),
      "node_modules/sql.js/dist/sql-wasm.wasm",
    );
    const wasmBinary = fs.readFileSync(wasmPath).buffer as ArrayBuffer;
    sqlPromise = initSqlJs({ wasmBinary });
  }
  return sqlPromise;
}

function resultFromExec(db: Database, sql: string): QueryResult {
  const raw = db.exec(sql);
  if (!raw.length) {
    return { columns: [], rows: [] };
  }
  const { columns, values } = raw[0];
  const rows = values.map((valueRow) => {
    const row: QueryRow = {};
    columns.forEach((col, i) => {
      const v = valueRow[i] as SqlValue;
      row[col] = v === undefined ? null : (v as string | number | null);
    });
    return row;
  });
  return { columns, rows };
}

function normalizeCell(value: string | number | null): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  return String(value);
}

/** Compare result sets ignoring column name differences but preserving order. */
export function resultsMatch(actual: QueryResult, expected: QueryResult): boolean {
  if (actual.rows.length !== expected.rows.length) return false;
  if (actual.columns.length !== expected.columns.length) return false;

  for (let r = 0; r < expected.rows.length; r++) {
    const aRow = actual.rows[r];
    const eRow = expected.rows[r];
    for (let c = 0; c < expected.columns.length; c++) {
      const aVal = normalizeCell(aRow[actual.columns[c]] ?? null);
      const eVal = normalizeCell(eRow[expected.columns[c]] ?? null);
      if (aVal !== eVal) return false;
    }
  }
  return true;
}

function assertReadOnly(sql: string) {
  const stripped = sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();
  if (!stripped) {
    throw new Error("Empty query.");
  }
  const first = stripped.split(/\s+/)[0]?.toUpperCase();
  if (first !== "SELECT" && first !== "WITH") {
    throw new Error("Only SELECT (or WITH … SELECT) queries are allowed.");
  }
  const banned =
    /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|PRAGMA|VACUUM|REINDEX)\b/i;
  if (banned.test(stripped)) {
    throw new Error("That statement isn't allowed in the chamber.");
  }
}

export async function runChamberQuery(
  slug: string,
  userSql: string,
): Promise<RunOutcome> {
  const seed = getChamberSeed(slug);
  if (!seed) {
    return { ok: false, error: "Unknown chamber." };
  }

  try {
    assertReadOnly(userSql);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Invalid query.",
    };
  }

  const SQL = await getSql();
  const db = new SQL.Database();

  try {
    db.run(seed.seedSql);
    const result = resultFromExec(db, userSql);
    const expected = resultFromExec(db, seed.solutionSql);
    const passed = resultsMatch(result, expected);

    return {
      ok: true,
      result,
      expected,
      passed,
      message: passed
        ? "Chamber cleared — the vault accepts your result set."
        : `Close, but not quite. Got ${result.rows.length} row(s); expected ${expected.rows.length}.`,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Query failed.",
    };
  } finally {
    db.close();
  }
}

export function serializeResultPreview(result: QueryResult, maxRows = 8): string {
  if (!result.rows.length) return "(no rows)";
  const cols = result.columns;
  const lines = result.rows.slice(0, maxRows).map((row) =>
    cols.map((c) => `${c}=${normalizeCell(row[c] ?? null)}`).join(", "),
  );
  const more =
    result.rows.length > maxRows
      ? `\n… +${result.rows.length - maxRows} more rows`
      : "";
  return lines.join("\n") + more;
}
