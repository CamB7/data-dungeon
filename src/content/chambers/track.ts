import type { Chamber } from "./types";

export const DUNGEON_TRACK: Chamber[] = [
  {
    id: 1,
    slug: "cell-block-zero",
    floor: 1,
    floorName: "Intake Corridor",
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
    floorName: "Intake Corridor",
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
    floorName: "Intake Corridor",
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
    floorName: "Intake Corridor",
    sectionId: 1,
    title: "Gate of Limits",
    subtitle: "Only a few may pass the grate",
    flavor:
      "The intake grate is narrow. The guard will only call the first three names on the iron list. Pull a short shortlist from the roster.",
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
    subtitle: "Tally the wing ossuary",
    flavor:
      "Beneath the Warden's Wing, the ossuary holds remains sorted by cause of death. The quartermaster needs a head count before the inventory audit.",
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
    title: "Seized Ledger",
    subtitle: "Tally confiscated gold by guild",
    flavor:
      "The confiscation desk tags every seized purse by thieves' guild. The warden wants total gold per guild on one ironbound report.",
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
    floorName: "Confiscation Vault",
    sectionId: 1,
    title: "Paired Keys",
    subtitle: "Match locks to holders",
    flavor:
      "The vault ring holds keys and doors in separate ledgers. Only pairs that truly fit belong on your map — unmatched locks are traps.",
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
    floorName: "Confiscation Vault",
    sectionId: 1,
    title: "Unfilled Crypts",
    subtitle: "Tombs without occupants",
    flavor:
      "Beneath the vault, some crypts were carved and never filled. The archivist wants every tomb listed — even empty ones — alongside any prisoner buried there, if one exists.",
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
    floorName: "Confiscation Vault",
    sectionId: 1,
    title: "Vault Warden",
    subtitle: "The confiscation master ledger",
    flavor:
      "The Vault Warden keeps the master ledger: prisoners, their quests, and legendary seized loot. One query opens the iron door — filter, join, and rank the haul.",
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
    title: "Risk Brands",
    subtitle: "Stamp the threat class",
    flavor:
      "The ash-river clerks brand each prisoner before the ferry. Classify: threat 4+ is 'high', 2–3 is 'mid', otherwise 'low'.",
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
    title: "Keyholder Throne",
    subtitle: "Who still holds a vault key",
    flavor:
      "The Keyholder Throne only opens for prisoners who still carry a vault key. Find those whose id appears among key holders, join their active quest, and rank by quest XP.",
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
    title: "Lockward Seal",
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
  // ─── Section II — The Salt Crypts (floors 6–10) ─────────────────────────
  // Assumes Lockward skills. Each chamber adds a brine concept or combines known tools.
  {
    id: 19,
    slug: "salt-scripture",
    floor: 6,
    floorName: "Brine Gallery",
    sectionId: 2,
    title: "Salt Scripture",
    subtitle: "Pattern-match the tablets",
    flavor:
      "You already know how to filter and sort. Now match titles that contain Salt — the gallery only keeps those plaques.",
    objective:
      "Return id and title from tablets where title LIKE '%Salt%', ordered by id.",
    skills: ["like", "order-by"],
    xp: 95,
    tables: [
      {
        name: "tablets",
        description: "Stone tablets in the brine gallery",
        columns: ["id", "title", "era"],
      },
    ],
    starterQuery: "SELECT id, title\nFROM tablets\n",
    hint: "LIKE '%Salt%' plus ORDER BY — same sorting habit as the Lockward.",
  },
  {
    id: 20,
    slug: "tide-window",
    floor: 6,
    floorName: "Brine Gallery",
    sectionId: 2,
    title: "Tide Window",
    subtitle: "Inclusive range filter",
    flavor:
      "BETWEEN is a cleaner WHERE for closed ranges. Pull hauls whose tide mark sits from 3 through 7.",
    objective:
      "Return catch_name and tide_mark from hauls where tide_mark BETWEEN 3 AND 7, ordered by tide_mark.",
    skills: ["between", "order-by"],
    xp: 100,
    tables: [
      {
        name: "hauls",
        description: "Catches logged against tide marks",
        columns: ["id", "catch_name", "tide_mark", "weight"],
      },
    ],
    starterQuery: "SELECT catch_name, tide_mark\nFROM hauls\n",
    hint: "BETWEEN low AND high is inclusive. Keep ORDER BY in your muscle memory.",
  },
  {
    id: 21,
    slug: "brine-and",
    floor: 6,
    floorName: "Brine Gallery",
    sectionId: 2,
    title: "Brine And",
    subtitle: "Stack LIKE with BETWEEN",
    flavor:
      "The gallery's gate wants both: a Salt name and a mid-tide mark. Combine the two new tools with AND.",
    objective:
      "Return name and tide_mark from relics where name LIKE '%Salt%' AND tide_mark BETWEEN 3 AND 7, ordered by name.",
    skills: ["like", "between", "where", "order-by"],
    xp: 110,
    tables: [
      {
        name: "relics",
        description: "Relics with names and tide marks",
        columns: ["id", "name", "tide_mark", "value"],
      },
    ],
    starterQuery: "SELECT name, tide_mark\nFROM relics\n",
    hint: "AND both predicates, then ORDER BY name.",
  },
  {
    id: 22,
    slug: "brine-average",
    floor: 7,
    floorName: "Tide Measure",
    sectionId: 2,
    title: "Brine Average",
    subtitle: "AVG on a familiar GROUP BY",
    flavor:
      "You grouped loot in the Lockward. Now average salinity per pool — AVG is the new piece.",
    objective:
      "Return pool_name and AVG(salinity) as avg_salinity, grouped by pool, ordered by pool_name.",
    skills: ["avg", "group-by", "order-by"],
    xp: 115,
    tables: [
      {
        name: "readings",
        description: "Salinity samples by tide pool",
        columns: ["id", "pool_name", "salinity", "taken_on"],
      },
    ],
    starterQuery: "SELECT pool_name, AVG(salinity) AS avg_salinity\nFROM readings\n",
    hint: "GROUP BY pool_name with AVG — then ORDER BY pool_name.",
  },
  {
    id: 23,
    slug: "depth-marks",
    floor: 7,
    floorName: "Tide Measure",
    sectionId: 2,
    title: "Depth Marks",
    subtitle: "MIN and MAX together",
    flavor:
      "Same grouping habit, two aggregates. Report each trench's shallowest and deepest sounding.",
    objective:
      "Return trench_name, MIN(depth) as min_depth, MAX(depth) as max_depth, ordered by trench_name.",
    skills: ["group-by", "order-by"],
    xp: 120,
    tables: [
      {
        name: "soundings",
        description: "Depth soundings by trench",
        columns: ["id", "trench_name", "depth", "crew"],
      },
    ],
    starterQuery:
      "SELECT trench_name, MIN(depth) AS min_depth, MAX(depth) AS max_depth\nFROM soundings\n",
    hint: "MIN and MAX share one GROUP BY trench_name.",
  },
  {
    id: 24,
    slug: "salt-having",
    floor: 7,
    floorName: "Tide Measure",
    sectionId: 2,
    title: "Salt Having",
    subtitle: "Filter groups after AVG",
    flavor:
      "HAVING returns from the Lockward tithe. Keep only pools whose average salinity exceeds 20.",
    objective:
      "Return pool_name and AVG(salinity) as avg_salinity for pools with AVG(salinity) > 20, ordered by pool_name.",
    skills: ["avg", "having", "group-by", "order-by"],
    xp: 130,
    tables: [
      {
        name: "readings",
        description: "Salinity samples by tide pool",
        columns: ["id", "pool_name", "salinity"],
      },
    ],
    starterQuery: "SELECT pool_name, AVG(salinity) AS avg_salinity\nFROM readings\n",
    hint: "HAVING AVG(salinity) > 20 after GROUP BY — not WHERE.",
  },
  {
    id: 25,
    slug: "reef-crossing",
    floor: 8,
    floorName: "Undertow Archives",
    sectionId: 2,
    title: "Reef Crossing",
    subtitle: "Three-table join chain",
    flavor:
      "INNER JOIN is familiar. Chain three tables — divers to routes to relics — and sort the ledger.",
    objective:
      "Return diver name as diver, route title, and relic name as relic, ordered by diver then relic.",
    skills: ["inner-join", "order-by"],
    xp: 135,
    tables: [
      {
        name: "divers",
        description: "Salt crypt divers",
        columns: ["id", "name", "rank"],
      },
      {
        name: "routes",
        description: "Swim routes assigned to divers",
        columns: ["id", "title", "diver_id"],
      },
      {
        name: "relics",
        description: "Relics found on a route",
        columns: ["id", "name", "route_id"],
      },
    ],
    starterQuery:
      "SELECT divers.name AS diver, routes.title, relics.name AS relic\nFROM divers\n",
    hint: "INNER JOIN routes, then relics. Alias both name columns.",
  },
  {
    id: 26,
    slug: "kelp-clause",
    floor: 8,
    floorName: "Undertow Archives",
    sectionId: 2,
    title: "Kelp Clause",
    subtitle: "AND / OR pressure",
    flavor:
      "WHERE is old hat — boolean shape is the drill. Keep wrecks that are deep OR hazardous, but never both calm and shallow.",
    objective:
      "Return name and depth for wrecks where depth >= 40 OR hazardous = 1, ordered by name.",
    skills: ["where", "order-by"],
    xp: 140,
    tables: [
      {
        name: "wrecks",
        description: "Shipwrecks in the undertow",
        columns: ["id", "name", "depth", "hazardous"],
      },
    ],
    starterQuery: "SELECT name, depth\nFROM wrecks\n",
    hint: "OR combines alternatives; ORDER BY name finishes the archive row.",
  },
  {
    id: 27,
    slug: "brine-outer",
    floor: 8,
    floorName: "Undertow Archives",
    sectionId: 2,
    title: "Brine Outer",
    subtitle: "LEFT JOIN in the undertow",
    flavor:
      "Same LEFT JOIN idea as the Lockward crypts: list every route, even those with no relic yet.",
    objective:
      "Return route title and relic name (null when missing), ordered by route id.",
    skills: ["left-join", "order-by"],
    xp: 145,
    tables: [
      {
        name: "routes",
        description: "Every swim route",
        columns: ["id", "title"],
      },
      {
        name: "relics",
        description: "Relics tied to a route",
        columns: ["id", "name", "route_id"],
      },
    ],
    starterQuery: "SELECT routes.title, relics.name\nFROM routes\n",
    hint: "LEFT JOIN relics ON relics.route_id = routes.id, then ORDER BY routes.id.",
  },
  {
    id: 28,
    slug: "mirror-tide",
    floor: 9,
    floorName: "Twin Currents",
    sectionId: 2,
    title: "Mirror Tide",
    subtitle: "Self-join mentors",
    flavor:
      "New shape: join a table to itself. Pair each apprentice with their mentor's name.",
    objective:
      "Return apprentice and mentor names via self-join on mentor_id, ordered by apprentice.",
    skills: ["self-join", "order-by"],
    xp: 150,
    tables: [
      {
        name: "divers",
        description: "Divers with optional mentors",
        columns: ["id", "name", "mentor_id"],
      },
    ],
    starterQuery:
      "SELECT apprentice.name AS apprentice, mentor.name AS mentor\nFROM divers AS apprentice\n",
    hint: "JOIN divers AS mentor ON mentor.id = apprentice.mentor_id.",
  },
  {
    id: 29,
    slug: "drowned-absence",
    floor: 9,
    floorName: "Twin Currents",
    sectionId: 2,
    title: "Drowned Absence",
    subtitle: "NOT EXISTS",
    flavor:
      "EXISTS is Lockward knowledge. Flip it: who never appears in the beacon log?",
    objective:
      "Return diver name where NOT EXISTS a beacon_log row for that diver, ordered by name.",
    skills: ["exists", "order-by"],
    xp: 155,
    tables: [
      {
        name: "divers",
        description: "All divers who entered the currents",
        columns: ["id", "name", "rank"],
      },
      {
        name: "beacon_log",
        description: "Resurface beacon pings",
        columns: ["id", "diver_id", "surfaced_on"],
      },
    ],
    starterQuery: "SELECT name\nFROM divers\nWHERE NOT EXISTS (\n",
    hint: "NOT EXISTS flips the Lockward EXISTS test.",
  },
  {
    id: 30,
    slug: "twin-proof",
    floor: 9,
    floorName: "Twin Currents",
    sectionId: 2,
    title: "Twin Proof",
    subtitle: "Self-join plus EXISTS",
    flavor:
      "Combine the floor's tools: apprentices who have a mentor and also resurfaced at least once.",
    objective:
      "Return apprentice name for divers with a mentor (self-join) who EXISTS in beacon_log, ordered by name.",
    skills: ["self-join", "exists", "order-by"],
    xp: 165,
    tables: [
      {
        name: "divers",
        description: "Divers with mentors",
        columns: ["id", "name", "mentor_id"],
      },
      {
        name: "beacon_log",
        description: "Resurface pings",
        columns: ["id", "diver_id", "surfaced_on"],
      },
    ],
    starterQuery:
      "SELECT apprentice.name\nFROM divers AS apprentice\nINNER JOIN divers AS mentor ON mentor.id = apprentice.mentor_id\n",
    hint: "Keep the self-join, then AND EXISTS (beacon_log for apprentice.id).",
  },
  {
    id: 31,
    slug: "foam-prelude",
    floor: 10,
    floorName: "Sovereign Shore",
    sectionId: 2,
    title: "Foam Prelude",
    subtitle: "Warmup before the Sovereign",
    flavor:
      "Stack brine pattern tools you already drilled: legendary relics whose names taste of Salt.",
    objective:
      "Return name and value where rarity = 'legendary' AND name LIKE '%Salt%', ordered by value descending.",
    skills: ["like", "where", "order-by"],
    xp: 170,
    tables: [
      {
        name: "relics",
        description: "Shore relics awaiting judgment",
        columns: ["id", "name", "value", "rarity"],
      },
    ],
    starterQuery: "SELECT name, value\nFROM relics\n",
    hint: "AND equality with LIKE, then ORDER BY value DESC.",
  },
  {
    id: 32,
    slug: "salt-sovereign-boss",
    floor: 10,
    floorName: "Sovereign Shore",
    sectionId: 2,
    title: "Salt Sovereign",
    subtitle: "Close the Salt Crypts",
    flavor:
      "Final seal: resurfaced divers only (EXISTS), haul totals with HAVING, join + rank — every Lockward and brine habit at once.",
    objective:
      "Return diver name and SUM(gold) as total_gold for divers who EXISTS in beacon_log, HAVING SUM(gold) > 50, ordered by total_gold descending.",
    skills: ["boss", "exists", "having", "group-by", "inner-join", "order-by"],
    xp: 200,
    isBoss: true,
    isSectionBoss: true,
    tables: [
      {
        name: "divers",
        description: "Candidates for the Salt Sovereign",
        columns: ["id", "name", "rank"],
      },
      {
        name: "beacon_log",
        description: "Proof of resurfacing",
        columns: ["id", "diver_id", "surfaced_on"],
      },
      {
        name: "hauls",
        description: "Gold hauled by each diver",
        columns: ["id", "diver_id", "item", "gold"],
      },
    ],
    starterQuery:
      "SELECT divers.name, SUM(hauls.gold) AS total_gold\nFROM divers\nINNER JOIN hauls ON hauls.diver_id = divers.id\n",
    hint: "EXISTS beacon, GROUP BY diver, HAVING SUM(gold) > 50, ORDER BY total_gold DESC.",
  },
  // ─── Section III — Index Spire (floors 11–15) ────────────────────────────
  // Assumes Lockward + Salt. New tools: OFFSET, IN, COALESCE, CAST, window, ROUND.
  {
    id: 33,
    slug: "offset-steps",
    floor: 11,
    floorName: "Ascending Steps",
    sectionId: 3,
    title: "Offset Steps",
    subtitle: "Paginate with OFFSET",
    flavor:
      "LIMIT and ORDER BY are old. OFFSET is the new rung — skip the first two scholars, take the next three.",
    objective:
      "Return name from scholars ordered by climb_rank, LIMIT 3 OFFSET 2.",
    skills: ["offset", "limit", "order-by"],
    xp: 160,
    tables: [
      {
        name: "scholars",
        description: "Climb ranks on the ascending steps",
        columns: ["id", "name", "climb_rank"],
      },
    ],
    starterQuery: "SELECT name\nFROM scholars\nORDER BY climb_rank\n",
    hint: "LIMIT n OFFSET m — you already know LIMIT.",
  },
  {
    id: 34,
    slug: "indexed-shelves",
    floor: 11,
    floorName: "Ascending Steps",
    sectionId: 3,
    title: "Indexed Shelves",
    subtitle: "Membership with IN",
    flavor:
      "IN is a tidy WHERE list. Keep shelves stamped 2, 4, and 7.",
    objective:
      "Return id and label where id IN (2, 4, 7), ordered by id.",
    skills: ["in", "order-by"],
    xp: 165,
    tables: [
      {
        name: "shelves",
        description: "Indexed shelves on the steps",
        columns: ["id", "label", "wing"],
      },
    ],
    starterQuery: "SELECT id, label\nFROM shelves\n",
    hint: "WHERE id IN (…) then ORDER BY id.",
  },
  {
    id: 35,
    slug: "page-index",
    floor: 11,
    floorName: "Ascending Steps",
    sectionId: 3,
    title: "Page Index",
    subtitle: "IN plus OFFSET",
    flavor:
      "Combine the floor's new tools: from shelves in (1,2,3,4,5), skip the first two by id, take the next two.",
    objective:
      "Return id and label for id IN (1, 2, 3, 4, 5), ordered by id, LIMIT 2 OFFSET 2.",
    skills: ["in", "offset", "limit", "order-by"],
    xp: 175,
    tables: [
      {
        name: "shelves",
        description: "Shelves on the page index",
        columns: ["id", "label", "wing"],
      },
    ],
    starterQuery: "SELECT id, label\nFROM shelves\n",
    hint: "Filter with IN, ORDER BY id, then LIMIT 2 OFFSET 2.",
  },
  {
    id: 36,
    slug: "coalesce-plaque",
    floor: 12,
    floorName: "Catalog Wing",
    sectionId: 3,
    title: "Coalesce Plaque",
    subtitle: "Fill NULL labels",
    flavor:
      "NULL handling returns from Forgotten Cells. COALESCE picks a fallback subtitle when dust ate the carving.",
    objective:
      "Return title and COALESCE(subtitle, 'Blank') as subtitle, ordered by id.",
    skills: ["coalesce", "order-by"],
    xp: 180,
    tables: [
      {
        name: "plaques",
        description: "Catalog plaques with optional subtitles",
        columns: ["id", "title", "subtitle"],
      },
    ],
    starterQuery: "SELECT title, COALESCE(subtitle, 'Blank') AS subtitle\nFROM plaques\n",
    hint: "COALESCE(a, b) returns the first non-NULL value.",
  },
  {
    id: 37,
    slug: "cast-height",
    floor: 12,
    floorName: "Catalog Wing",
    sectionId: 3,
    title: "Cast Height",
    subtitle: "Text to number",
    flavor:
      "Heights were stored as text. CAST them so ORDER BY ranks the tallest first — sorting you already trust.",
    objective:
      "Return label and CAST(height_text AS INTEGER) as height, ordered by height descending.",
    skills: ["cast", "order-by"],
    xp: 185,
    tables: [
      {
        name: "steps",
        description: "Step labels with height stored as text",
        columns: ["id", "label", "height_text"],
      },
    ],
    starterQuery: "SELECT label, CAST(height_text AS INTEGER) AS height\nFROM steps\n",
    hint: "CAST(… AS INTEGER) then ORDER BY height DESC.",
  },
  {
    id: 38,
    slug: "coalesce-cast",
    floor: 12,
    floorName: "Catalog Wing",
    sectionId: 3,
    title: "Coalesce Cast",
    subtitle: "Both null-fill and cast",
    flavor:
      "Some spans lack a recorded height. Treat missing text as '0', cast to integer, and list the tallest first.",
    objective:
      "Return label and CAST(COALESCE(height_text, '0') AS INTEGER) as height, ordered by height descending.",
    skills: ["coalesce", "cast", "order-by"],
    xp: 195,
    tables: [
      {
        name: "spans",
        description: "Spans with optional height text",
        columns: ["id", "label", "height_text"],
      },
    ],
    starterQuery:
      "SELECT label, CAST(COALESCE(height_text, '0') AS INTEGER) AS height\nFROM spans\n",
    hint: "COALESCE inside CAST, then ORDER BY height DESC.",
  },
  {
    id: 39,
    slug: "row-number-spire",
    floor: 13,
    floorName: "Window Gallery",
    sectionId: 3,
    title: "Row Number Spire",
    subtitle: "ROW_NUMBER window",
    flavor:
      "Windows number rows without collapsing them. Rank climbers by score — highest is rung 1.",
    objective:
      "Return name and ROW_NUMBER() OVER (ORDER BY score DESC) as rung, ordered by rung.",
    skills: ["window"],
    xp: 200,
    tables: [
      {
        name: "climbers",
        description: "Climbers scored in the window gallery",
        columns: ["id", "name", "score"],
      },
    ],
    starterQuery:
      "SELECT name, ROW_NUMBER() OVER (ORDER BY score DESC) AS rung\nFROM climbers\n",
    hint: "ROW_NUMBER() OVER (ORDER BY score DESC), then ORDER BY rung.",
  },
  {
    id: 40,
    slug: "partition-peak",
    floor: 13,
    floorName: "Window Gallery",
    sectionId: 3,
    title: "Partition Peak",
    subtitle: "SUM OVER PARTITION BY",
    flavor:
      "Keep every bell row, but stamp each with its wing's total volume — partition, don't GROUP away the notes.",
    objective:
      "Return wing, note, and SUM(volume) OVER (PARTITION BY wing) as wing_total, ordered by wing then note.",
    skills: ["window"],
    xp: 205,
    tables: [
      {
        name: "bells",
        description: "Gallery bells by wing",
        columns: ["id", "wing", "note", "volume"],
      },
    ],
    starterQuery:
      "SELECT wing, note, SUM(volume) OVER (PARTITION BY wing) AS wing_total\nFROM bells\n",
    hint: "PARTITION BY wing resets the window sum per wing.",
  },
  {
    id: 41,
    slug: "ranked-filter",
    floor: 13,
    floorName: "Window Gallery",
    sectionId: 3,
    title: "Ranked Filter",
    subtitle: "Window plus subquery filter",
    flavor:
      "Combine Spire windows with Lockward subqueries: rank only climbers above the tower average.",
    objective:
      "Return name, score, and RANK() OVER (ORDER BY score DESC) as place for climbers with score > (SELECT AVG(score) FROM climbers), ordered by place.",
    skills: ["window", "subquery", "order-by"],
    xp: 215,
    tables: [
      {
        name: "climbers",
        description: "Climbers to filter then rank",
        columns: ["id", "name", "score"],
      },
    ],
    starterQuery:
      "SELECT name, score, RANK() OVER (ORDER BY score DESC) AS place\nFROM climbers\n",
    hint: "WHERE score > (SELECT AVG(score) FROM climbers), then window RANK.",
  },
  {
    id: 42,
    slug: "round-tower",
    floor: 14,
    floorName: "Structure Vault",
    sectionId: 3,
    title: "Round Tower",
    subtitle: "ROUND on grouped averages",
    flavor:
      "AVG and GROUP BY are familiar from brine measure. ROUND cleans each tier's mean to one decimal.",
    objective:
      "Return tier and ROUND(AVG(reading), 1) as avg_reading, ordered by tier.",
    skills: ["round", "avg", "group-by", "order-by"],
    xp: 220,
    tables: [
      {
        name: "gauges",
        description: "Structural readings by tower tier",
        columns: ["id", "tier", "reading"],
      },
    ],
    starterQuery:
      "SELECT tier, ROUND(AVG(reading), 1) AS avg_reading\nFROM gauges\n",
    hint: "ROUND(AVG(reading), 1) with GROUP BY tier.",
  },
  {
    id: 43,
    slug: "cross-index",
    floor: 14,
    floorName: "Structure Vault",
    sectionId: 3,
    title: "Cross Index",
    subtitle: "JOIN with IN",
    flavor:
      "Join tomes to shelves, but only wings in ('North', 'East') — JOIN and IN together.",
    objective:
      "Return tome title and shelf label for shelves.wing IN ('North', 'East'), ordered by title.",
    skills: ["inner-join", "in", "order-by"],
    xp: 225,
    tables: [
      {
        name: "tomes",
        description: "Indexed tomes",
        columns: ["id", "title", "shelf_id"],
      },
      {
        name: "shelves",
        description: "Shelves by wing",
        columns: ["id", "label", "wing"],
      },
    ],
    starterQuery: "SELECT tomes.title, shelves.label\nFROM tomes\n",
    hint: "INNER JOIN shelves, WHERE wing IN ('North', 'East'), ORDER BY title.",
  },
  {
    id: 44,
    slug: "window-join",
    floor: 14,
    floorName: "Structure Vault",
    sectionId: 3,
    title: "Window Join",
    subtitle: "Rank after joining",
    flavor:
      "Join climbers to floors, then ROW_NUMBER by score — window after join, Lockward habit plus Spire tool.",
    objective:
      "Return climber name, floor name as floor_name, and ROW_NUMBER() OVER (ORDER BY score DESC) as rung, ordered by rung.",
    skills: ["window", "inner-join", "order-by"],
    xp: 235,
    tables: [
      {
        name: "climbers",
        description: "Climbers on floors",
        columns: ["id", "name", "score", "floor_id"],
      },
      {
        name: "floors",
        description: "Spire floor names",
        columns: ["id", "name"],
      },
    ],
    starterQuery:
      "SELECT climbers.name, floors.name AS floor_name,\n  ROW_NUMBER() OVER (ORDER BY climbers.score DESC) AS rung\nFROM climbers\n",
    hint: "INNER JOIN floors, window ROW_NUMBER on score, ORDER BY rung.",
  },
  {
    id: 45,
    slug: "apex-prelude",
    floor: 15,
    floorName: "Apex Seal",
    sectionId: 3,
    title: "Apex Prelude",
    subtitle: "COALESCE, IN, OFFSET",
    flavor:
      "Warmup for the Archon: A/B ranks only, fill blank titles, skip the first name alphabetically.",
    objective:
      "Return name and COALESCE(title, 'Acolyte') as title where rank_code IN ('A', 'B'), ordered by name, LIMIT 3 OFFSET 1.",
    skills: ["coalesce", "in", "offset", "limit", "order-by"],
    xp: 240,
    tables: [
      {
        name: "aspirants",
        description: "Candidates at the apex seal",
        columns: ["id", "name", "title", "rank_code"],
      },
    ],
    starterQuery: "SELECT name, COALESCE(title, 'Acolyte') AS title\nFROM aspirants\n",
    hint: "IN + COALESCE + ORDER BY name + LIMIT 3 OFFSET 1.",
  },
  {
    id: 46,
    slug: "index-archon",
    floor: 15,
    floorName: "Apex Seal",
    sectionId: 3,
    title: "Index Archon",
    subtitle: "Close the Index Spire",
    flavor:
      "Final seal: unsealed floors only, scores above the tower average, RANK() over the survivors — window, join, and subquery as one.",
    objective:
      "Return climber name, floor name as floor_name, score, and RANK() OVER (ORDER BY score DESC) as place for climbers on floors where sealed = 0 and score > (SELECT AVG(score) FROM climbers), ordered by place.",
    skills: ["boss", "window", "inner-join", "subquery", "order-by"],
    xp: 260,
    isBoss: true,
    isSectionBoss: true,
    tables: [
      {
        name: "climbers",
        description: "Apex climbers and scores",
        columns: ["id", "name", "score", "floor_id"],
      },
      {
        name: "floors",
        description: "Spire floors and seal state",
        columns: ["id", "name", "sealed"],
      },
    ],
    starterQuery:
      "SELECT climbers.name, floors.name AS floor_name, climbers.score,\n  RANK() OVER (ORDER BY climbers.score DESC) AS place\nFROM climbers\n",
    hint: "Join floors, filter sealed = 0 and score > AVG subquery, RANK(), ORDER BY place.",
  },
];

export const FLOOR_LABELS: Record<number, string> = {
  1: "Floor I — Intake Corridor",
  2: "Floor II — Warden's Wing",
  3: "Floor III — Confiscation Vault",
  4: "Floor IV — Ashen Depths",
  5: "Floor V — Gate of Seals",
  6: "Floor VI — Brine Gallery",
  7: "Floor VII — Tide Measure",
  8: "Floor VIII — Undertow Archives",
  9: "Floor IX — Twin Currents",
  10: "Floor X — Sovereign Shore",
  11: "Floor XI — Ascending Steps",
  12: "Floor XII — Catalog Wing",
  13: "Floor XIII — Window Gallery",
  14: "Floor XIV — Structure Vault",
  15: "Floor XV — Apex Seal",
};
