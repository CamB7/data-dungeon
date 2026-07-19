"use client";

import { getChamberStatusFromCleared } from "@/content/chambers";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { ChamberStatusBanner } from "./ProgressBar";

export function LiveChamberStatus({
  chamberId,
  salt = false,
  theme = salt ? "salt" : "lockward",
}: {
  chamberId: number;
  salt?: boolean;
  theme?: "lockward" | "salt" | "spire" | "hollow" | "throne";
}) {
  const { progress } = usePlayerProgress();
  const status = getChamberStatusFromCleared(chamberId, progress.cleared);
  return <ChamberStatusBanner status={status} theme={theme} />;
}
