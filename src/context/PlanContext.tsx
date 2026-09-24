"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import type { Workout } from "@/lib/types";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog-storage";

interface PlanState {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  hydrated: boolean;
}

type Action =
  | { type: "HYDRATE"; payload: Omit<PlanState, "hydrated"> }
  | { type: "ADD_TO_PLAN"; payload: Workout }
  | { type: "REMOVE_FROM_PLAN"; payload: number }
  | { type: "ADD_TO_SAVED"; payload: Workout }
  | { type: "REMOVE_FROM_SAVED"; payload: number }
  | { type: "MARK_DONE"; payload: number };

const initialState: PlanState = {
  plan: [],
  saved: [],
  done: [],
  hydrated: false,
};

function reducer(state: PlanState, action: Action): PlanState {
  switch (action.type) {
    case "HYDRATE":
      return { ...action.payload, hydrated: true };

    case "ADD_TO_PLAN": {
      if (state.plan.length >= PLAN_CAP) return state;
      if (state.plan.some((w) => w.id === action.payload.id)) return state;
      return { ...state, plan: [...state.plan, action.payload] };
    }

    case "REMOVE_FROM_PLAN":
      return {
        ...state,
        plan: state.plan.filter((w) => w.id !== action.payload),
        done: state.done.filter((id) => id !== action.payload),
      };

    case "ADD_TO_SAVED": {
      if (state.saved.some((w) => w.id === action.payload.id)) return state;
      return { ...state, saved: [...state.saved, action.payload] };
    }

    case "REMOVE_FROM_SAVED":
      return {
        ...state,
        saved: state.saved.filter((w) => w.id !== action.payload),
      };

    case "MARK_DONE":
      if (state.done.includes(action.payload)) return state;
      return { ...state, done: [...state.done, action.payload] };

    default:
      return state;
  }
}

interface PlanContextValue {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load persisted state from localStorage once, on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      dispatch({
        type: "HYDRATE",
        payload: {
          plan: parsed.plan ?? [],
          saved: parsed.saved ?? [],
          done: parsed.done ?? [],
        },
      });
    } catch {
      dispatch({ type: "HYDRATE", payload: { plan: [], saved: [], done: [] } });
    }
  }, []);

  // Persist to localStorage whenever data changes (after initial hydration).
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan: state.plan, saved: state.saved, done: state.done })
      );
    } catch {
      // localStorage unavailable — silently ignore.
    }
  }, [state.plan, state.saved, state.done, state.hydrated]);

  const addToPlan = (workout: Workout) => {
    if (state.plan.length >= PLAN_CAP) return false;
    if (state.plan.some((w) => w.id === workout.id)) return false;
    dispatch({ type: "ADD_TO_PLAN", payload: workout });
    return true;
  };

  const removeFromPlan = (id: number) =>
    dispatch({ type: "REMOVE_FROM_PLAN", payload: id });

  const addToSaved = (workout: Workout) => {
    if (state.saved.some((w) => w.id === workout.id)) return false;
    dispatch({ type: "ADD_TO_SAVED", payload: workout });
    return true;
  };

  const removeFromSaved = (id: number) =>
    dispatch({ type: "REMOVE_FROM_SAVED", payload: id });

  const markDone = (id: number) => dispatch({ type: "MARK_DONE", payload: id });

  const isInPlan = (id: number) => state.plan.some((w) => w.id === id);
  const isSaved = (id: number) => state.saved.some((w) => w.id === id);
  const isDone = (id: number) => state.done.includes(id);

  return (
    <PlanContext.Provider
      value={{
        plan: state.plan,
        saved: state.saved,
        done: state.done,
        hydrated: state.hydrated,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markDone,
        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
