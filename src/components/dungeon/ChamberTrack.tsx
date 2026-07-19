"use client";

import {
  FLOOR_LABELS,
  floorsInSection,
  getChamberStatusFromCleared,
  getChambersByFloor,
  getLiveSections,
} from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { ChamberCard } from "./ChamberCard";

export function ChamberTrack() {
  const { progress, loading } = usePlayerProgress();
  const sections = getLiveSections();

  return (
    <div className="space-y-20">
      {sections.map((section) => {
        const floors = floorsInSection(section).filter(
          (floor) => getChambersByFloor(floor).length > 0,
        );

        return (
          <div key={section.id} className="space-y-14">
            <header className="border-b border-moss/25 pb-5">
              <p className="font-mono text-xs tracking-[0.25em] text-moss uppercase">
                Section {section.id}
              </p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-wide text-foreground sm:text-4xl">
                {section.name}
              </h2>
              <p className="mt-2 max-w-xl text-sm font-light text-stone-400">
                {section.tagline} · Floors {section.floorStart}–{section.floorEnd}
              </p>
            </header>

            {floors.map((floor) => {
              const chambers = getChambersByFloor(floor);
              const label = FLOOR_LABELS[floor] ?? `Floor ${floor}`;

              return (
                <section key={floor}>
                  <div className="mb-8 flex items-end justify-between gap-4 border-b border-stone-700/60 pb-4">
                    <div>
                      <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
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
                      className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-moss/40 via-torch/30 to-moss/40 sm:left-6 sm:block"
                      aria-hidden
                    />

                    <ol className="grid gap-6 sm:grid-cols-2">
                      {chambers.map((chamber) => (
                        <li key={chamber.slug} className="relative sm:pl-10">
                          <span
                            className={`absolute left-2.5 top-8 hidden h-3 w-3 rounded-full border-2 bg-stone-900 sm:left-4 sm:block ${
                              chamber.isBoss || chamber.isSectionBoss
                                ? "border-blood animate-ember-flicker"
                                : "border-moss"
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
                      ))}
                    </ol>
                  </div>
                </section>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
