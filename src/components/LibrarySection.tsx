import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

interface LibrarySectionProps {
  workouts: Workout[];
}

export default function LibrarySection({
  workouts,
}: LibrarySectionProps) {
  return (
    <section id="library" className="scroll-mt-6 p-4 sm:p-7">
      <h2 className="font-extrabold text-3xl sm:text-4xl">THE LIBRARY</h2>

      <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
      <br></br>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 place-content-around">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
  );
}
