import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
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

//= Register the friend request notification handler
//= when a new request comes in, invalidate the friends request query to fetch the updated list
export function useFriendRequestNotifications() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socketConnection = getSocketConnection();
    function notificationHanlder(payload: { senderName: string; message: string }) {
      console.log(payload);
      ToastAndroid.show(`${payload.senderName} sent you a friend request`, ToastAndroid.LONG);
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
    }
    socketConnection.on("FriendRequest", notificationHanlder);

    return () => socketConnection.off("FriendRequest", notificationHanlder);
  }, [queryClient]);
}
