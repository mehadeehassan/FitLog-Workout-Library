# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js + TypeScript. Browse a library of 12 workouts, build today's plan, save lifts for later, and track your session totals — all persisted locally so it survives a reload.

**Live Link:** _add your deployed URL here_
**GitHub Repository Link:** _add your repo URL here_

## Description

FitLog lets you pick a lift from the library, lock it into today's plan (capped at 5), or save it for later. The My Plan page shows live totals (exercises, minutes, calories) for whichever tab is open, lets you sort, mark lifts as done, or remove them, and keeps everything in `localStorage` so your plan survives a page refresh.

## Technologies Used

- **Next.js 16** (App Router) — routing, server components, data fetching
- **TypeScript** — typed components, context, and API layer
- **React 19** with the **Context API** (`useReducer` + `useContext`) — global state for plan/saved/done, synced to `localStorage`
- **Tailwind CSS v4** — CSS-first theme (`@import "tailwindcss"` + `@theme` tokens) for styling and responsive layout
- **react-hot-toast** — toast notifications for every user action
- **lucide-react** — icon set (clock, flame, star, check, bookmark, etc.)
- **next/font/google** — Oswald (display headings) + Inter (body text)

## Features

1. **Responsive workout library** — 12 lifts fetched from a live API, displayed in a 3-column grid on desktop that collapses to 1–2 columns on tablet/mobile, each card showing image, category tags, name, equipment, and a duration/calories/rating stats row.
2. **Sort & search everywhere** — a "Sort By" dropdown (Duration / Calories / Rating, default Duration) on both the Library and My Plan pages, plus a live search box on the Library that filters by name or muscle-group tag.
3. **Workout detail pages** — two-column layout with a full spec table (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
4. **Plan & save with live toasts** — "Add to Today's Plan" and "Save for Later" buttons update shared Context state, disable themselves once already added, enforce a 5-lift plan cap, and fire a toast notification on every action.
5. **My Plan dashboard** — pill-style Today's Plan / Saved tabs, live stat cards (Exercises, Minutes, Calories) that recompute for whichever tab is open, per-item "View Details / Mark as Done / Remove" controls, an empty state, and full `localStorage` persistence so nothing is lost on reload.
6. **Polished navigation & states** — sticky navbar with a highlighted active-link pill and live Plan/Saved badge counts (both linking to My Plan), a themed 404 page, and a loading skeleton while the library fetches.

## Where things connect

| Action | Where it happens | What updates |
|---|---|---|
| Click a library card | Home (`/`) → Workout Detail (`/workout/[id]`) | Navigates to that workout's page |
| "Add to Today's Plan" | Workout Detail page | Adds the workout to **My Plan → Today's Plan** tab, increments the **Plan** navbar badge, shows a toast |
| "Save for Later" | Workout Detail page | Adds the workout to **My Plan → Saved** tab, increments the **Saved** navbar badge, shows a toast |
| Navbar **Plan** / **Saved** badges | Any page (navbar) | Both link to `/my-plan` |
| "View Details" (My Plan list item) | My Plan page | Opens that workout's Detail page |
| "Mark as Done" (My Plan list item) | My Plan page, Today's Plan tab only | Marks the item done (strikethrough), shows a toast |
| "X" remove (My Plan list item) | My Plan page | Removes the item from whichever tab it's in, decrements the matching navbar badge, shows a toast |
| Today's Plan / Saved tabs | My Plan page | Switches the list AND recalculates the Exercises/Minutes/Calories stat cards for that tab |
| "Browse Workouts" (Hero CTA) | Home page | Smooth-scrolls down to the `#library` section on the same page |
| "Go to Workouts" (My Plan empty state) | My Plan page | Navigates back to `/` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/app/            Routes (Home, Workout Detail, My Plan, 404, loading,error)
src/components/     UI components (Navbar, Hero, cards, tabs, sort dropdown)
src/context/        PlanContext.tsx — Context API store for plan/saved/done
src/lib/            api.ts (fetch helpers), types.ts (Workout type)
public/             logo.png, banner.png
```

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`
