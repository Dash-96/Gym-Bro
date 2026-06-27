import { createContext, PropsWithChildren, useContext, useState } from "react";

type WorkoutTrackerContext = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isStarted: boolean;
  setISStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setsCount: number;
  setSetsCount: React.Dispatch<React.SetStateAction<number>>;
};

const WorkoutTracker = createContext<WorkoutTrackerContext | undefined>(undefined);

export default function WorkoutTrackerContext({ children }: PropsWithChildren) {
  const [exerciseCount, setExerciseCount] = useState(0);
  const [setsCount, setSetsCount] = useState(0);
  const [isStarted, setISStarted] = useState(false);

  return (
    <WorkoutTracker.Provider value={{ count: exerciseCount, setCount: setExerciseCount, isStarted, setISStarted, setSetsCount, setsCount }}>
      {children}
    </WorkoutTracker.Provider>
  );
}

export function useWorkoutTrackerContext() {
  const context = useContext(WorkoutTracker);
  if (!context) throw new Error("useExerciseCountContext must be used within ExerciseCountContext");
  return context;
}
