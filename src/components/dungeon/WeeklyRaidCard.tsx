"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type RaidPublic = {
  weekKey: string;
  slug: string;
  title: string;
  subtitle: string;
  flavor: string;
  objective: string;
  skills: string[];
  xp: number;
};

export function WeeklyRaidCard() {
  const [raid, setRaid] = useState<RaidPublic | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/dungeon/raid");
        const data = await res.json();
        if (data.raid) setRaid(data.raid);
      } catch {
        // ignore
      }
    })();
  }, []);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dungeon/raid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed.");
        return;
      }
      setRaid(data.raid);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-torch/40 bg-gradient-to-br from-torch/10 to-stone-950/90 p-6">
      <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
        Weekly AI raid
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
        This week&apos;s generated chamber
      </h2>
      <p className="mt-2 text-sm text-stone-400">
        Gemini drafts a fresh intermediate challenge each week — schema, seed data,
        and solution stay server-side.
      </p>

      {!raid ? (
        <button
          type="button"
          onClick={() => void generate()}
          disabled={loading}
          className="mt-5 rounded-full bg-torch px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-torch/90 disabled:opacity-60"
        >
          {loading ? "Summoning raid…" : "Generate this week's raid"}
        </button>
      ) : (
        <div className="mt-5 space-y-3">
          <p className="font-mono text-[11px] text-stone-500">{raid.weekKey}</p>
          <h3 className="font-display text-xl text-foreground">{raid.title}</h3>
          <p className="text-sm text-stone-400">{raid.subtitle}</p>
          <p className="text-sm text-stone-300 line-clamp-3">{raid.flavor}</p>
          <div className="flex flex-wrap gap-2">
            {raid.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-torch/30 px-2.5 py-0.5 font-mono text-[10px] uppercase text-torch"
              >
                {s}
              </span>
            ))}
            <span className="font-mono text-[11px] text-stone-500">
              +{raid.xp} XP
            </span>
          </div>
          <Link
            href="/dungeon/raid"
            className="inline-flex rounded-full border border-moss/40 px-5 py-2 text-sm text-moss transition hover:bg-moss/10"
          >
            Enter raid →
          </Link>
        </div>
      )}
      {error ? <p className="mt-3 text-sm text-torch">{error}</p> : null}
    </section>
  );
}
