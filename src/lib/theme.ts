/** Visual theme for a dungeon section (and boss variants). */

export type SectionThemeId =
  | "lockward"
  | "salt"
  | "spire"
  | "hollow"
  | "throne";

export type ShellVariant =
  | SectionThemeId
  | `${SectionThemeId}-boss`
  /** @deprecated Prefer lockward */
  | "default"
  /** @deprecated Prefer lockward-boss */
  | "boss";

export type ShellTokens = {
  bg: string;
  wash: string;
  grid: string;
  gridOpacity: string;
  brand: string;
  accentHover: string;
  navMuted: string;
  backLink: string;
  orb: string;
  secondaryOrb?: string;
  /** Tailwind text/border accent used in cards & tags */
  accent: string;
  accentSoft: string;
  accentMuted: string;
  pill: string;
};

const SECTION_BY_ID: Record<number, SectionThemeId> = {
  1: "lockward",
  2: "salt",
  3: "spire",
  4: "hollow",
  5: "throne",
};

export function themeForSectionId(sectionId: number): SectionThemeId {
  return SECTION_BY_ID[sectionId] ?? "lockward";
}

export function normalizeShellVariant(variant: ShellVariant): Exclude<
  ShellVariant,
  "default" | "boss"
> {
  if (variant === "default") return "lockward";
  if (variant === "boss") return "lockward-boss";
  return variant;
}

export function sectionThemeFromVariant(variant: ShellVariant): SectionThemeId {
  const v = normalizeShellVariant(variant);
  return v.replace(/-boss$/, "") as SectionThemeId;
}

export function isBossTheme(variant: ShellVariant): boolean {
  const v = normalizeShellVariant(variant);
  return v.endsWith("-boss");
}

export function isSaltTheme(variant: ShellVariant): boolean {
  return sectionThemeFromVariant(variant) === "salt";
}

export function shellVariantForChamber(chamber: {
  sectionId: number;
  isBoss?: boolean;
  isSectionBoss?: boolean;
}): ShellVariant {
  const theme = themeForSectionId(chamber.sectionId);
  const bossish = Boolean(chamber.isBoss || chamber.isSectionBoss);
  return bossish ? (`${theme}-boss` as ShellVariant) : theme;
}

export function shellVariantForSection(sectionId: number): ShellVariant {
  return themeForSectionId(sectionId);
}

/** Atmosphere tokens for DungeonShell + themed chrome. */
export function shellTokens(variant: ShellVariant): ShellTokens {
  const v = normalizeShellVariant(variant);
  const boss = v.endsWith("-boss");
  const theme = v.replace(/-boss$/, "") as SectionThemeId;

  const byTheme: Record<SectionThemeId, ShellTokens> = {
    lockward: {
      bg: boss ? "bg-[#08060a]" : "bg-stone-900",
      wash: boss ? "bg-boss-dungeon" : "bg-dungeon",
      grid: "bg-grid bg-grid",
      gridOpacity: boss ? "opacity-25" : "opacity-55",
      brand: boss
        ? "text-blood hover:text-blood/80"
        : "text-moss hover:text-moss/80",
      accentHover: boss ? "hover:text-blood" : "hover:text-torch",
      navMuted: "text-stone-300",
      backLink: `text-stone-400 ${boss ? "hover:text-blood" : "hover:text-torch"}`,
      orb: "bg-moss/15 animate-torch-pulse",
      accent: "text-moss",
      accentSoft: "text-moss-soft",
      accentMuted: "text-stone-400",
      pill: "border-moss/40 text-moss hover:border-moss hover:bg-moss/10",
    },
    salt: {
      bg: boss ? "bg-abyss" : "bg-abyss-soft",
      wash: boss ? "bg-salt-boss-dungeon" : "bg-salt-dungeon",
      grid: "bg-salt-grid bg-salt-grid",
      gridOpacity: boss ? "opacity-25" : "opacity-50",
      brand: "text-brine hover:text-brine-glow",
      accentHover: "hover:text-brine",
      navMuted: "text-salt-dim",
      backLink: "text-salt-dim hover:text-brine",
      orb: "bg-brine/25 animate-tide-swell",
      secondaryOrb: "bg-brine-soft/20 animate-tide-swell",
      accent: "text-brine",
      accentSoft: "text-brine-soft",
      accentMuted: "text-salt-dim",
      pill: "border-brine/40 text-brine hover:border-brine hover:bg-brine/10",
    },
    spire: {
      bg: boss ? "bg-spire-deep" : "bg-spire-deep/95",
      wash: boss ? "bg-spire-boss-dungeon" : "bg-spire-dungeon",
      grid: "bg-spire-grid bg-spire-grid",
      gridOpacity: boss ? "opacity-25" : "opacity-45",
      brand: boss
        ? "text-spire-glow hover:text-spire"
        : "text-spire hover:text-spire-glow",
      accentHover: "hover:text-spire",
      navMuted: "text-spire-soft",
      backLink: "text-spire-soft hover:text-spire",
      orb: "bg-spire/20 animate-torch-pulse",
      accent: "text-spire",
      accentSoft: "text-spire-soft",
      accentMuted: "text-spire-soft",
      pill: "border-spire/40 text-spire hover:border-spire hover:bg-spire/10",
    },
    hollow: {
      bg: boss ? "bg-hollow-deep" : "bg-hollow-deep/95",
      wash: boss ? "bg-hollow-boss-dungeon" : "bg-hollow-dungeon",
      grid: "bg-hollow-grid bg-hollow-grid",
      gridOpacity: boss ? "opacity-20" : "opacity-40",
      brand: boss
        ? "text-hollow hover:text-hollow-glow"
        : "text-hollow hover:text-hollow-glow",
      accentHover: "hover:text-hollow",
      navMuted: "text-hollow-soft",
      backLink: "text-hollow-soft hover:text-hollow",
      orb: "bg-hollow/15 animate-torch-pulse",
      accent: "text-hollow",
      accentSoft: "text-hollow-soft",
      accentMuted: "text-hollow-soft",
      pill: "border-hollow/40 text-hollow hover:border-hollow hover:bg-hollow/10",
    },
    throne: {
      bg: boss ? "bg-throne-deep" : "bg-throne-deep/95",
      wash: boss ? "bg-throne-boss-dungeon" : "bg-throne-dungeon",
      grid: "bg-throne-grid bg-throne-grid",
      gridOpacity: boss ? "opacity-25" : "opacity-45",
      brand: boss
        ? "text-throne-glow hover:text-throne"
        : "text-throne hover:text-throne-glow",
      accentHover: "hover:text-throne",
      navMuted: "text-throne-soft",
      backLink: "text-throne-soft hover:text-throne",
      orb: "bg-throne/20 animate-ember-flicker",
      accent: "text-throne",
      accentSoft: "text-throne-soft",
      accentMuted: "text-throne-soft",
      pill: "border-throne/40 text-throne hover:border-throne hover:bg-throne/10",
    },
  };

  return byTheme[theme];
}
