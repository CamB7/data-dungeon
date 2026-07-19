import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback — Data Dungeon",
  description: "Send product feedback. Saved to Neon and pinged to Slack.",
};

export default function FeedbackPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-900 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-dungeon" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.2em] text-moss uppercase transition hover:text-moss/80"
        >
          Data Dungeon
        </Link>
        <Link href="/dungeon" className="text-sm text-stone-300 transition hover:text-torch">
          Track map
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-lg px-6 pb-20 pt-8">
        <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
          Team channel
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-wide text-foreground">
          Feedback
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-300">
          Tell us what broke, what clicked, or what the Warden should teach next. Each submit
          lands in Neon and fires a Slack notification.
        </p>
        <div className="mt-8 rounded-2xl border border-moss/25 bg-stone-950/90 p-6 sm:p-8">
          <FeedbackForm />
        </div>
      </main>
    </div>
  );
}
