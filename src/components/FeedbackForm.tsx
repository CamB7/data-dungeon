"use client";

import { useState } from "react";
import Link from "next/link";

export function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Could not send feedback.");
        return;
      }
      setStatus("ok");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Network error.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-moss/30 bg-moss/5 p-8 text-center">
        <p className="font-display text-2xl text-foreground">Message sealed</p>
        <p className="mt-2 text-sm text-stone-300">
          Saved to Neon and pinged the team on Slack.
        </p>
        <Link
          href="/dungeon"
          className="mt-6 inline-block text-sm text-moss transition hover:text-torch"
        >
          Back to the dungeon →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="feedback-email"
          className="mb-1.5 block text-xs font-medium tracking-wide text-stone-300"
        >
          Email (optional)
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-sm outline-none focus:border-moss/50"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="feedback-message"
          className="mb-1.5 block text-xs font-medium tracking-wide text-stone-300"
        >
          Feedback
        </label>
        <textarea
          id="feedback-message"
          required
          rows={6}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-sm outline-none focus:border-moss/50"
          placeholder="What should we improve?"
        />
      </div>
      {error ? <p className="text-sm text-torch">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending" || !message.trim()}
        className="w-full rounded-full bg-moss px-6 py-3.5 text-sm font-semibold text-stone-950 transition hover:bg-moss/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
