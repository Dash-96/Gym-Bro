import { Notification } from "../models/notificationModel";

const token = process.env.EXPO_PUBLIC_TOKEN;
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getFriendRequests(): Promise<Notification[]> {
  try {
    const response = await fetch(`${baseUrl}/Notification/view-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const friendRequests = await response.json();
    console.log("friend requests: ", friendRequests);
    return friendRequests;
  } catch (err) {
    throw new Error("Could not get friend requests: " + err);
  }
}
