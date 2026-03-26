/**
 * mapper.ts
 *
 * Responsible for converting between raw SQLite DB models (snake_case, flat)
 * and the UI/domain models (camelCase, nested) used throughout the app.
 *
 * DB models are defined in dbModels.ts and reflect the exact SQLite schema.
 * UI models are defined in models/workoutModel.ts and are used in the store, repo, and components.
 */

import { Exercise, ExerciseMeta, Set, Workout } from "../models/workoutModel";
import { ExerciseDbModel, ExerciseMetaDbModel, SetDbModel, WorkoutDbModel } from "./dbModels";

// DB model -> UI model
export function mapSetDbModelToModel(row: SetDbModel): Set {
  return {
    id: row.id,
    setNumber: row.set_number,
    reps: row.reps,
    weight: row.weight,
  };
}

export function mapExerciseDbModelToModel(row: ExerciseDbModel, sets: SetDbModel[]): Exercise {
  return {
    id: row.id,
    excerciseKey: row.exercise_key,
    excerciseName: row.excercise_name,
    orderIndex: row.order_index,
    sets: sets.map(mapSetDbModelToModel),
  };
}

export function mapWorkoutDbModelToModel(row: WorkoutDbModel, exercises: Exercise[]): Workout {
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

export function mapExerciseMetaDbModelToModel(row: ExerciseMetaDbModel): ExerciseMeta {
  return {
    id: row.id,
    exerciseKey: row.exercise_key,
    exerciseName: row.exercise_name,
    targetMuscleGroup: row.target_muscle_group,
  };
}

// UI model -> DB model
// Currently unused — inserts/updates in workoutRepo.ts map fields inline in SQL calls.
// Kept here in case a more structured approach is needed in the future.

// export function mapModelToSetDbModel(set: Set, workoutExerciseId: number): Omit<SetDbModel & { workout_exercise_id: number }, "id"> {
//   return {
//     workout_exercise_id: workoutExerciseId,
//     set_number: set.setNumber,
//     reps: set.reps,
//     weight: set.weight,
//   };
// }

// export function mapModelToExerciseDbModel(exercise: Exercise, workoutId: number): Omit<ExerciseDbModel & { workout_id: number }, "id"> {
//   return {
//     workout_id: workoutId,
//     exercise_key: exercise.excerciseKey,
//     excercise_name: exercise.excerciseName,
//     order_index: exercise.orderIndex,
//   };
// }

// export function mapModelToExerciseMetaDbModel(meta: ExerciseMeta): Omit<ExerciseMetaDbModel, "id"> {
//   return {
//     exercise_key: meta.exerciseKey,
//     exercise_name: meta.exerciseName,
//     target_muscle_group: meta.targetMuscleGroup,
//   };
// }

// export function mapModelToWorkoutDbModel(workout: Workout): Omit<WorkoutDbModel, "id"> {
//   return {
//     workout_type: workout.workoutType,
//     workout_alias: workout.workoutAlias,
//     notes: workout.notes,
//     started_at: workout.startedAt ? workout.startedAt.toISOString() : null,
//     finished_at: workout.finishedAt ? workout.finishedAt.toISOString() : null,
//   };
// }
