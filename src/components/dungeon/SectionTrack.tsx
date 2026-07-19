"use client";

import {
  FLOOR_LABELS,
  floorsInSection,
  getChamberStatusFromCleared,
  getChambersByFloor,
  type DungeonSection,
} from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { themeForSectionId, type SectionThemeId } from "@/lib/theme";
import { ChamberCard } from "./ChamberCard";

const railByTheme: Record<SectionThemeId, string> = {
  lockward: "from-moss/40 via-torch/30 to-moss/40",
  salt: "from-brine/40 via-brine-soft/30 to-brine/40",
  spire: "from-spire/40 via-spire-soft/30 to-spire/40",
  hollow: "from-hollow/35 via-hollow-soft/25 to-hollow/35",
  throne: "from-throne/40 via-throne-soft/30 to-throne/40",
};

const floorAccent: Record<SectionThemeId, string> = {
  lockward: "text-torch",
  salt: "text-brine-soft",
  spire: "text-spire-soft",
  hollow: "text-hollow-soft",
  throne: "text-throne-soft",
};

const nodeBorder: Record<SectionThemeId, { normal: string; boss: string }> = {
  lockward: {
    normal: "border-moss",
    boss: "border-blood animate-ember-flicker",
  },
  salt: {
    normal: "border-brine",
    boss: "border-brine animate-brine-flicker",
  },
  spire: {
    normal: "border-spire",
    boss: "border-spire-glow animate-torch-pulse",
  },
  hollow: {
    normal: "border-hollow",
    boss: "border-hollow-glow animate-ember-flicker",
  },
  throne: {
    normal: "border-throne",
    boss: "border-throne-glow animate-ember-flicker",
  },
};

type SectionTrackProps = {
  section: DungeonSection;
};

export function SectionTrack({ section }: SectionTrackProps) {
  const { progress, loading } = usePlayerProgress();
  const theme = themeForSectionId(section.id);
  const floors = floorsInSection(section).filter(
    (floor) => getChambersByFloor(floor).length > 0,
  );

  if (floors.length === 0) {
    return (
      <div
        className={`rounded-2xl border px-6 py-10 text-center ${
          theme === "salt"
            ? "border-brine/25 bg-abyss/50 text-salt-dim"
            : theme === "spire"
              ? "border-spire/25 bg-spire-deep/60 text-spire-soft"
              : theme === "hollow"
                ? "border-hollow/25 bg-hollow-deep/60 text-hollow-soft"
                : theme === "throne"
                  ? "border-throne/25 bg-throne-deep/60 text-throne-soft"
                  : "border-moss/25 bg-stone-950/60 text-stone-400"
        }`}
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
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-stone-700/60 pb-4">
              <div>
                <p
                  className={`font-mono text-xs tracking-[0.25em] uppercase ${floorAccent[theme]}`}
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
                className={`absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b sm:left-6 sm:block ${railByTheme[theme]}`}
                aria-hidden
              />

              <ol className="grid gap-6 sm:grid-cols-2">
                {chambers.map((chamber) => {
                  const bossish = Boolean(
                    chamber.isBoss || chamber.isSectionBoss,
                  );
                  const node = nodeBorder[theme];
                  return (
                    <li key={chamber.slug} className="relative sm:pl-10">
                      <span
                        className={`absolute left-2.5 top-8 hidden h-3 w-3 rounded-full border-2 bg-stone-900 sm:left-4 sm:block ${
                          bossish ? node.boss : node.normal
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
