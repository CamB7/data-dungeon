import Link from "next/link";

const SAMPLE_QUERY = `SELECT hero.name, quest.title, loot.gold
FROM adventurers AS hero
JOIN quests AS quest
  ON quest.assigned_to = hero.id
JOIN chests AS loot
  ON loot.quest_id = quest.id
WHERE hero.class = 'SQL Ranger'
  AND loot.rarity = 'legendary'
ORDER BY loot.gold DESC;`;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-900 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-dungeon" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-moss/20 blur-[100px] animate-torch-pulse" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-moss uppercase">
          Data Dungeon
        </span>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm text-stone-300">
          <Link href="/dungeon" className="transition hover:text-torch">
            Dungeon track
          </Link>
          <a href="#how-it-works" className="transition hover:text-torch">
            How it works
          </a>
          <Link
            href="/auth"
            className="rounded-full border border-moss/40 px-4 py-2 text-moss transition hover:border-moss hover:bg-moss/10"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <main>
        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-6xl flex-col justify-center gap-12 px-6 pb-16 pt-8 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1">
            <p className="animate-fade-up font-mono text-xs tracking-[0.25em] text-torch uppercase">
              Gamified SQL training
            </p>
            <h1 className="animate-fade-up-delay mt-4 font-display text-5xl font-black leading-[0.95] tracking-wide text-balance sm:text-6xl md:text-7xl">
              <span className="block text-moss">DATA</span>
              <span className="block text-foreground">DUNGEON</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-md text-lg font-light leading-relaxed text-stone-300">
              Descend into query chambers, battle broken schemas, and loot real SQL skills.
            </p>
            <div id="enter" className="animate-fade-up-delay-2 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/dungeon/chamber/cell-block-zero"
                className="inline-flex items-center justify-center rounded-full bg-moss px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-950 transition hover:bg-moss/90"
              >
                Start your first quest
              </Link>
              <Link
                href="/dungeon"
                className="inline-flex items-center justify-center rounded-full border border-stone-500/50 px-7 py-3.5 text-sm font-medium text-stone-300 transition hover:border-torch/60 hover:text-torch"
              >
                Peek the map
              </Link>
            </div>
          </div>

          <div className="animate-fade-up-delay relative flex-1 lg:max-w-xl">
            <div className="absolute -inset-6 rounded-[2rem] bg-moss-deep/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-moss/25 bg-stone-950/90 shadow-[0_0_60px_rgba(93,255,177,0.08)]">
              <div className="flex items-center gap-2 border-b border-stone-700/80 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-torch-dim" />
                <span className="h-2.5 w-2.5 rounded-full bg-moss-soft" />
                <span className="h-2.5 w-2.5 rounded-full bg-stone-500" />
                <span className="ml-3 font-mono text-[11px] tracking-wider text-stone-500">
                  chamber_01.sql
                </span>
              </div>
              <div className="relative h-64 overflow-hidden sm:h-72">
                <pre className="animate-query-scroll whitespace-pre-wrap p-5 font-mono text-[13px] leading-6 text-moss/90 sm:text-sm">
                  {`${SAMPLE_QUERY}\n\n${SAMPLE_QUERY}`}
                </pre>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-950 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="relative z-10 border-t border-stone-700/60 bg-stone-950/50"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <h2 className="font-display text-3xl font-bold tracking-wide text-torch sm:text-4xl">
              How the dungeon works
            </h2>
            <p className="mt-4 max-w-2xl text-stone-300">
              Clear chambers by writing SQL that returns the right result set. Fail a query, learn
              from the hint, try again — same loop as a good RPG, but the loot is query fluency.
            </p>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Pick a chamber",
                  body: "Each level is a scenario with tables, a goal, and a boss query waiting.",
                },
                {
                  step: "02",
                  title: "Write the query",
                  body: "SELECTs, JOINs, and aggregations land blows. Wrong rows cost a retry.",
                },
                {
                  step: "03",
                  title: "Claim the loot",
                  body: "Unlock the next floor, keep your streak, and stack real SQL intuition.",
                },
              ].map((item) => (
                <li key={item.step} className="border-l border-moss/30 pl-5">
                  <span className="font-mono text-xs tracking-[0.2em] text-moss">{item.step}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-stone-700/60 px-6 py-8 text-center font-mono text-xs tracking-wider text-stone-500 sm:px-8">
        Data Dungeon · Learn SQL by adventure
      </footer>
    </div>
  );
}
