// Core domain models used throughout the app (store, repo, UI)
export type Workout = {
  id?: number;
  workoutType: string;
  workoutAlias: string | null;
  notes: string | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  exercises: Exercise[];
};

export type Exercise = {
  id?: number;
  excerciseKey: string;
  excerciseName: string;
  orderIndex: number;
  sets: Set[];
};

export type Set = {
  id?: number;
  setNumber: number;
  reps: number;
  weight: number;
};

// Catalog entry for an exercise — used to populate the exercise picker dropdown
export type ExerciseMeta = {
  id: number;
  exerciseKey: string;
  exerciseName: string;
  targetMuscleGroup: string;
};
