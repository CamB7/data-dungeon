import { DUNGEON_TRACK } from "./track";
import type { Chamber, ChamberStatus, DungeonSection } from "./types";
import { DUNGEON_SECTIONS, floorsInSection } from "./sections";

export type {
  Chamber,
  ChamberFloor,
  ChamberStatus,
  ChamberTable,
  DungeonSection,
  SqlSkill,
} from "./types";
export { FLOORS_PER_SECTION, sectionIdForFloor } from "./types";
export { DUNGEON_TRACK, FLOOR_LABELS } from "./track";
export {
  DUNGEON_SECTIONS,
  floorsInSection,
  getSectionById,
  getSectionForFloor,
} from "./sections";

export function getChambers(): Chamber[] {
  return DUNGEON_TRACK;
}

export function getChamberBySlug(slug: string): Chamber | undefined {
  return DUNGEON_TRACK.find((chamber) => chamber.slug === slug);
}

export function getChamberById(id: number): Chamber | undefined {
  return DUNGEON_TRACK.find((chamber) => chamber.id === id);
}

/** Derive lock/current status from which chamber slugs the player has cleared. */
export function getChamberStatusFromCleared(
  chamberId: number,
  clearedSlugs: string[],
): ChamberStatus {
  const clearedIds = new Set(
    clearedSlugs
      .map((slug) => DUNGEON_TRACK.find((c) => c.slug === slug)?.id)
      .filter((id): id is number => typeof id === "number"),
  );
  const highestCleared = clearedIds.size
    ? Math.max(...Array.from(clearedIds))
    : 0;
  const currentId = Math.min(highestCleared + 1, DUNGEON_TRACK.length);

  if (clearedIds.has(chamberId)) return "cleared";
  if (chamberId === currentId) return "current";
  if (chamberId === currentId + 1) return "available";
  return "locked";
}

/** @deprecated Prefer getChamberStatusFromCleared */
export function getChamberStatus(
  chamberId: number,
  currentChamberId: number = 1,
): ChamberStatus {
  if (chamberId < currentChamberId) return "cleared";
  if (chamberId === currentChamberId) return "current";
  if (chamberId === currentChamberId + 1) return "available";
  return "locked";
}

export function getChambersByFloor(floor: Chamber["floor"]): Chamber[] {
  return DUNGEON_TRACK.filter((chamber) => chamber.floor === floor);
}

export function getTrackFloors(): number[] {
  return Array.from(new Set(DUNGEON_TRACK.map((c) => c.floor))).sort(
    (a, b) => a - b,
  );
}

export function getLiveSections(): DungeonSection[] {
  const liveFloors = new Set(getTrackFloors());
  return DUNGEON_SECTIONS.filter((section) =>
    floorsInSection(section).some((f) => liveFloors.has(f)),
  );
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
  distinct: "DISTINCT",
  having: "HAVING",
  case: "CASE",
  subquery: "Subquery",
  nulls: "NULL",
  union: "UNION",
  exists: "EXISTS",
  boss: "Boss",
};
