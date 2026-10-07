import { Workout } from "@/types";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export async function getWorkoutById(
  id: string
): Promise<Workout | undefined> {
  const workouts = await getWorkouts();

  return workouts.find(
    (workout) => workout.id === Number(id)
  );
}