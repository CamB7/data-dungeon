import type { Metadata } from "next";
import { ChartedProgression } from "@/components/dungeon/ChartedProgression";
import { DungeonShell } from "@/components/dungeon/DungeonShell";

export const metadata: Metadata = {
  title: "Charted Progression — Data Dungeon",
  description:
    "See your SQL improvement — clear times, concepts learned, mastery, and a Warden overview.",
};

export default function ChartedProgressionPage() {
  return (
    <DungeonShell backHref="/dungeon" backLabel="← Sections" variant="lockward">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
          Dungeon · Chart
        </p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-wide text-foreground sm:text-5xl">
          Charted Progression
        </h1>
        <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
          Your ledger mapped — how fast you clear, what you&apos;ve learned, and
          where the Warden thinks you&apos;re headed next.
        </p>
      </div>

      <ChartedProgression />
    </DungeonShell>
  );
}
