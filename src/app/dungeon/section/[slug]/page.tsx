import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DUNGEON_SECTIONS,
  getChambersBySection,
  getSectionBySlug,
  getSectionXp,
  isSectionLive,
} from "@/content/chambers";
import { DungeonShell } from "@/components/dungeon/DungeonShell";
import { SectionTrack } from "@/components/dungeon/SectionTrack";
import { shellTokens, shellVariantForSection } from "@/lib/theme";

type SectionPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return DUNGEON_SECTIONS.map((section) => ({ slug: section.slug }));
}

export function generateMetadata({ params }: SectionPageProps): Metadata {
  const section = getSectionBySlug(params.slug);
  if (!section) return { title: "Section not found" };

  return {
    title: `${section.name} — Data Dungeon`,
    description: section.tagline,
  };
}

export default function SectionPage({ params }: SectionPageProps) {
  const section = getSectionBySlug(params.slug);
  if (!section) notFound();

  const variant = shellVariantForSection(section.id);
  const t = shellTokens(variant);
  const live = isSectionLive(section);
  const chambers = getChambersBySection(section.id);
  const xp = getSectionXp(section.id);

  return (
    <DungeonShell
      variant={variant}
      backHref="/dungeon"
      backLabel="← All sections"
    >
      <header className="mb-12 max-w-2xl">
        <p
          className={`font-mono text-xs tracking-[0.25em] uppercase ${t.accent}`}
        >
          Section {section.id}
          {!live ? " · Sealed" : ""}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-wide text-foreground sm:text-5xl">
          {section.name}
        </h1>
        <p className={`mt-4 text-lg font-light leading-relaxed ${t.accentMuted}`}>
          {section.tagline}
        </p>
        <p className="mt-3 font-mono text-xs text-stone-500">
          Floors {section.floorStart}–{section.floorEnd}
          {live
            ? ` · ${chambers.length} chambers · ${xp} XP`
            : " · Chambers not yet carved"}
        </p>
      </header>

      <SectionTrack section={section} />
    </DungeonShell>
  );
}
