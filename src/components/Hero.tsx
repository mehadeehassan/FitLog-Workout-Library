import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-border bg-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-accent/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-6xl">
            Train with intent. Log
            <br />
            <span className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-accent sm:text-5xl lg:text-6xl">every set.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 active:scale-[0.98]"
          >
            Browse Workouts
            <ArrowDown size={16} />
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/banner.png"
              alt="FitLog workout illustration"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
