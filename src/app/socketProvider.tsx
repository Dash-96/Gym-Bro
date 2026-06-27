import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useFriendRequestNotifications } from "../web-socket/socketNotifications";

//? This component if for socket event listeners that should be global and notify the user regardless of the screen hes in
//? Wraps the Rool Layout Stack
export default function SocketProvider({ children }: PropsWithChildren) {
  useFriendRequestNotifications();
  return <View style={{ flex: 1 }}>{children}</View>;
}
