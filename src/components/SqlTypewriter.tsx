"use client";

import { useEffect, useState } from "react";

export const SAMPLE_QUERY = `SELECT hero.name, quest.title, loot.gold
FROM adventurers AS hero
JOIN quests AS quest
  ON quest.assigned_to = hero.id
JOIN chests AS loot
  ON loot.quest_id = quest.id
WHERE hero.class = 'SQL Ranger'
  AND loot.rarity = 'legendary'
ORDER BY loot.gold DESC;`;

type SqlTypewriterProps = {
  text?: string;
  /** Delay before typing starts (ms). */
  startDelayMs?: number;
  /** Characters per tick. */
  charsPerTick?: number;
  /** Interval between ticks (ms). */
  tickMs?: number;
  /** Pause before looping (ms). Set 0 to type once. */
  loopPauseMs?: number;
};

export function SqlTypewriter({
  text = SAMPLE_QUERY,
  startDelayMs = 600,
  charsPerTick = 1,
  tickMs = 28,
  loopPauseMs = 3200,
}: SqlTypewriterProps) {
  const [visible, setVisible] = useState(0);
  const done = visible >= text.length && text.length > 0;

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let index = 0;

    const clearTimers = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };

    const startTyping = () => {
      if (cancelled) return;
      index = 0;
      setVisible(0);

      intervalId = setInterval(() => {
        if (cancelled) return;
        index = Math.min(text.length, index + charsPerTick);
        setVisible(index);

        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          if (loopPauseMs > 0) {
            timeoutId = setTimeout(() => {
              if (!cancelled) startTyping();
            }, loopPauseMs);
          }
        }
      }, tickMs);
    };

    timeoutId = setTimeout(startTyping, startDelayMs);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [text, startDelayMs, charsPerTick, tickMs, loopPauseMs]);

  const shown = text.slice(0, visible);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-moss/25 bg-stone-950/90 shadow-[0_0_60px_rgba(168,201,160,0.08)]">
      <div className="flex items-center gap-2 border-b border-stone-700/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-torch-dim" />
        <span className="h-2.5 w-2.5 rounded-full bg-moss-soft" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-500" />
        <span className="ml-3 font-mono text-[11px] tracking-wider text-stone-500">
          chamber_01.sql
        </span>
      </div>
      <pre
        className="min-h-[16rem] whitespace-pre-wrap p-5 font-mono text-[13px] leading-6 text-moss/90 sm:min-h-[18rem] sm:text-sm"
        aria-label="Sample SQL query typing"
      >
        {shown}
        <span
          className={`inline-block w-[0.55em] translate-y-[0.1em] bg-moss/80 ${
            done ? "animate-cursor-blink" : "opacity-90"
          }`}
          aria-hidden
        >
          &nbsp;
        </span>
      </pre>
    </div>
  );
}
