"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Chamber } from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
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
  chamber: Pick<
    Chamber,
    "slug" | "title" | "starterQuery" | "skills" | "xp" | "id"
  >;
  filename: string;
};

export function ChamberPlayground({ chamber, filename }: ChamberPlaygroundProps) {
  const [sql, setSql] = useState(chamber.starterQuery);
  const [running, setRunning] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [outcome, setOutcome] = useState<RunResponse | null>(null);
  const [seal, setSeal] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [askFail, setAskFail] = useState(false);
  const { progress, authenticated, recordLocalAndSync, refresh } =
    usePlayerProgress();

  const cleared = progress.cleared.includes(chamber.slug);

  const failContext = useMemo(() => {
    if (!outcome || outcome.passed || !outcome.result) return undefined;
    return {
      sql,
      result: outcome.result,
      message: outcome.message,
    };
  }, [outcome, sql]);

  async function runQuery() {
    setRunning(true);
    setSeal(null);
    setClaimError(null);
    setAskFail(false);
    try {
      const res = await fetch("/api/dungeon/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: chamber.slug, sql }),
      });
      const data = (await res.json()) as RunResponse;
      setOutcome(data);

      if (data.ok && data.passed === false) {
        await recordLocalAndSync({
          slug: chamber.slug,
          passed: false,
          skills: chamber.skills,
          xp: chamber.xp,
        });
        setAskFail(true);
      }
    } catch {
      setOutcome({ ok: false, error: "Network error running query." });
    } finally {
      setRunning(false);
    }
  }

  async function claimLoot() {
    setClaiming(true);
    setClaimError(null);
    try {
      const res = await fetch("/api/dungeon/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: chamber.slug, sql }),
      });
      const data = await res.json();
      if (!res.ok) {
        setClaimError(data.error ?? "Could not claim loot.");
        return;
      }
      setSeal(data.seal ?? null);
      await refresh();
    } catch {
      setClaimError("Network error claiming loot.");
    } finally {
      setClaiming(false);
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
            disabled={running || claiming}
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
        <div className="border-t border-stone-700/80 px-4 py-3 space-y-3">
          {!outcome ? (
            <p className="font-mono text-[11px] text-stone-500">
              Results appear here after you run a query. Correct rows alone are not enough —
              the Warden must seal your loot.
            </p>
          ) : outcome.error ? (
            <p className="text-sm text-torch">{outcome.error}</p>
          ) : (
            <>
              <p
                className={`text-sm ${outcome.passed ? "text-moss" : "text-torch"}`}
              >
                {outcome.message}
                {cleared ? " · Already sealed" : null}
              </p>
              {outcome.result ? <ResultTable result={outcome.result} /> : null}

              {outcome.passed && !cleared ? (
                <div className="rounded-xl border border-moss/30 bg-moss/5 p-4 space-y-3">
                  <p className="text-sm text-stone-300">
                    Result set matches.{" "}
                    <span className="text-moss">
                      Claim loot requires a live AI Warden seal
                    </span>{" "}
                    — without Gemini, the chamber stays uncleared.
                  </p>
                  {!authenticated ? (
                    <p className="text-sm text-torch">
                      <Link href="/auth" className="underline hover:text-moss">
                        Sign in
                      </Link>{" "}
                      to claim — progress is isolated per adventurer in Neon.
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void claimLoot()}
                      disabled={claiming}
                      className="rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-moss/90 disabled:opacity-60"
                    >
                      {claiming ? "Warden sealing…" : "Claim loot (AI seal)"}
                    </button>
                  )}
                  {claimError ? (
                    <p className="text-sm text-torch">{claimError}</p>
                  ) : null}
                </div>
              ) : null}

              {seal ? (
                <p className="rounded-xl border border-torch/30 bg-torch/5 p-3 text-sm leading-relaxed text-stone-200">
                  <span className="font-mono text-[10px] tracking-wider text-torch uppercase">
                    Warden seal
                  </span>
                  <span className="mt-2 block">{seal}</span>
                </p>
              ) : null}
            </>
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
