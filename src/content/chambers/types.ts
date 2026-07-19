export type SqlSkill =
  | "select"
  | "columns"
  | "order-by"
  | "limit"
  | "where"
  | "count"
  | "group-by"
  | "inner-join"
  | "left-join"
  | "distinct"
  | "having"
  | "case"
  | "subquery"
  | "nulls"
  | "union"
  | "exists"
  | "boss";

export type ChamberTable = {
  name: string;
  description: string;
  columns: string[];
};

/** Global floor number (1–5 in section I, 6–10 in section II, …). */
export type ChamberFloor = number;

export type Chamber = {
  id: number;
  slug: string;
  floor: ChamberFloor;
  floorName: string;
  /** Which five-floor section this chamber belongs to (1-based). */
  sectionId: number;
  title: string;
  subtitle: string;
  flavor: string;
  objective: string;
  skills: SqlSkill[];
  xp: number;
  isBoss?: boolean;
  /** Final boss of a five-floor section. */
  isSectionBoss?: boolean;
  tables: ChamberTable[];
  starterQuery: string;
  hint: string;
};

export type DungeonSection = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  /** Inclusive global floor range (always five floors). */
  floorStart: number;
  floorEnd: number;
};

export type ChamberStatus = "cleared" | "current" | "locked" | "available";

/** Floors per dungeon section — keep new content aligned to this. */
export const FLOORS_PER_SECTION = 5;

export function sectionIdForFloor(floor: number): number {
  return Math.ceil(floor / FLOORS_PER_SECTION);
}
