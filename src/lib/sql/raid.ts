import fs from "fs";
import path from "path";
import initSqlJs, { type Database, type SqlValue } from "sql.js";
import {
  resultsMatch,
  type QueryResult,
  type RunOutcome,
} from "@/lib/sql/sandbox";

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
  if (!raw.length) return { columns: [], rows: [] };
  const { columns, values } = raw[0];
  return {
    columns,
    rows: values.map((valueRow) => {
      const row: Record<string, string | number | null> = {};
      columns.forEach((col, i) => {
        const v = valueRow[i] as SqlValue;
        row[col] = v === undefined ? null : (v as string | number | null);
      });
      return row;
    }),
  };
}

function assertReadOnly(sql: string) {
  const stripped = sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();
  if (!stripped) throw new Error("Empty query.");
  const first = stripped.split(/\s+/)[0]?.toUpperCase();
  if (first !== "SELECT" && first !== "WITH") {
    throw new Error("Only SELECT (or WITH … SELECT) queries are allowed.");
  }
  if (
    /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|PRAGMA|VACUUM|REINDEX)\b/i.test(
      stripped,
    )
  ) {
    throw new Error("That statement isn't allowed in the chamber.");
  }
}

export async function runRaidQuery(
  seedSql: string,
  solutionSql: string,
  userSql: string,
): Promise<RunOutcome> {
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
    db.run(seedSql);
    const result = resultFromExec(db, userSql);
    const expected = resultFromExec(db, solutionSql);
    const passed = resultsMatch(result, expected);
    return {
      ok: true,
      result,
      expected,
      passed,
      message: passed
        ? "Weekly raid cleared."
        : `Not yet. Got ${result.rows.length} row(s); expected ${expected.rows.length}.`,
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
