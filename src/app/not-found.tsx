import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <p className="font-display text-8xl font-bold text-accent">404</p>

        <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-text">
          Page not found
        </h1>

        <p className="mt-2 max-w-sm text-sm text-muted">
          This lift doesn&apos;t exist in the library. Head back and pick
          something that does.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 active:scale-[0.98]"
        >
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}