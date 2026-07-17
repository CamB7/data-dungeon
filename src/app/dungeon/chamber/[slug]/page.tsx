import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentChambers,
  getChamberBySlug,
  getChambers,
} from "@/content/chambers";
import { SchemaPanel } from "@/components/dungeon/ChamberPanels";
import { ChamberPlayground } from "@/components/dungeon/ChamberPlayground";
import { LiveChamberStatus } from "@/components/dungeon/LiveChamberStatus";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import { SkillTag } from "@/components/dungeon/SkillTag";

type ChamberPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getChambers().map((chamber) => ({ slug: chamber.slug }));
}

export function generateMetadata({ params }: ChamberPageProps): Metadata {
  const chamber = getChamberBySlug(params.slug);
  if (!chamber) return { title: "Chamber not found" };

  return {
    title: `${chamber.title} — Data Dungeon`,
    description: chamber.flavor,
  };
}

export default function ChamberPage({ params }: ChamberPageProps) {
  const chamber = getChamberBySlug(params.slug);
  if (!chamber) notFound();

  const { prev, next } = getAdjacentChambers(chamber.slug);

  return (
    <DungeonShell variant={chamber.isBoss ? "boss" : "default"}>
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p
              className={`font-mono text-xs tracking-[0.25em] uppercase ${
                chamber.isBoss ? "text-blood" : "text-torch"
              }`}
            >
              Chamber {String(chamber.id).padStart(2, "0")} · {chamber.floorName}
            </p>
            {chamber.isBoss ? (
              <span className="rounded-full border border-blood bg-blood/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-blood uppercase animate-ember-flicker">
                Boss
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 font-display text-4xl font-black tracking-wide text-foreground sm:text-5xl">
            {chamber.title}
          </h1>
          <p className="mt-2 text-lg text-stone-400">{chamber.subtitle}</p>
          {chamber.isBoss ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">
              The air thins. Torchlight dies to embers. One wrong result set and the vault stays
              sealed.
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {chamber.skills.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
            <span className="inline-flex items-center rounded-full border border-stone-700/80 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-stone-400 uppercase">
              +{chamber.xp} XP
            </span>
          </div>
        </header>

        <div className="mb-8">
          <LiveChamberStatus chamberId={chamber.id} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-stone-700/80 bg-stone-950/60 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Briefing</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{chamber.flavor}</p>
            </section>

            <section className="rounded-2xl border border-moss/25 bg-moss/5 p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-moss uppercase">
                Objective
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-200">{chamber.objective}</p>
            </section>

            <section className="rounded-2xl border border-torch/20 bg-torch/5 p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-torch uppercase">Hint</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{chamber.hint}</p>
            </section>

            <SchemaPanel tables={chamber.tables} />
          </div>

          <ChamberPlayground
            chamber={chamber}
            filename={`chamber_${String(chamber.id).padStart(2, "0")}.sql`}
          />
        </div>

        <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-stone-700/60 pt-8">
          {prev ? (
            <Link
              href={`/dungeon/chamber/${prev.slug}`}
              className="text-sm text-stone-400 transition hover:text-torch"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/dungeon"
            className="rounded-full border border-stone-600/60 px-5 py-2 text-sm text-stone-300 transition hover:border-moss/50 hover:text-moss"
          >
            Track map
          </Link>
          {next ? (
            <Link
              href={`/dungeon/chamber/${next.slug}`}
              className="text-sm text-stone-400 transition hover:text-torch"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </DungeonShell>
  );
}
