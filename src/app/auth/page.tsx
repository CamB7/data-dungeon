import Link from "next/link";
import type { Metadata } from "next";
import { AuthPanel } from "@/components/AuthPanel";

export const metadata: Metadata = {
  title: "Sign in — Data Dungeon",
  description: "Sign in or create your Data Dungeon adventurer account.",
};

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-900 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-dungeon" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-moss/15 blur-[90px] animate-torch-pulse" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-5 sm:px-8 sm:py-6">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.15em] text-moss uppercase transition hover:text-moss/80 sm:tracking-[0.2em]"
        >
          Data Dungeon
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm text-stone-300 transition hover:text-torch sm:min-h-0"
        >
          ← Back
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 pb-16 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-moss/25 bg-stone-950/90 p-6 shadow-[0_0_60px_rgba(168,201,160,0.08)] sm:p-10">
            <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
              Enter the dungeon
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
              Sign in / Sign up
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-300">
              Create an adventurer with email, or continue with Google. Same door either way.
            </p>

            <div className="mt-8">
              <AuthPanel />
            </div>

            <p className="mt-6 text-center font-mono text-[11px] tracking-wide text-stone-500">
              Progress saves to your adventurer profile
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
