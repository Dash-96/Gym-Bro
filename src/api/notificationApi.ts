import { RequestNotification } from "../models/notificationModel";

const token = process.env.EXPO_PUBLIC_TOKEN;
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getFriendRequests(): Promise<RequestNotification[]> {
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

export async function acceptFriendRequest(friendId: number) {
  try {
    const response = await fetch(`${baseUrl}/notification/accept-friend-request?friendId=${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    throw new Error("Could not accept friend request at the moment " + err);
  }
}
