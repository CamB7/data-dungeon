import type { SqlSkill } from "@/content/chambers";
import { SKILL_LABELS } from "@/content/chambers";
import type { SectionThemeId } from "@/lib/theme";

/** Secondary-tone skills — filters, sorts, limits. */
const SECONDARY_SKILLS = new Set<SqlSkill>([
  "order-by",
  "limit",
  "where",
  "distinct",
  "union",
  "offset",
  "in",
]);

const DEEP_SKILLS = new Set<SqlSkill>([
  "inner-join",
  "left-join",
  "case",
  "subquery",
  "exists",
  "cast",
]);

const STYLES: Record<SectionThemeId, Record<"primary" | "secondary" | "deep" | "boss", string>> = {
  lockward: {
    primary: "border-moss/40 text-moss bg-moss/8",
    secondary: "border-torch/40 text-torch bg-torch/10",
    deep: "border-moss-soft/55 text-moss-soft bg-moss-deep/35",
    boss: "border-blood bg-blood/15 text-blood font-semibold animate-ember-flicker",
  },
  salt: {
    primary: "border-brine/40 text-brine bg-brine/8",
    secondary: "border-salt-dim/45 text-salt-dim bg-salt-deep/40",
    deep: "border-brine-soft/55 text-brine-soft bg-brine-deep/35",
    boss: "border-brine-glow bg-brine/15 text-brine-glow font-semibold animate-brine-flicker",
  },
  spire: {
    primary: "border-spire/40 text-spire bg-spire/8",
    secondary: "border-meridian/40 text-meridian bg-meridian/10",
    deep: "border-spire-soft/55 text-spire-soft bg-spire-deep/35",
    boss: "border-meridian-glow bg-meridian/15 text-meridian-glow font-semibold animate-torch-pulse",
  },
  hollow: {
    primary: "border-redgrey/40 text-hollow bg-hollow/8",
    secondary: "border-redgrey-soft/40 text-void bg-void/10",
    deep: "border-redgrey/55 text-hollow-soft bg-hollow-deep/35",
    boss: "border-redgrey-glow bg-void/15 text-void-glow font-semibold animate-ember-flicker",
  },
  loom: {
    primary: "border-crimsontrim/40 text-scarlet bg-scarlet/10",
    secondary: "border-copper/45 text-copper bg-copper/12",
    deep: "border-crimsontrim/55 text-scarlet-soft bg-scarlet-deep/35",
    boss: "border-copper-glow bg-copper/18 text-copper-glow font-semibold animate-ember-flicker",
  },
  throne: {
    primary: "border-goldline/40 text-throne bg-throne/8",
    secondary: "border-goldline-soft/40 text-velvet bg-velvet/10",
    deep: "border-goldline/55 text-throne-soft bg-throne-deep/35",
    boss: "border-goldline-glow bg-velvet/15 text-goldline-glow font-semibold animate-ember-flicker",
  },
};

function skillClass(theme: SectionThemeId, skill: SqlSkill): string {
  const palette = STYLES[theme];
  if (skill === "boss") return palette.boss;
  if (DEEP_SKILLS.has(skill)) return palette.deep;
  if (SECONDARY_SKILLS.has(skill)) return palette.secondary;
  return palette.primary;
}

export function SkillTag({
  skill,
  theme = "lockward",
  /** @deprecated Prefer theme=\"salt\" */
  salt = false,
}: {
  skill: SqlSkill;
  theme?: SectionThemeId;
  salt?: boolean;
}) {
  const resolved = salt ? "salt" : theme;
  const style = skillClass(resolved, skill);

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${style}`}
    >
      {SKILL_LABELS[skill]}
    </span>
  );
}
