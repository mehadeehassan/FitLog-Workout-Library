"use client";

import toast from "react-hot-toast";
import { CalendarPlus, Bookmark, BookmarkCheck, CalendarCheck } from "lucide-react";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, plan, hydrated } = usePlan();

  const inPlan = hydrated && isInPlan(workout.id);
  const saved = hydrated && isSaved(workout.id);
  const planFull = hydrated && plan.length >= PLAN_CAP && !inPlan;

  const handleAddToPlan = () => {
    const added = addToPlan(workout);
    if (added) {
      toast.success("Added to today's plan");
    } else if (inPlan) {
      toast("Already in today's plan");
    } else {
      toast.error("Today's plan is full (5 lifts)");
    }
  };

  const handleSave = () => {
    const added = addToSaved(workout);
    if (added) {
      toast.success("Saved for later");
    } else {
      toast("Already saved");
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={inPlan || planFull}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {inPlan ? <CalendarCheck size={16} /> : <CalendarPlus size={16} />}
        {inPlan ? "In Today's Plan" : "Add to Today's Plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={saved}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-text transition hover:border-accent hover:text-accent active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        {saved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}
