"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import type { Workout, SortKey } from "@/lib/types";

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = workouts;
    if (q) {
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tag"
              className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none sm:w-56"
            />
          </div>

          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          No workouts match your search.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
