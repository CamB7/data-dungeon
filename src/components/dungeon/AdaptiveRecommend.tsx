"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProgress, saveProgress, type PlayerProgress } from "@/lib/progress";

export function AdaptiveRecommend() {
  const [progress, setProgress] = useState<PlayerProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [rec, setRec] = useState<{
    slug: string;
    title: string;
    reason: string;
    focusSkill: string;
  } | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  async function recommend() {
    if (!progress) return;
    setLoading(true);
    try {
      const recentFails = progress.attempts
        .filter((a) => !a.passed)
        .slice(-8)
        .map((a) => a.slug);
      const res = await fetch("/api/dungeon/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cleared: progress.cleared,
          weakSkills: progress.weakSkills,
          recentFails,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setRec(data);
        const next = {
          ...progress,
          lastRecommend: {
            slug: data.slug,
            reason: data.reason,
            at: Date.now(),
          },
        };
        saveProgress(next);
        setProgress(next);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-stone-700/80 bg-stone-950/60 p-6">
      <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
        Adaptive path
      </p>
      <h2 className="mt-2 font-display text-xl font-bold text-foreground">
        Next chamber for you
      </h2>
      <p className="mt-2 text-sm text-stone-400">
        AI reads your fails and weak skills, then picks the next drill.
      </p>
      <button
        type="button"
        onClick={() => void recommend()}
        disabled={loading}
        className="mt-4 rounded-full border border-torch/40 px-5 py-2 text-sm text-torch transition hover:bg-torch/10 disabled:opacity-60"
      >
        {loading ? "Reading your ledger…" : "Recommend next"}
      </button>
      {rec ? (
        <div className="mt-4 rounded-xl border border-torch/20 bg-torch/5 p-4">
          <p className="font-display text-lg text-foreground">{rec.title}</p>
          <p className="mt-1 text-sm text-stone-400">{rec.reason}</p>
          <p className="mt-2 font-mono text-[11px] text-stone-500">
            Focus · {rec.focusSkill}
          </p>
          <Link
            href={
              rec.slug === "weekly-raid"
                ? "/dungeon/raid"
                : `/dungeon/chamber/${rec.slug}`
            }
            className="mt-3 inline-block text-sm text-torch transition hover:text-moss"
          >
            Go →
          </Link>
        </div>
      ) : null}
      {progress ? (
        <p className="mt-4 font-mono text-[11px] text-stone-500">
          Cleared {progress.cleared.length} · {progress.xp} XP · local progress
        </p>
      ) : null}
    </section>
  );
}
