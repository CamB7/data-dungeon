/** Visual theme for a dungeon section (and boss variants). */

export type SectionThemeId =
  | "lockward"
  | "salt"
  | "spire"
  | "hollow"
  | "loom"
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
  /** Primary section accent (titles, cleared state). */
  accent: string;
  /** Secondary accent (labels, available state, hovers). */
  accentSecondary: string;
  accentSoft: string;
  accentMuted: string;
  pill: string;
};

/** Shared UI chrome — primary + secondary two-tone per section (Lockward: moss + torch). */
export type SectionChrome = {
  hubBorder: string;
  hubTitle: string;
  hubTag: string;
  hubCta: string;
  rail: string;
  floorLabel: string;
  nodeNormal: string;
  nodeBoss: string;
  cardCleared: string;
  cardCurrent: string;
  cardAvailable: string;
  cardLocked: string;
  bossCleared: string;
  bossCurrent: string;
  bossAvailable: string;
  bossLocked: string;
  hoverBorder: string;
  hoverTitle: string;
  hoverCta: string;
  badge: string;
  chamberNo: string;
  muted: string;
  bossHoverBorder: string;
  pgBorder: string;
  pgDotA: string;
  pgDotB: string;
  pgBtn: string;
  pgEditor: string;
  pgPass: string;
  pgWarn: string;
  pgPanel: string;
  pgSeal: string;
  pgSealLabel: string;
  statusLocked: string;
  statusLockedLabel: string;
  statusCurrent: string;
  statusCurrentBody: string;
  statusCleared: string;
  statusClearedLabel: string;
  sealedPanel: string;
  hubBg: string;
};

