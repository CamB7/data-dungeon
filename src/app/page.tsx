import Link from "next/link";
import { HomeHeroCtas } from "@/components/HomeHeroCtas";
import { HomeNav } from "@/components/HomeNav";
import { SqlTypewriter } from "@/components/SqlTypewriter";

const DEMO_VIDEO_URL =
  process.env.NEXT_PUBLIC_DEMO_VIDEO_URL?.trim() || "";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-900 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-dungeon" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-40" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-moss uppercase">
          Data Dungeon
        </span>
        <HomeNav />
      </header>

      <main>
        {/* Hero — brand + typewriter query panel */}
        <section className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden px-6 pb-16 pt-10 sm:px-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_40%,rgba(168,201,160,0.18),transparent_55%),radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(226,181,107,0.14),transparent_50%)]"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay bg-grid bg-grid" />

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <p className="animate-fade-up font-display text-4xl font-black tracking-[0.12em] text-moss uppercase sm:text-5xl md:text-6xl">
                Data Dungeon
              </p>
              <h1 className="animate-fade-up-delay mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-wide text-foreground sm:text-4xl md:text-5xl">
                Learn SQL by clearing chambers — not copying answers.
              </h1>
              <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-lg font-light leading-relaxed text-stone-300">
                Write real queries, climb three live sections, and get an AI Warden
                to seal every clear before it counts.
              </p>
              <HomeHeroCtas />
            </div>

            <div className="animate-fade-up-delay relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-6 rounded-[2rem] bg-moss-deep/40 blur-2xl" />
              <div className="relative">
                <SqlTypewriter />
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section
          id="problem"
          className="relative z-10 border-t border-stone-700/60 bg-stone-950/60"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">
              The problem
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
              Tutorials dump answers. You never build judgment.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-stone-300">
              Most SQL courses end at “here’s the solution.” Data Dungeon makes the AI Warden
              mandatory on the critical path: a correct result set still needs a live seal before
              Neon records your clear. Remove the model and progression stops.
            </p>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className="relative z-10 border-t border-stone-700/60">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <p className="font-mono text-xs tracking-[0.25em] text-torch uppercase">Demo</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
              Thirty seconds in the dungeon
            </h2>
            <p className="mt-4 max-w-xl text-stone-300">
              Sign in, run a chamber query, claim loot with the Warden seal, watch Slack ping on clear.
            </p>
            <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-moss/20 bg-stone-950">
              {DEMO_VIDEO_URL ? (
                <iframe
                  src={DEMO_VIDEO_URL}
                  title="Data Dungeon demo"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <p className="font-mono text-xs tracking-wider text-stone-500 uppercase">
                    Demo video
                  </p>
                  <p className="max-w-md text-sm text-stone-400">
                    Add{" "}
                    <code className="text-moss">NEXT_PUBLIC_DEMO_VIDEO_URL</code> (YouTube/Loom
                    embed) to show your walkthrough here. Until then:{" "}
                    <Link href="/dungeon" className="text-torch underline">
                      open the live dungeon
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sign up */}
        <section
          id="signup"
          className="relative z-10 border-t border-stone-700/60 bg-stone-950/50"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <p className="font-mono text-xs tracking-[0.25em] text-moss uppercase">
              Create your adventurer
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
              Sign up and keep your progress
            </h2>
            <p className="mt-4 max-w-xl text-stone-300">
              Create an account with email or Google.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/auth"
                className="inline-flex rounded-full bg-moss px-8 py-3.5 text-sm font-semibold text-stone-950 transition hover:bg-moss/90"
              >
                Sign up
              </Link>
              <Link
                href="/feedback"
                className="inline-flex rounded-full border border-stone-500/50 px-8 py-3.5 text-sm text-stone-300 transition hover:border-torch/60 hover:text-torch"
              >
                Send feedback
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-stone-700/60 px-6 py-8 text-center font-mono text-xs tracking-wider text-stone-500 sm:px-8">
        Data Dungeon · Neon · Gemini · Vercel
      </footer>
    </div>
  );
}
