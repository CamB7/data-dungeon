"use client";

import { useCallback, useEffect, useState } from "react";
import {
  emptyProgress,
  loadProgress,
  saveProgress,
  type PlayerProgress,
} from "@/lib/progress";

type ProgressState = {
  progress: PlayerProgress;
  authenticated: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  recordLocalAndSync: (input: {
    slug: string;
    passed: boolean;
    skills: string[];
    xp: number;
  }) => Promise<PlayerProgress>;
};

export function usePlayerProgress(): ProgressState {
  const [progress, setProgress] = useState<PlayerProgress>(emptyProgress());
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/dungeon/progress");
      const data = await res.json();
      if (data.authenticated && data.progress) {
        setAuthenticated(true);
        setProgress(data.progress);
        saveProgress(data.progress);
      } else {
        setAuthenticated(false);
        const local = loadProgress();
        setProgress(local);
      }
    } catch {
      setAuthenticated(false);
      setProgress(loadProgress());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const recordLocalAndSync = useCallback(
    async (input: {
      slug: string;
      passed: boolean;
      skills: string[];
      xp: number;
    }) => {
      const { recordAttempt } = await import("@/lib/progress");
      const localNext = recordAttempt(loadProgress(), input);
      saveProgress(localNext);
      setProgress(localNext);

      try {
        const res = await fetch("/api/dungeon/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) {
            setAuthenticated(true);
            setProgress(data.progress);
            saveProgress(data.progress);
            return data.progress as PlayerProgress;
          }
        }
      } catch {
        // keep local
      }
      return localNext;
    },
    [],
  );

  return { progress, authenticated, loading, refresh, recordLocalAndSync };
}
