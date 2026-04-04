import { getWorkoutAmountStats } from "@/src/repositories/statsRepository";
import { useEffect, useState } from "react";

export function useQuickStats() {
  type QuickStats = {
    workoutStats: Awaited<ReturnType<typeof getWorkoutAmountStats>> & { change: "up" | "down"; percent: number };
  };
  const [quickstats, setQuickStats] = useState<QuickStats>();
  useEffect(() => {
    (async () => {
      try {
        let workoutStats = await getWorkoutAmountStats();
        let workoutChange: "up" | "down" = workoutStats.currentAmount > workoutStats.prevAmount ? "up" : "down";
        let workoutPercent = Math.abs(((workoutStats.currentAmount - workoutStats.prevAmount) / workoutStats.prevAmount) * 100);
        setQuickStats((prev) => ({ ...prev, workoutStats: { ...workoutStats, change: workoutChange, percent: workoutPercent } }));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return { quickstats };
}
