import { httpClient } from "./clients/httpClient";

export async function getUserDetails() {
  try {
    const response = await httpClient.get("/user/user-details");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
