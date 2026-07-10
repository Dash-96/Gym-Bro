import { submitWorkoutToRemote } from "@/src/api/workoutAPI";
import { useWorkoutTrackerContext } from "@/src/app/components/workoutComponents/workoutTrackrContext";
import { Workout } from "@/src/models/workoutModel";
import { updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export function useTimerTicker(rest: String = "") {
  const { setsCount, isStarted } = useWorkoutTrackerContext();
  const [restDuration, setRestDuration] = useState({ hours: "00", minutes: "02", seconds: "00" });
  const [, setTotalSecondsRemaining] = useState(() => {
    if (!rest) return 120;
    const [h, m, s] = rest.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  });

  useEffect(() => {
    if (setsCount > 0) {
      const [h, m, s] = (rest || "00:02:00").split(":").map(Number);
      setTotalSecondsRemaining(h * 3600 + m * 60 + s);
      setRestDuration({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }
  }, [rest, setsCount]);

  useEffect(() => {
    if (setsCount == 0) return;
    const interval = setInterval(() => {
      setTotalSecondsRemaining((prev) => {
        if (prev <= 0) {
          // clearInterval(interval);
          return 0;
        }
        const diff = prev - 1;
        const seconds = Math.floor(diff % 60);
        const minutes = Math.floor((diff % 3600) / 60);
        const hours = Math.floor(diff / 3600);
        setRestDuration({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
        return diff;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]);

  function alterTime(time: number) {
    setTotalSecondsRemaining((prev) => {
      const diff = prev - time;
      const seconds = Math.floor(diff % 60);
      const minutes = Math.floor((diff % 3600) / 60);
      const hours = Math.floor(diff / 3600);
      setRestDuration({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
      return diff;
    });
  }

  return { restDuration, alterTime };
}

export function useFinishWorkout(workoutState: Workout) {
  const resetWorkoutState = useWorkoutStore((state) => state.resetWorkout);
  async function finishWorkout() {
    const finishTime = new Date();
    const tempWorkoutState = { ...workoutState };
    tempWorkoutState.finishedAt = finishTime;
    /// Saves workout to local DB
    await updateWorkout(tempWorkoutState);
    /// Save the workout to remote DB
    submitWorkoutToRemote(tempWorkoutState);
    resetWorkoutState();
    router.replace("/(tabs)/home");
  }
  return finishWorkout;
}
