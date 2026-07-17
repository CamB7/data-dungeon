"use client";

import { useEffect, useRef, useState } from "react";
import type { QueryResult } from "@/lib/sql/sandbox";

type Msg = { role: "user" | "assistant"; content: string };

type WardenChatProps = {
  slug: string;
  failContext?: {
    sql?: string;
    result?: QueryResult;
    message?: string;
  };
  autoPromptOnFail?: boolean;
};

export function WardenChat({
  slug,
  failContext,
  autoPromptOnFail,
}: WardenChatProps) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "I am the Warden. Ask for a hint, paste a failing query, or request a review — I won't hand you the full answer.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const failHandled = useRef(false);

  useEffect(() => {
    failHandled.current = false;
  }, [slug]);

  useEffect(() => {
    // Allow a new auto-review each time the failing SQL changes
    failHandled.current = false;
  }, [failContext?.sql, failContext?.message]);

  async function send(text: string, ctx = failContext, baseMessages?: Msg[]) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const prior = baseMessages ?? messages;
    const nextMessages: Msg[] = [...prior, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/warden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          messages: nextMessages,
          failContext: ctx,
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text();
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: errText || "The Warden did not answer.",
          },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        const snapshot = assistant;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: snapshot };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection lost in the deep vault." },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  useEffect(() => {
    if (!autoPromptOnFail || !failContext?.sql || failHandled.current || streaming) {
      return;
    }
    failHandled.current = true;
    void send(
      "My query failed. Review it and give me a targeted hint — no full solution.",
      failContext,
      messages,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPromptOnFail, failContext]);

  return (
    <div className="rounded-2xl border border-torch/25 bg-stone-950/90 shadow-[0_0_40px_rgba(232,184,109,0.06)]">
      <div className="border-b border-stone-700/80 px-4 py-3">
        <p className="font-mono text-[11px] tracking-wider text-torch uppercase">
          Ask the Warden
        </p>
        <p className="mt-1 text-xs text-stone-500">
          AI SQL coach — hints and fail reviews, not spoilers
        </p>
      </div>
      <div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={`text-sm leading-relaxed ${
              msg.role === "assistant" ? "text-stone-300" : "text-moss"
            }`}
          >
            <span className="font-mono text-[10px] tracking-wider uppercase text-stone-500">
              {msg.role === "assistant" ? "Warden" : "You"}
            </span>
            <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-stone-700/80 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a hint…"
          className="flex-1 rounded-xl border border-stone-700 bg-stone-900/80 px-3 py-2 text-sm text-foreground outline-none focus:border-torch/50"
          disabled={streaming}
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="rounded-full bg-torch/90 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-torch disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
