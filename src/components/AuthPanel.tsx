"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth/client";
import { EmailAuthForm } from "@/components/EmailAuthForm";
import { GoogleSignIn } from "@/components/GoogleSignIn";

export function AuthPanel() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, startSignOut] = useTransition();

  const handleSignOut = () => {
    setError(null);
    startSignOut(async () => {
      try {
        await authClient.signOut();
        refetch();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sign-out failed");
      }
    });
  };

  if (isPending) {
    return (
      <p className="py-10 text-center text-sm text-stone-500">Checking session…</p>
    );
  }

  if (session?.user) {
    return (
      <div className="flex flex-col items-center gap-5 py-4 text-center">
        <p className="text-sm text-stone-300">
          Signed in as{" "}
          <span className="font-medium text-moss">
            {session.user.name ?? session.user.email}
          </span>
        </p>
        <Link
          href="/dungeon"
          className="inline-flex w-full items-center justify-center rounded-full bg-moss px-5 py-3.5 text-sm font-semibold tracking-wide text-stone-950 transition hover:bg-moss/90"
        >
          Enter the dungeon →
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="rounded-full border border-stone-500/50 px-5 py-2.5 text-sm text-stone-300 transition hover:border-torch/60 hover:text-torch disabled:opacity-60"
        >
          {isSigningOut ? "Signing out…" : "Sign out"}
        </button>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    );
  }

  return (
    <>
      <div className="mt-2">
        <EmailAuthForm />
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-stone-700/80" />
        <span className="font-mono text-[11px] tracking-wider text-stone-500 uppercase">
          or
        </span>
        <div className="h-px flex-1 bg-stone-700/80" />
      </div>

      <GoogleSignIn destination="dungeon" label="Continue with Google" />
    </>
  );
}
