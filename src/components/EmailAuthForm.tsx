"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import {
  signInWithEmailAction,
  signUpWithEmailAction,
  type AuthFormState,
} from "@/app/auth/actions";

const initialState: AuthFormState = null;

const fieldClass =
  "w-full rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-stone-500 focus:border-moss/50 focus:ring-1 focus:ring-moss/30";

const labelClass = "mb-1.5 block text-xs font-medium tracking-wide text-stone-300";

function SubmitButton({ mode }: { mode: "sign-in" | "sign-up" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-moss px-5 py-3.5 text-sm font-semibold tracking-wide text-stone-950 transition hover:bg-moss/90 disabled:opacity-60"
    >
      {pending
        ? mode === "sign-up"
          ? "Creating account…"
          : "Signing in…"
        : mode === "sign-up"
          ? "Create account"
          : "Sign in"}
    </button>
  );
}

export function EmailAuthForm() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-up");
  const action = mode === "sign-up" ? signUpWithEmailAction : signInWithEmailAction;
  const [state, formAction] = useFormState(action, initialState);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex rounded-full border border-stone-700/80 bg-stone-900/60 p-1">
        <button
          type="button"
          onClick={() => setMode("sign-up")}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${
            mode === "sign-up"
              ? "bg-moss/20 text-moss"
              : "text-stone-400 hover:text-stone-300"
          }`}
        >
          Sign up
        </button>
        <button
          type="button"
          onClick={() => setMode("sign-in")}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${
            mode === "sign-in"
              ? "bg-moss/20 text-moss"
              : "text-stone-400 hover:text-stone-300"
          }`}
        >
          Sign in
        </button>
      </div>

      <form action={formAction} className="flex flex-col gap-4" key={mode}>
        {mode === "sign-up" ? (
          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              minLength={3}
              placeholder="sql_ranger"
              className={fieldClass}
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            required
            minLength={8}
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>

        {state?.error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {state.error}
          </p>
        ) : null}

        <SubmitButton mode={mode} />
      </form>
    </div>
  );
}
