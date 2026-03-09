export type SetDto = {
  id: number;
  setNumber: number;
  reps: number;
  weight: number;
};

export type ExerciseDto = {
  id: number;
  excerciseKey: string;
  excerciseName: string;
  orderIndex: number;
  sets: SetDto[];
};

export type WorkoutDto = {
  id: number;
  workoutType: string;
  workoutAlias: string | null;
  notes: string | null;
  startedAt: string | null; // ISO string
  finishedAt: string | null; // ISO string
  exercises: ExerciseDto[];
};

export type ExerciseMetaDto = {
  id: number;
  exerciseKey: string;
  exerciseName: string;
  targetMuscleGroup: string;
};

// Create DTOs (no id, for POST requests)
export type CreateSetDto = Omit<SetDto, "id">;
export type CreateExerciseDto = Omit<ExerciseDto, "id"> & { sets: CreateSetDto[] };
export type CreateWorkoutDto = Omit<WorkoutDto, "id"> & { exercises: CreateExerciseDto[] };
