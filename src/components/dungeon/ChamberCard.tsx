import Link from "next/link";
import type { Chamber, ChamberStatus } from "@/content/chambers";
import { themeForSectionId, type SectionThemeId } from "@/lib/theme";
import { BossEmblem } from "./BossEmblem";
import { SkillTag } from "./SkillTag";

type ChamberCardProps = {
  chamber: Chamber;
  status: ChamberStatus;
};

const statusByTheme: Record<
  SectionThemeId,
  { normal: Record<ChamberStatus, string>; boss: Record<ChamberStatus, string> }
> = {
  lockward: {
    normal: {
      cleared: "border-moss/50 bg-moss/5",
      current: "border-moss bg-moss/10 shadow-[0_0_40px_rgba(168,201,160,0.15)]",
      available: "border-torch/50 bg-torch/5",
      locked: "border-stone-700/80 bg-stone-950/50 opacity-70",
    },
    boss: {
      cleared: "border-blood/50 bg-blood/5",
      current: "border-blood bg-blood/10 shadow-[0_0_50px_rgba(180,40,40,0.25)]",
      available: "border-ash/60 bg-ash/10",
      locked: "border-stone-800 bg-stone-950/70 opacity-65",
    },
  },
  salt: {
    normal: {
      cleared: "border-brine/60 bg-brine/10",
      current:
        "border-brine bg-brine/15 shadow-[0_0_45px_rgba(125,240,255,0.28)]",
      available: "border-salt-dim/60 bg-salt-deep/50",
      locked: "border-brine/25 bg-abyss/90 opacity-80",
    },
    boss: {
      cleared: "border-brine-glow/70 bg-brine/15",
      current:
        "border-brine-glow bg-brine/20 shadow-[0_0_60px_rgba(125,240,255,0.4)]",
      available: "border-brine/50 bg-brine-deep/40",
      locked:
        "border-brine/45 bg-brine/10 shadow-[0_0_35px_rgba(125,240,255,0.18)] opacity-85",
    },
  },
  spire: {
    normal: {
      cleared: "border-spire/50 bg-spire/10",
      current:
        "border-spire bg-spire/15 shadow-[0_0_45px_rgba(184,197,214,0.25)]",
      available: "border-spire-soft/50 bg-spire-deep/50",
      locked: "border-spire/25 bg-spire-deep/90 opacity-80",
    },
    boss: {
      cleared: "border-spire-glow/70 bg-spire/15",
      current:
        "border-spire-glow bg-spire/20 shadow-[0_0_60px_rgba(184,197,214,0.35)]",
      available: "border-spire/50 bg-spire-deep/40",
      locked:
        "border-spire/45 bg-spire/10 shadow-[0_0_35px_rgba(184,197,214,0.18)] opacity-85",
    },
  },
  hollow: {
    normal: {
      cleared: "border-hollow/50 bg-hollow/10",
      current: "border-hollow bg-hollow/15",
      available: "border-hollow-soft/50 bg-hollow-deep/50",
      locked: "border-hollow/25 bg-hollow-deep opacity-75",
    },
    boss: {
      cleared: "border-hollow-glow/70 bg-hollow/15",
      current: "border-hollow-glow bg-hollow/20",
      available: "border-hollow/50 bg-hollow-deep/40",
      locked: "border-hollow/40 bg-hollow/10 opacity-80",
    },
  },
  throne: {
    normal: {
      cleared: "border-throne/50 bg-throne/10",
      current: "border-throne bg-throne/15",
      available: "border-throne-soft/50 bg-throne-deep/50",
      locked: "border-throne/25 bg-throne-deep opacity-75",
    },
    boss: {
      cleared: "border-throne-glow/70 bg-throne/15",
      current: "border-throne-glow bg-throne/20",
      available: "border-throne/50 bg-throne-deep/40",
      locked: "border-throne/40 bg-throne/10 opacity-80",
    },
  },
};

const accentByTheme: Record<
  SectionThemeId,
  {
    hoverBorder: string;
    hoverTitle: string;
    hoverCta: string;
    badge: string;
    chamberNo: string;
    muted: string;
  }
