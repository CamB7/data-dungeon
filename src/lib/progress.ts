export type AttemptLog = {
  slug: string;
  passed: boolean;
  at: number;
  skills: string[];
  /** Wall-clock ms on chamber when tracked (optional until timer ships). */
  durationMs?: number;
};

export type PlayerProgress = {
  cleared: string[];
  xp: number;
  attempts: AttemptLog[];
  weakSkills: Record<string, number>;
};

const STORAGE_KEY = "data-dungeon-progress-v1";

export function emptyProgress(): PlayerProgress {
  return {
    cleared: [],
    xp: 0,
    attempts: [],
    weakSkills: {},
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

/** Monday UTC for an ISO week key (`2026-W12`). */
export function weekKeyToWeekStart(weekKey: string): Date {
  const match = /^(\d{4})-W(\d{2})$/.exec(weekKey);
  if (!match) return new Date();
  const year = Number(match[1]);
  const week = Number(match[2]);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const isoDay = jan4.getUTCDay() || 7;
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - isoDay + 1 + (week - 1) * 7);
  return monday;
}

/** Local calendar day key for charting (`2026-07-26`). */
export function dayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Chart label — month and day only, e.g. "Jul 26". */
export function formatDayChartLabel(dayKey: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayKey);
  if (!match) return "—";
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (month < 0 || month > 11 || day < 1 || day > 31) return "—";
  return `${MONTH_SHORT[month]} ${day}`;
}

/** Human-readable week range for charts, e.g. "Jul 12-19" (no year). */
export function formatWeekRangeLabel(weekKey: string): string {
  if (!/^\d{4}-W\d{2}$/.test(weekKey)) return "—";

  const start = weekKeyToWeekStart(weekKey);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[start.getUTCMonth()];
  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();

  if (start.getUTCMonth() === end.getUTCMonth()) {
    return `${month} ${startDay}-${endDay}`;
  }

  const endMonth = monthNames[end.getUTCMonth()];
  return `${month} ${startDay}-${endMonth} ${endDay}`;
}
