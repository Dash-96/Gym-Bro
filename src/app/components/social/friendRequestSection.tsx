import { getFriendRequests } from "@/src/api/notificationApi";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text } from "react-native";
import { fontSizes, fontStyles } from "../../constants/theme";
import FriendRequestsCard from "./friendRequestCard";

export default function FriendRequestSection() {
  const { data: requests, isLoading, isError, error, isSuccess } = useQuery({ queryKey: ["friend-requests"], queryFn: getFriendRequests });
  if (isSuccess && requests.length > 0) {
    return (
      <ScrollView>
        <Text>Friend Requests</Text>
        {requests.map((request, index) => (
          <FriendRequestsCard key={index} friendRequest={request} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: fontSizes.sectionHeader,
    ...fontStyles.medium,
  },
});
