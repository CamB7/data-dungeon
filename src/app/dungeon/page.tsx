import type { Metadata } from "next";
import { DUNGEON_TRACK, getTotalTrackXp } from "@/content/chambers";
import { AdaptiveRecommend } from "@/components/dungeon/AdaptiveRecommend";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import { QuestStart } from "@/components/dungeon/QuestStart";
import { SectionHub } from "@/components/dungeon/SectionHub";
import { TrackProgressHeader } from "@/components/dungeon/TrackProgressHeader";
import { WeeklyRaidCard } from "@/components/dungeon/WeeklyRaidCard";

export const metadata: Metadata = {
  title: "Dungeon Sections — Data Dungeon",
  description:
    "Choose a section — Lockward, Salt Crypts, and more — each with its own SQL path and atmosphere.",
};

export default function DungeonHubPage() {
  return (
    <DungeonShell backHref="/" backLabel="← Home" variant="lockward">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
          Dungeon · Sections
        </p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-wide text-foreground sm:text-5xl">
          The Descent
        </h1>
        <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
          Start in The Lockward, then descend through Salt Crypts and Index Spire.
          Each wing builds on what you already cleared — pick a section and keep
          climbing.
        </p>
      </div>

      <div className="mb-10">
        <TrackProgressHeader />
      </div>

      <div className="mb-12 space-y-6">
        <QuestStart />
        <div className="grid gap-6 lg:grid-cols-2">
          <AdaptiveRecommend />
          <WeeklyRaidCard />
        </div>
      </div>

      <SectionHub />

      <p className="mt-16 text-center font-mono text-xs tracking-wide text-stone-500">
        {DUNGEON_TRACK.length} live chambers · {getTotalTrackXp()} XP authored
      </p>
    </DungeonShell>
  );
}
