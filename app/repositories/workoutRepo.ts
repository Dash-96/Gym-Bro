import { Exercise, ExerciseMeta, Workout, Set as WorkoutSet } from "../(tabs)/home/models/workoutModel";
import { db } from "../db/db";
import { ExerciseMetaRow, ExerciseRow, SetRow, WorkoutRow, mapRowToExercise, mapRowToExerciseMeta, mapRowToWorkout } from "../db/mapper";

// Type-safe guards to ensure records have been persisted (have an id) before updates
function assertWorkoutHasId(w: Workout): asserts w is Workout & { id: number } {
  if (typeof w.id !== "number") throw new Error("Workout is not persisted yet");
}

function assertExerciseHasId(e: Exercise): asserts e is Exercise & { id: number } {
  if (typeof e.id !== "number") throw new Error("Exercise is not persisted yet");
}

function assertSetHasId(s: WorkoutSet): asserts s is WorkoutSet & { id: number } {
  if (typeof s.id !== "number") throw new Error("Set is not persisted yet");
}

// Inserts a full workout with all its exercises and sets in a single transaction
export async function insertWorkout(workout: Workout) {
  const session = await db;
  await session.withTransactionAsync(async () => {
    try {
      const wortoutStatement =
        await session.prepareAsync(`INSERT INTO workouts (user_id , workout_type , workout_alias , started_at , finished_at , notes , created_at , updated_at) 
            VALUES($user_id, $workout_type, $workout_alias, $started_at, $finished_at, $notes, datetime('now'), datetime('now'))`);
      let insertedWorkout = await wortoutStatement.executeAsync({
        $user_id: 1,
        $workout_type: workout.workoutType,
        $workout_alias: workout.workoutAlias,
        $started_at: null,
        $finished_at: null,
        $notes: workout.notes,
      });
      const workoutId = insertedWorkout.lastInsertRowId;

      const exerciseStatement = await session.prepareAsync(
        `INSERT INTO workout_exercises (workout_id, exercise_key, excercise_name, order_index, created_at) VALUES($workout_id, $exercise_key, $excercise_name, $order_index, datetime('now'))`,
      );

      const setStatement = await session.prepareAsync(`INSERT INTO exercise_sets (workout_exercise_id, set_number, reps, weight, created_at) 
        VALUES($workout_exercise_id, $set_number, $reps, $weight, datetime('now'))`);
      for (let exercise of workout.exercises) {
        let insertedExercise = await exerciseStatement.executeAsync({
          $workout_id: workoutId,
          $exercise_key: exercise.excerciseKey,
          $excercise_name: exercise.excerciseName,
          $order_index: exercise.orderIndex,
        });
        for (let set of exercise.sets) {
          let insertedExerciseId = insertedExercise.lastInsertRowId;
          await setStatement.executeAsync({
            $workout_exercise_id: insertedExerciseId,
            $set_number: set.setNumber,
            $reps: set.reps,
            $weight: set.weight,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
}

// Updates reps and weight for every set belonging to the given exercise
export async function updateSets(exercise: Exercise) {
  const session = await db;
  assertExerciseHasId(exercise);
  await session.withTransactionAsync(async () => {
    try {
      const updateStatement = await session.prepareAsync("UPDATE exercise_sets SET reps = $reps , weight = $weight WHERE workout_exercise_id = $exerciseId ");
      for (let set of exercise.sets) {
        await updateStatement.executeAsync({
          $exerciseId: exercise.id,
          $reps: set.reps,
          $weight: set.weight,
        });
      }
    } catch (err) {
      console.log("could not update sets", err);
    }
  });
}

// Fetches the first unfinished workout (finished_at IS NULL) with all exercises and sets via a JOIN
export async function getNextWorkout(): Promise<Workout | undefined> {
  const session = await db;
  try {
    type JoinedRow = {
      workout_id: number;
      workout_type: string;
      workout_alias: string | null;
      notes: string | null;
      started_at: string | null;
      finished_at: string | null;
      exercise_id: number;
      exercise_key: string;
      excercise_name: string;
      order_index: number;
      set_id: number;
      set_number: number;
      reps: number;
      weight: number;
    };

    const rows = await session.getAllAsync<JoinedRow>(`
      SELECT
        w.id as workout_id, w.workout_type, w.workout_alias, w.notes, w.started_at, w.finished_at,
        w_e.id as exercise_id, w_e.exercise_key, w_e.excercise_name, w_e.order_index,
        e_s.id as set_id, e_s.set_number, e_s.reps, e_s.weight
      FROM workouts w
      JOIN workout_exercises w_e ON w.id = w_e.workout_id
      JOIN exercise_sets e_s ON w_e.id = e_s.workout_exercise_id
      WHERE w.finished_at IS NULL
    `);

    if (rows.length === 0) return undefined;

    // Group flat JOIN rows into a map of exerciseId -> { row, sets[] }
    const exerciseMap = new Map<number, { row: ExerciseRow; sets: SetRow[] }>();
    for (const r of rows) {
      if (!exerciseMap.has(r.exercise_id)) {
        exerciseMap.set(r.exercise_id, {
          row: { id: r.exercise_id, exercise_key: r.exercise_key, excercise_name: r.excercise_name, order_index: r.order_index },
          sets: [],
        });
      }
      exerciseMap.get(r.exercise_id)!.sets.push({ id: r.set_id, set_number: r.set_number, reps: r.reps, weight: r.weight });
    }

    const exercises = Array.from(exerciseMap.values()).map(({ row, sets }) => mapRowToExercise(row, sets));
    const workoutRow: WorkoutRow = {
      id: rows[0].workout_id,
      workout_type: rows[0].workout_type,
      workout_alias: rows[0].workout_alias,
      notes: rows[0].notes,
      started_at: rows[0].started_at,
      finished_at: rows[0].finished_at,
    };

    return mapRowToWorkout(workoutRow, exercises);
  } catch (err) {
    console.log(err);
  }
}

// Fetches the exercise catalog (name, key, target muscle group) used to populate dropdowns
export async function getExercisesMeta() {
  const session = await db;
  const exercises = await session.getAllAsync<ExerciseMetaRow>("SELECT * FROM exercises");
  // console.log(exercises[0]);
  const exercisesResponse: ExerciseMeta[] = [];
  exercises.forEach((exercise) => exercisesResponse.push(mapRowToExerciseMeta(exercise)));
  return exercisesResponse;
}
