import { DUNGEON_TRACK } from "./track";
import type { Chamber, ChamberStatus } from "./types";

export type { Chamber, ChamberStatus, ChamberTable, SqlSkill } from "./types";
export { DUNGEON_TRACK, FLOOR_LABELS } from "./track";

/** Highest chamber cleared (1–10). Mechanics will drive this from the DB later. */
export const PREVIEW_CLEARED_CHAMBER = 1;

export function getChambers(): Chamber[] {
  return DUNGEON_TRACK;
}

export function getChamberBySlug(slug: string): Chamber | undefined {
  return DUNGEON_TRACK.find((chamber) => chamber.slug === slug);
}

export function getChamberById(id: number): Chamber | undefined {
  return DUNGEON_TRACK.find((chamber) => chamber.id === id);
}

export function getChamberStatus(
  chamberId: number,
  clearedChamber: number = PREVIEW_CLEARED_CHAMBER,
): ChamberStatus {
  if (chamberId < clearedChamber) return "cleared";
  if (chamberId === clearedChamber) return "current";
  if (chamberId === clearedChamber + 1) return "available";
  return "locked";
}

export function getChambersByFloor(floor: Chamber["floor"]): Chamber[] {
  return DUNGEON_TRACK.filter((chamber) => chamber.floor === floor);
}

export function getAdjacentChambers(slug: string): {
  prev?: Chamber;
  next?: Chamber;
} {
  const index = DUNGEON_TRACK.findIndex((chamber) => chamber.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? DUNGEON_TRACK[index - 1] : undefined,
    next: index < DUNGEON_TRACK.length - 1 ? DUNGEON_TRACK[index + 1] : undefined,
  };
}

export function getTotalTrackXp(): number {
  return DUNGEON_TRACK.reduce((sum, chamber) => sum + chamber.xp, 0);
}

export const SKILL_LABELS: Record<Chamber["skills"][number], string> = {
  select: "SELECT",
  columns: "Columns",
  "order-by": "ORDER BY",
  limit: "LIMIT",
  where: "WHERE",
  count: "COUNT",
  "group-by": "GROUP BY",
  "inner-join": "INNER JOIN",
  "left-join": "LEFT JOIN",
  boss: "Boss",
};
