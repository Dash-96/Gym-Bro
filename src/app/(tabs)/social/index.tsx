import { getFriendRequests } from "@/src/api/notificationApi";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import FriendRequestSection from "../../components/social/friendRequestSection";
import SocialMainCard from "../../components/social/socialMainCard";
import { appStyle, fontSizes, fontStyles } from "../../constants/theme";

export default function SocialScreen() {
  const { data: requests, isLoading, isError, error, isSuccess } = useQuery({ queryKey: ["friend-requests"], queryFn: getFriendRequests });
  return (
    <View style={styles.screenWraper}>
      <Text style={styles.mainHeaderText}>Social</Text>
      <Text style={styles.headerText}>Train with friends , stay consistent</Text>
      <SocialMainCard />
      <FriendRequestSection />
    </View>
  );
}

const styles = StyleSheet.create({
  screenWraper: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  mainHeaderText: {
    fontSize: fontSizes.screenTitle,
    ...fontStyles.semibold,
  },
  headerText: {
    fontSize: fontSizes.sectionHeader,
    color: appStyle.text.secondaryTextColor,
    ...fontStyles.regular,
  },
});
