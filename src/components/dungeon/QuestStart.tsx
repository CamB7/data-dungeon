"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function QuestStart() {
  const router = useRouter();
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    slug: string;
    title: string;
    reason: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/dungeon/quest-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not chart a quest.");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-moss/25 bg-stone-950/90 p-6 shadow-[0_0_40px_rgba(93,255,177,0.06)]">
      <p className="font-mono text-xs tracking-[0.25em] text-moss uppercase">
        Natural-language quest start
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
        Tell the Warden what to practice
      </h2>
      <p className="mt-2 text-sm text-stone-400">
        e.g. “I want to practice JOINs on loot” — AI picks the chamber.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="What should I train?"
          className="flex-1 rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-sm outline-none focus:border-moss/50"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={loading || !intent.trim()}
          className="rounded-full bg-moss px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-moss/90 disabled:opacity-60"
        >
          {loading ? "Charting…" : "Find chamber"}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-torch">{error}</p> : null}
      {result ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-moss/30 bg-moss/5 p-4">
          <div>
            <p className="font-display text-lg text-foreground">{result.title}</p>
            <p className="mt-1 text-sm text-stone-400">{result.reason}</p>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/dungeon/chamber/${result.slug}`)}
            className="rounded-full border border-moss/50 px-4 py-2 text-sm text-moss transition hover:bg-moss/10"
          >
            Enter →
          </button>
        </div>
      ) : null}
    </section>
  );
}
