"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export function HomeHeroCtas() {
  const { data: session, isPending } = authClient.useSession();
  const signedIn = !isPending && !!session?.user;

  return (
    <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
      {signedIn ? (
        <Link
          href="/dungeon"
          className="inline-flex items-center justify-center rounded-full bg-moss px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-950 transition hover:bg-moss/90"
        >
          Enter the dungeon →
        </Link>
      ) : (
        <Link
          href="/auth"
          className="inline-flex items-center justify-center rounded-full bg-moss px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-950 transition hover:bg-moss/90"
        >
          Sign up free
        </Link>
      )}
      <a
        href="#demo"
        className="inline-flex items-center justify-center rounded-full border border-stone-500/50 px-7 py-3.5 text-sm font-medium text-stone-300 transition hover:border-torch/60 hover:text-torch"
      >
        Watch demo
      </a>
    </div>
  );
}
