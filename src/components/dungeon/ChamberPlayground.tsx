"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Chamber } from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import type { QueryResult } from "@/lib/sql/sandbox";
import { themeForSectionId, type SectionThemeId } from "@/lib/theme";
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
  > & {
    sectionId?: number;
  };
  filename: string;
};

const playgroundChrome: Record<
  SectionThemeId,
  {
    border: string;
    dotA: string;
    dotB: string;
    btn: string;
    editor: string;
    pass: string;
    warn: string;
    panel: string;
    seal: string;
    sealLabel: string;
  }
> = {
  lockward: {
    border: "border-moss/25 shadow-[0_0_60px_rgba(168,201,160,0.08)]",
    dotA: "bg-torch-dim",
    dotB: "bg-moss-soft",
    btn: "bg-moss hover:bg-moss/90",
    editor: "text-moss/90",
    pass: "text-moss",
    warn: "text-torch",
    panel: "border-moss/30 bg-moss/5",
    seal: "border-torch/30 bg-torch/5",
    sealLabel: "text-torch",
  },
  salt: {
    border: "border-brine/40 shadow-[0_0_60px_rgba(125,240,255,0.12)]",
    dotA: "bg-brine-soft",
    dotB: "bg-brine",
    btn: "bg-brine hover:bg-brine-glow",
    editor: "text-brine",
    pass: "text-brine",
    warn: "text-salt-dim",
    panel: "border-brine/40 bg-brine/10",
    seal: "border-brine/35 bg-brine/10",
    sealLabel: "text-brine",
  },
  spire: {
    border: "border-spire/40 shadow-[0_0_60px_rgba(184,197,214,0.12)]",
    dotA: "bg-spire-soft",
    dotB: "bg-spire",
    btn: "bg-spire hover:bg-spire-glow text-spire-deep",
    editor: "text-spire",
    pass: "text-spire",
    warn: "text-spire-soft",
    panel: "border-spire/40 bg-spire/10",
    seal: "border-spire/35 bg-spire/10",
    sealLabel: "text-spire",
  },
  hollow: {
    border: "border-hollow/35",
    dotA: "bg-hollow-soft",
    dotB: "bg-hollow",
    btn: "bg-hollow hover:bg-hollow-glow text-hollow-deep",
    editor: "text-hollow",
    pass: "text-hollow",
    warn: "text-hollow-soft",
    panel: "border-hollow/35 bg-hollow/10",
    seal: "border-hollow/30 bg-hollow/10",
    sealLabel: "text-hollow",
  },
  throne: {
    border: "border-throne/40",
    dotA: "bg-throne-soft",
    dotB: "bg-throne",
    btn: "bg-throne hover:bg-throne-glow text-throne-deep",
    editor: "text-throne",
    pass: "text-throne",
    warn: "text-throne-soft",
    panel: "border-throne/40 bg-throne/10",
    seal: "border-throne/35 bg-throne/10",
    sealLabel: "text-throne",
  },
};

export function ChamberPlayground({ chamber, filename }: ChamberPlaygroundProps) {
  const theme = themeForSectionId(chamber.sectionId ?? 1);
  const chrome = playgroundChrome[theme];
  const salt = theme === "salt";
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
      <div
        className={`overflow-hidden rounded-2xl border bg-stone-950/90 ${chrome.border}`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-stone-700/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${chrome.dotA}`} />
            <span className={`h-2.5 w-2.5 rounded-full ${chrome.dotB}`} />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-500" />
            <span className="ml-3 font-mono text-[11px] tracking-wider text-stone-500">
              {filename}
            </span>
          </div>
          <button
            type="button"
            onClick={() => void runQuery()}
            disabled={running || claiming}
            className={`rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wide text-stone-950 uppercase transition disabled:opacity-60 ${chrome.btn}`}
          >
            {running ? "Running…" : "Run query"}
          </button>
        </div>
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={8}
          className={`w-full resize-y bg-transparent p-5 font-mono text-[13px] leading-6 outline-none sm:text-sm ${chrome.editor}`}
          spellCheck={false}
        />
        <div className="border-t border-stone-700/80 px-4 py-3 space-y-3">
          {!outcome ? (
            <p className="font-mono text-[11px] text-stone-500">
              Results appear here after you run a query. Correct rows alone are not enough —
              the Warden must seal your loot.
            </p>
          ) : outcome.error ? (
            <p className={`text-sm ${chrome.warn}`}>{outcome.error}</p>
          ) : (
            <>
              <p
                className={`text-sm ${
                  outcome.passed ? chrome.pass : chrome.warn
                }`}
              >
                {outcome.message}
                {cleared ? " · Already sealed" : null}
              </p>
              {outcome.result ? <ResultTable result={outcome.result} /> : null}

              {outcome.passed && !cleared ? (
                <div className={`rounded-xl border p-4 space-y-3 ${chrome.panel}`}>
                  <p className="text-sm text-stone-300">
                    Result set matches.{" "}
                    <span className={chrome.pass}>
                      Claim loot requires a live AI Warden seal
                    </span>{" "}
                    — without Gemini, the chamber stays uncleared.
                  </p>
                  {!authenticated ? (
                    <p className={`text-sm ${chrome.warn}`}>
                      <Link
                        href="/auth"
                        className={`underline hover:opacity-80`}
                      >
                        Sign in
                      </Link>{" "}
                      to claim — progress is isolated per adventurer in Neon.
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void claimLoot()}
                      disabled={claiming}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold text-stone-950 transition disabled:opacity-60 ${chrome.btn}`}
                    >
                      {claiming ? "Warden sealing…" : "Claim loot (AI seal)"}
                    </button>
                  )}
                  {claimError ? (
                    <p className={`text-sm ${chrome.warn}`}>{claimError}</p>
                  ) : null}
                </div>
              ) : null}

              {seal ? (
                <p
                  className={`rounded-xl border p-3 text-sm leading-relaxed text-stone-200 ${chrome.seal}`}
                >
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase ${chrome.sealLabel}`}
                  >
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
        salt={salt}
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