export const SECTION_CHROME: Record<SectionThemeId, SectionChrome> = {
  lockward: {
    hubBorder: "border-moss/30 hover:border-moss/50",
    hubTitle: "text-moss",
    hubTag: "text-torch",
    hubCta: "text-moss group-hover:text-torch",
    rail: "from-moss/40 via-torch/30 to-moss/40",
    floorLabel: "text-torch",
    nodeNormal: "border-moss/60",
    nodeBoss: "border-blood/70 animate-ember-flicker",
    cardCleared: "border-moss/40 bg-moss/5",
    cardCurrent:
      "border-moss/50 bg-moss/10 shadow-[0_0_40px_rgba(168,201,160,0.15)]",
    cardAvailable: "border-torch/35 bg-torch/5",
    cardLocked: "border-stone-700/50 bg-stone-950/50 opacity-70",
    bossCleared: "border-blood/40 bg-blood/5",
    bossCurrent:
      "border-blood/50 bg-blood/10 shadow-[0_0_50px_rgba(180,40,40,0.25)]",
    bossAvailable: "border-ash/35 bg-ash/10",
    bossLocked: "border-stone-700/50 bg-stone-950/70 opacity-65",
    hoverBorder: "hover:border-moss/50",
    hoverTitle: "group-hover:text-moss",
    hoverCta: "group-hover:text-torch",
    badge: "border-blood text-blood animate-ember-flicker",
    chamberNo: "text-stone-500",
    muted: "text-stone-400",
    bossHoverBorder: "hover:border-blood/50",
    pgBorder: "border-moss/25 shadow-[0_0_60px_rgba(168,201,160,0.08)]",
    pgDotA: "bg-torch-dim",
    pgDotB: "bg-moss-soft",
    pgBtn: "bg-moss hover:bg-moss/90",
    pgEditor: "text-moss/90",
    pgPass: "text-moss",
    pgWarn: "text-torch",
    pgPanel: "border-moss/30 bg-moss/5",
    pgSeal: "border-torch/30 bg-torch/5",
    pgSealLabel: "text-torch",
    statusLocked: "border-stone-600/50 bg-stone-900/80 text-stone-400",
    statusLockedLabel: "text-stone-500",
    statusCurrent: "border-moss/40 bg-moss/10 text-moss",
    statusCurrentBody: "text-moss/90",
    statusCleared: "border-moss/30 bg-moss/5",
    statusClearedLabel: "text-moss",
    sealedPanel: "border-moss/25 bg-stone-950/60 text-stone-400",
    hubBg: "bg-stone-950/50",
  },
  salt: {
    hubBorder: "border-brine/30 hover:border-brine/50",
    hubTitle: "text-brine-muted",
    hubTag: "text-salt-muted",
    hubCta: "text-brine-muted group-hover:text-salt-muted",
    rail: "from-brine/35 via-salt-dim/20 to-brine/35",
    floorLabel: "text-salt-dim",
    nodeNormal: "border-brine/60",
    nodeBoss: "border-brine-glow/70 animate-brine-flicker",
    cardCleared: "border-brine/40 bg-brine/8",
    cardCurrent:
      "border-brine/50 bg-brine/12 shadow-[0_0_40px_rgba(94,212,240,0.18)]",
    cardAvailable: "border-salt-dim/35 bg-salt-deep/40",
    cardLocked: "border-brine/15 bg-abyss/90 opacity-75",
    bossCleared: "border-brine-glow/40 bg-brine/10",
    bossCurrent:
      "border-brine-glow/50 bg-brine/15 shadow-[0_0_50px_rgba(168,240,252,0.22)]",
    bossAvailable: "border-salt-dim/35 bg-salt-deep/45",
    bossLocked: "border-brine/15 bg-abyss/90 opacity-75",
    hoverBorder: "hover:border-brine/50",
    hoverTitle: "group-hover:text-brine",
    hoverCta: "group-hover:text-salt-dim",
    badge: "border-brine-glow text-brine-glow animate-brine-flicker",
    chamberNo: "text-brine-soft",
    muted: "text-salt-dim",
    bossHoverBorder: "hover:border-brine-glow/50",
    pgBorder: "border-brine/35 shadow-[0_0_50px_rgba(94,212,240,0.1)]",
    pgDotA: "bg-salt-dim",
    pgDotB: "bg-brine-soft",
    pgBtn: "bg-brine hover:bg-brine-soft text-abyss",
    pgEditor: "text-brine",
    pgPass: "text-brine",
    pgWarn: "text-salt-dim",
    pgPanel: "border-brine/35 bg-brine/8",
    pgSeal: "border-salt-dim/35 bg-salt-deep/50",
    pgSealLabel: "text-salt-dim",
    statusLocked: "border-brine/20 bg-abyss-soft text-salt-dim",
    statusLockedLabel: "text-salt-dim",
    statusCurrent: "border-brine/45 bg-brine/12 text-brine",
    statusCurrentBody: "text-salt-dim",
    statusCleared: "border-brine/25 bg-brine/8",
    statusClearedLabel: "text-brine",
    sealedPanel: "border-brine/20 bg-abyss/50 text-salt-dim",
    hubBg: "bg-abyss/40",
  },
  spire: {
    hubBorder: "border-meridian-dim/30 hover:border-meridian-dim/50",
    hubTitle: "text-spire",
    hubTag: "text-meridian",
    hubCta: "text-spire group-hover:text-meridian",
    rail: "from-spire/35 via-meridian/22 to-spire/35",
    floorLabel: "text-meridian",
    nodeNormal: "border-spire/60",
    nodeBoss: "border-meridian-glow/70 animate-torch-pulse",
    cardCleared: "border-spire/40 bg-spire/8",
    cardCurrent:
      "border-spire/50 bg-spire/12 shadow-[0_0_40px_rgba(168,184,204,0.18)]",
    cardAvailable: "border-meridian/35 bg-meridian/8",
    cardLocked: "border-spire/15 bg-spire-deep/90 opacity-75",
    bossCleared: "border-meridian-glow/40 bg-meridian/10",
    bossCurrent:
      "border-meridian-glow/50 bg-meridian/12 shadow-[0_0_50px_rgba(88,216,192,0.22)]",
    bossAvailable: "border-meridian/35 bg-meridian/8",
    bossLocked: "border-spire/15 bg-spire-deep/90 opacity-75",
    hoverBorder: "hover:border-spire/50",
    hoverTitle: "group-hover:text-spire",
    hoverCta: "group-hover:text-meridian",
    badge: "border-meridian-glow text-meridian-glow animate-torch-pulse",
    chamberNo: "text-spire-soft",
    muted: "text-stone-400",
    bossHoverBorder: "hover:border-meridian-glow/50",
    pgBorder: "border-spire/35 shadow-[0_0_50px_rgba(168,184,204,0.1)]",
    pgDotA: "bg-meridian-dim",
    pgDotB: "bg-spire-soft",
    pgBtn: "bg-spire hover:bg-spire-glow text-spire-deep",
    pgEditor: "text-spire",
    pgPass: "text-spire",
    pgWarn: "text-meridian",
    pgPanel: "border-spire/35 bg-spire/8",
    pgSeal: "border-meridian/35 bg-meridian/8",
    pgSealLabel: "text-meridian",
    statusLocked: "border-spire/20 bg-spire-deep/80 text-spire-soft",
    statusLockedLabel: "text-meridian",
    statusCurrent: "border-spire/45 bg-spire/12 text-spire",
    statusCurrentBody: "text-meridian",
    statusCleared: "border-spire/25 bg-spire/8",
    statusClearedLabel: "text-spire",
    sealedPanel: "border-spire/20 bg-spire-deep/55 text-spire-soft",
    hubBg: "bg-spire-deep/45",
  },
  hollow: {
    hubBorder: "border-redgrey/30 hover:border-redgrey/50",
    hubTitle: "text-hollow",
    hubTag: "text-void",
    hubCta: "text-hollow group-hover:text-void",
    rail: "from-hollow/35 via-void/22 to-hollow/35",
    floorLabel: "text-void",
    nodeNormal: "border-redgrey/60",
    nodeBoss: "border-redgrey-glow/70 animate-ember-flicker",
    cardCleared: "border-redgrey/40 bg-hollow/8",
    cardCurrent:
      "border-redgrey/50 bg-hollow/12 shadow-[0_0_40px_rgba(138,101,101,0.2)]",
    cardAvailable: "border-redgrey-soft/35 bg-void/8",
    cardLocked: "border-redgrey/15 bg-hollow-deep/90 opacity-75",
    bossCleared: "border-redgrey-glow/40 bg-void/10",
    bossCurrent:
      "border-redgrey-glow/50 bg-void/12 shadow-[0_0_50px_rgba(168,120,120,0.25)]",
    bossAvailable: "border-redgrey-soft/35 bg-void/8",
    bossLocked: "border-redgrey/15 bg-hollow-deep/90 opacity-75",
    hoverBorder: "hover:border-redgrey/50",
    hoverTitle: "group-hover:text-hollow",
    hoverCta: "group-hover:text-void",
    badge: "border-redgrey-glow text-void-glow animate-ember-flicker",
    chamberNo: "text-hollow-soft",
    muted: "text-stone-400",
    bossHoverBorder: "hover:border-redgrey-glow/50",
    pgBorder: "border-redgrey/35 shadow-[0_0_50px_rgba(138,101,101,0.12)]",
    pgDotA: "bg-void-dim",
    pgDotB: "bg-hollow-soft",
    pgBtn: "bg-hollow hover:bg-hollow-glow text-hollow-deep",
    pgEditor: "text-hollow",
    pgPass: "text-hollow",
    pgWarn: "text-void",
    pgPanel: "border-redgrey/35 bg-hollow/8",
    pgSeal: "border-redgrey-soft/35 bg-void/8",
    pgSealLabel: "text-void",
    statusLocked: "border-redgrey/20 bg-hollow-deep/80 text-hollow-soft",
    statusLockedLabel: "text-void",
    statusCurrent: "border-redgrey/45 bg-hollow/12 text-hollow",
    statusCurrentBody: "text-void",
    statusCleared: "border-redgrey/25 bg-hollow/8",
    statusClearedLabel: "text-hollow",
    sealedPanel: "border-redgrey/20 bg-hollow-deep/55 text-hollow-soft",
    hubBg: "bg-hollow-deep/50",
  },
  loom: {
    hubBorder: "border-crimsontrim/30 hover:border-crimsontrim/50",
    hubTitle: "text-scarlet",
    hubTag: "text-copper",
    hubCta: "text-scarlet group-hover:text-copper",
    rail: "from-scarlet/40 via-copper/28 to-scarlet/40",
    floorLabel: "text-copper",
    nodeNormal: "border-crimsontrim/60",
    nodeBoss: "border-copper-glow/70 animate-ember-flicker",
    cardCleared: "border-crimsontrim/40 bg-scarlet/10",
    cardCurrent:
      "border-copper/45 bg-scarlet/14 shadow-[0_0_40px_rgba(212,136,88,0.28)]",
    cardAvailable: "border-copper-soft/40 bg-copper/10",
    cardLocked: "border-crimsontrim/15 bg-scarlet-deep/75 opacity-80",
    bossCleared: "border-copper-glow/45 bg-copper/12",
    bossCurrent:
      "border-copper-glow/55 bg-copper/14 shadow-[0_0_50px_rgba(240,168,112,0.32)]",
    bossAvailable: "border-copper-soft/40 bg-copper/10",
    bossLocked: "border-crimsontrim/15 bg-scarlet-deep/75 opacity-80",
    hoverBorder: "hover:border-copper/50",
    hoverTitle: "group-hover:text-scarlet",
    hoverCta: "group-hover:text-copper",
    badge: "border-copper-glow text-copper-glow animate-ember-flicker",
    chamberNo: "text-scarlet-soft",
    muted: "text-copper-soft",
    bossHoverBorder: "hover:border-copper-glow/55",
    pgBorder: "border-copper/40 shadow-[0_0_50px_rgba(212,136,88,0.18)]",
    pgDotA: "bg-copper-dim",
    pgDotB: "bg-scarlet-soft",
    pgBtn: "bg-copper hover:bg-copper-glow text-scarlet-deep",
    pgEditor: "text-scarlet",
    pgPass: "text-scarlet",
    pgWarn: "text-copper",
    pgPanel: "border-copper/40 bg-scarlet/10",
    pgSeal: "border-copper-soft/40 bg-copper/10",
    pgSealLabel: "text-copper",
    statusLocked: "border-crimsontrim/20 bg-scarlet-deep/65 text-scarlet-soft",
    statusLockedLabel: "text-copper",
    statusCurrent: "border-copper/50 bg-scarlet/14 text-scarlet",
    statusCurrentBody: "text-copper",
    statusCleared: "border-crimsontrim/25 bg-scarlet/10",
    statusClearedLabel: "text-scarlet",
    sealedPanel: "border-copper/25 bg-scarlet-deep/50 text-scarlet-soft",
    hubBg: "bg-scarlet-deep/42",
  },
  throne: {
    hubBorder: "border-goldline/30 hover:border-goldline/50",
    hubTitle: "text-throne",
    hubTag: "text-velvet",
    hubCta: "text-throne group-hover:text-velvet",
    rail: "from-throne/35 via-velvet/22 to-throne/35",
    floorLabel: "text-velvet",
    nodeNormal: "border-goldline/60",
    nodeBoss: "border-goldline-glow/70 animate-ember-flicker",
    cardCleared: "border-goldline/40 bg-throne/8",
    cardCurrent:
      "border-goldline/50 bg-throne/12 shadow-[0_0_40px_rgba(232,200,48,0.2)]",
    cardAvailable: "border-goldline-soft/35 bg-velvet/8",
    cardLocked: "border-goldline/15 bg-throne-deep/90 opacity-75",
    bossCleared: "border-goldline-glow/40 bg-velvet/10",
    bossCurrent:
      "border-goldline-glow/50 bg-velvet/12 shadow-[0_0_50px_rgba(245,216,80,0.25)]",
    bossAvailable: "border-goldline-soft/35 bg-velvet/8",
    bossLocked: "border-goldline/15 bg-throne-deep/90 opacity-75",
    hoverBorder: "hover:border-goldline/50",
    hoverTitle: "group-hover:text-throne",
    hoverCta: "group-hover:text-velvet",
    badge: "border-goldline-glow text-goldline-glow animate-ember-flicker",
    chamberNo: "text-throne-soft",
    muted: "text-stone-400",
    bossHoverBorder: "hover:border-goldline-glow/50",
    pgBorder: "border-goldline/35 shadow-[0_0_50px_rgba(232,200,48,0.12)]",
    pgDotA: "bg-velvet-dim",
    pgDotB: "bg-throne-soft",
    pgBtn: "bg-throne hover:bg-throne-glow text-throne-deep",
    pgEditor: "text-throne",
    pgPass: "text-throne",
    pgWarn: "text-velvet",
    pgPanel: "border-goldline/35 bg-throne/8",
    pgSeal: "border-goldline-soft/35 bg-velvet/8",
    pgSealLabel: "text-velvet",
    statusLocked: "border-goldline/20 bg-throne-deep/80 text-throne-soft",
    statusLockedLabel: "text-velvet",
    statusCurrent: "border-goldline/45 bg-throne/12 text-throne",
    statusCurrentBody: "text-velvet",
    statusCleared: "border-goldline/25 bg-throne/8",
    statusClearedLabel: "text-throne",
    sealedPanel: "border-goldline/20 bg-throne-deep/55 text-throne-soft",
    hubBg: "bg-throne-deep/45",
  },
};

