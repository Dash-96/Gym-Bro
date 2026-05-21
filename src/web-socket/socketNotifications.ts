import { ToastAndroid } from "react-native";
import { getSocketConnection } from "./webSocket";

export async function testConnection() {
  const socketConnection = getSocketConnection();
  try {
    await socketConnection.invoke("SendFriendRequest", 31);
  } catch (error) {
    console.log(error);
  }
}

export function registerSocketNotifications() {
  const socketConnection = getSocketConnection();
  socketConnection.on("FriendRequest", (payload) => {
    console.log(payload);
    ToastAndroid.show(`${payload.senderName} sent you a friend request`, ToastAndroid.LONG);
  });
}
