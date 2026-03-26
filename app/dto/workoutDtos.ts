export type SetDto = {
  id: number;
  setNumber: number;
  reps: number;
  weight: number;
};

export type ExerciseDto = {
  id: number;
  exerciseKey: string;
  exerciseName: string;
  orderIndex: number;
  sets: SetDto[];
};

export type WorkoutDto = {
  id: number;
  userId: number;
  workoutType: string;
  workoutAlias: string | null;
  // notes: string | null;
  // startedAt: string | null; // ISO string
  // finishedAt: string | null; // ISO string
  exercises: ExerciseDto[];
};

export type ExerciseMetaDto = {
  id: number;
  exerciseKey: string;
  exerciseName: string;
  targetMuscleGroup: string;
};

// Create DTOs (no id, for POST requests)
export type CreateSetDto = Omit<SetDto, "id" | "startedAt" | "finishedAT">;
export type CreateExerciseDto = Omit<ExerciseDto, "id" | "sets"> & { sets: CreateSetDto[] };
export type CreateWorkoutDto = Omit<WorkoutDto, "id" | "exercises"> & { exercises: CreateExerciseDto[] };