export function sectionChrome(theme: SectionThemeId): SectionChrome {
  return SECTION_CHROME[theme];
}

const SECTION_BY_ID: Record<number, SectionThemeId> = {
  1: "lockward",
  2: "salt",
  3: "spire",
  4: "hollow",
  5: "loom",
  6: "throne",
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
      secondaryOrb: "bg-torch/10 animate-torch-pulse",
      accent: "text-moss",
      accentSecondary: "text-torch",
      accentSoft: "text-moss-soft",
      accentMuted: "text-stone-400",
      pill: "border-moss/40 text-moss hover:border-moss hover:bg-moss/10",
    },
    salt: {
      bg: boss ? "bg-abyss" : "bg-abyss-soft",
      wash: boss ? "bg-salt-boss-dungeon" : "bg-salt-dungeon",
      grid: "bg-salt-grid bg-salt-grid",
      gridOpacity: boss ? "opacity-22" : "opacity-40",
      brand: boss
        ? "text-brine-glow hover:text-brine"
        : "text-brine hover:text-brine-glow",
      accentHover: boss ? "hover:text-brine-glow" : "hover:text-salt-dim",
      navMuted: "text-salt-dim",
      backLink: boss
        ? "text-salt-dim hover:text-brine-glow"
        : "text-salt-dim hover:text-salt",
      orb: "bg-brine/20 animate-tide-swell",
      secondaryOrb: "bg-salt-dim/10 animate-tide-swell",
      accent: "text-brine",
      accentSecondary: "text-salt-dim",
      accentSoft: "text-brine-soft",
      accentMuted: "text-salt-dim",
      pill: "border-brine/35 text-brine hover:border-brine hover:bg-brine/8",
    },
    spire: {
      bg: boss ? "bg-spire-deep" : "bg-spire-deep/95",
      wash: boss ? "bg-spire-boss-dungeon" : "bg-spire-dungeon",
      grid: "bg-spire-grid bg-spire-grid",
      gridOpacity: boss ? "opacity-22" : "opacity-38",
      brand: boss
        ? "text-meridian-glow hover:text-meridian"
        : "text-spire hover:text-spire-glow",
      accentHover: boss ? "hover:text-meridian-glow" : "hover:text-meridian",
      navMuted: "text-spire-soft",
      backLink: boss
        ? "text-spire-soft hover:text-meridian-glow"
        : "text-spire-soft hover:text-meridian",
      orb: "bg-spire/18 animate-torch-pulse",
      secondaryOrb: "bg-meridian/12 animate-torch-pulse",
      accent: "text-spire",
      accentSecondary: "text-meridian",
      accentSoft: "text-spire-soft",
      accentMuted: "text-stone-400",
      pill: "border-spire/35 text-spire hover:border-spire hover:bg-spire/8",
    },
    hollow: {
      bg: boss ? "bg-hollow-deep" : "bg-hollow-deep/95",
      wash: boss ? "bg-hollow-boss-dungeon" : "bg-hollow-dungeon",
      grid: "bg-hollow-grid bg-hollow-grid",
      gridOpacity: boss ? "opacity-18" : "opacity-35",
      brand: boss
        ? "text-void-glow hover:text-void"
        : "text-hollow hover:text-hollow-glow",
      accentHover: boss ? "hover:text-void-glow" : "hover:text-void",
      navMuted: "text-hollow-soft",
      backLink: boss
        ? "text-hollow-soft hover:text-void-glow"
        : "text-hollow-soft hover:text-void",
      orb: "bg-hollow/12 animate-torch-pulse",
      secondaryOrb: "bg-void/12 animate-torch-pulse",
      accent: "text-hollow",
      accentSecondary: "text-void",
      accentSoft: "text-hollow-soft",
      accentMuted: "text-stone-400",
      pill: "border-redgrey/35 text-hollow hover:border-redgrey hover:bg-hollow/8",
    },
    loom: {
      bg: boss ? "bg-scarlet-deep" : "bg-scarlet-deep",
      wash: boss ? "bg-loom-boss-dungeon" : "bg-loom-dungeon",
      grid: "bg-loom-grid bg-loom-grid",
      gridOpacity: boss ? "opacity-24" : "opacity-38",
      brand: boss
        ? "text-copper-glow hover:text-copper"
        : "text-scarlet hover:text-scarlet-glow",
      accentHover: boss ? "hover:text-copper-glow" : "hover:text-copper",
      navMuted: "text-copper-soft",
      backLink: boss
        ? "text-copper-soft hover:text-copper-glow"
        : "text-scarlet-soft hover:text-copper",
      orb: "bg-scarlet/16 animate-ember-flicker",
      secondaryOrb: "bg-copper/14 animate-ember-flicker",
      accent: "text-scarlet",
      accentSecondary: "text-copper",
      accentSoft: "text-scarlet-soft",
      accentMuted: "text-copper-soft",
      pill: "border-copper/40 text-copper hover:border-copper-glow hover:bg-copper/12",
    },
    throne: {
      bg: boss ? "bg-throne-deep" : "bg-throne-deep/95",
      wash: boss ? "bg-throne-boss-dungeon" : "bg-throne-dungeon",
      grid: "bg-throne-grid bg-throne-grid",
      gridOpacity: boss ? "opacity-22" : "opacity-38",
      brand: boss
        ? "text-velvet-glow hover:text-velvet"
        : "text-throne hover:text-throne-glow",
      accentHover: boss ? "hover:text-velvet-glow" : "hover:text-velvet",
      navMuted: "text-throne-soft",
      backLink: boss
        ? "text-throne-soft hover:text-velvet-glow"
        : "text-throne-soft hover:text-velvet",
      orb: "bg-throne/18 animate-ember-flicker",
      secondaryOrb: "bg-velvet/12 animate-ember-flicker",
      accent: "text-throne",
      accentSecondary: "text-velvet",
      accentSoft: "text-throne-soft",
      accentMuted: "text-stone-400",
      pill: "border-goldline/35 text-throne hover:border-goldline hover:bg-throne/8",
    },
  };

  return byTheme[theme];
}
