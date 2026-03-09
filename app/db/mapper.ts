import { Exercise, ExerciseMeta, Set, Workout } from "../(tabs)/home/models/workoutModel";

// Raw DB row types (snake_case from SQLite)
export type WorkoutRow = {
  id: number;
  workout_type: string;
  workout_alias: string | null;
  notes: string | null;
  started_at: string | null;
  finished_at: string | null;
};

export type ExerciseRow = {
  id: number;
  exercise_key: string;
  excercise_name: string;
  order_index: number;
};

export type SetRow = {
  id: number;
  set_number: number;
  reps: number;
  weight: number;
};

export type ExerciseMetaRow = {
  id: number;
  exercise_key: string;
  exercise_name: string;
  target_muscle_group: string;
};

// DB row -> DTO
export function mapRowToSet(row: SetRow): Set {
  return {
    id: row.id,
    setNumber: row.set_number,
    reps: row.reps,
    weight: row.weight,
  };
}

export function mapRowToExercise(row: ExerciseRow, sets: SetRow[]): Exercise {
  return {
    id: row.id,
    excerciseKey: row.exercise_key,
    excerciseName: row.excercise_name,
    orderIndex: row.order_index,
    sets: sets.map(mapRowToSet),
  };
}

export function mapRowToWorkout(row: WorkoutRow, exercises: Exercise[]): Workout {
  return {
    id: row.id,
    workoutType: row.workout_type,
    workoutAlias: row.workout_alias,
    notes: row.notes,
    startedAt: row.started_at ? new Date(row.started_at) : null,
    finishedAt: row.finished_at ? new Date(row.finished_at) : null,
    exercises: exercises,
  };
}

export function mapRowToExerciseMeta(row: ExerciseMetaRow): ExerciseMeta {
  return {
    id: row.id,
    exerciseKey: row.exercise_key,
    exerciseName: row.exercise_name,
    targetMuscleGroup: row.target_muscle_group,
  };
}

// DTO -> DB row (for inserts/updates)
export function mapSetToRow(set: Set, workoutExerciseId: number): Omit<SetRow & { workout_exercise_id: number }, "id"> {
  return {
    workout_exercise_id: workoutExerciseId,
    set_number: set.setNumber,
    reps: set.reps,
    weight: set.weight,
  };
}

export function mapExerciseToRow(exercise: Exercise, workoutId: number): Omit<ExerciseRow & { workout_id: number }, "id"> {
  return {
    workout_id: workoutId,
    exercise_key: exercise.excerciseKey,
    excercise_name: exercise.excerciseName,
    order_index: exercise.orderIndex,
  };
}

export function mapExerciseMetaToRow(meta: ExerciseMeta): Omit<ExerciseMetaRow, "id"> {
  return {
    exercise_key: meta.exerciseKey,
    exercise_name: meta.exerciseName,
    target_muscle_group: meta.targetMuscleGroup,
  };
}

export function mapWorkoutToRow(workout: Workout): Omit<WorkoutRow, "id"> {
  return {
    workout_type: workout.workoutType,
    workout_alias: workout.workoutAlias,
    notes: workout.notes,
    started_at: workout.startedAt ? workout.startedAt.toISOString() : null,
    finished_at: workout.finishedAt ? workout.finishedAt.toISOString() : null,
  };
}
