import Link from "next/link";
import Image from "next/image";
import type { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <article className="cursor-pointer">
        <Image src={workout.image} alt={workout.name} width={700} height={700}/>

        <div>
          {workout.muscleGroups.map((muscle) => (
            <span key={muscle}>{muscle}</span>
          ))}
        </div>

        <h3>{workout.name}</h3>

        <p>{workout.equipment}</p>

        <div>
          <span>{workout.duration} min</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </article>
    </Link>
  );
}
