import Link from "next/link";
import type { Chamber, ChamberStatus } from "@/content/chambers";
import { sectionChrome, themeForSectionId } from "@/lib/theme";
import { BossEmblem } from "./BossEmblem";
import { SkillTag } from "./SkillTag";

type ChamberCardProps = {
  chamber: Chamber;
  status: ChamberStatus;
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
  const chrome = sectionChrome(theme);
  const isBossish = Boolean(chamber.isBoss || chamber.isSectionBoss);

  const styles = isBossish
    ? {
        cleared: chrome.bossCleared,
        current: chrome.bossCurrent,
        available: chrome.bossAvailable,
        locked: chrome.bossLocked,
      }
    : {
        cleared: chrome.cardCleared,
        current: chrome.cardCurrent,
        available: chrome.cardAvailable,
        locked: chrome.cardLocked,
      };

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border p-5 transition hover:-translate-y-0.5 ${
        isBossish ? chrome.bossHoverBorder : chrome.hoverBorder
      } ${styles[status]} ${isLocked ? "hover:opacity-90" : ""}`}
    >
      {chamber.isSectionBoss || chamber.isBoss ? (
        <span
          className={`absolute -top-2.5 right-4 rounded-full border bg-stone-950 px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${chrome.badge}`}
        >
          {chamber.isSectionBoss ? "Section Boss" : "Boss"}
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <span className={`font-mono text-xs tracking-[0.2em] ${chrome.chamberNo}`}>
          Chamber {String(chamber.id).padStart(2, "0")}
        </span>
        <span
          className={`font-mono text-[10px] tracking-wider uppercase ${
            status === "locked" ? "text-stone-500" : chrome.chamberNo
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
            className={`font-display text-xl font-bold tracking-wide text-foreground ${chrome.hoverTitle}`}
          >
            {chamber.title}
          </h3>
          <p className={`mt-1 text-sm ${chrome.muted}`}>{chamber.subtitle}</p>
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
        <span className={`text-xs text-stone-500 transition ${chrome.hoverCta}`}>
          {isLocked ? "Preview →" : "Enter →"}
        </span>
      </div>
    </Link>
  );
}
