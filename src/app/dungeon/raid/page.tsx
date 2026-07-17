"use client";

import { useEffect, useState } from "react";
import { SchemaPanel } from "@/components/dungeon/ChamberPanels";
import { ChamberPlayground } from "@/components/dungeon/ChamberPlayground";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import type { SqlSkill } from "@/content/chambers";

type RaidPublic = {
  weekKey: string;
  slug: string;
  title: string;
  subtitle: string;
  flavor: string;
  objective: string;
  skills: string[];
  xp: number;
  tables: { name: string; description: string; columns: string[] }[];
  starterQuery: string;
  hint: string;
};

export default function WeeklyRaidPage() {
  const [raid, setRaid] = useState<RaidPublic | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const get = await fetch("/api/dungeon/raid");
        const data = await get.json();
        if (data.raid) {
          setRaid(data.raid);
          return;
        }
        const gen = await fetch("/api/dungeon/raid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        });
        const created = await gen.json();
        if (!gen.ok) {
          setError(created.error ?? "Could not generate raid.");
          return;
        }
        setRaid(created.raid);
      } catch {
        setError("Could not load the weekly raid.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <DungeonShell>
        <p className="font-mono text-sm text-stone-400">Summoning this week&apos;s raid…</p>
      </DungeonShell>
    );
  }

  if (error || !raid) {
    return (
      <DungeonShell>
        <p className="text-torch">{error ?? "No raid available."}</p>
      </DungeonShell>
    );
  }

  const chamber = {
    id: 99,
    slug: "weekly-raid" as const,
    title: raid.title,
    starterQuery: raid.starterQuery,
    skills: raid.skills as SqlSkill[],
    xp: raid.xp,
    hint: raid.hint,
    objective: raid.objective,
    tables: raid.tables,
    flavor: raid.flavor,
  };

  return (
    <DungeonShell>
      <article>
        <header className="mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
            Weekly raid · {raid.weekKey}
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-wide text-foreground sm:text-5xl">
            {raid.title}
          </h1>
          <p className="mt-2 text-lg text-stone-400">{raid.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {raid.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-torch/40 bg-torch/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-torch uppercase"
              >
                {skill}
              </span>
            ))}
            <span className="font-mono text-[11px] text-stone-500">+{raid.xp} XP</span>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-stone-700/80 bg-stone-950/60 p-6">
              <h2 className="font-display text-lg font-semibold">Briefing</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{raid.flavor}</p>
            </section>
            <section className="rounded-2xl border border-moss/25 bg-moss/5 p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-moss uppercase">
                Objective
              </h2>
              <p className="mt-3 text-sm text-stone-200">{raid.objective}</p>
            </section>
            <section className="rounded-2xl border border-torch/20 bg-torch/5 p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-torch uppercase">Hint</h2>
              <p className="mt-3 text-sm text-stone-300">{raid.hint}</p>
            </section>
            <SchemaPanel tables={raid.tables} />
          </div>
          <ChamberPlayground chamber={chamber} filename="weekly_raid.sql" />
        </div>
      </article>
    </DungeonShell>
  );
}
