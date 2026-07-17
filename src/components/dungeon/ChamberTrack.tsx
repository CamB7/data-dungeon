import {
  FLOOR_LABELS,
  getChamberStatus,
  getChambersByFloor,
  PREVIEW_CLEARED_CHAMBER,
  type Chamber,
} from "@/content/chambers";
import { ChamberCard } from "./ChamberCard";

const FLOORS: Chamber["floor"][] = [1, 2, 3];

export function ChamberTrack() {
  return (
    <div className="space-y-16">
      {FLOORS.map((floor) => {
        const chambers = getChambersByFloor(floor);

        return (
          <section key={floor}>
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-stone-700/60 pb-4">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
                  Floor {floor}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
                  {FLOOR_LABELS[floor].split(" — ")[1]}
                </h2>
              </div>
              <span className="font-mono text-xs text-stone-500">
                {chambers.length} chambers
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
                      className="absolute left-2.5 top-8 hidden h-3 w-3 rounded-full border-2 border-moss bg-stone-900 sm:left-4 sm:block"
                      aria-hidden
                    />
                    <ChamberCard
                      chamber={chamber}
                      status={getChamberStatus(chamber.id, PREVIEW_CLEARED_CHAMBER)}
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
}
