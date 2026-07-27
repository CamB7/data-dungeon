import Link from "next/link";
import {
  DUNGEON_SECTIONS,
  getChambersBySection,
  getSectionXp,
  isSectionLive,
  sectionPath,
  type DungeonSection,
} from "@/content/chambers";
import { sectionChrome, themeForSectionId } from "@/lib/theme";

/** Hub card borders on /dungeon — distinct trim per late section. */
const HUB_CARD_BORDER: Partial<Record<number, string>> = {
  4: "border-redgrey/40 hover:border-redgrey/60",
  5: "border-crimsontrim/40 hover:border-copper/55",
  6: "border-goldline/40 hover:border-goldline/60",
};

function SectionCard({ section }: { section: DungeonSection }) {
  const theme = themeForSectionId(section.id);
  const chrome = sectionChrome(theme);
  const hubBorder = HUB_CARD_BORDER[section.id] ?? chrome.hubBorder;
  const live = isSectionLive(section);
  const chambers = getChambersBySection(section.id);
  const xp = getSectionXp(section.id);
  const href = sectionPath(section);

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border p-6 transition hover:-translate-y-0.5 ${hubBorder} ${chrome.hubBg} ${
        live ? "" : "opacity-80"
      }`}
    >
      <p
        className={`font-mono text-xs tracking-[0.25em] uppercase ${chrome.hubTag}`}
      >
        Section {section.id}
        {!live ? " · Sealed" : ""}
      </p>
      <h2
        className={`mt-2 font-display text-2xl font-black tracking-wide sm:text-3xl ${chrome.hubTitle}`}
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
        <span className={`text-sm transition ${chrome.hubCta}`}>
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
