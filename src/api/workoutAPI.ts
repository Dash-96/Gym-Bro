import { ExerciseMeta, ExerciseMuscleGroup, MUSCLE_GROUPS, Workout } from "../models/workoutModel";
import { WorkoutMapper } from "../utils/mapperUtil";
import { httpClient } from "./clients/httpClient";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// const instance = axios.create({baseURL:apiUrl/workout})
// Fetches the next workout from the remote API.
// Currently unused — the app reads from local SQLite instead.
export async function getWorkouts() {
  console.log("get Workout runs");
  let response = await fetch(apiUrl + "/workout");
  console.log("suuposed to get answer");
  let data = await response.text();
  // await insertWorkout(data);
  console.log(data);
  return data;
}

export async function submitWorkoutToRemote(workout: Workout) {
  try {
    const createWorkoutDto = WorkoutMapper.mapToCreateWorkoutDto(workout);
    let response = await httpClient.post("/workout/create", JSON.stringify(createWorkoutDto));
    console.log(response.status);
    let data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getExerciseMetaData() {
  try {
    const response = await httpClient.get<ExerciseMeta[]>("/workout/exercise-meta");
    console.log(response.data);
    const data = response.data;
    // let MUSCLE_GROUPS: Record<ExerciseMuscleGroup, ExerciseMeta[]> = {
    //   Chest: data.filter((e) => e.targetMuscleGroup == "Chest"),
    //   Back: data.filter((e) => e.targetMuscleGroup == "Back"),
    //   Legs: data.filter((e) => e.targetMuscleGroup == "Legs"),
    //   Shoulders: data.filter((e) => e.targetMuscleGroup == "Shoulders"),
    //   Biceps: data.filter((e) => e.targetMuscleGroup == "Biceps"),
    //   Triceps: data.filter((e) => e.targetMuscleGroup == "Triceps"),
    // };

    let exerciseDataMap = Object.fromEntries(MUSCLE_GROUPS.map((group) => [group, data.filter((exercise) => exercise.targetMuscleGroup == group)])) as Record<
      ExerciseMuscleGroup,
      ExerciseMeta[]
    >;
    return exerciseDataMap;
  } catch (err) {
    throw new Error("could not get exercise data");
  }
}
