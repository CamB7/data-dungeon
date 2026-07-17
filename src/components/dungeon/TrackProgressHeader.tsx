"use client";

import { DUNGEON_TRACK } from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { ProgressBar } from "./ProgressBar";

export function TrackProgressHeader() {
  const { progress, authenticated, loading } = usePlayerProgress();
  const trackCleared = progress.cleared.filter((s) => s !== "weekly-raid").length;
  const level = Math.max(1, trackCleared + 1);
  const xpToNext = 100;
  const xpIntoLevel = progress.xp % xpToNext;

  return (
    <div className="space-y-2">
      <ProgressBar
        level={level}
        xp={xpIntoLevel}
        xpToNext={xpToNext}
        clearedChamber={Math.min(trackCleared + 1, DUNGEON_TRACK.length)}
        totalChambers={DUNGEON_TRACK.length}
      />
      <p className="font-mono text-[11px] text-stone-500">
        {loading
          ? "Loading progress…"
          : authenticated
            ? "Progress synced to your adventurer profile"
            : "Guest progress saved locally — sign in to sync across devices"}
      </p>
    </div>
  );
}
