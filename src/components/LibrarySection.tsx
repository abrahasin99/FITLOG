import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

interface LibrarySectionProps {
  workouts: Workout[];
}

export default function LibrarySection({
  workouts,
}: LibrarySectionProps) {
  return (
    <section id="library" className="scroll-mt-6 p-7">
      <h2 className="font-extrabold text-4xl">THE LIBRARY</h2>

      <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
      <br></br>

      <div className="grid grid-cols-3 gap-4 place-content-around">
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