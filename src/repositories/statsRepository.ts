import { db } from "../db/db";

export async function getWorkoutAmountStats(): Promise<{ currentAmount: number; prevAmount: number }> {
  const session = await db;
  try {
    const now = new Date();
    const weekStartDate = new Date();
    const prevWeekStartDate = new Date();
    const currentDay = now.getDay();
    weekStartDate.setDate(now.getDate() - currentDay);
    prevWeekStartDate.setDate(now.getDate() - currentDay - 7);
    weekStartDate.setUTCHours(0);
    weekStartDate.setUTCMinutes(0);
    weekStartDate.setUTCSeconds(0);
    prevWeekStartDate.setUTCHours(0);
    prevWeekStartDate.setUTCMinutes(0);
    prevWeekStartDate.setUTCSeconds(0);
    const weekStartString = weekStartDate.toISOString();
    const prevStartString = prevWeekStartDate.toISOString();
    console.log(prevWeekStartDate);
    const currentWeekAmount = await session.getFirstAsync<{ count: number }>(
      `SELECT COUNT(DISTINCT w.id) as count , COUNT(s.id) as setsCount, SUM(weight) as volume
       FROM workouts w JOIN exercises e ON w.id = e.workout_id JOIN sets s ON e.id = s.exercise_id 
       WHERE finished_at >= '${weekStartString}' `,
    );
    let currentAmount = currentWeekAmount ? currentWeekAmount.count : 0;
    console.log(currentWeekAmount);
    const prevWeekAmount = await session.getFirstAsync<{ count: number }>(
      `SELECT COUNT(DISTINCT w.id) as count , COUNT(s.id) as setsCount, SUM(weight) as volume
      FROM workouts w JOIN exercises e ON w.id = e.workout_id JOIN sets s ON e.id = s.exercise_id 
      WHERE finished_at >= '${prevStartString}' AND finished_at < '${weekStartString}' `,
    );
    let prevAmount = prevWeekAmount ? prevWeekAmount.count : 0;
    console.log(prevWeekAmount);
    return { currentAmount: currentAmount, prevAmount: prevAmount };
  } catch (err) {
    throw new Error("====Failed to fecth workout stats from DB==== " + err);
  }
}
