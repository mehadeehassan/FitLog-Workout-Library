import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Flame, Star } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

const SPECS: { key: "equipment" | "difficulty" | "sets" | "reps" | "duration" | "caloriesBurned" | "rating"; label: string; suffix?: string }[] = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "caloriesBurned", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" },
];

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
      <Link
        href="/#library"
        className="mb-6 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent md:inline-flex"
      >
        <ArrowLeft size={15} /> Back to library
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface lg:aspect-auto lg:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-accent/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-text sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-3 text-sm text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-5 flex items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-accent" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={16} className="text-accent" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={16} className="text-accent" />
              {workout.rating}
            </span>
          </div>

          <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
            {SPECS.map((spec) => (
              <div
                key={spec.key}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="font-semibold uppercase tracking-wide text-muted">
                  {spec.label}
                </span>
                <span className="text-text">
                  {workout[spec.key]}
                  {spec.suffix || ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
