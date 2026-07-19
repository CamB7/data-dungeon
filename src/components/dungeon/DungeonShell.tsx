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

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <Link
          href="/"
          className={`font-display text-sm font-bold tracking-[0.2em] uppercase transition ${t.brand}`}
        >
          Data Dungeon
        </Link>
        <nav className={`flex items-center gap-4 text-sm ${t.navMuted}`}>
          <Link href="/dungeon" className={`transition ${t.accentHover}`}>
            Sections
          </Link>
          <Link href="/feedback" className={`transition ${t.accentHover}`}>
            Feedback
          </Link>
          <AuthStatusLink variant={variant} />
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-2 sm:px-8">
        {backHref ? (
          <Link
            href={backHref}
            className={`mb-6 inline-block text-sm transition ${t.backLink}`}
          >
            {backLabel}
          </Link>
        ) : null}
        {children}
      </main>
    </div>
  );
}
