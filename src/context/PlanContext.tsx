"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface PlanContextType {
  todayPlan: number[];
  saved: number[];
  completed: number[];

  addToToday: (id: number) => void;
  saveForLater: (id: number) => void;

  removeFromToday: (id: number) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInTodayPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todayPlan, setTodayPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  // Load data
  useEffect(() => {
    const storedToday = localStorage.getItem("fitlog-today");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedCompleted =
      localStorage.getItem("fitlog-completed");

    if (storedToday) {
      setTodayPlan(JSON.parse(storedToday));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  // Save today's plan
  useEffect(() => {
    localStorage.setItem(
      "fitlog-today",
      JSON.stringify(todayPlan)
    );
  }, [todayPlan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);

  // Save completed workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed]);

  const addToToday = (id: number) => {
    setTodayPlan((current) => {
      if (current.includes(id)) {
        return current;
      }

      // Maximum 5 exercises
      if (current.length >= 5) {
        return current;
      }

      return [...current, id];
    });
  };

  const saveForLater = (id: number) => {
    setSaved((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const removeFromToday = (id: number) => {
    setTodayPlan((current) =>
      current.filter((workoutId) => workoutId !== id)
    );

    // Also remove completed status
    setCompleted((current) =>
      current.filter((workoutId) => workoutId !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSaved((current) =>
      current.filter((workoutId) => workoutId !== id)
    );
  };

  const markAsDone = (id: number) => {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const isInTodayPlan = (id: number) => {
    return todayPlan.includes(id);
  };

  const isSaved = (id: number) => {
    return saved.includes(id);
  };

  const isCompleted = (id: number) => {
    return completed.includes(id);
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        saved,
        completed,

        addToToday,
        saveForLater,

        removeFromToday,
        removeFromSaved,

        markAsDone,

        isInTodayPlan,
        isSaved,
        isCompleted,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}