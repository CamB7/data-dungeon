import Link from "next/link";
import { AuthStatusLink } from "@/components/AuthStatusLink";

type DungeonShellProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  /** Boss chambers shift to a colder, bloodier atmosphere. */
  variant?: "default" | "boss";
};

export function DungeonShell({
  children,
  backHref = "/dungeon",
  backLabel = "← Track map",
  variant = "default",
}: DungeonShellProps) {
  const isBoss = variant === "boss";

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden text-foreground ${
        isBoss ? "bg-[#08060a]" : "bg-stone-900"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isBoss ? "bg-boss-dungeon" : "bg-dungeon"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-grid bg-grid ${
          isBoss ? "opacity-30" : "opacity-60"
        }`}
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[100px] ${
          isBoss
            ? "bg-blood/25 animate-ember-flicker"
            : "bg-moss/15 animate-torch-pulse"
        }`}
      />
      {isBoss ? (
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-ash/20 blur-[90px] animate-torch-pulse"
          aria-hidden
        />
      ) : null}

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <Link
          href="/"
          className={`font-display text-sm font-bold tracking-[0.2em] uppercase transition ${
            isBoss
              ? "text-blood hover:text-blood/80"
              : "text-moss hover:text-moss/80"
          }`}
        >
          Data Dungeon
        </Link>
        <nav className="flex items-center gap-4 text-sm text-stone-300">
          <Link
            href="/dungeon"
            className={`transition ${isBoss ? "hover:text-blood" : "hover:text-torch"}`}
          >
            Track map
          </Link>
          <Link
            href="/feedback"
            className={`transition ${isBoss ? "hover:text-blood" : "hover:text-torch"}`}
          >
            Feedback
          </Link>
          <AuthStatusLink variant={variant} />
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-2 sm:px-8">
        {backHref ? (
          <Link
            href={backHref}
            className={`mb-6 inline-block text-sm text-stone-400 transition ${
              isBoss ? "hover:text-blood" : "hover:text-torch"
            }`}
          >
            {backLabel}
          </Link>
        ) : null}
        {children}
      </main>
    </div>
  );
}
