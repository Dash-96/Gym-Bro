import { ToastAndroid } from "react-native";
import { socketConnection } from "./webSocket";

export async function testConnection() {
  try {
    const result = await socketConnection.invoke("SendFriendRequest", 31);
  } catch (error) {
    console.log(error);
  }
}

socketConnection.on("FriendRequest", (payload) => {
  console.log(payload);
  ToastAndroid.show(`${payload.senderName} sent you a friend request`, ToastAndroid.LONG);
});
