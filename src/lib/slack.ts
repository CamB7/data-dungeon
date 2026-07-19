/**
 * Slack incoming webhook helper.
 * Set SLACK_WEBHOOK_URL in env. No-ops with a console warn if unset (so local/dev still works).
 */
export async function notifySlack(text: string, blocks?: unknown[]): Promise<boolean> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.warn("[slack] SLACK_WEBHOOK_URL not set — skipping notify");
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        ...(blocks ? { blocks } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[slack] webhook failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[slack] webhook error", err);
    return false;
  }
}
