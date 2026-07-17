import fs from "fs";
import path from "path";
import type { WeeklyRaidStored } from "@/lib/progress";
import { weekKey } from "@/lib/progress";

const DATA_DIR = path.join(process.cwd(), "data");
export const RAID_PATH = path.join(DATA_DIR, "weekly-raid.json");

export function readWeeklyRaid(): WeeklyRaidStored | null {
  try {
    if (!fs.existsSync(RAID_PATH)) return null;
    return JSON.parse(fs.readFileSync(RAID_PATH, "utf8")) as WeeklyRaidStored;
  } catch {
    return null;
  }
}

export function writeWeeklyRaid(raid: WeeklyRaidStored) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(RAID_PATH, JSON.stringify(raid, null, 2));
}

export function loadCurrentWeeklyRaid(): WeeklyRaidStored | null {
  const existing = readWeeklyRaid();
  if (existing && existing.weekKey === weekKey()) return existing;
  return null;
}

export function publicRaid(raid: WeeklyRaidStored) {
  return {
    weekKey: raid.weekKey,
    slug: raid.slug,
    title: raid.title,
    subtitle: raid.subtitle,
    flavor: raid.flavor,
    objective: raid.objective,
    skills: raid.skills,
    xp: raid.xp,
    tables: raid.tables,
    starterQuery: raid.starterQuery,
    hint: raid.hint,
    generatedAt: raid.generatedAt,
  };
}
