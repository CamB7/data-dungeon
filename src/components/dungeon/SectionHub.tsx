import Link from "next/link";
import {
  DUNGEON_SECTIONS,
  getChambersBySection,
  getSectionXp,
  isSectionLive,
  sectionPath,
  type DungeonSection,
} from "@/content/chambers";
import { themeForSectionId, type SectionThemeId } from "@/lib/theme";

const cardChrome: Record<
  SectionThemeId,
  { border: string; title: string; tag: string; cta: string }
> = {
  lockward: {
    border: "border-moss/30 hover:border-moss/60",
    title: "text-moss",
    tag: "text-torch",
    cta: "text-moss group-hover:text-torch",
  },
  salt: {
    border: "border-brine/30 hover:border-brine/60",
    title: "text-brine",
    tag: "text-brine-soft",
    cta: "text-brine group-hover:text-brine-glow",
  },
  spire: {
    border: "border-spire/30 hover:border-spire/60",
    title: "text-spire",
    tag: "text-spire-soft",
    cta: "text-spire group-hover:text-spire-glow",
  },
  hollow: {
    border: "border-hollow/30 hover:border-hollow/60",
    title: "text-hollow",
    tag: "text-hollow-soft",
    cta: "text-hollow group-hover:text-hollow-glow",
  },
  throne: {
    border: "border-throne/30 hover:border-throne/60",
    title: "text-throne",
    tag: "text-throne-soft",
    cta: "text-throne group-hover:text-throne-glow",
  },
};

function SectionCard({ section }: { section: DungeonSection }) {
  const theme = themeForSectionId(section.id);
  const chrome = cardChrome[theme];
  const live = isSectionLive(section);
  const chambers = getChambersBySection(section.id);
  const xp = getSectionXp(section.id);
  const href = sectionPath(section);

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border bg-stone-950/50 p-6 transition hover:-translate-y-0.5 ${chrome.border} ${
        live ? "" : "opacity-80"
      }`}
    >
      <p
        className={`font-mono text-xs tracking-[0.25em] uppercase ${chrome.tag}`}
      >
        Section {section.id}
        {!live ? " · Sealed" : ""}
      </p>
      <h2
        className={`mt-2 font-display text-2xl font-black tracking-wide sm:text-3xl ${chrome.title}`}
      >
        {section.name}
      </h2>
      <p className="mt-2 max-w-md text-sm font-light text-stone-400">
        {section.tagline}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-700/50 pt-4">
        <span className="font-mono text-[11px] text-stone-500">
          Floors {section.floorStart}–{section.floorEnd}
          {live ? ` · ${chambers.length} chambers · ${xp} XP` : " · Coming soon"}
        </span>
        <span className={`text-sm transition ${chrome.cta}`}>
          {live ? "Enter →" : "Preview →"}
        </span>
      </div>
    </Link>
  );
}

export function SectionHub() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {DUNGEON_SECTIONS.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
