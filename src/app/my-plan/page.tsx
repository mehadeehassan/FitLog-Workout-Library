'use client';

import PlanListItem from '@/components/PlanListItem';
import SortDropdown from '@/components/SortDropdown';
import { usePlan } from '@/context/PlanContext';
import type { SortKey } from '@/lib/types';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

type TabKey = 'plan' | 'saved';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'plan', label: "Today's Plan" },
  { key: 'saved', label: 'Saved' },
];

const TAB_PILL_ACTIVE =
  'rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition bg-surface-2 text-text';
const TAB_PILL_INACTIVE =
  'rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition text-muted hover:text-text';

export default function MyPlanPage() {
  const [tab, setTab] = useState<TabKey>('plan');
  const [sortBy, setSortBy] = useState<SortKey>('duration');

  const { plan, saved, done, removeFromPlan, removeFromSaved, markDone, hydrated } = usePlan();

  const activeList = tab === 'plan' ? plan : saved;

  const sortedList = useMemo(
    () => [...activeList].sort((a, b) => b[sortBy] - a[sortBy]),
    [activeList, sortBy],
  );

  const metrics = useMemo(
    () =>
      activeList.reduce(
        (acc, w) => ({
          exercises: acc.exercises + 1,
          minutes: acc.minutes + w.duration,
          calories: acc.calories + w.caloriesBurned,
        }),
        { exercises: 0, minutes: 0, calories: 0 },
      ),
    [activeList],
  );

  const handleMarkDone = (id: number) => {
    markDone(id);
    toast.success('Marked as done');
  };

  const handleRemove = (id: number) => {
    if (tab === 'plan') {
      removeFromPlan(id);
      toast('Removed from plan');
    } else {
      removeFromSaved(id);
      toast('Removed from saved');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Exercises" value={hydrated ? metrics.exercises : 0} />
        <StatCard label="Minutes" value={hydrated ? metrics.minutes : 0} />
        <StatCard label="Calories" value={hydrated ? metrics.calories : 0} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={tab === t.key ? TAB_PILL_ACTIVE : TAB_PILL_INACTIVE}
            >
              {t.label}
            </button>
          ))}
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="mt-6">
        {!hydrated ? (
          <p className="py-10 text-center text-sm text-muted">Loading workouts…</p>
        ) : sortedList.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-16 text-center">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-text">
              Nothing Here Yet
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 active:scale-[0.98]"
            >
              Go to Workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedList.map((workout) => (
              <PlanListItem
                key={workout.id}
                workout={workout}
                done={done.includes(workout.id)}
                onMarkDone={handleMarkDone}
                onRemove={handleRemove}
                showMarkDone={tab === 'plan'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-5">
      <span className="font-display text-2xl font-bold text-accent sm:text-3xl">{value}</span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
    </div>
  );
}
