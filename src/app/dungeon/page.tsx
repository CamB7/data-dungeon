import type { Metadata } from "next";
import {
  DUNGEON_TRACK,
  getTotalTrackXp,
  PREVIEW_CLEARED_CHAMBER,
} from "@/content/chambers";
import { AdaptiveRecommend } from "@/components/dungeon/AdaptiveRecommend";
import { ChamberTrack } from "@/components/dungeon/ChamberTrack";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import { ProgressBar } from "@/components/dungeon/ProgressBar";
import { QuestStart } from "@/components/dungeon/QuestStart";
import { WeeklyRaidCard } from "@/components/dungeon/WeeklyRaidCard";

export const metadata: Metadata = {
  title: "Dungeon Track — Data Dungeon",
  description:
    "AI-coached SQL chambers — Warden hints, adaptive path, and weekly generated raids.",
};

export default function DungeonTrackPage() {
  return (
    <DungeonShell backHref="/" backLabel="← Home">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
          Dungeon track · AI coach
        </p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-wide text-foreground sm:text-5xl">
          The First Descent
        </h1>
        <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
          Ten chambers across three floors — plus an AI Warden, adaptive pathing, and a weekly
          generated raid.
        </p>
      </div>

      <div className="mb-10">
        <ProgressBar
          level={1}
          xp={0}
          xpToNext={100}
          clearedChamber={PREVIEW_CLEARED_CHAMBER}
          totalChambers={DUNGEON_TRACK.length}
        />
      </div>

      <div className="mb-12 space-y-6">
        <QuestStart />
        <div className="grid gap-6 lg:grid-cols-2">
          <AdaptiveRecommend />
          <WeeklyRaidCard />
        </div>
      </div>

      <ChamberTrack />

      <p className="mt-16 text-center font-mono text-xs tracking-wide text-stone-500">
        {DUNGEON_TRACK.length} chambers · {getTotalTrackXp()} XP on this track · progress saved locally
      </p>
    </DungeonShell>
  );
}
