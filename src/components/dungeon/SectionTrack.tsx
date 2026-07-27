"use client";

import {
  FLOOR_LABELS,
  floorsInSection,
  getChamberStatusFromCleared,
  getChambersByFloor,
  type DungeonSection,
} from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { sectionChrome, themeForSectionId } from "@/lib/theme";
import { ChamberCard } from "./ChamberCard";

type SectionTrackProps = {
  section: DungeonSection;
};

export function SectionTrack({ section }: SectionTrackProps) {
  const { progress, loading } = usePlayerProgress();
  const theme = themeForSectionId(section.id);
  const chrome = sectionChrome(theme);
  const floors = floorsInSection(section).filter(
    (floor) => getChambersByFloor(floor).length > 0,
  );

  if (floors.length === 0) {
    return (
      <div
        className={`rounded-2xl border px-6 py-10 text-center ${chrome.sealedPanel}`}
      >
        <p className="font-mono text-xs tracking-[0.25em] uppercase">Sealed</p>
        <p className="mt-3 text-sm">
          Chambers for this section are not carved yet. Clear earlier sections
          and return when the gate opens.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {floors.map((floor) => {
        const chambers = getChambersByFloor(floor);
        const label = FLOOR_LABELS[floor] ?? `Floor ${floor}`;

        return (
          <section key={floor}>
            <div className="mb-8 flex flex-col gap-2 border-b border-stone-700/60 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs tracking-[0.25em] uppercase ${chrome.floorLabel}`}
                >
                  Floor {floor}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
                  {label.includes(" — ") ? label.split(" — ")[1] : label}
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-500">
                {loading ? "…" : `${chambers.length} chambers`}
              </span>
            </div>

            <div className="relative">
              <div
                className={`absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b sm:left-6 sm:block ${chrome.rail}`}
                aria-hidden
              />

              <ol className="grid gap-6 sm:grid-cols-2">
                {chambers.map((chamber) => {
                  const bossish = Boolean(
                    chamber.isBoss || chamber.isSectionBoss,
                  );
                  return (
                    <li key={chamber.slug} className="relative sm:pl-10">
                      <span
                        className={`absolute left-2.5 top-8 hidden h-3 w-3 rounded-full border bg-stone-900 sm:left-4 sm:block ${
                          bossish ? chrome.nodeBoss : chrome.nodeNormal
                        }`}
                        aria-hidden
                      />
                      <ChamberCard
                        chamber={chamber}
                        status={getChamberStatusFromCleared(
                          chamber.id,
                          progress.cleared,
                        )}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
        );
      })}
    </div>
  );
}
