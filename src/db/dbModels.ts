// Raw DB model types (snake_case from SQLite)
export type WorkoutDbModel = {
  id: number;
  workout_type: string;
  workout_alias: string | null;
  notes: string | null;
  started_at: string | null;
  finished_at: string | null;
};

export type ExerciseDbModel = {
  id: number;
  exercise_key: string;
  excercise_name: string;
  order_index: number;
};

export type SetDbModel = {
  id: number;
  set_number: number;
  reps: number;
  weight: number;
};

export type ExerciseMetaDbModel = {
  id: number;
  exercise_key: string;
  exercise_name: string;
  target_muscle_group: string;
};
