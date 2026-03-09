
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Fetches the next workout from the remote API.
// Currently unused — the app reads from local SQLite instead.
export async function getNextWorkout() {
  let response = await fetch(apiUrl + "/workout/1");
  let data = await response.json();
  // await insertWorkout(data);
  return data;
}
