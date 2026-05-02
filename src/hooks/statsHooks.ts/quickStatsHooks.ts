import { getUserExercises, getWorkoutAmountStats } from "@/src/repositories/statsRepository";
import { useEffect, useState } from "react";

export function useQuickStats() {
  // type QuickStats = {
  //   workoutStats: Awaited<ReturnType<typeof getWorkoutAmountStats>>["currentStats"] & { change: "up" | "down"; percent: number };
  // };
  type QuickStats = { value: number; change: "up" | "down"; changePercent: number };
  let workoutStats;
  let setsStats;
  let volumeStats;
  // let quickStats: { workoutStats: QuickStats; setsStats: QuickStats; volumeStats: QuickStats };
  const [quickStats, setQuickStats] = useState<{ workoutStats: QuickStats; setsStats: QuickStats; volumeStats: QuickStats }>();
  useEffect(() => {
    (async () => {
      try {
        let { currentStats, prevStats } = await getWorkoutAmountStats();
        let workoutChange: "up" | "down" = currentStats.workoutCount > prevStats.workoutCount ? "up" : "down";
        let workoutPercent = Math.abs(((currentStats.workoutCount - prevStats.workoutCount) / prevStats.workoutCount) * 100);
        workoutStats = { value: currentStats.workoutCount, change: workoutChange, changePercent: workoutPercent };

        let setsChange: "up" | "down" = currentStats.setsCount > prevStats.setsCount ? "up" : "down";
        let setsPercent = Math.abs(((currentStats.setsCount - prevStats.setsCount) / prevStats.setsCount) * 100);
        setsStats = { value: currentStats.setsCount, change: setsChange, changePercent: setsPercent };

        let volumeChange: "up" | "down" = currentStats.volume > prevStats.volume ? "up" : "down";
        let volumePercent = Math.abs(((currentStats.volume - prevStats.volume) / prevStats.volume) * 100);
        volumeStats = { value: currentStats.volume, change: volumeChange, changePercent: volumePercent };

        setQuickStats({ workoutStats, setsStats, volumeStats });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return quickStats;
}

export function useExercieProgressDropDown() {
  type dropDownItemData = Awaited<ReturnType<typeof getUserExercises>>; //sets the type to be of the object i get back from the db
  type dropDownItem = { title?: string; data: dropDownItemData };
  const [exercises, setExercises] = useState<dropDownItem[]>([]);
  useEffect(() => {
    (async () => {
      const exerciseNames = await getUserExercises();
      const dropDownItems = [{ data: exerciseNames }];
      setExercises(dropDownItems);
      // console.log(dropDownItems);
    })();
  }, []);
  return exercises;
}
