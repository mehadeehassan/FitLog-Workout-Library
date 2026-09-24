import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import type { Workout } from "@/lib/types";

interface PlanListItemProps {
  workout: Workout;
  done: boolean;
  onMarkDone: (id: number) => void;
  onRemove: (id: number) => void;
  showMarkDone: boolean;
}

export default function PlanListItem({
  workout,
  done,
  onMarkDone,
  onRemove,
  showMarkDone,
}: PlanListItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-base font-bold uppercase tracking-wide ${
            done ? "text-muted line-through" : "text-text"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} className="text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-text transition hover:border-accent hover:text-accent active:scale-[0.98]"
        >
          View Details
        </Link>
        {showMarkDone && (
          <button
            type="button"
            onClick={() => onMarkDone(workout.id)}
            disabled={done}
            title="Mark as done"
            className="flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase text-black transition disabled:opacity-40"
          >
            <Check size={13} />
            Mark as Done
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          title="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition hover:border-red-400 hover:text-red-400"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
