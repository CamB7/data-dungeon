"use client";

import { useEffect, useMemo, useState } from "react";
import type { Chamber } from "@/content/chambers";
import {
  loadProgress,
  recordAttempt,
  saveProgress,
  type PlayerProgress,
} from "@/lib/progress";
import type { QueryResult } from "@/lib/sql/sandbox";
import { WardenChat } from "@/components/dungeon/WardenChat";

type RunResponse = {
  ok: boolean;
  error?: string;
  result?: QueryResult;
  passed?: boolean;
  message?: string;
};

type ChamberPlaygroundProps = {
  // Built-in track chambers — omit unused import noise
  chamber: Pick<
    Chamber,
    | "slug"
    | "title"
    | "starterQuery"
    | "skills"
    | "xp"
    | "id"
  >;
  filename: string;
};

export function ChamberPlayground({ chamber, filename }: ChamberPlaygroundProps) {
  const [sql, setSql] = useState(chamber.starterQuery);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<RunResponse | null>(null);
  const [explain, setExplain] = useState<string | null>(null);
  const [explaining, setExplaining] = useState(false);
  const [progress, setProgress] = useState<PlayerProgress | null>(null);
  const [askFail, setAskFail] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const cleared = progress?.cleared.includes(chamber.slug) ?? false;

  const failContext = useMemo(() => {
    if (!outcome || outcome.passed || !outcome.result) return undefined;
    return {
      sql,
      result: outcome.result,
      message: outcome.message,
    };
  }, [outcome, sql]);

  async function requestExplain(
    mode: "explain" | "recap",
    result?: QueryResult,
    query = sql,
  ) {
    if (!result) return;
    setExplaining(true);
    try {
      const res = await fetch("/api/dungeon/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          slug: chamber.slug,
          sql: query,
          result,
        }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      setExplain(data.text ?? data.error ?? "No explanation.");
    } catch {
      setExplain("The Warden could not explain that result.");
    } finally {
      setExplaining(false);
    }
  }

  async function runQuery() {
    setRunning(true);
    setExplain(null);
    setAskFail(false);
    try {
      const res = await fetch("/api/dungeon/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: chamber.slug, sql }),
      });
      const data = (await res.json()) as RunResponse;
      setOutcome(data);

      if (data.ok && data.passed !== undefined) {
        const next = recordAttempt(loadProgress(), {
          slug: chamber.slug,
          passed: Boolean(data.passed),
          skills: chamber.skills,
          xp: chamber.xp,
        });
        saveProgress(next);
        setProgress(next);

        if (data.passed) {
          void requestExplain("recap", data.result, sql);
        } else {
          setAskFail(true);
        }
      }
    } catch {
      setOutcome({ ok: false, error: "Network error running query." });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-moss/25 bg-stone-950/90 shadow-[0_0_60px_rgba(93,255,177,0.08)]">
        <div className="flex items-center justify-between gap-2 border-b border-stone-700/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-torch-dim" />
            <span className="h-2.5 w-2.5 rounded-full bg-moss-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-500" />
            <span className="ml-3 font-mono text-[11px] tracking-wider text-stone-500">
              {filename}
            </span>
          </div>
          <button
            type="button"
            onClick={() => void runQuery()}
            disabled={running}
            className="rounded-full bg-moss px-4 py-1.5 font-mono text-[11px] tracking-wide text-stone-950 uppercase transition hover:bg-moss/90 disabled:opacity-60"
          >
            {running ? "Running…" : "Run query"}
          </button>
        </div>
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={8}
          className="w-full resize-y bg-transparent p-5 font-mono text-[13px] leading-6 text-moss/90 outline-none sm:text-sm"
          spellCheck={false}
        />
        <div className="border-t border-stone-700/80 px-4 py-3">
          {!outcome ? (
            <p className="font-mono text-[11px] text-stone-500">
              Results appear here after you run a query.
            </p>
          ) : outcome.error ? (
            <p className="text-sm text-torch">{outcome.error}</p>
          ) : (
            <div className="space-y-3">
              <p
                className={`text-sm ${outcome.passed ? "text-moss" : "text-torch"}`}
              >
                {outcome.message}
                {cleared && outcome.passed ? " · XP already claimed" : null}
              </p>
              {outcome.result ? (
                <ResultTable result={outcome.result} />
              ) : null}
              <div className="flex flex-wrap gap-2">
                {outcome.result && !outcome.passed ? (
                  <button
                    type="button"
                    disabled={explaining}
                    onClick={() => void requestExplain("explain", outcome.result)}
                    className="rounded-full border border-stone-600/60 px-3 py-1.5 text-xs text-stone-300 transition hover:border-torch/50 hover:text-torch"
                  >
                    {explaining ? "Reading…" : "Explain my result"}
                  </button>
                ) : null}
                {outcome.result && outcome.passed ? (
                  <button
                    type="button"
                    disabled={explaining}
                    onClick={() => void requestExplain("recap", outcome.result)}
                    className="rounded-full border border-moss/40 px-3 py-1.5 text-xs text-moss transition hover:bg-moss/10"
                  >
                    {explaining ? "Writing…" : "Loot recap"}
                  </button>
                ) : null}
              </div>
              {explain ? (
                <p className="rounded-xl border border-stone-700/80 bg-stone-900/80 p-3 text-sm leading-relaxed text-stone-300">
                  {explain}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <WardenChat
        slug={chamber.slug}
        failContext={askFail ? failContext : undefined}
        autoPromptOnFail={askFail}
      />
    </div>
  );
}

function ResultTable({ result }: { result: QueryResult }) {
  if (!result.columns.length) {
    return (
      <p className="font-mono text-[11px] text-stone-500">(empty result)</p>
    );
  }
  return (
    <div className="max-h-56 overflow-auto rounded-xl border border-stone-700/80">
      <table className="min-w-full text-left font-mono text-[11px]">
        <thead className="bg-stone-900 text-stone-500">
          <tr>
            {result.columns.map((col) => (
              <th key={col} className="px-3 py-2 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.rows.map((row, i) => (
            <tr key={i} className="border-t border-stone-800 text-stone-300">
              {result.columns.map((col) => (
                <td key={col} className="px-3 py-1.5 whitespace-nowrap">
                  {row[col] === null ? "NULL" : String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
