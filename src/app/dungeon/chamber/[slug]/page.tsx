import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentChambers,
  getChamberBySlug,
  getChambers,
  getSectionById,
  sectionPath,
} from "@/content/chambers";
import { SchemaPanel } from "@/components/dungeon/ChamberPanels";
import { ChamberPlayground } from "@/components/dungeon/ChamberPlayground";
import { LiveChamberStatus } from "@/components/dungeon/LiveChamberStatus";
import { BossEmblem } from "@/components/dungeon/BossEmblem";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import { SkillTag } from "@/components/dungeon/SkillTag";
import { isSaltTheme, sectionThemeFromVariant, shellTokens, shellVariantForChamber } from "@/lib/theme";

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
  const isBossish = Boolean(chamber.isBoss || chamber.isSectionBoss);
  const variant = shellVariantForChamber(chamber);
  const salt = isSaltTheme(variant);
  const theme = sectionThemeFromVariant(variant);
  const t = shellTokens(variant);
  const section = getSectionById(chamber.sectionId);
  const sectionHref = section ? sectionPath(section) : "/dungeon";
  const sectionLabel = section ? `← ${section.name}` : "← Sections";

  const bossTitleClass =
    theme === "salt"
      ? "text-brine"
      : theme === "spire"
        ? "text-spire"
        : isBossish
          ? "text-blood"
          : "text-foreground";

  const bossPressure =
    chamber.isSectionBoss
      ? theme === "salt"
        ? "The Salt Sovereign waits beneath the foam. One wrong result set and the tide seals the shore."
        : theme === "spire"
          ? "The Index Archon waits at the apex. One wrong result set and the tower indexes collapse."
          : "The Lockward seal waits. Five floors of queries stand behind you — one wrong result set and the gate stays shut."
      : theme === "salt"
        ? "Pressure builds. Lanterns gutter in the brine. One wrong result set and the undertow takes the haul."
        : theme === "spire"
          ? "The gallery windows narrow. One wrong result set and the climb resets."
          : "The air thins. Torchlight dies to embers. One wrong result set and the vault stays sealed.";

  return (
    <DungeonShell
      variant={variant}
      backHref={sectionHref}
      backLabel={sectionLabel}
    >
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p
              className={`font-mono text-xs tracking-[0.25em] uppercase ${t.accent}`}
            >
              Chamber {String(chamber.id).padStart(2, "0")} · {chamber.floorName}
            </p>
            {chamber.isSectionBoss ? (
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
                  theme === "salt"
                    ? "border-brine bg-brine/15 text-brine animate-brine-flicker"
                    : theme === "spire"
                      ? "border-spire bg-spire/15 text-spire animate-torch-pulse"
                      : "border-blood bg-blood/10 text-blood animate-ember-flicker"
                }`}
              >
                Section Boss
              </span>
            ) : chamber.isBoss ? (
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
                  theme === "salt"
                    ? "border-brine bg-brine/15 text-brine animate-brine-flicker"
                    : theme === "spire"
                      ? "border-spire bg-spire/15 text-spire animate-torch-pulse"
                      : "border-blood bg-blood/10 text-blood animate-ember-flicker"
                }`}
              >
                Boss
              </span>
            ) : null}
          </div>
          <div className="mt-3 flex items-start gap-4 sm:gap-6">
            {isBossish ? (
              <BossEmblem slug={chamber.slug} theme={theme} />
            ) : null}
            <div className="min-w-0">
              <h1
                className={`font-display text-4xl font-black tracking-wide sm:text-5xl ${
                  isBossish ? bossTitleClass : "text-foreground"
                }`}
              >
                {chamber.title}
              </h1>
              <p className={`mt-2 text-lg ${t.accentMuted}`}>
                {chamber.subtitle}
              </p>
            </div>
          </div>
          {isBossish ? (
            <p className={`mt-3 max-w-xl text-sm leading-relaxed ${t.accentSoft}`}>
              {bossPressure}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {chamber.skills.map((skill) => (
              <SkillTag key={skill} skill={skill} theme={theme} />
            ))}
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
                theme === "salt"
                  ? "border-brine/40 text-brine bg-brine/10"
                  : theme === "spire"
                    ? "border-spire/40 text-spire bg-spire/10"
                    : "border-stone-700/80 text-stone-400"
              }`}
            >
              +{chamber.xp} XP
            </span>
          </div>
        </header>

        <div className="mb-8">
          <LiveChamberStatus chamberId={chamber.id} theme={theme} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <section
              className={`rounded-2xl border p-6 ${
                theme === "salt"
                  ? "border-brine/30 bg-abyss-soft/80"
                  : theme === "spire"
                    ? "border-spire/30 bg-spire-deep/70"
                    : "border-stone-700/80 bg-stone-950/60"
              }`}
            >
              <h2
                className={`font-display text-lg font-semibold ${
                  theme === "salt"
                    ? "text-brine-glow"
                    : theme === "spire"
                      ? "text-spire-glow"
                      : "text-foreground"
                }`}
              >
                Briefing
              </h2>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  theme === "salt"
                    ? "text-salt"
                    : theme === "spire"
                      ? "text-spire-soft"
                      : "text-stone-300"
                }`}
              >
                {chamber.flavor}
              </p>
            </section>

            <section
              className={`rounded-2xl border p-6 ${
                theme === "salt"
                  ? "border-brine/25 bg-brine/5"
                  : theme === "spire"
                    ? "border-spire/25 bg-spire/5"
                    : "border-moss/25 bg-moss/5"
              }`}
            >
              <h2
                className={`font-mono text-xs tracking-[0.2em] uppercase ${t.accent}`}
              >
                Objective
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-200">{chamber.objective}</p>
            </section>

            <section
              className={`rounded-2xl border p-6 ${
                theme === "salt"
                  ? "border-salt-dim/30 bg-salt-deep/30"
                  : theme === "spire"
                    ? "border-spire-soft/30 bg-spire-deep/40"
                    : "border-torch/20 bg-torch/5"
              }`}
            >
              <h2
                className={`font-mono text-xs tracking-[0.2em] uppercase ${
                  theme === "salt"
                    ? "text-salt-dim"
                    : theme === "spire"
                      ? "text-spire-soft"
                      : "text-torch"
                }`}
              >
                Hint
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{chamber.hint}</p>
            </section>

            <SchemaPanel tables={chamber.tables} salt={salt} />
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
              className={`text-sm text-stone-400 transition ${t.accentHover}`}
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={sectionHref}
            className={`rounded-full border border-stone-600/60 px-5 py-2 text-sm text-stone-300 transition ${t.accentHover}`}
          >
            {section?.name ?? "Section"}
          </Link>
          {next ? (
            <Link
              href={`/dungeon/chamber/${next.slug}`}
              className={`text-sm text-stone-400 transition ${t.accentHover}`}
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
