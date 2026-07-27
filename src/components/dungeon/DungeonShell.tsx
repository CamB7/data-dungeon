import Link from "next/link";
import { AuthStatusLink } from "@/components/AuthStatusLink";
import {
  isBossTheme,
  shellTokens,
  type ShellVariant,
} from "@/lib/theme";

type DungeonShellProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  /** Atmosphere per section / boss variant. */
  variant?: ShellVariant;
};

export function DungeonShell({
  children,
  backHref = "/dungeon",
  backLabel = "← Sections",
  variant = "lockward",
}: DungeonShellProps) {
  const boss = isBossTheme(variant);
  const t = shellTokens(variant);
  const saltBoss = variant === "salt-boss";

  return (
    <div className={`relative min-h-screen overflow-x-hidden text-foreground ${t.bg}`}>
      <div className={`pointer-events-none absolute inset-0 ${t.wash}`} />
      <div
        className={`pointer-events-none absolute inset-0 ${t.grid} ${t.gridOpacity}`}
      />

      {/* Soft atmosphere orbs — never on boss chambers (bosses use emblems instead) */}
      {!boss ? (
        <>
          <div
            className={`pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[100px] ${t.orb}`}
          />
          {t.secondaryOrb ? (
            <div
              className={`pointer-events-none absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full blur-[100px] ${t.secondaryOrb}`}
              aria-hidden
            />
          ) : null}
        </>
      ) : saltBoss ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-abyss via-abyss/85 to-transparent"
          aria-hidden
        />
      ) : null}

      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-5 sm:px-8 sm:py-6">
        <Link
          href="/"
          className={`font-display text-sm font-bold tracking-[0.15em] uppercase transition sm:tracking-[0.2em] ${t.brand}`}
        >
          Data Dungeon
        </Link>
        <nav
          className={`flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm sm:gap-x-4 ${t.navMuted}`}
        >
          <Link
            href="/dungeon"
            className={`inline-flex min-h-11 items-center px-1 transition sm:min-h-0 sm:px-0 sm:py-0 ${t.accentHover}`}
          >
            Sections
          </Link>
          <Link
            href="/dungeon/chart"
            className={`inline-flex min-h-11 items-center px-1 transition sm:min-h-0 sm:px-0 sm:py-0 ${t.accentHover}`}
          >
            Chart
          </Link>
          <Link
            href="/feedback"
            className={`hidden min-h-11 items-center px-1 transition sm:inline-flex sm:min-h-0 sm:px-0 sm:py-0 ${t.accentHover}`}
          >
            Feedback
          </Link>
          <AuthStatusLink variant={variant} />
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-2 sm:px-8">
        {backHref ? (
          <Link
            href={backHref}
            className={`mb-6 inline-block max-w-full truncate text-sm transition sm:max-w-none ${t.backLink}`}
          >
            {backLabel}
          </Link>
        ) : null}
        {children}
      </main>
    </div>
  );
}
