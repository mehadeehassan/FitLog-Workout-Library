import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();
  // if (true) throw new Error("test error");

  return (
    <>
      <Hero />
      <LibrarySection workouts={workouts} />
    </>
  );
}
