import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

interface LibrarySectionProps {
  workouts: Workout[];
}

export default function LibrarySection({
  workouts,
}: LibrarySectionProps) {
  return (
    <section>
      <h2>THE LIBRARY</h2>

      <p>Twelve lifts covering every major muscle group.</p>

      <div className="grid grid-cols-3 gap-4">
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