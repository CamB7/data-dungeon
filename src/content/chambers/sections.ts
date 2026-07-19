import type { DungeonSection } from "./types";
import { FLOORS_PER_SECTION } from "./types";

/**
 * Five floors per section. Only sections with authored chambers appear on the track.
 * Names locked: The Lockward → Salt Crypts → Index Spire → Null Cathedral → Query Throne.
 */
export const DUNGEON_SECTIONS: DungeonSection[] = [
  {
    id: 1,
    slug: "the-lockward",
    name: "The Lockward",
    tagline: "Iron locks, confiscated ledgers, ash rivers, and the first seal.",
    floorStart: 1,
    floorEnd: FLOORS_PER_SECTION,
  },
  {
    id: 2,
    slug: "the-salt-crypts",
    name: "The Salt Crypts",
    tagline: "Brine-soaked tombs and tidal joins beneath the tide line.",
    floorStart: 6,
    floorEnd: 10,
  },
  {
    id: 3,
    slug: "index-spire",
    name: "Index Spire",
    tagline: "Climb the tower of indexes — rank, window, and structure.",
    floorStart: 11,
    floorEnd: 15,
  },
  {
    id: 4,
    slug: "null-cathedral",
    name: "Null Cathedral",
    tagline: "Missing values, integrity rites, and hollow columns.",
    floorStart: 16,
    floorEnd: 20,
  },
  {
    id: 5,
    slug: "the-query-throne",
    name: "The Query Throne",
    tagline: "Endgame synthesis — one query to rule the dungeon.",
    floorStart: 21,
    floorEnd: 25,
  },
];

export function getSectionById(id: number): DungeonSection | undefined {
  return DUNGEON_SECTIONS.find((s) => s.id === id);
}

export function getSectionBySlug(slug: string): DungeonSection | undefined {
  return DUNGEON_SECTIONS.find((s) => s.slug === slug);
}

export function getSectionForFloor(floor: number): DungeonSection | undefined {
  return DUNGEON_SECTIONS.find(
    (s) => floor >= s.floorStart && floor <= s.floorEnd,
  );
}

export function floorsInSection(section: DungeonSection): number[] {
  const floors: number[] = [];
  for (let f = section.floorStart; f <= section.floorEnd; f++) {
    floors.push(f);
  }
  return floors;
}

export function sectionPath(section: DungeonSection | string): string {
  const slug = typeof section === "string" ? section : section.slug;
  return `/dungeon/section/${slug}`;
}
