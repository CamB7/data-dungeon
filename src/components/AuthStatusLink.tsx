"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { shellTokens, type ShellVariant } from "@/lib/theme";

type AuthStatusLinkProps = {
  variant?: ShellVariant;
  signedOutLabel?: string;
};

export function AuthStatusLink({
  variant = "lockward",
  signedOutLabel = "Sign in",
}: AuthStatusLinkProps) {
  const { data: session, isPending } = authClient.useSession();
  const t = shellTokens(variant);
  const pillClass = `rounded-full border px-4 py-2 transition ${t.pill}`;

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
