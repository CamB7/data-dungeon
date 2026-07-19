"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { AuthStatusLink } from "@/components/AuthStatusLink";

export function HomeNav() {
  const { data: session, isPending } = authClient.useSession();
  const signedIn = !isPending && !!session?.user;

  return (
    <nav className="flex flex-wrap items-center justify-end gap-4 text-sm text-stone-300">
      <a href="#problem" className="transition hover:text-torch">
        Why
      </a>
      <a href="#demo" className="transition hover:text-torch">
        Demo
      </a>
      <Link href="/feedback" className="transition hover:text-torch">
        Feedback
      </Link>
      {signedIn ? (
        <Link href="/dungeon" className="transition hover:text-torch">
          Dungeon
        </Link>
      ) : null}
      <AuthStatusLink signedOutLabel="Sign up" />
    </nav>
  );
}
