import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Core player profile. Auth provider IDs can plug into `id` later
 * (Clerk, Neon Auth, etc.) without reshaping the table.
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  image: text("image"),
  /** Total XP earned from cleared chambers. */
  xp: integer("xp").notNull().default(0),
  /** Adventurer rank (1 + chambers cleared). */
  level: integer("level").notNull().default(1),
  /** Skill miss counts for adaptive recommendations. */
  weakSkills: jsonb("weak_skills")
    .$type<Record<string, number>>()
    .notNull()
    .default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const chamberCompletions = pgTable(
  "chamber_completions",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    chamberSlug: text("chamber_slug").notNull(),
    xpAwarded: integer("xp_awarded").notNull().default(0),
    /** AI Warden seal — required on claim (critical path). See prompts/warden-seal.md */
    wardenSeal: text("warden_seal"),
    completedAt: timestamp("completed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.chamberSlug] }),
  }),
);

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  email: text("email"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ChamberCompletion = typeof chamberCompletions.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
