import { RequestNotification } from "../models/notificationModel";
import { httpClient } from "./clients/httpClient";

export async function getFriendRequests(): Promise<RequestNotification[]> {
  try {
    const response = await httpClient.get(`/notification/view-requests`);
    const friendRequests = await response.data;
    console.log("friend requests: ", friendRequests);
    return friendRequests;
  } catch (err) {
    throw new Error("Could not get friend requests: " + err);
  }
}

export async function acceptFriendRequest(friendId: number) {
  try {
    await httpClient.get(`/notification/accept-friend-request?friendId=${friendId}`);
  } catch (err) {
    throw new Error("Could not accept friend request at the moment " + err);
  }
}
export async function declineFriendRequest(friendId: number) {
  try {
    await httpClient.get(`/notification/decline-friend-request?friendId=${friendId}`);
  } catch (err) {
    throw new Error("Could not decline friend request at the moment " + err);
  }
}

export async function sendFriendRequest(friendId: number) {
  try {
    console.log("friend id: ", friendId);
    await httpClient.get(`/notification/friend-request?targetId=${friendId}`);
  } catch (err) {
    console.error(err);
  }
}
