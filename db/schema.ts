import {
  integer,
  pgTable,
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
  displayName: text("display_name").notNull().unique(),
  image: text("image"),
  /** XP toward the next SQL rank. */
  xp: integer("xp").notNull().default(0),
  /** Highest chamber / quest floor cleared. */
  level: integer("level").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
