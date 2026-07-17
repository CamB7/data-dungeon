import { eq } from "drizzle-orm";
import { chamberCompletions, users } from "../../db/schema";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth/server";
import { emptyProgress, type PlayerProgress } from "@/lib/progress";
import { DUNGEON_TRACK, getChamberBySlug } from "@/content/chambers";

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const { data: session } = await auth.getSession();
  const user = session?.user;
  if (!user?.id || !user.email) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    image: user.image ?? null,
  };
}

/** Ensure a public.users row exists (Neon Auth sync may already have created it). */
export async function ensureUserRow(sessionUser: SessionUser) {
  const db = getDb();
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionUser.id))
    .limit(1);

  if (existing[0]) return existing[0];

  const baseName =
    sessionUser.name?.trim() ||
    sessionUser.email.split("@")[0] ||
    "adventurer";
  const displayName = `${baseName}-${sessionUser.id.slice(0, 6)}`;

  try {
    const [created] = await db
      .insert(users)
      .values({
        id: sessionUser.id,
        email: sessionUser.email,
        displayName,
        image: sessionUser.image ?? null,
      })
      .returning();
    return created;
  } catch {
    const again = await db
      .select()
      .from(users)
      .where(eq(users.id, sessionUser.id))
      .limit(1);
    return again[0] ?? null;
  }
}

export async function loadDbProgress(userId: string): Promise<PlayerProgress> {
  const db = getDb();
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const completions = await db
    .select()
    .from(chamberCompletions)
    .where(eq(chamberCompletions.userId, userId));

  const progress = emptyProgress();
  progress.cleared = completions.map((c) => c.chamberSlug);
  progress.xp = user?.xp ?? 0;
  progress.weakSkills = (user?.weakSkills as Record<string, number>) ?? {};
  return progress;
}

export async function recordDbAttempt(input: {
  userId: string;
  slug: string;
  passed: boolean;
  skills: string[];
  xp: number;
}): Promise<PlayerProgress> {
  const db = getDb();
  const current = await loadDbProgress(input.userId);
  const weakSkills = { ...current.weakSkills };

  if (!input.passed) {
    for (const skill of input.skills) {
      if (skill === "boss") continue;
      weakSkills[skill] = (weakSkills[skill] ?? 0) + 1;
    }
  } else {
    for (const skill of input.skills) {
      if (weakSkills[skill]) {
        weakSkills[skill] = Math.max(0, weakSkills[skill] - 1);
      }
    }
  }

  const alreadyCleared = current.cleared.includes(input.slug);
  let xp = current.xp;
  const cleared = [...current.cleared];

  if (input.passed && !alreadyCleared) {
    const chamber = getChamberBySlug(input.slug);
    const xpAwarded =
      input.slug === "weekly-raid"
        ? input.xp
        : (chamber?.xp ?? input.xp);

    await db
      .insert(chamberCompletions)
      .values({
        userId: input.userId,
        chamberSlug: input.slug,
        xpAwarded,
      })
      .onConflictDoNothing();

    xp += xpAwarded;
    cleared.push(input.slug);
  }

  const trackCleared = cleared.filter((s) => s !== "weekly-raid").length;
  const level = Math.max(1, trackCleared + 1);

  await db
    .update(users)
    .set({
      xp,
      level,
      weakSkills,
      updatedAt: new Date(),
    })
    .where(eq(users.id, input.userId));

  return {
    ...current,
    cleared,
    xp,
    weakSkills,
    attempts: [
      ...current.attempts,
      {
        slug: input.slug,
        passed: input.passed,
        at: Date.now(),
        skills: input.skills,
      },
    ].slice(-200),
  };
}

export function highestClearedChamberId(clearedSlugs: string[]): number {
  let max = 0;
  for (const slug of clearedSlugs) {
    const chamber = DUNGEON_TRACK.find((c) => c.slug === slug);
    if (chamber && chamber.id > max) max = chamber.id;
  }
  return max;
}
