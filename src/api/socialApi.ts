import { LeaderBoardFriend, rival } from "../models/competeModel";
import { Friend } from "../models/notificationModel";
import { httpClient } from "./clients/httpClient";

export async function getWeightRivalCompetiton(rivalId: number): Promise<rival | undefined> {
  try {
    const response = await httpClient.get(`/workout/weight-volume?rivalId=${rivalId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {}
}

export async function getFriendsLeaderBoardData(): Promise<Array<LeaderBoardFriend> | undefined> {
  try {
    const response = await httpClient.get<Array<LeaderBoardFriend>>("/workout/friends-leaderboard");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//! Continue
export async function getFriendsList(): Promise<Friend[]> {
  let friends = [];
  try {
    const response = await httpClient.get("/user/friends");
    friends = response.data;
    console.log(friends);
  } catch (err) {
    console.log(err);
  }
  return friends;
}

export async function getAllUsers(prefix: string): Promise<Array<Friend>> {
  try {
    console.log(prefix);
    if (prefix.trim() == "") {
      return [];
    }
    const response = await httpClient.get(`/user/getAllUsers?prefix=${prefix}`);
    console.log(response.data);
    const users = response.data.map((entry: { userId: number; userName: string }) => ({ friendId: entry.userId, userName: entry.userName }));
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}
