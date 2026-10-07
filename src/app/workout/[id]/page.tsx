"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Workout } from "@/types";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    addToToday,
    saveForLater,
    isInTodayPlan,
    isSaved,
  } = usePlan();

  useEffect(() => {
    async function loadWorkout() {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const workouts: Workout[] = await response.json();

        const selectedWorkout = workouts.find(
          (item) => item.id === id
        );

        setWorkout(selectedWorkout ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[500px] items-center justify-center">
        <p className="text-gray-400">
          Loading workout...
        </p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-[500px] items-center justify-center">
        <p className="text-gray-400">
          Workout not found.
        </p>
      </main>
    );
  }

  const alreadyInPlan = isInTodayPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  return (
    <main className="px-5 py-7">
      <div className="grid grid-cols-2 gap-8">

        {/* IMAGE */}
        <div>
          <Image
            src={workout.image}
            alt={workout.name}
            width={700}
            height={700}
            className="w-full rounded-xl object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            {workout.name}
          </h1>

          <p className="mt-3 text-gray-400">
            {workout.description}
          </p>

          {/* MUSCLE GROUPS */}
          <div className="mt-4 flex gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-lime-400 px-3 py-1 text-sm text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* WORKOUT INFO */}
          <div className="mt-5 rounded-xl border border-gray-800">
            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-sm text-gray-400">
                EQUIPMENT
              </span>
              <span className="text-white">
                {workout.equipment}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-sm text-gray-400">
                DIFFICULTY
              </span>
              <span className="text-white">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-sm text-gray-400">
                SETS
              </span>
              <span className="text-white">
                {workout.sets}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-sm text-gray-400">
                REPS
              </span>
              <span className="text-white">
                {workout.reps}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-sm text-gray-400">
                DURATION
              </span>
              <span className="text-white">
                {workout.duration} min
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-sm text-gray-400">
                CALORIES
              </span>
              <span className="text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex justify-between p-4">
              <span className="text-sm text-gray-400">
                RATING
              </span>
              <span className="text-white">
                {workout.rating}
              </span>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="mt-6">
            <h2 className="font-bold text-white">
              INSTRUCTIONS
            </h2>

            <ol className="mt-3 space-y-3 text-sm text-gray-400">
              {workout.instructions.map(
                (instruction, index) => (
                  <li key={instruction}>
                    {index + 1}. {instruction}
                  </li>
                )
              )}
            </ol>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-3">

            {/* ADD TO TODAY'S PLAN */}
            <button
              onClick={() => addToToday(workout.id)}
              disabled={alreadyInPlan}
              className="rounded-lg bg-lime-400 px-5 py-3 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {alreadyInPlan
                ? "Added to today's plan"
                : "Add to today's plan"}
            </button>

            {/* SAVE FOR LATER */}
            <button
              onClick={() => saveForLater(workout.id)}
              disabled={alreadySaved}
              className="rounded-lg border border-gray-700 px-5 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {alreadySaved
                ? "Saved"
                : "Save for later"}
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}