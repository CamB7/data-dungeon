import {
  DUNGEON_TRACK,
  SKILL_LABELS,
  getChamberBySlug,
  type Chamber,
  type SqlSkill,
} from "@/content/chambers";
import type { AttemptLog, PlayerProgress } from "@/lib/progress";
import { dayKey } from "@/lib/progress";

export type SkillMastery = {
  skill: SqlSkill;
  label: string;
  score: number;
  learned: boolean;
  weakCount: number;
};

export type ChartedStats = {
  avgClearTimeMs: number | null;
  avgClearTimeLabel: string;
  chambersCleared: number;
  totalChambers: number;
  trackMasteryPct: number;
  languageMasteryPct: number;
  conceptsLearned: { skill: SqlSkill; label: string }[];
  skillMastery: SkillMastery[];
  clearsByDay: { date: string; count: number }[];
  totalAttempts: number;
  passRatePct: number;
};

export type ImprovementArea = {
  skill: SqlSkill;
  label: string;
  weakCount: number;
  score: number;
  learned: boolean;
  practiceSlug?: string;
  practiceTitle?: string;
  failAttempts: number;
};

export function chartOverviewFallback(
  stats: {
    chambersCleared: number;
    totalChambers: number;
    trackMasteryPct: number;
    passRatePct: number;
    conceptsLearnedCount: number;
  },
  weakSkills: Record<string, number>,
): string {
  if (stats.chambersCleared === 0) {
    return "Your chart is blank — a fresh map. Start in The Lockward and your first clears will light the way.";
  }

  const weak = Object.entries(weakSkills)
    .filter(([skill]) => skill !== "boss")
    .sort((a, b) => b[1] - a[1])[0];

  const weakLine = weak
    ? ` Watch ${SKILL_LABELS[weak[0] as SqlSkill] ?? weak[0]} — it has tripped you ${weak[1]} time${weak[1] === 1 ? "" : "s"}.`
    : "";

  return `You've cleared ${stats.chambersCleared} of ${stats.totalChambers} chambers (${stats.trackMasteryPct}% of the track). Your pass rate sits at ${stats.passRatePct}% across ${stats.conceptsLearnedCount} SQL concepts so far.${weakLine} Keep descending — the Spire rewards patience.`;
}

function practiceChamberForSkill(
  skill: SqlSkill,
  progress: PlayerProgress,
): Chamber | undefined {
  const chambersWithSkill = DUNGEON_TRACK.filter((c) => c.skills.includes(skill));
  if (!chambersWithSkill.length) return undefined;

  const failCounts = new Map<string, number>();
  for (const attempt of progress.attempts) {
    if (!attempt.passed && attempt.skills.includes(skill)) {
      failCounts.set(attempt.slug, (failCounts.get(attempt.slug) ?? 0) + 1);
    }
  }

  const clearedWithSkill = chambersWithSkill.filter((c) =>
    progress.cleared.includes(c.slug),
  );

  const pickFrom = clearedWithSkill.length ? clearedWithSkill : chambersWithSkill;
  let best = pickFrom[0];
  let bestFails = failCounts.get(best.slug) ?? 0;

  for (const chamber of pickFrom) {
    const fails = failCounts.get(chamber.slug) ?? 0;
    if (fails > bestFails) {
      best = chamber;
      bestFails = fails;
    }
  }

  return best;
}

function failAttemptsForSkill(skill: SqlSkill, progress: PlayerProgress): number {
  return progress.attempts.filter(
    (a) => !a.passed && a.skills.includes(skill),
  ).length;
}

/** Skills and chambers the player should drill based on fail history and mastery scores. */
export function computeImprovementAreas(
  progress: PlayerProgress,
  skillMastery: SkillMastery[],
): ImprovementArea[] {
  const withStruggles = skillMastery
    .filter((s) => s.weakCount > 0)
    .sort((a, b) => b.weakCount - a.weakCount || a.score - b.score);

  const areas: ImprovementArea[] = withStruggles.map((s) => {
    const practice = practiceChamberForSkill(s.skill, progress);
    return {
      skill: s.skill,
      label: s.label,
      weakCount: s.weakCount,
      score: s.score,
      learned: s.learned,
      practiceSlug: practice?.slug,
      practiceTitle: practice?.title,
      failAttempts: failAttemptsForSkill(s.skill, progress),
    };
  });

  if (areas.length > 0) return areas.slice(0, 6);

  const lowestLearned = skillMastery
    .filter((s) => s.learned && s.score < 100)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return lowestLearned.map((s) => {
    const practice = practiceChamberForSkill(s.skill, progress);
    return {
      skill: s.skill,
      label: s.label,
      weakCount: s.weakCount,
      score: s.score,
      learned: s.learned,
      practiceSlug: practice?.slug,
      practiceTitle: practice?.title,
      failAttempts: failAttemptsForSkill(s.skill, progress),
    };
  });
}

