import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/utils/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero/>
      <LibrarySection workouts={workouts} />
    </>
  );
}
