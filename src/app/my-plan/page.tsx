"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Workout } from "@/types";
import { getWorkouts } from "@/utils/api";
import { usePlan } from "@/context/PlanContext";

type Tab = "today" | "saved";
type SortOption = "duration" | "caloriesBurned" | "rating";

export default function MyPlan() {
  const {
    todayPlan,
    saved,
    removeFromToday,
    removeFromSaved,
    markAsDone,
    isCompleted,
  } = usePlan();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("today");

  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const currentIds = activeTab === "today" ? todayPlan : saved;

  const currentWorkouts = useMemo(() => {
    const filtered = workouts.filter((workout) =>
      currentIds.includes(workout.id),
    );

    return [...filtered].sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
  }, [workouts, currentIds, sortBy]);

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <main className="px-6 py-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">MY PLAN</h1>

        <p className="mt-2 text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 rounded-xl border border-gray-800 bg-[#15181f]">
        <div className="p-5">
          <p className="text-sm text-gray-500">Exercises</p>

          <p className="mt-1 text-3xl font-bold text-lime-400">
            {currentWorkouts.length}
          </p>
        </div>

        <div className="border-l border-gray-800 p-5">
          <p className="text-sm text-gray-500">Minutes</p>

          <p className="mt-1 text-3xl font-bold text-white">{totalMinutes}</p>
        </div>

        <div className="border-l border-gray-800 p-5">
          <p className="text-sm text-gray-500">Calories</p>

          <p className="mt-1 text-3xl font-bold text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex rounded-lg bg-[#15181f] p-1">
          <button
            onClick={() => setActiveTab("today")}
            className={`rounded-md px-4 py-2 text-sm ${
              activeTab === "today"
                ? "bg-[#242a34] text-white"
                : "text-gray-500"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-4 py-2 text-sm ${
              activeTab === "saved"
                ? "bg-[#242a34] text-white"
                : "text-gray-500"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort By</span>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="rounded-lg border border-gray-700 bg-[#15181f] px-3 py-2 text-sm text-white"
          >
            <option value="duration">Duration</option>

            <option value="caloriesBurned">Calories</option>

            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Workout List */}
      <div className="mt-5 space-y-3">
        {loading ? (
          <p className="py-10 text-center text-gray-400">Loading workouts…</p>
        ) : currentWorkouts.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-xl font-bold text-white">NOTHING HERE YET</h2>

            <p className="mt-2 text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-lime-400 px-5 py-3 text-sm font-medium text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          currentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#15181f] p-3"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-16 w-28 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-bold text-white">{workout.name}</h3>

                  <p className="text-sm text-gray-500">{workout.equipment}</p>

                  <div className="mt-1 flex gap-3 text-xs text-gray-400">
                    <span>◷ {workout.duration} min</span>

                    <span>● {workout.caloriesBurned} kcal</span>

                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/workout/${workout.id}`}
                  className="rounded-full border border-gray-700 px-4 py-2 text-xs text-white"
                >
                  View Details
                </Link>

                {activeTab === "today" && (
                  <button
                    onClick={() => markAsDone(workout.id)}
                    disabled={isCompleted(workout.id)}
                    className={`rounded-full px-4 py-2 text-xs font-medium ${
                      isCompleted(workout.id)
                        ? "bg-gray-700 text-gray-400"
                        : "bg-lime-400 text-black"
                    }`}
                  >
                    {isCompleted(workout.id) ? "✓ Done" : "✓ Mark as Done"}
                  </button>
                )}

                <button
                  onClick={() => {
                    if (activeTab === "today") {
                      removeFromToday(workout.id);
                    } else {
                      removeFromSaved(workout.id);
                    }
                  }}
                  className="px-2 text-gray-500 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
