import { create } from "zustand";
import { Workout } from "../../../models/workoutModel";

const defaultWorkout: Workout = {
  id: 0,
  workoutType: "default",
  workoutAlias: "default",
  notes: "",
  startedAt: null,
  finishedAt: null,
  exercises: [],
};

type workoutStore = {
  workout: Workout;
  setWorkout: (p: Partial<Workout>) => void;
  exerciseOrderList: number[];
  setExerciseOrderList: (list: number[]) => void;
  reorder: (destinationIndex: number, cardIndex: number) => void;
};

// Global store for the workout being viewed/edited and its drag-reorder state
export const useWorkoutStore = create<workoutStore>((set) => ({
  workout: defaultWorkout,
  exerciseOrderList: [],
  setWorkout: (properties: Partial<Workout>) => {
    set((state) => ({ workout: { ...state.workout, ...properties } }));
  },

  setExerciseOrderList: (list: number[]) => {
    set({ exerciseOrderList: list });
  },

  // Moves a card from currentIndex to destinationIndex in the order list
  reorder: (destinationIndex: number, currentIndex: number) => {
    set((state) => {
      let newList = [...state.exerciseOrderList];
      let item = newList.splice(currentIndex, 1)[0];
      newList.splice(destinationIndex, 0, item);
      return { exerciseOrderList: newList };
    });
  },
}));

type activeCardStore = {
  activeCardIndex: number | null;
  setActiveCardIndex: (index: number | null) => void;
};

// Tracks which exercise card is currently being dragged (by its list index)
export const useActiveCardStore = create<activeCardStore>((set) => ({
  activeCardIndex: null,

  setActiveCardIndex: (index: number | null) => {
    set({ activeCardIndex: index });
  },
}));
