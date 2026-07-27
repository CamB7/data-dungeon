import type { Metadata } from "next";
import Link from "next/link";
import { DUNGEON_TRACK, getTotalTrackXp } from "@/content/chambers";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import { SectionHub } from "@/components/dungeon/SectionHub";
import { TrackProgressHeader } from "@/components/dungeon/TrackProgressHeader";

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

      <div className="mb-12">
        <Link
          href="/dungeon/chart"
          className="block rounded-2xl border border-moss/25 bg-stone-950/60 p-5 transition hover:border-moss/40 hover:bg-moss/5"
        >
          <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
            Charted progression
          </p>
          <p className="mt-2 font-display text-lg font-bold text-foreground">
            See how you&apos;re improving →
          </p>
          <p className="mt-1 text-sm text-stone-400">
            Clear times, concepts learned, mastery bars, and a Warden overview.
          </p>
        </Link>
      </div>

      <SectionHub />

      <p className="mt-16 text-center font-mono text-xs tracking-wide text-stone-500">
        {DUNGEON_TRACK.length} live chambers · {getTotalTrackXp()} XP authored
      </p>
    </DungeonShell>
  );
}
