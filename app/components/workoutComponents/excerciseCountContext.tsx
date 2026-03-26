import { createContext, PropsWithChildren, useContext, useState } from "react";

type CountContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const CountContext = createContext<CountContextType | undefined>(undefined);

export default function ExerciseCountContext({ children }: PropsWithChildren) {
  const [exerciseCount, setExerciseCount] = useState(0);

  return <CountContext.Provider value={{ count: exerciseCount, setCount: setExerciseCount }}>{children}</CountContext.Provider>;
}

export function useExerciseCountContext() {
  const context = useContext(CountContext);
  if (!context) throw new Error("useExerciseCountContext must be used within ExerciseCountContext");
  return context;
}
