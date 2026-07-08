import Link from "next/link";

type OAuthFailedPageProps = {
  searchParams: { next?: string; reason?: string };
};

export default function OAuthFailedPage({ searchParams }: OAuthFailedPageProps) {
  const reason =
    searchParams.reason === "missing_challenge"
      ? "The sign-in challenge cookie was missing. Try again from this same browser."
      : "Something went wrong during sign-in. Please try again.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-900 px-6 text-center text-foreground">
      <h1 className="font-display text-3xl font-bold text-torch">Sign-in could not be completed</h1>
      <p className="max-w-md text-stone-300">{reason}</p>
      <Link
        href="/auth"
        className="rounded-full border border-moss/40 px-5 py-2 text-sm text-moss transition hover:bg-moss/10"
      >
        Try signing in again
      </Link>
    </main>
  );
}
