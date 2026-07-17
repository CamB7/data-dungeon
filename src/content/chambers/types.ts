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
  | "boss";

export type ChamberTable = {
  name: string;
  description: string;
  columns: string[];
};

export type Chamber = {
  id: number;
  slug: string;
  floor: 1 | 2 | 3;
  floorName: string;
  title: string;
  subtitle: string;
  flavor: string;
  objective: string;
  skills: SqlSkill[];
  xp: number;
  isBoss?: boolean;
  tables: ChamberTable[];
  starterQuery: string;
  hint: string;
};

export type ChamberStatus = "cleared" | "current" | "locked" | "available";
