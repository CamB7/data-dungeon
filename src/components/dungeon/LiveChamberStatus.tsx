"use client";

import { getChamberStatusFromCleared } from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { ChamberStatusBanner } from "./ProgressBar";

export function LiveChamberStatus({ chamberId }: { chamberId: number }) {
  const { progress } = usePlayerProgress();
  const status = getChamberStatusFromCleared(chamberId, progress.cleared);
  return <ChamberStatusBanner status={status} />;
}
