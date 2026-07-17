import Link from "next/link";
import type { Chamber, ChamberStatus } from "@/content/chambers";
import { SkillTag } from "./SkillTag";

type ChamberCardProps = {
  chamber: Chamber;
  status: ChamberStatus;
};

const statusStyles: Record<ChamberStatus, string> = {
  cleared: "border-moss/50 bg-moss/5",
  current: "border-moss bg-moss/10 shadow-[0_0_40px_rgba(93,255,177,0.15)]",
  available: "border-torch/50 bg-torch/5",
  locked: "border-stone-700/80 bg-stone-950/50 opacity-70",
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

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-moss/60 ${statusStyles[status]} ${isLocked ? "hover:opacity-90" : ""}`}
    >
      {chamber.isBoss ? (
        <span className="absolute -top-2.5 right-4 rounded-full border border-torch bg-stone-900 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-torch uppercase">
          Boss
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs tracking-[0.2em] text-stone-500">
          Chamber {String(chamber.id).padStart(2, "0")}
        </span>
        <span
          className={`font-mono text-[10px] tracking-wider uppercase ${
            status === "current"
              ? "text-moss"
              : status === "cleared"
                ? "text-moss-soft"
                : status === "available"
                  ? "text-torch"
                  : "text-stone-500"
          }`}
        >
          {statusLabels[status]}
        </span>
      </div>

      <h3 className="mt-2 font-display text-xl font-bold tracking-wide text-foreground group-hover:text-moss">
        {chamber.title}
      </h3>
      <p className="mt-1 text-sm text-stone-400">{chamber.subtitle}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {chamber.skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-700/60 pt-3">
        <span className="font-mono text-[11px] tracking-wide text-stone-500">
          +{chamber.xp} XP
        </span>
        <span className="text-xs text-stone-500 transition group-hover:text-torch">
          {isLocked ? "Preview →" : "Enter →"}
        </span>
      </div>
    </Link>
  );
}
