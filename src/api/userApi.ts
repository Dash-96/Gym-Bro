import { Friend } from "../models/notificationModel";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const token = process.env.EXPO_PUBLIC_TOKEN;

//! Continue
export async function getFriendsList(): Promise<Friend[]> {
  let friends = [];
  try {
    const response = await fetch(`${baseUrl}/user/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    friends = await response.json();
    console.log(friends);
  } catch (err) {
    console.log(err);
  }
  return friends;
}
