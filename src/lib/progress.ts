export type AttemptLog = {
  slug: string;
  passed: boolean;
  at: number;
  skills: string[];
};

export type PlayerProgress = {
  cleared: string[];
  xp: number;
  attempts: AttemptLog[];
  weakSkills: Record<string, number>;
  lastRecommend?: { slug: string; reason: string; at: number };
  weeklyRaid?: WeeklyRaidStored | null;
};

export type WeeklyRaidStored = {
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
  seedSql: string;
  solutionSql: string;
  generatedAt: number;
};

const STORAGE_KEY = "data-dungeon-progress-v1";

export function emptyProgress(): PlayerProgress {
  return {
    cleared: [],
    xp: 0,
    attempts: [],
    weakSkills: {},
    weeklyRaid: null,
  };
}

export function loadProgress(): PlayerProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as PlayerProgress;
    return {
      ...emptyProgress(),
      ...parsed,
      cleared: parsed.cleared ?? [],
      attempts: parsed.attempts ?? [],
      weakSkills: parsed.weakSkills ?? {},
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: PlayerProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordAttempt(
  progress: PlayerProgress,
  input: {
    slug: string;
    passed: boolean;
    skills: string[];
    xp: number;
  },
): PlayerProgress {
  const attempts = [
    ...progress.attempts,
    {
      slug: input.slug,
      passed: input.passed,
      at: Date.now(),
      skills: input.skills,
    },
  ].slice(-200);

  const weakSkills = { ...progress.weakSkills };
  if (!input.passed) {
    for (const skill of input.skills) {
      if (skill === "boss") continue;
      weakSkills[skill] = (weakSkills[skill] ?? 0) + 1;
    }
  } else {
    for (const skill of input.skills) {
      if (weakSkills[skill]) {
        weakSkills[skill] = Math.max(0, weakSkills[skill] - 1);
      }
    }
  }

  const alreadyCleared = progress.cleared.includes(input.slug);
  const cleared =
    input.passed && !alreadyCleared
      ? [...progress.cleared, input.slug]
      : progress.cleared;
  const xp =
    input.passed && !alreadyCleared ? progress.xp + input.xp : progress.xp;

  return { ...progress, attempts, weakSkills, cleared, xp };
}

export function weekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}
