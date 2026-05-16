import { StyleSheet, Text, View } from "react-native";
import { fontSizes, fontStyles } from "../../constants/theme";
import FriendRequestsCard from "./friendRequestCard";

export default function FriendRequestSection() {
  return (
    <View>
      <Text>Friend Requests</Text>
      <FriendRequestsCard />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: fontSizes.sectionHeader,
    ...fontStyles.medium,
  },
});
