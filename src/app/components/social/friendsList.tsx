import { getFriendsList } from "@/src/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";

export default function FriendsList() {
  const { data, isSuccess } = useQuery({ queryKey: ["frindsList"], queryFn: getFriendsList });

  if (isSuccess) {
    return <View></View>;
  }
}
