import { NextResponse } from "next/server";
import { feedback } from "../../../../db/schema";
import { getDb } from "@/lib/db";
import { ensureUserRow, getSessionUser } from "@/lib/progress-server";
import { notifySlack } from "@/lib/slack";

export const runtime = "nodejs";

const MAX_MESSAGE = 2000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const message =
    body && typeof body === "object" && "message" in body
      ? String((body as { message: unknown }).message).trim()
      : "";
  const emailRaw =
    body && typeof body === "object" && "email" in body
      ? String((body as { email: unknown }).email).trim()
      : "";

  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Message required (1–${MAX_MESSAGE} chars).` },
      { status: 400 },
    );
  }

  const sessionUser = await getSessionUser();
  if (sessionUser) {
    await ensureUserRow(sessionUser);
  }

  const email = emailRaw || sessionUser?.email || null;

  const db = getDb();
  const [row] = await db
    .insert(feedback)
    .values({
      userId: sessionUser?.id ?? null,
      email,
      message,
    })
    .returning();

  await notifySlack(
    `💬 *Feedback* from ${email ?? "anonymous"}${sessionUser ? ` (\`${sessionUser.id.slice(0, 8)}\`)` : ""}\n>${message.slice(0, 500).replace(/\n/g, " ")}`,
  );

  return NextResponse.json({ ok: true, id: row.id });
}