> = {
  lockward: {
    hoverBorder: "hover:border-moss/60",
    hoverTitle: "group-hover:text-moss",
    hoverCta: "group-hover:text-torch",
    badge: "border-blood text-blood animate-ember-flicker",
    chamberNo: "text-stone-500",
    muted: "text-stone-400",
  },
  salt: {
    hoverBorder: "hover:border-brine/60",
    hoverTitle: "group-hover:text-brine",
    hoverCta: "group-hover:text-brine",
    badge: "border-brine text-brine animate-brine-flicker",
    chamberNo: "text-brine-soft",
    muted: "text-salt-dim",
  },
  spire: {
    hoverBorder: "hover:border-spire/60",
    hoverTitle: "group-hover:text-spire",
    hoverCta: "group-hover:text-spire",
    badge: "border-spire text-spire animate-torch-pulse",
    chamberNo: "text-spire-soft",
    muted: "text-spire-soft",
  },
  hollow: {
    hoverBorder: "hover:border-hollow/60",
    hoverTitle: "group-hover:text-hollow",
    hoverCta: "group-hover:text-hollow",
    badge: "border-hollow text-hollow animate-ember-flicker",
    chamberNo: "text-hollow-soft",
    muted: "text-hollow-soft",
  },
  throne: {
    hoverBorder: "hover:border-throne/60",
    hoverTitle: "group-hover:text-throne",
    hoverCta: "group-hover:text-throne",
    badge: "border-throne text-throne animate-ember-flicker",
    chamberNo: "text-throne-soft",
    muted: "text-throne-soft",
  },
};

const statusLabels: Record<ChamberStatus, string> = {
  cleared: "Cleared",
  current: "Current",
  available: "Next up",
  locked: "Locked",
};

export function ChamberCard({ chamber, status }: ChamberCardProps) {
  const isLocked = status === "locked";
  const href = `/dungeon/chamber/${chamber.slug}`;
  const theme = themeForSectionId(chamber.sectionId);
  const isBossish = Boolean(chamber.isBoss || chamber.isSectionBoss);
  const pack = statusByTheme[theme];
  const styles = isBossish ? pack.boss : pack.normal;
  const accent = accentByTheme[theme];
  const bossHover =
    theme === "lockward" ? "hover:border-blood/70" : accent.hoverBorder;

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border p-5 transition hover:-translate-y-0.5 ${
        isBossish ? bossHover : accent.hoverBorder
      } ${styles[status]} ${isLocked ? "hover:opacity-90" : ""}`}
    >
      {chamber.isSectionBoss || chamber.isBoss ? (
        <span
          className={`absolute -top-2.5 right-4 rounded-full border bg-stone-950 px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${accent.badge}`}
        >
          {chamber.isSectionBoss ? "Section Boss" : "Boss"}
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <span className={`font-mono text-xs tracking-[0.2em] ${accent.chamberNo}`}>
          Chamber {String(chamber.id).padStart(2, "0")}
        </span>
        <span
          className={`font-mono text-[10px] tracking-wider uppercase ${
            status === "locked" ? "text-stone-500" : accent.chamberNo
          }`}
        >
          {statusLabels[status]}
        </span>
      </div>

      <div className="mt-2 flex items-start gap-3">
        {isBossish ? (
          <BossEmblem slug={chamber.slug} theme={theme} size="md" />
        ) : null}
        <div className="min-w-0">
          <h3
            className={`font-display text-xl font-bold tracking-wide text-foreground ${accent.hoverTitle}`}
          >
            {chamber.title}
          </h3>
          <p className={`mt-1 text-sm ${accent.muted}`}>{chamber.subtitle}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {chamber.skills.map((skill) => (
          <SkillTag key={skill} skill={skill} theme={theme} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-700/60 pt-3">
        <span className="font-mono text-[11px] tracking-wide text-stone-500">
          +{chamber.xp} XP
        </span>
        <span className={`text-xs text-stone-500 transition ${accent.hoverCta}`}>
          {isLocked ? "Preview →" : "Enter →"}
        </span>
      </div>
    </Link>
  );
}
