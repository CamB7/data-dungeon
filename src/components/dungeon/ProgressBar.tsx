import type { ChamberStatus } from "@/content/chambers";

type ProgressBarProps = {
  level: number;
  xp: number;
  xpToNext: number;
  clearedChamber: number;
  totalChambers: number;
};

export function ProgressBar({
  level,
  xp,
  xpToNext,
  clearedChamber,
  totalChambers,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((xp / xpToNext) * 100));

  return (
    <div className="rounded-2xl border border-moss/25 bg-stone-950/90 p-5 shadow-[0_0_40px_rgba(168,201,160,0.06)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
            Adventurer rank
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            Level {level}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-stone-500">Track progress</p>
          <p className="mt-0.5 text-sm text-stone-300">
            Chamber {clearedChamber} of {totalChambers}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-stone-500">
          <span>{xp} XP</span>
          <span>{xpToNext} XP to next rank</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-moss-soft to-moss transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function ChamberStatusBanner({
  status,
  salt = false,
  theme = salt ? "salt" : "lockward",
}: {
  status: ChamberStatus;
  salt?: boolean;
  theme?: "lockward" | "salt" | "spire" | "hollow" | "throne";
}) {
  const accent =
    theme === "salt"
      ? {
          locked: "border-brine/25 bg-abyss-soft text-salt-dim",
          lockedLabel: "text-brine-soft",
          current: "border-brine/50 bg-brine/15 text-brine",
          currentBody: "text-salt",
          cleared: "border-brine/30 bg-brine/10",
          clearedLabel: "text-brine",
        }
      : theme === "spire"
        ? {
            locked: "border-spire/25 bg-spire-deep/80 text-spire-soft",
            lockedLabel: "text-spire-soft",
            current: "border-spire/50 bg-spire/15 text-spire",
            currentBody: "text-spire-soft",
            cleared: "border-spire/30 bg-spire/10",
            clearedLabel: "text-spire",
          }
        : {
            locked: "border-stone-600/50 bg-stone-900/80 text-stone-400",
            lockedLabel: "text-stone-500",
            current: "border-moss/40 bg-moss/10 text-moss",
            currentBody: "text-moss/90",
            cleared: "border-moss/30 bg-moss/5",
            clearedLabel: "text-moss",
          };

  if (status === "locked") {
    return (
      <div className={`rounded-xl border px-4 py-3 text-sm ${accent.locked}`}>
        <span
          className={`font-mono text-xs tracking-wider uppercase ${accent.lockedLabel}`}
        >
          Locked
        </span>
        <p className="mt-1">
          Clear the previous chamber to unlock this one. You can still preview the briefing.
        </p>
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className={`rounded-xl border px-4 py-3 text-sm ${accent.current}`}>
        <span className="font-mono text-xs tracking-wider uppercase">Your quest</span>
        <p className={`mt-1 ${accent.currentBody}`}>
          Write a query that matches the objective. Fail? Ask the Warden for a targeted hint.
        </p>
      </div>
    );
  }

  if (status === "cleared") {
    return (
      <div
        className={`rounded-xl border px-4 py-3 text-sm text-stone-300 ${accent.cleared}`}
      >
        <span
          className={`font-mono text-xs tracking-wider uppercase ${accent.clearedLabel}`}
        >
          Cleared
        </span>
        <p className="mt-1">You&apos;ve conquered this chamber. Replay anytime to drill the skill.</p>
      </div>
    );
  }

  return null;
}
