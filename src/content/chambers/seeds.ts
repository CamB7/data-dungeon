/**
 * Server-only chamber datasets. Do not import from client components.
 */
export type ChamberSeed = {
  seedSql: string;
  solutionSql: string;
};

export const CHAMBER_SEEDS: Record<string, ChamberSeed> = {
  "cell-block-zero": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cell TEXT NOT NULL,
        crime TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, cell, crime) VALUES
        (1, 'Mira Quill', 'A-01', 'Forgery'),
        (2, 'Torin Ash', 'B-12', 'Smuggling'),
        (3, 'Lysa Vane', 'A-07', 'Treason'),
        (4, 'Bram Oak', 'C-03', 'Theft');
    `,
    solutionSql: `SELECT * FROM prisoners;`,
  },
  "torchlight-archive": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cell TEXT NOT NULL,
        crime TEXT NOT NULL,
        arrested_on TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, cell, crime, arrested_on) VALUES
        (1, 'Mira Quill', 'A-01', 'Forgery', '1024-03-12'),
        (2, 'Torin Ash', 'B-12', 'Smuggling', '1024-04-01'),
        (3, 'Lysa Vane', 'A-07', 'Treason', '1024-02-20'),
        (4, 'Bram Oak', 'C-03', 'Theft', '1024-05-09');
    `,
    solutionSql: `SELECT name, cell FROM prisoners;`,
  },
  "sorting-pit": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        threat_level INTEGER NOT NULL,
        cell TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, threat_level, cell) VALUES
        (1, 'Mira Quill', 2, 'A-01'),
        (2, 'Torin Ash', 5, 'B-12'),
        (3, 'Lysa Vane', 4, 'A-07'),
        (4, 'Bram Oak', 1, 'C-03');
    `,
    solutionSql: `SELECT name, threat_level FROM prisoners ORDER BY threat_level DESC;`,
  },
  "gate-of-limits": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cell TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, cell) VALUES
        (1, 'Mira Quill', 'A-01'),
        (2, 'Torin Ash', 'B-12'),
        (3, 'Lysa Vane', 'A-07'),
        (4, 'Bram Oak', 'C-03'),
        (5, 'Cade Wren', 'D-02');
    `,
    solutionSql: `SELECT name FROM prisoners ORDER BY name LIMIT 3;`,
  },
  "wardens-filter": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cell TEXT NOT NULL,
        escape_risk INTEGER NOT NULL
      );
      INSERT INTO prisoners (id, name, cell, escape_risk) VALUES
        (1, 'Mira Quill', 'A-01', 0),
        (2, 'Torin Ash', 'B-12', 1),
        (3, 'Lysa Vane', 'A-07', 1),
        (4, 'Bram Oak', 'C-03', 0);
    `,
    solutionSql: `SELECT name, cell FROM prisoners WHERE escape_risk = 1;`,
  },
  "counting-bones": {
    seedSql: `
      CREATE TABLE remains (
        id INTEGER PRIMARY KEY,
        cause TEXT NOT NULL,
        found_on TEXT NOT NULL,
        chamber TEXT NOT NULL
      );
      INSERT INTO remains (id, cause, found_on, chamber) VALUES
        (1, 'Blade', '1023-11-01', 'Ossuary'),
        (2, 'Poison', '1023-11-04', 'Ossuary'),
        (3, 'Fall', '1023-12-12', 'Pit'),
        (4, 'Fire', '1024-01-02', 'Vault'),
        (5, 'Unknown', '1024-01-18', 'Ossuary');
    `,
    solutionSql: `SELECT COUNT(*) AS total FROM remains;`,
  },
  "guild-ledger": {
    seedSql: `
      CREATE TABLE loot (
        id INTEGER PRIMARY KEY,
        item TEXT NOT NULL,
        gold INTEGER NOT NULL,
        guild_name TEXT NOT NULL
      );
      INSERT INTO loot (id, item, gold, guild_name) VALUES
        (1, 'Ruby ring', 40, 'Silent Quill'),
        (2, 'Coin purse', 15, 'Ash Wolves'),
        (3, 'Emerald', 60, 'Silent Quill'),
        (4, 'Silver cup', 25, 'Ash Wolves'),
        (5, 'Crown fragment', 90, 'Iron Veil');
    `,
    solutionSql: `SELECT guild_name, SUM(gold) AS total_gold FROM loot GROUP BY guild_name ORDER BY guild_name;`,
  },
  "two-door-riddle": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE quests (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        xp_reward INTEGER NOT NULL,
        assigned_to INTEGER NOT NULL
      );
      INSERT INTO prisoners (id, name) VALUES
        (1, 'Mira Quill'),
        (2, 'Torin Ash'),
        (3, 'Lysa Vane');
      INSERT INTO quests (id, title, difficulty, xp_reward, assigned_to) VALUES
        (1, 'Map the sewers', 'easy', 20, 1),
        (2, 'Steal the roster', 'hard', 50, 2),
        (3, 'Bribe the guard', 'medium', 35, 1);
    `,
    solutionSql: `
      SELECT prisoners.name, quests.title
      FROM prisoners
      INNER JOIN quests ON quests.assigned_to = prisoners.id
      ORDER BY prisoners.name, quests.title;
    `,
  },
  "left-catacombs": {
    seedSql: `
      CREATE TABLE tombs (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        wing TEXT NOT NULL
      );
      CREATE TABLE burials (
        tomb_id INTEGER NOT NULL,
        prisoner_name TEXT NOT NULL,
        buried_on TEXT NOT NULL
      );
      INSERT INTO tombs (id, name, wing) VALUES
        (1, 'North Crypt', 'A'),
        (2, 'South Crypt', 'B'),
        (3, 'Empty Niche', 'A'),
        (4, 'Warden Vault', 'C');
      INSERT INTO burials (tomb_id, prisoner_name, buried_on) VALUES
        (1, 'Old Ren', '1010-06-01'),
        (2, 'Sera Vale', '1018-09-14'),
        (4, 'Captain Drosk', '1020-01-30');
    `,
    solutionSql: `
      SELECT tombs.name, burials.prisoner_name
      FROM tombs
      LEFT JOIN burials ON burials.tomb_id = tombs.id
      ORDER BY tombs.id;
    `,
  },
  "loot-vault-boss": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        class TEXT NOT NULL
      );
      CREATE TABLE quests (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        assigned_to INTEGER NOT NULL
      );
      CREATE TABLE loot (
        quest_id INTEGER NOT NULL,
        item TEXT NOT NULL,
        gold INTEGER NOT NULL,
        rarity TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, class) VALUES
        (1, 'Mira Quill', 'SQL Ranger'),
        (2, 'Torin Ash', 'Schema Knight'),
        (3, 'Lysa Vane', 'Index Mage');
      INSERT INTO quests (id, title, assigned_to) VALUES
        (1, 'Breach the vault', 1),
        (2, 'Chart the tunnels', 2),
        (3, 'Silence the bells', 3);
      INSERT INTO loot (quest_id, item, gold, rarity) VALUES
        (1, 'Crown of Queries', 500, 'legendary'),
        (1, 'Torch oil', 5, 'common'),
        (2, 'Map of Joins', 120, 'rare'),
        (3, 'Amulet of Aggregates', 350, 'legendary'),
        (2, 'Iron key', 10, 'common');
    `,
    solutionSql: `
      SELECT prisoners.name, quests.title, loot.gold
      FROM prisoners
      INNER JOIN quests ON quests.assigned_to = prisoners.id
      INNER JOIN loot ON loot.quest_id = quests.id
      WHERE loot.rarity = 'legendary'
      ORDER BY loot.gold DESC;
    `,
  },
  "echo-gallery": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        crime TEXT NOT NULL,
        cell TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, crime, cell) VALUES
        (1, 'Mira Quill', 'Forgery', 'A-01'),
        (2, 'Torin Ash', 'Smuggling', 'B-12'),
        (3, 'Lysa Vane', 'Treason', 'A-07'),
        (4, 'Bram Oak', 'Theft', 'C-03'),
        (5, 'Cade Wren', 'Forgery', 'D-02'),
        (6, 'Nyra Flint', 'Smuggling', 'B-04');
    `,
    solutionSql: `SELECT DISTINCT crime FROM prisoners ORDER BY crime;`,
  },
  "tithe-threshold": {
    seedSql: `
      CREATE TABLE loot (
        id INTEGER PRIMARY KEY,
        item TEXT NOT NULL,
        gold INTEGER NOT NULL,
        guild_name TEXT NOT NULL
      );
      INSERT INTO loot (id, item, gold, guild_name) VALUES
        (1, 'Ruby ring', 40, 'Silent Quill'),
        (2, 'Coin purse', 15, 'Ash Wolves'),
        (3, 'Emerald', 25, 'Silent Quill'),
        (4, 'Silver cup', 20, 'Ash Wolves'),
        (5, 'Crown fragment', 90, 'Iron Veil'),
        (6, 'Brass pin', 10, 'Dust Rats'),
        (7, 'Pearl', 30, 'Iron Veil');
    `,
    solutionSql: `
      SELECT guild_name, SUM(gold) AS total_gold
      FROM loot
      GROUP BY guild_name
      HAVING SUM(gold) > 50
      ORDER BY guild_name;
    `,
  },
  "mask-of-roles": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        threat_level INTEGER NOT NULL,
        cell TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, threat_level, cell) VALUES
        (1, 'Mira Quill', 2, 'A-01'),
        (2, 'Torin Ash', 5, 'B-12'),
        (3, 'Lysa Vane', 4, 'A-07'),
        (4, 'Bram Oak', 1, 'C-03'),
        (5, 'Cade Wren', 3, 'D-02');
    `,
    solutionSql: `
      SELECT name, threat_level,
        CASE
          WHEN threat_level >= 4 THEN 'high'
          WHEN threat_level >= 2 THEN 'mid'
          ELSE 'low'
        END AS risk
      FROM prisoners
      ORDER BY name;
    `,
  },
  "hollow-throne-boss": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        class TEXT NOT NULL
      );
      CREATE TABLE keys (
        id INTEGER PRIMARY KEY,
        key_name TEXT NOT NULL,
        holder_id INTEGER NOT NULL
      );
      CREATE TABLE quests (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        xp_reward INTEGER NOT NULL,
        assigned_to INTEGER NOT NULL
      );
      INSERT INTO prisoners (id, name, class) VALUES
        (1, 'Mira Quill', 'SQL Ranger'),
        (2, 'Torin Ash', 'Schema Knight'),
        (3, 'Lysa Vane', 'Index Mage'),
        (4, 'Bram Oak', 'Null Monk');
      INSERT INTO keys (id, key_name, holder_id) VALUES
        (1, 'Ash Key', 1),
        (2, 'Bone Key', 3),
        (3, 'Iron Key', 1);
      INSERT INTO quests (id, title, xp_reward, assigned_to) VALUES
        (1, 'Open the hollow throne', 80, 1),
        (2, 'Map the ash river', 40, 2),
        (3, 'Silence the echo', 65, 3),
        (4, 'Guard the ferry', 30, 4);
    `,
    solutionSql: `
      SELECT prisoners.name, quests.title
      FROM prisoners
      INNER JOIN quests ON quests.assigned_to = prisoners.id
      WHERE prisoners.id IN (SELECT holder_id FROM keys)
      ORDER BY quests.xp_reward DESC, prisoners.name;
    `,
  },
  "forgotten-cells": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cell TEXT NOT NULL,
        crime TEXT
      );
      INSERT INTO prisoners (id, name, cell, crime) VALUES
        (1, 'Mira Quill', 'A-01', 'Forgery'),
        (2, 'Torin Ash', 'B-12', NULL),
        (3, 'Lysa Vane', 'A-07', 'Treason'),
        (4, 'Bram Oak', 'C-03', NULL),
        (5, 'Cade Wren', 'D-02', 'Theft');
    `,
    solutionSql: `
      SELECT name, cell
      FROM prisoners
      WHERE crime IS NULL
      ORDER BY name;
    `,
  },
  "twin-ledgers": {
    seedSql: `
      CREATE TABLE day_roll (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE night_roll (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      INSERT INTO day_roll (id, name) VALUES
        (1, 'Mira Quill'),
        (2, 'Torin Ash'),
        (3, 'Lysa Vane');
      INSERT INTO night_roll (id, name) VALUES
        (1, 'Bram Oak'),
        (2, 'Torin Ash'),
        (3, 'Cade Wren');
    `,
    solutionSql: `
      SELECT name FROM day_roll
      UNION
      SELECT name FROM night_roll
      ORDER BY name;
    `,
  },
  "proof-of-presence": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cell TEXT NOT NULL
      );
      CREATE TABLE torch_log (
        id INTEGER PRIMARY KEY,
        prisoner_id INTEGER NOT NULL,
        seen_on TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, cell) VALUES
        (1, 'Mira Quill', 'A-01'),
        (2, 'Torin Ash', 'B-12'),
        (3, 'Lysa Vane', 'A-07'),
        (4, 'Bram Oak', 'C-03');
      INSERT INTO torch_log (id, prisoner_id, seen_on) VALUES
        (1, 1, '1024-06-01'),
        (2, 1, '1024-06-02'),
        (3, 3, '1024-06-01');
    `,
    solutionSql: `
      SELECT name
      FROM prisoners
      WHERE EXISTS (
        SELECT 1 FROM torch_log
        WHERE torch_log.prisoner_id = prisoners.id
      )
      ORDER BY name;
    `,
  },
  "lockward-seal-boss": {
    seedSql: `
      CREATE TABLE prisoners (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        crime TEXT,
        class TEXT NOT NULL
      );
      CREATE TABLE keys (
        id INTEGER PRIMARY KEY,
        key_name TEXT NOT NULL,
        holder_id INTEGER NOT NULL
      );
      CREATE TABLE loot (
        prisoner_id INTEGER NOT NULL,
        item TEXT NOT NULL,
        gold INTEGER NOT NULL,
        rarity TEXT NOT NULL
      );
      INSERT INTO prisoners (id, name, crime, class) VALUES
        (1, 'Mira Quill', 'Forgery', 'SQL Ranger'),
        (2, 'Torin Ash', NULL, 'Schema Knight'),
        (3, 'Lysa Vane', 'Treason', 'Index Mage'),
        (4, 'Bram Oak', 'Theft', 'Null Monk');
      INSERT INTO keys (id, key_name, holder_id) VALUES
        (1, 'Lockward Key', 1),
        (2, 'Ash Key', 2),
        (3, 'Bone Key', 3);
      INSERT INTO loot (prisoner_id, item, gold, rarity) VALUES
        (1, 'Seal of Queries', 500, 'legendary'),
        (1, 'Torch oil', 5, 'common'),
        (2, 'Map of Nulls', 200, 'legendary'),
        (3, 'Amulet of Exists', 350, 'legendary'),
        (3, 'Iron pin', 8, 'common'),
        (4, 'Crown fragment', 400, 'legendary');
    `,
    solutionSql: `
      SELECT prisoners.name, loot.gold
      FROM prisoners
      INNER JOIN loot ON loot.prisoner_id = prisoners.id
      WHERE loot.rarity = 'legendary'
        AND prisoners.crime IS NOT NULL
        AND EXISTS (
          SELECT 1 FROM keys WHERE keys.holder_id = prisoners.id
        )
      ORDER BY loot.gold DESC;
    `,
  },
  "salt-scripture": {
    seedSql: `
      CREATE TABLE tablets (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        era TEXT NOT NULL
      );
      INSERT INTO tablets (id, title, era) VALUES
        (1, 'Salt Covenant', 'Third Tide'),
        (2, 'Iron Hymn', 'First Tide'),
        (3, 'Brine and Salt Litany', 'Fourth Tide'),
        (4, 'Deep Kelp Map', 'Second Tide'),
        (5, 'Salt of the Sovereign', 'Fifth Tide');
    `,
    solutionSql: `
      SELECT id, title
      FROM tablets
      WHERE title LIKE '%Salt%'
      ORDER BY id;
    `,
  },
  "tide-window": {
    seedSql: `
      CREATE TABLE hauls (
        id INTEGER PRIMARY KEY,
        catch_name TEXT NOT NULL,
        tide_mark INTEGER NOT NULL,
        weight INTEGER NOT NULL
      );
      INSERT INTO hauls (id, catch_name, tide_mark, weight) VALUES
        (1, 'Kelp crab', 2, 4),
        (2, 'Salt bass', 3, 8),
        (3, 'Foam eel', 5, 3),
        (4, 'Deep ray', 7, 12),
        (5, 'Abyss tuna', 9, 20);
    `,
    solutionSql: `
      SELECT catch_name, tide_mark
      FROM hauls
      WHERE tide_mark BETWEEN 3 AND 7
      ORDER BY tide_mark;
    `,
  },
  "brine-and": {
    seedSql: `
      CREATE TABLE relics (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        tide_mark INTEGER NOT NULL,
        value INTEGER NOT NULL
      );
      INSERT INTO relics (id, name, tide_mark, value) VALUES
        (1, 'Salt Coin', 4, 10),
        (2, 'Iron Ring', 5, 8),
        (3, 'Salt Pearl', 8, 20),
        (4, 'Brine Salt Idol', 6, 30),
        (5, 'Salt Flake', 2, 5);
    `,
    solutionSql: `
      SELECT name, tide_mark
      FROM relics
      WHERE name LIKE '%Salt%' AND tide_mark BETWEEN 3 AND 7
      ORDER BY name;
    `,
  },
  "brine-average": {
    seedSql: `
      CREATE TABLE readings (
        id INTEGER PRIMARY KEY,
        pool_name TEXT NOT NULL,
        salinity REAL NOT NULL,
        taken_on TEXT NOT NULL
      );
      INSERT INTO readings (id, pool_name, salinity, taken_on) VALUES
        (1, 'North Pool', 18, '1024-07-01'),
        (2, 'North Pool', 22, '1024-07-02'),
        (3, 'South Pool', 10, '1024-07-01'),
        (4, 'South Pool', 14, '1024-07-02'),
        (5, 'East Pool', 30, '1024-07-01');
    `,
    solutionSql: `
      SELECT pool_name, AVG(salinity) AS avg_salinity
      FROM readings
      GROUP BY pool_name
      ORDER BY pool_name;
    `,
  },
  "depth-marks": {
    seedSql: `
      CREATE TABLE soundings (
        id INTEGER PRIMARY KEY,
        trench_name TEXT NOT NULL,
        depth INTEGER NOT NULL,
        crew TEXT NOT NULL
      );
      INSERT INTO soundings (id, trench_name, depth, crew) VALUES
        (1, 'Black Trench', 40, 'A'),
        (2, 'Black Trench', 55, 'B'),
        (3, 'Silk Cut', 12, 'A'),
        (4, 'Silk Cut', 18, 'C'),
        (5, 'Silk Cut', 9, 'B');
    `,
    solutionSql: `
      SELECT trench_name, MIN(depth) AS min_depth, MAX(depth) AS max_depth
      FROM soundings
      GROUP BY trench_name
      ORDER BY trench_name;
    `,
  },
  "salt-having": {
    seedSql: `
      CREATE TABLE readings (
        id INTEGER PRIMARY KEY,
        pool_name TEXT NOT NULL,
        salinity REAL NOT NULL
      );
      INSERT INTO readings (id, pool_name, salinity) VALUES
        (1, 'North Pool', 18),
        (2, 'North Pool', 22),
        (3, 'South Pool', 10),
        (4, 'South Pool', 14),
        (5, 'East Pool', 30),
        (6, 'East Pool', 26);
    `,
    solutionSql: `
      SELECT pool_name, AVG(salinity) AS avg_salinity
      FROM readings
      GROUP BY pool_name
      HAVING AVG(salinity) > 20
      ORDER BY pool_name;
    `,
  },
  "reef-crossing": {
    seedSql: `
      CREATE TABLE divers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        rank TEXT NOT NULL
      );
      CREATE TABLE routes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        diver_id INTEGER NOT NULL
      );
      CREATE TABLE relics (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        route_id INTEGER NOT NULL
      );
      INSERT INTO divers (id, name, rank) VALUES
        (1, 'Mira Quill', 'Captain'),
        (2, 'Torin Ash', 'Scout');
      INSERT INTO routes (id, title, diver_id) VALUES
        (1, 'Kelp Road', 1),
        (2, 'Foam Cut', 2),
        (3, 'Salt Vein', 1);
      INSERT INTO relics (id, name, route_id) VALUES
        (1, 'Coral Key', 1),
        (2, 'Tide Glass', 2),
        (3, 'Brine Coin', 3);
    `,
    solutionSql: `
      SELECT divers.name AS diver, routes.title, relics.name AS relic
      FROM divers
      INNER JOIN routes ON routes.diver_id = divers.id
      INNER JOIN relics ON relics.route_id = routes.id
      ORDER BY diver, relic;
    `,
  },
  "kelp-clause": {
    seedSql: `
      CREATE TABLE wrecks (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        depth INTEGER NOT NULL,
        hazardous INTEGER NOT NULL
      );
      INSERT INTO wrecks (id, name, depth, hazardous) VALUES
        (1, 'Calm Skiff', 10, 0),
        (2, 'Deep Hulk', 45, 0),
        (3, 'Sharp Reef', 20, 1),
        (4, 'Abyss Galleon', 60, 1),
        (5, 'Shore Dinghy', 5, 0);
    `,
    solutionSql: `
      SELECT name, depth
      FROM wrecks
      WHERE depth >= 40 OR hazardous = 1
      ORDER BY name;
    `,
  },
  "brine-outer": {
    seedSql: `
      CREATE TABLE routes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL
      );
      CREATE TABLE relics (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        route_id INTEGER NOT NULL
      );
      INSERT INTO routes (id, title) VALUES
        (1, 'Kelp Road'),
        (2, 'Foam Cut'),
        (3, 'Empty Drift');
      INSERT INTO relics (id, name, route_id) VALUES
        (1, 'Coral Key', 1),
        (2, 'Tide Glass', 2);
    `,
    solutionSql: `
      SELECT routes.title, relics.name
      FROM routes
      LEFT JOIN relics ON relics.route_id = routes.id
      ORDER BY routes.id;
    `,
  },
  "mirror-tide": {
    seedSql: `
      CREATE TABLE divers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        mentor_id INTEGER
      );
      INSERT INTO divers (id, name, mentor_id) VALUES
        (1, 'Mira Quill', NULL),
        (2, 'Torin Ash', 1),
        (3, 'Lysa Vane', 1),
        (4, 'Bram Oak', 2);
    `,
    solutionSql: `
      SELECT apprentice.name AS apprentice, mentor.name AS mentor
      FROM divers AS apprentice
      INNER JOIN divers AS mentor ON mentor.id = apprentice.mentor_id
      ORDER BY apprentice;
    `,
  },
  "drowned-absence": {
    seedSql: `
      CREATE TABLE divers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        rank TEXT NOT NULL
      );
      CREATE TABLE beacon_log (
        id INTEGER PRIMARY KEY,
        diver_id INTEGER NOT NULL,
        surfaced_on TEXT NOT NULL
      );
      INSERT INTO divers (id, name, rank) VALUES
        (1, 'Mira Quill', 'Captain'),
        (2, 'Torin Ash', 'Scout'),
        (3, 'Lysa Vane', 'Cartographer'),
        (4, 'Bram Oak', 'Diver');
      INSERT INTO beacon_log (id, diver_id, surfaced_on) VALUES
        (1, 1, '1024-08-01'),
        (2, 2, '1024-08-01'),
        (3, 3, '1024-08-02');
    `,
    solutionSql: `
      SELECT name
      FROM divers
      WHERE NOT EXISTS (
        SELECT 1 FROM beacon_log WHERE beacon_log.diver_id = divers.id
      )
      ORDER BY name;
    `,
  },
  "twin-proof": {
    seedSql: `
      CREATE TABLE divers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        mentor_id INTEGER
      );
      CREATE TABLE beacon_log (
        id INTEGER PRIMARY KEY,
        diver_id INTEGER NOT NULL,
        surfaced_on TEXT NOT NULL
      );
      INSERT INTO divers (id, name, mentor_id) VALUES
        (1, 'Mira Quill', NULL),
        (2, 'Torin Ash', 1),
        (3, 'Lysa Vane', 1),
        (4, 'Bram Oak', 2),
        (5, 'Cora Drift', 1);
      INSERT INTO beacon_log (id, diver_id, surfaced_on) VALUES
        (1, 2, '1024-08-01'),
        (2, 3, '1024-08-02'),
        (3, 5, '1024-08-03');
    `,
    solutionSql: `
      SELECT apprentice.name
      FROM divers AS apprentice
      INNER JOIN divers AS mentor ON mentor.id = apprentice.mentor_id
      WHERE EXISTS (
        SELECT 1 FROM beacon_log WHERE beacon_log.diver_id = apprentice.id
      )
      ORDER BY apprentice.name;
    `,
  },
  "foam-prelude": {
    seedSql: `
      CREATE TABLE relics (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        value INTEGER NOT NULL,
        rarity TEXT NOT NULL
      );
      INSERT INTO relics (id, name, value, rarity) VALUES
        (1, 'Salt Crown', 100, 'legendary'),
        (2, 'Salt Flake', 5, 'common'),
        (3, 'Iron Salt Idol', 80, 'legendary'),
        (4, 'Foam Pearl', 60, 'legendary'),
        (5, 'Salt Key', 40, 'rare');
    `,
    solutionSql: `
      SELECT name, value
      FROM relics
      WHERE rarity = 'legendary' AND name LIKE '%Salt%'
      ORDER BY value DESC;
    `,
  },
  "salt-sovereign-boss": {
    seedSql: `
      CREATE TABLE divers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        rank TEXT NOT NULL
      );
      CREATE TABLE beacon_log (
        id INTEGER PRIMARY KEY,
        diver_id INTEGER NOT NULL,
        surfaced_on TEXT NOT NULL
      );
      CREATE TABLE hauls (
        id INTEGER PRIMARY KEY,
        diver_id INTEGER NOT NULL,
        item TEXT NOT NULL,
        gold INTEGER NOT NULL
      );
      INSERT INTO divers (id, name, rank) VALUES
        (1, 'Mira Quill', 'Captain'),
        (2, 'Torin Ash', 'Scout'),
        (3, 'Lysa Vane', 'Cartographer'),
        (4, 'Bram Oak', 'Diver');
      INSERT INTO beacon_log (id, diver_id, surfaced_on) VALUES
        (1, 1, '1024-08-01'),
        (2, 2, '1024-08-01'),
        (3, 3, '1024-08-02');
      INSERT INTO hauls (id, diver_id, item, gold) VALUES
        (1, 1, 'Brine Crown', 40),
        (2, 1, 'Salt coins', 30),
        (3, 2, 'Foam scrap', 20),
        (4, 3, 'Coral Key', 35),
        (5, 3, 'Tide Glass', 25),
        (6, 4, 'Abyss pearl', 100);
    `,
    solutionSql: `
      SELECT divers.name, SUM(hauls.gold) AS total_gold
      FROM divers
      INNER JOIN hauls ON hauls.diver_id = divers.id
      WHERE EXISTS (
        SELECT 1 FROM beacon_log WHERE beacon_log.diver_id = divers.id
      )
      GROUP BY divers.id, divers.name
      HAVING SUM(hauls.gold) > 50
      ORDER BY total_gold DESC;
    `,
  },
  "offset-steps": {
    seedSql: `
      CREATE TABLE scholars (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        climb_rank INTEGER NOT NULL
      );
      INSERT INTO scholars (id, name, climb_rank) VALUES
        (1, 'Ada Index', 1),
        (2, 'Bram Stack', 2),
        (3, 'Cora Page', 3),
        (4, 'Dane Leaf', 4),
        (5, 'Elia Root', 5),
        (6, 'Finn Node', 6);
    `,
    solutionSql: `
      SELECT name
      FROM scholars
      ORDER BY climb_rank
      LIMIT 3 OFFSET 2;
    `,
  },
  "indexed-shelves": {
    seedSql: `
      CREATE TABLE shelves (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        wing TEXT NOT NULL
      );
      INSERT INTO shelves (id, label, wing) VALUES
        (1, 'Dust Bin', 'South'),
        (2, 'Prime Ledger', 'North'),
        (3, 'Spare Rack', 'East'),
        (4, 'Key Index', 'North'),
        (5, 'Lost Folio', 'West'),
        (7, 'Seal Cabinet', 'North');
    `,
    solutionSql: `
      SELECT id, label
      FROM shelves
      WHERE id IN (2, 4, 7)
      ORDER BY id;
    `,
  },
  "page-index": {
    seedSql: `
      CREATE TABLE shelves (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        wing TEXT NOT NULL
      );
      INSERT INTO shelves (id, label, wing) VALUES
        (1, 'Alpha', 'North'),
        (2, 'Beta', 'North'),
        (3, 'Gamma', 'East'),
        (4, 'Delta', 'East'),
        (5, 'Epsilon', 'West'),
        (6, 'Zeta', 'West');
    `,
    solutionSql: `
      SELECT id, label
      FROM shelves
      WHERE id IN (1, 2, 3, 4, 5)
      ORDER BY id
      LIMIT 2 OFFSET 2;
    `,
  },
  "coalesce-plaque": {
    seedSql: `
      CREATE TABLE plaques (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT
      );
      INSERT INTO plaques (id, title, subtitle) VALUES
        (1, 'First Index', 'Origin'),
        (2, 'Second Index', NULL),
        (3, 'Third Index', 'Revision'),
        (4, 'Fourth Index', NULL);
    `,
    solutionSql: `
      SELECT title, COALESCE(subtitle, 'Blank') AS subtitle
      FROM plaques
      ORDER BY id;
    `,
  },
  "cast-height": {
    seedSql: `
      CREATE TABLE steps (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        height_text TEXT NOT NULL
      );
      INSERT INTO steps (id, label, height_text) VALUES
        (1, 'Low Sill', '4'),
        (2, 'Mid Span', '12'),
        (3, 'High Arch', '20'),
        (4, 'Needle Tip', '9');
    `,
    solutionSql: `
      SELECT label, CAST(height_text AS INTEGER) AS height
      FROM steps
      ORDER BY height DESC;
    `,
  },
  "coalesce-cast": {
    seedSql: `
      CREATE TABLE spans (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        height_text TEXT
      );
      INSERT INTO spans (id, label, height_text) VALUES
        (1, 'Low Bridge', '4'),
        (2, 'Broken Span', NULL),
        (3, 'High Arch', '20'),
        (4, 'Mid Walk', '9');
    `,
    solutionSql: `
      SELECT label, CAST(COALESCE(height_text, '0') AS INTEGER) AS height
      FROM spans
      ORDER BY height DESC;
    `,
  },
  "row-number-spire": {
    seedSql: `
      CREATE TABLE climbers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
      );
      INSERT INTO climbers (id, name, score) VALUES
        (1, 'Nia Vault', 40),
        (2, 'Orr Spire', 90),
        (3, 'Pia Rank', 70),
        (4, 'Quin Leaf', 55);
    `,
    solutionSql: `
      SELECT name, ROW_NUMBER() OVER (ORDER BY score DESC) AS rung
      FROM climbers
      ORDER BY rung;
    `,
  },
  "partition-peak": {
    seedSql: `
      CREATE TABLE bells (
        id INTEGER PRIMARY KEY,
        wing TEXT NOT NULL,
        note TEXT NOT NULL,
        volume INTEGER NOT NULL
      );
      INSERT INTO bells (id, wing, note, volume) VALUES
        (1, 'North', 'A', 10),
        (2, 'North', 'C', 15),
        (3, 'South', 'B', 8),
        (4, 'South', 'D', 12),
        (5, 'North', 'E', 5);
    `,
    solutionSql: `
      SELECT wing, note, SUM(volume) OVER (PARTITION BY wing) AS wing_total
      FROM bells
      ORDER BY wing, note;
    `,
  },
  "ranked-filter": {
    seedSql: `
      CREATE TABLE climbers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
      );
      INSERT INTO climbers (id, name, score) VALUES
        (1, 'Nia Vault', 40),
        (2, 'Orr Spire', 90),
        (3, 'Pia Rank', 70),
        (4, 'Quin Leaf', 55),
        (5, 'Rae Mid', 60);
    `,
    solutionSql: `
      SELECT name, score, RANK() OVER (ORDER BY score DESC) AS place
      FROM climbers
      WHERE score > (SELECT AVG(score) FROM climbers)
      ORDER BY place;
    `,
  },
  "round-tower": {
    seedSql: `
      CREATE TABLE gauges (
        id INTEGER PRIMARY KEY,
        tier TEXT NOT NULL,
        reading REAL NOT NULL
      );
      INSERT INTO gauges (id, tier, reading) VALUES
        (1, 'Base', 10.0),
        (2, 'Base', 12.0),
        (3, 'Mid', 7.4),
        (4, 'Mid', 8.0),
        (5, 'Apex', 15.1),
        (6, 'Apex', 14.9);
    `,
    solutionSql: `
      SELECT tier, ROUND(AVG(reading), 1) AS avg_reading
      FROM gauges
      GROUP BY tier
      ORDER BY tier;
    `,
  },
  "cross-index": {
    seedSql: `
      CREATE TABLE shelves (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        wing TEXT NOT NULL
      );
      CREATE TABLE tomes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        shelf_id INTEGER NOT NULL
      );
      INSERT INTO shelves (id, label, wing) VALUES
        (1, 'North A', 'North'),
        (2, 'South A', 'South'),
        (3, 'East A', 'East'),
        (4, 'West A', 'West');
      INSERT INTO tomes (id, title, shelf_id) VALUES
        (1, 'Index Primer', 1),
        (2, 'Salt Annals', 2),
        (3, 'Spire Codex', 3),
        (4, 'Ash Hymnal', 4),
        (5, 'East Folio', 3);
    `,
    solutionSql: `
      SELECT tomes.title, shelves.label
      FROM tomes
      INNER JOIN shelves ON shelves.id = tomes.shelf_id
      WHERE shelves.wing IN ('North', 'East')
      ORDER BY tomes.title;
    `,
  },
  "window-join": {
    seedSql: `
      CREATE TABLE floors (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE climbers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        score INTEGER NOT NULL,
        floor_id INTEGER NOT NULL
      );
      INSERT INTO floors (id, name) VALUES
        (1, 'Ascending Steps'),
        (2, 'Catalog Wing');
      INSERT INTO climbers (id, name, score, floor_id) VALUES
        (1, 'Wren Peak', 80, 1),
        (2, 'Yara Mid', 50, 2),
        (3, 'Brynn High', 70, 2),
        (4, 'Zed Low', 40, 1);
    `,
    solutionSql: `
      SELECT climbers.name, floors.name AS floor_name,
        ROW_NUMBER() OVER (ORDER BY climbers.score DESC) AS rung
      FROM climbers
      INNER JOIN floors ON floors.id = climbers.floor_id
      ORDER BY rung;
    `,
  },
  "apex-prelude": {
    seedSql: `
      CREATE TABLE aspirants (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT,
        rank_code TEXT NOT NULL
      );
      INSERT INTO aspirants (id, name, title, rank_code) VALUES
        (1, 'Rhea Index', 'Scribe', 'A'),
        (2, 'Silas Null', NULL, 'B'),
        (3, 'Tess Void', 'Keeper', 'C'),
        (4, 'Ula Rank', NULL, 'A'),
        (5, 'Vera Soft', 'Page', 'B');
    `,
    solutionSql: `
      SELECT name, COALESCE(title, 'Acolyte') AS title
      FROM aspirants
      WHERE rank_code IN ('A', 'B')
      ORDER BY name
      LIMIT 3 OFFSET 1;
    `,
  },
  "index-archon": {
    seedSql: `
      CREATE TABLE floors (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        sealed INTEGER NOT NULL
      );
      CREATE TABLE climbers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        score INTEGER NOT NULL,
        floor_id INTEGER NOT NULL
      );
      INSERT INTO floors (id, name, sealed) VALUES
        (1, 'Ascending Steps', 0),
        (2, 'Catalog Wing', 0),
        (3, 'Sealed Crypt', 1);
      INSERT INTO climbers (id, name, score, floor_id) VALUES
        (1, 'Wren Peak', 80, 1),
        (2, 'Yara Mid', 50, 2),
        (3, 'Zed Low', 40, 1),
        (4, 'Axel Sealed', 95, 3),
        (5, 'Brynn High', 70, 2);
    `,
    solutionSql: `
      SELECT climbers.name, floors.name AS floor_name, climbers.score,
        RANK() OVER (ORDER BY climbers.score DESC) AS place
      FROM climbers
      INNER JOIN floors ON floors.id = climbers.floor_id
      WHERE floors.sealed = 0
        AND climbers.score > (SELECT AVG(score) FROM climbers)
      ORDER BY place;
    `,
  },
};

export function getChamberSeed(slug: string): ChamberSeed | undefined {
  return CHAMBER_SEEDS[slug];
}
