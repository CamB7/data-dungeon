"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { AuthStatusLink } from "@/components/AuthStatusLink";

export function HomeNav() {
  const { data: session, isPending } = authClient.useSession();
  const signedIn = !isPending && !!session?.user;

  return (
    <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-stone-300">
      <a
        href="#problem"
        className="inline-flex min-h-11 items-center px-1 transition hover:text-torch sm:min-h-0 sm:px-0"
      >
        Why
      </a>
      <Link
        href="/feedback"
        className="inline-flex min-h-11 items-center px-1 transition hover:text-torch sm:min-h-0 sm:px-0"
      >
        Feedback
      </Link>
      {signedIn ? (
        <Link
          href="/dungeon"
          className="inline-flex min-h-11 items-center px-1 transition hover:text-torch sm:min-h-0 sm:px-0"
        >
          Dungeon
        </Link>
      ) : null}
      <AuthStatusLink signedOutLabel="Sign up" />
    </nav>
  );
}
