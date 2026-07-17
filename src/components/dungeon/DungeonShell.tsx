import Link from "next/link";

type DungeonShellProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function DungeonShell({
  children,
  backHref = "/dungeon",
  backLabel = "← Track map",
}: DungeonShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-900 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-dungeon" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-moss/15 blur-[100px] animate-torch-pulse" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.2em] text-moss uppercase transition hover:text-moss/80"
        >
          Data Dungeon
        </Link>
        <nav className="flex items-center gap-4 text-sm text-stone-300">
          <Link href="/dungeon" className="transition hover:text-torch">
            Track map
          </Link>
          <Link
            href="/auth"
            className="rounded-full border border-moss/40 px-4 py-2 text-moss transition hover:border-moss hover:bg-moss/10"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-2 sm:px-8">
        {backHref ? (
          <Link
            href={backHref}
            className="mb-6 inline-block text-sm text-stone-400 transition hover:text-torch"
          >
            {backLabel}
          </Link>
        ) : null}
        {children}
      </main>
    </div>
  );
}
