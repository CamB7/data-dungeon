import type { SqlSkill } from "@/content/chambers";
import { SKILL_LABELS } from "@/content/chambers";
import type { SectionThemeId } from "@/lib/theme";

const skillStyles: Record<SqlSkill, string> = {
  select: "border-moss/40 text-moss bg-moss/10",
  columns: "border-moss/40 text-moss bg-moss/10",
  "order-by": "border-torch/40 text-torch bg-torch/10",
  limit: "border-torch/40 text-torch bg-torch/10",
  where: "border-torch/40 text-torch bg-torch/10",
  count: "border-stone-500/50 text-stone-300 bg-stone-800/60",
  "group-by": "border-stone-500/50 text-stone-300 bg-stone-800/60",
  "inner-join": "border-moss-soft/50 text-moss-soft bg-moss-deep/40",
  "left-join": "border-moss-soft/50 text-moss-soft bg-moss-deep/40",
  distinct: "border-torch/40 text-torch bg-torch/10",
  having: "border-stone-500/50 text-stone-300 bg-stone-800/60",
  case: "border-moss-soft/50 text-moss-soft bg-moss-deep/40",
  subquery: "border-moss-soft/50 text-moss-soft bg-moss-deep/40",
  nulls: "border-stone-500/50 text-stone-300 bg-stone-800/60",
  union: "border-torch/40 text-torch bg-torch/10",
  exists: "border-moss-soft/50 text-moss-soft bg-moss-deep/40",
  like: "border-brine/40 text-brine bg-brine/10",
  between: "border-brine/40 text-brine bg-brine/10",
  avg: "border-brine/50 text-brine bg-brine/15",
  "self-join": "border-brine/50 text-brine bg-brine/15",
  offset: "border-spire/50 text-spire bg-spire/10",
  in: "border-spire/50 text-spire bg-spire/10",
  coalesce: "border-spire/50 text-spire bg-spire/15",
  cast: "border-spire-soft/60 text-spire-soft bg-spire-deep/40",
  window: "border-spire-glow/50 text-spire bg-spire/15",
  round: "border-spire/50 text-spire bg-spire/10",
  boss: "border-blood bg-blood/15 text-blood font-semibold animate-ember-flicker",
};

const themeOverrides: Partial<
  Record<SectionThemeId, Partial<Record<SqlSkill, string>>>
> = {
  salt: {
    where: "border-brine/50 text-brine bg-brine/15",
    "order-by": "border-salt-dim/60 text-salt bg-salt-deep/50",
    "group-by": "border-brine-soft/60 text-brine-soft bg-brine-deep/40",
    "inner-join": "border-brine/50 text-brine bg-brine/15",
    "left-join": "border-brine-soft/60 text-brine-soft bg-brine-deep/40",
    exists: "border-brine-soft/60 text-brine-soft bg-brine-deep/40",
    having: "border-brine-soft/60 text-brine-soft bg-brine-deep/40",
    "self-join": "border-brine/50 text-brine bg-brine/15",
    like: "border-brine/50 text-brine bg-brine/15",
    between: "border-brine/50 text-brine bg-brine/15",
    avg: "border-brine/50 text-brine bg-brine/15",
    boss: "border-brine-glow bg-brine/25 text-brine-glow font-semibold animate-brine-flicker",
  },
  spire: {
    "order-by": "border-spire-soft/60 text-spire-soft bg-spire-deep/40",
    limit: "border-spire/50 text-spire bg-spire/10",
    where: "border-spire/50 text-spire bg-spire/15",
    "group-by": "border-spire-soft/60 text-spire-soft bg-spire-deep/40",
    avg: "border-spire/50 text-spire bg-spire/15",
    "inner-join": "border-spire/50 text-spire bg-spire/15",
    subquery: "border-spire-soft/60 text-spire-soft bg-spire-deep/40",
    offset: "border-spire/50 text-spire bg-spire/15",
    in: "border-spire/50 text-spire bg-spire/15",
    coalesce: "border-spire/50 text-spire bg-spire/15",
    cast: "border-spire-soft/60 text-spire-soft bg-spire-deep/40",
    window: "border-spire-glow/50 text-spire bg-spire/15",
    round: "border-spire/50 text-spire bg-spire/10",
    boss: "border-spire-glow bg-spire/20 text-spire-glow font-semibold animate-torch-pulse",
  },
};

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
  const style =
    themeOverrides[resolved]?.[skill] ?? skillStyles[skill];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${style}`}
    >
      {SKILL_LABELS[skill]}
    </span>
  );
}
