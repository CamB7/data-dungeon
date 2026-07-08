"use client";

import { useState, useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth/client";
import { signInWithGoogleAction, type OAuthDestination } from "@/app/auth/actions";

type GoogleSignInProps = {
  destination?: OAuthDestination;
  label?: string;
};

export function GoogleSignIn({
  destination = "home",
  label = "Continue with Google",
}: GoogleSignInProps) {
  const { data: session, isPending } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, startSignIn] = useTransition();
  const [isSigningOut, startSignOut] = useTransition();

  const handleSignIn = () => {
    setError(null);
    startSignIn(async () => {
      try {
        await signInWithGoogleAction(destination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sign-in failed");
      }
    });
  };

  const handleSignOut = () => {
    setError(null);
    startSignOut(async () => {
      try {
        await authClient.signOut();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sign-out failed");
      }
    });
  };

  if (isPending) {
    return <p className="text-center text-sm text-stone-500">Checking session…</p>;
  }

  if (session?.user) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-stone-300">
          Signed in as{" "}
          <span className="font-medium text-moss">{session.user.name}</span>
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="rounded-full border border-stone-500/50 px-5 py-2.5 text-sm text-stone-300 transition hover:border-torch/60 hover:text-torch disabled:opacity-60"
        >
          {isSigningOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isSigningIn}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-500/50 bg-stone-800/80 px-5 py-3.5 text-sm font-medium text-foreground transition hover:border-moss/50 hover:bg-stone-800 disabled:opacity-60"
      >
        <FcGoogle size={20} />
        {isSigningIn ? "Redirecting…" : label}
      </button>
      {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
