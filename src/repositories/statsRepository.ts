import { db } from "../db/db";

function assertDefined<T>(val: T | null | undefined, msg = "Unexcpected null") {
  if (val == null || val == undefined) {
    throw new Error(msg);
  }
  return val;
}

/// Get diffrent stats for users workouts
type stats = { workoutCount: number; setsCount: number; volume: number };
export async function getWorkoutAmountStats(): Promise<{ currentStats: stats; prevStats: stats }> {
  const session = await db;
  try {
    /// Get the date ranges
    const now = new Date();
    const weekStartDate = new Date();
    const currentDay = now.getDay();
    weekStartDate.setDate(now.getDate() - currentDay);
    weekStartDate.setUTCHours(0, 0, 0, 0);
    const prevWeekStartDate = new Date(weekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    const weekStartString = weekStartDate.toISOString();
    const prevWeekStartString = prevWeekStartDate.toISOString();

    const currentStats = assertDefined<stats>(
      await session.getFirstAsync<stats>(
        `SELECT COUNT(DISTINCT w.id) as workoutCount , COUNT(s.id) as setsCount, CASE WHEN COUNT(s.id) = 0 THEN 0 ELSE SUM(s.weight) END AS volume
       FROM workouts w JOIN exercises e ON w.id = e.workout_id JOIN sets s ON e.id = s.exercise_id 
       WHERE finished_at >= '${weekStartString}' `,
      ),
    );

    const prevStats = assertDefined<stats>(
      await session.getFirstAsync<stats>(
        `SELECT COUNT(DISTINCT w.id) as workoutCount , COUNT(s.id) as setsCount, CASE WHEN COUNT(s.id) = 0 THEN 0 ELSE SUM(s.weight) END as volume
      FROM workouts w JOIN exercises e ON w.id = e.workout_id JOIN sets s ON e.id = s.exercise_id 
      WHERE finished_at >= '${prevWeekStartString}' AND finished_at < '${weekStartString}' `,
      ),
    );
    // let prevAmount = prevWeekAmount ? prevWeekAmount.count : 0;
    // console.log(prevStats);
    return { currentStats, prevStats };
  } catch (err) {
    throw new Error("====Failed to fecth workout stats from DB==== " + err);
  }
}

/// Get progression info for specific exercise
export async function getExcerciseProgress(exerciseKey: string): Promise<{ weight: number; createdAt: string }[]> {
  const session = await db;
  const query = `SELECT MAX(s.weight) as weight , e."created_at" FROM exercises e
                      JOIN sets s ON e.id = s.exercise_id  
                      where exercise_key = $exerciseKey
                      GROUP BY e.id ORDER by e.created_at ASC`;

  try {
    const statment = await session.prepareAsync(query);
    const result = await statment.executeAsync<{ weight: number; created_at: string }>({
      $exerciseKey: exerciseKey,
    });
    const setsResult = await result.getAllAsync();
    //= map the db object to UI object due to name convention diffrences
    const sets = setsResult.map((resultEntry) => ({ weight: resultEntry.weight, createdAt: resultEntry.created_at }));
    // console.log(sets);
    return sets;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getUserExercises(): Promise<{ exerciseName: string; exerciseKey: string }[]> {
  const session = await db;
  try {
    const result = session.getAllAsync<{ exerciseName: string; exerciseKey: string }>(
      "SELECT DISTINCT excercise_name as exerciseName , exercise_key as exerciseKey FROM exercises",
    );
    return result;
  } catch (err) {
    throw new Error("Failed to get users exercises, with error: " + err);
  }
}
