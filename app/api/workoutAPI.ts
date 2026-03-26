import { Workout } from "../models/workoutModel";
import { mapToCreateWorkoutDto } from "../utils/mapperUtil";

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

export async function createWorkout(workout: Workout) {
  console.log("trying");
  const createWorkoutDto = mapToCreateWorkoutDto(workout);
  let response = await fetch(apiUrl + "//", {
    method: "POST",
    body: JSON.stringify(createWorkoutDto),
    headers: {
      "Content-type": "application/json",
    },
  });

  let data = await response.json();
  console.log(data);
}
