"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DUNGEON_SECTIONS,
  getChambersBySection,
} from "@/content/chambers";
import {
  chartOverviewFallback,
  computeChartedStats,
  computeImprovementAreas,
  improvementSummary,
  type ImprovementArea,
} from "@/lib/charted-progress";
import { formatDayChartLabel } from "@/lib/progress";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { SkillTag } from "@/components/dungeon/SkillTag";
import Link from "next/link";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-moss/25 bg-stone-950/80 p-5">
      <p className="font-mono text-[11px] tracking-[0.2em] text-torch uppercase">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-stone-500">{hint}</p>
      ) : null}
    </div>
  );
}

function DailyClearsChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  if (!data.length) {
    return (
      <p className="text-sm text-stone-500">
        Clear chambers to chart your daily pace.
      </p>
    );
  }

  return (
    <div className="flex items-end gap-3 overflow-x-auto pb-1 sm:gap-4">
      {data.map((day) => {
        const label = formatDayChartLabel(day.date);
        return (
          <div
            key={day.date}
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <div
              className="flex h-32 flex-col-reverse items-center justify-start gap-1"
              title={`${label}: ${day.count} clear${day.count === 1 ? "" : "s"}`}
            >
              {Array.from({ length: day.count }, (_, i) => (
                <div
                  key={i}
                  className="h-3.5 w-7 rounded-sm border border-moss/40 bg-moss/75 sm:h-4 sm:w-8"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-stone-500">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ImprovementRow({ area }: { area: ImprovementArea }) {
  return (
    <li
      className="rounded-xl border border-stone-700/50 bg-stone-900/50 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-4"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <SkillTag skill={area.skill} theme="lockward" />
          {area.weakCount > 0 ? (
            <span className="font-mono text-[10px] tracking-wider text-blood uppercase">
              Tripped {area.weakCount}×
            </span>
          ) : (
            <span className="font-mono text-[10px] tracking-wider text-stone-500 uppercase">
              Polish reps
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-stone-400">
          {area.failAttempts > 0
            ? `${area.failAttempts} failed attempt${area.failAttempts === 1 ? "" : "s"} on track`
            : "Lowest mastery among skills you've cleared"}
          {" · "}
          Mastery {area.score}%
        </p>
        <div className="mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-stone-800">
          <div
            className="h-full rounded-full bg-blood/70"
            style={{ width: `${area.score}%` }}
          />
        </div>
      </div>
      {area.practiceSlug ? (
        <Link
          href={`/dungeon/chamber/${area.practiceSlug}`}
          className="mt-3 inline-flex min-h-11 shrink-0 items-center text-sm text-torch transition hover:text-torch/80 sm:mt-0 sm:min-h-0"
        >
          {area.practiceTitle ? `Replay ${area.practiceTitle} →` : "Practice →"}
        </Link>
      ) : null}
    </li>
  );
}

export function ChartedProgression() {
  const { progress, loading } = usePlayerProgress();
  const stats = useMemo(() => computeChartedStats(progress), [progress]);
  const improvementAreas = useMemo(
    () => computeImprovementAreas(progress, stats.skillMastery),
    [progress, stats.skillMastery],
  );

  const [overview, setOverview] = useState<string | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(false);

  useEffect(() => {
    if (loading) return;

    let cancelled = false;
    setOverviewLoading(true);

    const chartStats = computeChartedStats(progress);
    const applyFallback = () => {
      setOverview(
        chartOverviewFallback(
          {
            chambersCleared: chartStats.chambersCleared,
            totalChambers: chartStats.totalChambers,
            trackMasteryPct: chartStats.trackMasteryPct,
            passRatePct: chartStats.passRatePct,
            conceptsLearnedCount: chartStats.conceptsLearned.length,
          },
          progress.weakSkills,
        ),
      );
    };

    const topSkills = chartStats.skillMastery
      .filter((s) => s.learned)
      .slice(0, 5)
      .map((s) => ({ label: s.label, score: s.score }));

    void (async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30_000);

        const res = await fetch("/api/dungeon/chart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chambersCleared: chartStats.chambersCleared,
            totalChambers: chartStats.totalChambers,
            trackMasteryPct: chartStats.trackMasteryPct,
            languageMasteryPct: chartStats.languageMasteryPct,
            avgClearTimeLabel: chartStats.avgClearTimeLabel,
            passRatePct: chartStats.passRatePct,
            conceptsLearned: chartStats.conceptsLearned.map((c) => c.label),
            weakSkills: progress.weakSkills,
            topSkills,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        const data = (await res.json()) as {
          overview?: string;
          source?: string;
        };
        if (cancelled) return;

        if (data.overview) {
          setOverview(data.overview);
        } else {
          applyFallback();
        }
      } catch {
        if (!cancelled) applyFallback();
      } finally {
        if (!cancelled) setOverviewLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, progress]);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Avg clear time"
          value={stats.avgClearTimeLabel}
          hint={
            stats.avgClearTimeMs
              ? "Estimated from your attempt history"
              : "Needs more clears to estimate"
          }
        />
        <StatCard
          label="Concepts learned"
          value={String(stats.conceptsLearned.length)}
          hint={`of ${stats.skillMastery.length} skills on the track`}
        />
        <StatCard
          label="Language mastery"
          value={`${stats.languageMasteryPct}%`}
          hint="Across every skill on the track — unlearned count as 0%"
        />
        <StatCard
          label="Track cleared"
          value={`${stats.trackMasteryPct}%`}
          hint={`${stats.chambersCleared} / ${stats.totalChambers} chambers`}
        />
      </div>

      <section className="rounded-2xl border border-moss/25 bg-stone-950/80 p-6">
        <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
          Warden&apos;s read
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-foreground">
          AI progress overview
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-300">
          {overviewLoading && !overview
            ? "The Warden is studying your chart…"
            : overview ?? "Your chart will appear here once the Warden has read your ledger."}
        </p>
      </section>

      <section className="rounded-2xl border border-blood/25 bg-stone-950/80 p-6">
        <p className="font-mono text-xs tracking-[0.25em] text-blood uppercase">
          Drill list
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-foreground">
          What to improve
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">
          {improvementSummary(improvementAreas)}
        </p>
        {improvementAreas.length ? (
          <ul className="mt-6 space-y-3">
            {improvementAreas.map((area) => (
              <ImprovementRow key={area.skill} area={area} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-stone-500">
            Clear your first chamber — or fail one on purpose — and we&apos;ll chart
            which SQL concepts need more work.
          </p>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-moss/25 bg-stone-950/80 p-6">
          <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
            Concepts learned
          </p>
          <h2 className="mt-2 font-display text-xl font-bold text-foreground">
            SQL on your map
          </h2>
          {stats.conceptsLearned.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {stats.conceptsLearned.map((concept) => (
                <SkillTag
                  key={concept.skill}
                  skill={concept.skill}
                  theme="lockward"
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone-500">
              No concepts logged yet — clear your first chamber to begin the chart.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-moss/25 bg-stone-950/80 p-6">
          <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
            Daily pace
          </p>
          <h2 className="mt-2 font-display text-xl font-bold text-foreground">
            Chambers cleared
          </h2>
          <p className="mt-1 text-xs text-stone-500">
            One block per chamber cleared that day
          </p>
          <div className="mt-6">
            <DailyClearsChart data={stats.clearsByDay} />
          </div>
          <p className="mt-4 font-mono text-[11px] text-stone-500">
            Pass rate {stats.passRatePct}% · {stats.totalAttempts} track attempts
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-700/50 bg-stone-950/60 p-6">
        <p className="font-mono text-xs tracking-[0.25em] text-stone-500 uppercase">
          By section
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DUNGEON_SECTIONS.map((section) => {
            const chambers = getChambersBySection(section.id);
            const cleared = chambers.filter((c) =>
              progress.cleared.includes(c.slug),
            ).length;
            const pct = chambers.length
              ? Math.round((cleared / chambers.length) * 100)
              : 0;
            return (
              <div
                key={section.id}
                className="rounded-xl border border-stone-700/40 bg-stone-900/50 px-4 py-3"
              >
                <p className="font-display text-sm font-semibold text-stone-200">
                  {section.name}
                </p>
                <p className="mt-1 font-mono text-[11px] text-stone-500">
                  {cleared}/{chambers.length} · {pct}%
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-800">
                  <div
                    className="h-full rounded-full bg-torch/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-center font-mono text-[11px] text-stone-600">
        Draft chart · timers & cross-device attempt history coming later
      </p>
    </div>
  );
}
