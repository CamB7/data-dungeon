import type { Chamber } from "./types";

export const DUNGEON_TRACK: Chamber[] = [
  {
    id: 1,
    slug: "cell-block-zero",
    floor: 1,
    floorName: "Entry Halls",
    title: "Cell Block Zero",
    subtitle: "Read the prison roster",
    flavor:
      "You wake in the lowest cell block. A scratched ledger lists every prisoner — names, cells, and crimes. Before you can plan an escape, you need to read what's there.",
    objective:
      "Return every column and every row from the prisoners table.",
    skills: ["select"],
    xp: 25,
    tables: [
      {
        name: "prisoners",
        description: "Everyone currently held in Cell Block Zero",
        columns: ["id", "name", "cell", "crime"],
      },
    ],
    starterQuery: "SELECT ",
    hint: "Use SELECT * to grab all columns from a single table.",
  },
  {
    id: 2,
    slug: "torchlight-archive",
    floor: 1,
    floorName: "Entry Halls",
    title: "Torchlight Archive",
    subtitle: "Name only what you need",
    flavor:
      "The archive is vast, but your torch is weak. The warden's log has dozens of fields — you only need the prisoner names and their cell numbers to find your route.",
    objective:
      "Return only the name and cell columns from prisoners, in that order.",
    skills: ["columns"],
    xp: 30,
    tables: [
      {
        name: "prisoners",
        description: "Prison roster with full records",
        columns: ["id", "name", "cell", "crime", "arrested_on"],
      },
    ],
    starterQuery: "SELECT ",
    hint: "List column names after SELECT instead of using *.",
  },
  {
    id: 3,
    slug: "sorting-pit",
    floor: 1,
    floorName: "Entry Halls",
    title: "The Sorting Pit",
    subtitle: "Rank by threat level",
    flavor:
      "Guards drag prisoners into the pit and sort them by danger. The warden wants the roster ordered from highest threat to lowest before the night shift.",
    objective:
      "Return name and threat_level from prisoners, sorted by threat_level descending.",
    skills: ["order-by"],
    xp: 35,
    tables: [
      {
        name: "prisoners",
        description: "Prisoners rated by threat level",
        columns: ["id", "name", "threat_level", "cell"],
      },
    ],
    starterQuery: "SELECT name, threat_level\nFROM prisoners\n",
    hint: "ORDER BY column DESC puts the largest values first.",
  },
  {
    id: 4,
    slug: "gate-of-limits",
    floor: 1,
    floorName: "Entry Halls",
    title: "Gate of Limits",
    subtitle: "Only a few may pass",
    flavor:
      "The exit gate is narrow. The guard will only call the first three names on the list. Pull a short shortlist from the roster.",
    objective:
      "Return the top 3 prisoner names when ordered alphabetically by name.",
    skills: ["limit"],
    xp: 35,
    tables: [
      {
        name: "prisoners",
        description: "Full prisoner roster",
        columns: ["id", "name", "cell"],
      },
    ],
    starterQuery: "SELECT name\nFROM prisoners\nORDER BY name\n",
    hint: "LIMIT n caps how many rows come back after sorting.",
  },
  {
    id: 5,
    slug: "wardens-filter",
    floor: 2,
    floorName: "Warden's Wing",
    title: "Warden's Filter",
    subtitle: "Block the unworthy",
    flavor:
      "The warden's desk has a wanted list. Only prisoners marked as escape_risk true are allowed in the exercise yard. Filter the roster to match.",
    objective:
      "Return name and cell for prisoners where escape_risk is true.",
    skills: ["where"],
    xp: 40,
    tables: [
      {
        name: "prisoners",
        description: "Prisoners flagged for escape risk",
        columns: ["id", "name", "cell", "escape_risk"],
      },
    ],
    starterQuery: "SELECT name, cell\nFROM prisoners\n",
    hint: "WHERE filters rows before they are returned.",
  },
  {
    id: 6,
    slug: "counting-bones",
    floor: 2,
    floorName: "Warden's Wing",
    title: "Counting Bones",
    subtitle: "Tally the ossuary",
    flavor:
      "The ossuary beneath the wing holds remains sorted by cause of death. The quartermaster needs a head count before the inventory audit.",
    objective: "Return the total number of rows in the remains table.",
    skills: ["count"],
    xp: 45,
    tables: [
      {
        name: "remains",
        description: "Catalogued remains in the ossuary",
        columns: ["id", "cause", "found_on", "chamber"],
      },
    ],
    starterQuery: "SELECT ",
    hint: "COUNT(*) counts every row in a table.",
  },
  {
    id: 7,
    slug: "guild-ledger",
    floor: 2,
    floorName: "Warden's Wing",
    title: "Guild Ledger",
    subtitle: "Tally loot by guild",
    flavor:
      "Confiscated treasure sits in the vault, tagged by which thieves' guild it came from. The warden wants total gold per guild on one report.",
    objective:
      "Return guild_name and the sum of gold for each guild from the loot table, ordered by guild_name.",
    skills: ["group-by"],
    xp: 50,
    tables: [
      {
        name: "loot",
        description: "Confiscated treasure by guild",
        columns: ["id", "item", "gold", "guild_name"],
      },
    ],
    starterQuery: "SELECT guild_name, ",
    hint: "GROUP BY clusters rows; SUM() adds values inside each cluster.",
  },
  {
    id: 8,
    slug: "two-door-riddle",
    floor: 3,
    floorName: "Deep Vault",
    title: "Two-Door Riddle",
    subtitle: "Match keys to doors",
    flavor:
      "The vault has two doors and a ring of keys. Only key-and-door pairs that actually fit should appear on your map — mismatches are traps.",
    objective:
      "Return prisoner name and their assigned quest title by joining prisoners to quests (quests.assigned_to = prisoners.id), ordered by name then title.",
    skills: ["inner-join"],
    xp: 55,
    tables: [
      {
        name: "prisoners",
        description: "Prisoners who accepted quests",
        columns: ["id", "name"],
      },
      {
        name: "quests",
        description: "Active dungeon quests",
        columns: ["id", "title", "difficulty", "xp_reward", "assigned_to"],
      },
    ],
    starterQuery: "SELECT prisoners.name, quests.title\nFROM prisoners\n",
    hint: "INNER JOIN keeps only rows that match in both tables (quests.assigned_to = prisoners.id).",
  },
  {
    id: 9,
    slug: "left-catacombs",
    floor: 3,
    floorName: "Deep Vault",
    title: "Left Catacombs",
    subtitle: "Tombs without occupants",
    flavor:
      "Some crypts were never filled. The archivist wants every tomb listed — even empty ones — alongside any prisoner buried there, if one exists.",
    objective:
      "Return all tomb names and buried prisoner names (including empty tombs), ordered by tomb id.",
    skills: ["left-join"],
    xp: 60,
    tables: [
      {
        name: "tombs",
        description: "Every crypt in the catacombs",
        columns: ["id", "name", "wing"],
      },
      {
        name: "burials",
        description: "Prisoners interred in tombs",
        columns: ["tomb_id", "prisoner_name", "buried_on"],
      },
    ],
    starterQuery: "SELECT tombs.name, burials.prisoner_name\nFROM tombs\n",
    hint: "LEFT JOIN keeps every row from the left table even when there is no match.",
  },
  {
    id: 10,
    slug: "loot-vault-boss",
    floor: 3,
    floorName: "Deep Vault",
    title: "Loot Vault Boss",
    subtitle: "The warden's final ledger",
    flavor:
      "The boss chamber holds the master ledger: prisoners, their quests, and legendary loot. One query opens the vault — filter, join, and rank the haul.",
    objective:
      "Return hero name, quest title, and gold for legendary loot only, ordered by gold descending.",
    skills: ["boss", "inner-join", "where", "order-by"],
    xp: 100,
    isBoss: true,
    tables: [
      {
        name: "prisoners",
        description: "Adventurers in the vault",
        columns: ["id", "name", "class"],
      },
      {
        name: "quests",
        description: "Quests tied to each hero",
        columns: ["id", "title", "assigned_to"],
      },
      {
        name: "loot",
        description: "Treasure from completed quests",
        columns: ["quest_id", "item", "gold", "rarity"],
      },
    ],
    starterQuery: "SELECT prisoners.name, quests.title, loot.gold\nFROM prisoners\n",
    hint: "Chain JOINs across three tables, filter rarity, then ORDER BY gold DESC.",
  },
];

export const FLOOR_LABELS: Record<Chamber["floor"], string> = {
  1: "Floor I — Entry Halls",
  2: "Floor II — Warden's Wing",
  3: "Floor III — Deep Vault",
};
