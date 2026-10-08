import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
    >
      <article className="cursor-pointer overflow-hidden rounded-[20px] border border-neutral-800 bg-[#16171c] text-white transition-colors group-hover:border-lime-300/60">
        <Image
          src={workout.image}
          alt={workout.name}
          width={700}
          height={700}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] w-full object-cover object-top"
        />

        <div className="px-4 pb-4 pt-[18px] sm:px-5">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-lime-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-900"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="mb-1 mt-[18px] break-words font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase leading-tight tracking-wide sm:text-[28px]">
            {workout.name}
          </h3>

          <p className="text-[15px] text-neutral-400">{workout.equipment}</p>

          <div className="mt-[18px] flex flex-wrap gap-x-[18px] gap-y-2 border-t border-neutral-800 pt-3.5 text-sm text-neutral-400">
            <span className="flex items-center gap-[7px]">
              <Clock size={18} aria-hidden /> {workout.duration} min
            </span>
            <span className="flex items-center gap-[7px]">
              <Flame size={18} aria-hidden /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-[7px]">
              <Star size={18} aria-hidden /> {workout.rating}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
