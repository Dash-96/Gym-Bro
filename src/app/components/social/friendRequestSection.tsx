import { getFriendRequests } from "@/src/api/notificationApi";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { fontSizes, fontStyles } from "../../constants/theme";
import FriendRequestsCard from "./friendRequestCard";

export default function FriendRequestSection() {
  const { data: requests, isLoading, isError, error, isSuccess } = useQuery({ queryKey: ["friend-requests"], queryFn: getFriendRequests });
  if (isSuccess && requests.length > 0) {
    return (
      <View>
        <Text>Friend Requests</Text>
        <FriendRequestsCard friendRequest={requests[0]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: fontSizes.sectionHeader,
    ...fontStyles.medium,
  },
});
