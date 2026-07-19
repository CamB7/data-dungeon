"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";

type AuthStatusLinkProps = {
  /** Boss chambers use the blood palette. */
  variant?: "default" | "boss";
  signedOutLabel?: string;
};

export function AuthStatusLink({
  variant = "default",
  signedOutLabel = "Sign in",
}: AuthStatusLinkProps) {
  const { data: session, isPending } = authClient.useSession();
  const isBoss = variant === "boss";

  const pillClass = `rounded-full border px-4 py-2 transition ${
    isBoss
      ? "border-blood/40 text-blood hover:border-blood hover:bg-blood/10"
      : "border-moss/40 text-moss hover:border-moss hover:bg-moss/10"
  }`;

  if (isPending) {
    return (
      <span className={`${pillClass} opacity-50`} aria-hidden>
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <Link href="/auth" className={pillClass} title="Manage your account">
        {session.user.name ?? session.user.email}
      </Link>
    );
  }

  return (
    <Link href="/auth" className={pillClass}>
      {signedOutLabel}
    </Link>
  );
}
