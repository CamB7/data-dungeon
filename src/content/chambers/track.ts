import type { Chamber } from "./types";

export const DUNGEON_TRACK: Chamber[] = [
  {
    id: 1,
    slug: "cell-block-zero",
    floor: 1,
    floorName: "Entry Halls",
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
    sectionId: 1,
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
  {
    id: 11,
    slug: "echo-gallery",
    floor: 4,
    floorName: "Ashen Depths",
    sectionId: 1,
    title: "Echo Gallery",
    subtitle: "Hear each crime once",
    flavor:
      "Whispers bounce off the gallery walls — every crime shouted twice, thrice. The archivist wants each distinct crime written once on the slate.",
    objective:
      "Return each unique crime from the prisoners table, ordered alphabetically.",
    skills: ["distinct"],
    xp: 65,
    tables: [
      {
        name: "prisoners",
        description: "Roster with repeated crime labels",
        columns: ["id", "name", "crime", "cell"],
      },
    ],
    starterQuery: "SELECT ",
    hint: "SELECT DISTINCT column removes duplicate values.",
  },
  {
    id: 12,
    slug: "tithe-threshold",
    floor: 4,
    floorName: "Ashen Depths",
    sectionId: 1,
    title: "Tithe Threshold",
    subtitle: "Only rich guilds pass",
    flavor:
      "The ash-river ferry demands a tithe. Only guilds whose confiscated gold totals more than 50 may cross — the poor stay in the shallows.",
    objective:
      "Return guild_name and total gold (as total_gold) for guilds whose SUM(gold) is greater than 50, ordered by guild_name.",
    skills: ["having", "group-by"],
    xp: 70,
    tables: [
      {
        name: "loot",
        description: "Confiscated treasure by guild",
        columns: ["id", "item", "gold", "guild_name"],
      },
    ],
    starterQuery: "SELECT guild_name, SUM(gold) AS total_gold\nFROM loot\n",
    hint: "HAVING filters groups after GROUP BY — unlike WHERE, which filters rows first.",
  },
  {
    id: 13,
    slug: "mask-of-roles",
    floor: 4,
    floorName: "Ashen Depths",
    sectionId: 1,
    title: "Mask of Roles",
    subtitle: "Label the danger",
    flavor:
      "Guards wear blank masks until ranked. Classify each prisoner: threat 4+ is 'high', 2–3 is 'mid', otherwise 'low'.",
    objective:
      "Return name, threat_level, and a risk column from a CASE expression ('high' / 'mid' / 'low'), ordered by name.",
    skills: ["case"],
    xp: 75,
    tables: [
      {
        name: "prisoners",
        description: "Prisoners with threat ratings",
        columns: ["id", "name", "threat_level", "cell"],
      },
    ],
    starterQuery: "SELECT name, threat_level,\n  CASE\n",
    hint: "CASE WHEN … THEN … WHEN … THEN … ELSE … END builds a derived column.",
  },
  {
    id: 14,
    slug: "hollow-throne-boss",
    floor: 4,
    floorName: "Ashen Depths",
    sectionId: 1,
    title: "Hollow Throne Boss",
    subtitle: "Who still holds a key",
    flavor:
      "The hollow throne only opens for heroes who still carry a vault key. Find prisoners whose id appears among key holders, join their active quest, and rank by quest XP.",
    objective:
      "Return prisoner name and quest title for prisoners who hold a key (id IN keys.holder_id), ordered by quest xp_reward descending, then name.",
    skills: ["boss", "subquery", "inner-join", "order-by"],
    xp: 120,
    isBoss: true,
    tables: [
      {
        name: "prisoners",
        description: "Adventurers in the ash depths",
        columns: ["id", "name", "class"],
      },
      {
        name: "keys",
        description: "Vault keys and who holds them",
        columns: ["id", "key_name", "holder_id"],
      },
      {
        name: "quests",
        description: "Quests assigned to heroes",
        columns: ["id", "title", "xp_reward", "assigned_to"],
      },
    ],
    starterQuery:
      "SELECT prisoners.name, quests.title\nFROM prisoners\nINNER JOIN quests ON quests.assigned_to = prisoners.id\n",
    hint: "Filter with WHERE id IN (SELECT holder_id FROM keys), then ORDER BY xp_reward DESC.",
  },
  {
    id: 15,
    slug: "forgotten-cells",
    floor: 5,
    floorName: "Gate of Seals",
    sectionId: 1,
    title: "Forgotten Cells",
    subtitle: "Names that never came",
    flavor:
      "Some roster slots were carved and never filled. The seal clerk needs every prisoner who has no recorded crime — the blanks that haunt the ledger.",
    objective:
      "Return name and cell for prisoners where crime IS NULL, ordered by name.",
    skills: ["nulls"],
    xp: 80,
    tables: [
      {
        name: "prisoners",
        description: "Roster with missing crime values",
        columns: ["id", "name", "cell", "crime"],
      },
    ],
    starterQuery: "SELECT name, cell\nFROM prisoners\n",
    hint: "IS NULL finds missing values — equality checks like = NULL never match.",
  },
  {
    id: 16,
    slug: "twin-ledgers",
    floor: 5,
    floorName: "Gate of Seals",
    sectionId: 1,
    title: "Twin Ledgers",
    subtitle: "Merge two rolls",
    flavor:
      "Day shift and night shift keep separate rolls. The gate will not open until both lists are stacked into one ordered column of names.",
    objective:
      "Return a single name column that unions day_roll and night_roll names, ordered alphabetically.",
    skills: ["union"],
    xp: 85,
    tables: [
      {
        name: "day_roll",
        description: "Prisoners logged on day shift",
        columns: ["id", "name"],
      },
      {
        name: "night_roll",
        description: "Prisoners logged on night shift",
        columns: ["id", "name"],
      },
    ],
    starterQuery: "SELECT name FROM day_roll\nUNION\n",
    hint: "UNION stacks two SELECTs with the same column shape and drops duplicates.",
  },
  {
    id: 17,
    slug: "proof-of-presence",
    floor: 5,
    floorName: "Gate of Seals",
    sectionId: 1,
    title: "Proof of Presence",
    subtitle: "Who still holds a torch",
    flavor:
      "Only prisoners who still appear in the torch log may approach the seal. Prove presence with EXISTS — no half-measures.",
    objective:
      "Return prisoner name for those who have at least one row in torch_log (via EXISTS), ordered by name.",
    skills: ["exists"],
    xp: 90,
    tables: [
      {
        name: "prisoners",
        description: "All known prisoners",
        columns: ["id", "name", "cell"],
      },
      {
        name: "torch_log",
        description: "Recent torch sightings by prisoner",
        columns: ["id", "prisoner_id", "seen_on"],
      },
    ],
    starterQuery: "SELECT name\nFROM prisoners\nWHERE EXISTS (\n",
    hint: "EXISTS (SELECT 1 FROM … WHERE …) is true when the subquery finds any row.",
  },
  {
    id: 18,
    slug: "lockward-seal-boss",
    floor: 5,
    floorName: "Gate of Seals",
    sectionId: 1,
    title: "Lockward Seal Boss",
    subtitle: "Close the first section",
    flavor:
      "The Lockward's final seal demands proof: heroes who still hold a key, whose crime is known (not null), ranked by the gold on their legendary haul.",
    objective:
      "Return name and gold for prisoners who EXISTS in keys, have a non-null crime, and own legendary loot — ordered by gold descending.",
    skills: ["boss", "exists", "nulls", "inner-join", "where", "order-by"],
    xp: 150,
    isBoss: true,
    isSectionBoss: true,
    tables: [
      {
        name: "prisoners",
        description: "Candidates for the Lockward seal",
        columns: ["id", "name", "crime", "class"],
      },
      {
        name: "keys",
        description: "Keys still in circulation",
        columns: ["id", "key_name", "holder_id"],
      },
      {
        name: "loot",
        description: "Personal hauls by prisoner",
        columns: ["prisoner_id", "item", "gold", "rarity"],
      },
    ],
    starterQuery:
      "SELECT prisoners.name, loot.gold\nFROM prisoners\nINNER JOIN loot ON loot.prisoner_id = prisoners.id\n",
    hint: "Combine EXISTS (keys), crime IS NOT NULL, rarity = 'legendary', then ORDER BY gold DESC.",
  },
];

export const FLOOR_LABELS: Record<number, string> = {
  1: "Floor I — Entry Halls",
  2: "Floor II — Warden's Wing",
  3: "Floor III — Deep Vault",
  4: "Floor IV — Ashen Depths",
  5: "Floor V — Gate of Seals",
};
