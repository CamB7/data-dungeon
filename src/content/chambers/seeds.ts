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
};

export function getChamberSeed(slug: string): ChamberSeed | undefined {
  return CHAMBER_SEEDS[slug];
}
