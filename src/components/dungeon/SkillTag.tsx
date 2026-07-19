import type { SqlSkill } from "@/content/chambers";
import { SKILL_LABELS } from "@/content/chambers";

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
  boss: "border-torch bg-torch/20 text-torch font-semibold",
};

export function SkillTag({ skill }: { skill: SqlSkill }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${skillStyles[skill]}`}
    >
      {SKILL_LABELS[skill]}
    </span>
  );
}
