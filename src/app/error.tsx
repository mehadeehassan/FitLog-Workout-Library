"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center sm:px-6">
      <div className="flex w-full max-w-7xl flex-col items-center">
        <p className="font-display text-7xl font-bold text-accent">Oops</p>

        <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-text">
          Something went wrong
        </h1>

        <p className="mt-2 max-w-sm text-sm text-muted">
          This lift didn&apos;t load properly. Try again or head back to the
          library.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 active:scale-[0.98]"
          >
            <RefreshCcw size={16} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-text transition hover:border-accent hover:text-accent active:scale-[0.98]"
          >
            Back to Workouts
          </Link>
        </div>
      </div>
    </div>
  );
}