export function improvementSummary(areas: ImprovementArea[]): string {
  if (!areas.length) {
    return "No struggle patterns yet. When a query fails, we tag the skills involved so you know what to drill.";
  }

  const labels = areas.slice(0, 2).map((a) => a.label);
  const joined =
    labels.length === 1
      ? labels[0]
      : `${labels[0]} and ${labels[1]}`;

  return `Your ledger flags ${joined} as the concepts worth extra reps. Replay a linked chamber or ask the Warden in-room for a targeted hint.`;
}

function formatDuration(ms: number): string {
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`;
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}

/** Rough clear time from explicit duration or first attempt → first pass window. */
export function estimateClearDurationMs(
  attempts: AttemptLog[],
  slug: string,
): number | null {
  const chamberAttempts = attempts
    .filter((a) => a.slug === slug)
    .sort((a, b) => a.at - b.at);
  const firstPass = chamberAttempts.find((a) => a.passed);
  if (!firstPass) return null;

  if (typeof firstPass.durationMs === "number" && firstPass.durationMs > 0) {
    return firstPass.durationMs;
  }

  const first = chamberAttempts[0];
  if (!first || first.at >= firstPass.at) return null;
  return Math.max(1_000, firstPass.at - first.at);
}

export function computeChartedStats(progress: PlayerProgress): ChartedStats {
  const trackSlugs = new Set(DUNGEON_TRACK.map((c) => c.slug));
  const cleared = progress.cleared.filter((slug) => trackSlugs.has(slug));

  const clearDurations = cleared
    .map((slug) => estimateClearDurationMs(progress.attempts, slug))
    .filter((ms): ms is number => ms !== null);

  const avgClearTimeMs = clearDurations.length
    ? clearDurations.reduce((sum, ms) => sum + ms, 0) / clearDurations.length
    : null;

  const allSkills = new Set<SqlSkill>();
  for (const chamber of DUNGEON_TRACK) {
    for (const skill of chamber.skills) {
      if (skill !== "boss") allSkills.add(skill);
    }
  }

  const learnedSkills = new Set<SqlSkill>();
  for (const slug of cleared) {
    const chamber = getChamberBySlug(slug);
    if (!chamber) continue;
    for (const skill of chamber.skills) {
      if (skill !== "boss") learnedSkills.add(skill);
    }
  }

  const conceptsLearned = Array.from(learnedSkills)
    .map((skill) => ({
      skill,
      label: SKILL_LABELS[skill],
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const skillMastery: SkillMastery[] = Array.from(allSkills)
    .map((skill) => {
      const weakCount = progress.weakSkills[skill] ?? 0;
      const learned = learnedSkills.has(skill);
      const score = learned
        ? Math.max(0, Math.min(100, 100 - weakCount * 15))
        : 0;
      return {
        skill,
        label: SKILL_LABELS[skill],
        score,
        learned,
        weakCount,
      };
    })
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));

  // Mastery across the full track skill catalog (unlearned skills count as 0).
  const languageMasteryPct =
    allSkills.size > 0
      ? Math.round(
          skillMastery.reduce((sum, s) => sum + s.score, 0) / allSkills.size,
        )
      : 0;

  const trackMasteryPct = Math.round(
    (cleared.length / DUNGEON_TRACK.length) * 100,
  );

  const dayCounts = new Map<string, number>();
  for (const slug of cleared) {
    const firstPass = progress.attempts
      .filter((a) => a.slug === slug && a.passed)
      .sort((a, b) => a.at - b.at)[0];
    if (!firstPass) continue;
    const key = dayKey(new Date(firstPass.at));
    dayCounts.set(key, (dayCounts.get(key) ?? 0) + 1);
  }

  const clearsByDay = Array.from(dayCounts.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);

  const trackAttempts = progress.attempts.filter((a) => trackSlugs.has(a.slug));
  const passes = trackAttempts.filter((a) => a.passed).length;
  const passRatePct = trackAttempts.length
    ? Math.round((passes / trackAttempts.length) * 100)
    : 0;

  return {
    avgClearTimeMs,
    avgClearTimeLabel: avgClearTimeMs ? formatDuration(avgClearTimeMs) : "—",
    chambersCleared: cleared.length,
    totalChambers: DUNGEON_TRACK.length,
    trackMasteryPct,
    languageMasteryPct,
    conceptsLearned,
    skillMastery,
    clearsByDay,
    totalAttempts: trackAttempts.length,
    passRatePct,
  };
}
