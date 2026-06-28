import { Workout } from "../models/workoutModel";
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
