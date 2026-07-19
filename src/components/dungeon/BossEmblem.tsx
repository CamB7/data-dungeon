import type { IconType } from "react-icons";
import {
  GiKeyLock,
  GiLockedChest,
  GiStoneTower,
  GiThroneKing,
  GiTrident,
} from "react-icons/gi";
import type { SectionThemeId } from "@/lib/theme";

const BOSS_ICONS: Record<string, IconType> = {
  "loot-vault-boss": GiLockedChest,
  "hollow-throne-boss": GiThroneKing,
  "lockward-seal-boss": GiKeyLock,
  "salt-sovereign-boss": GiTrident,
  "index-archon": GiStoneTower,
};

const toneByTheme: Record<SectionThemeId, string> = {
  lockward: "text-blood animate-ember-flicker",
  salt: "text-brine animate-brine-flicker",
  spire: "text-spire animate-torch-pulse",
  hollow: "text-hollow animate-ember-flicker",
  throne: "text-throne animate-ember-flicker",
};

type BossEmblemProps = {
  slug: string;
  theme?: SectionThemeId;
  /** @deprecated Prefer theme=\"salt\" */
  salt?: boolean;
  size?: "md" | "lg";
};

export function BossEmblem({
  slug,
  theme = "lockward",
  salt = false,
  size = "lg",
}: BossEmblemProps) {
  const Icon = BOSS_ICONS[slug];
  if (!Icon) return null;

  const resolved = salt ? "salt" : theme;
  const dim = size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-10 w-10";

  return (
    <div
      className={`pointer-events-none flex shrink-0 items-center justify-center ${dim} ${toneByTheme[resolved]}`}
      aria-hidden
    >
      <Icon className="h-full w-full" />
    </div>
  );
}

export function hasBossEmblem(slug: string): boolean {
  return Boolean(BOSS_ICONS[slug]);
}
