import { getFriendRequests } from "@/src/api/notificationApi";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text } from "react-native";
import FriendRequestSection from "../../components/social/friendRequestSection";
import FriendsList from "../../components/social/friendsList";
import SocialMainCard from "../../components/social/socialMainCard";
import { appStyle, fontSizes, fontStyles } from "../../constants/theme";

export default function SocialScreen() {
  const { data: requests, isLoading, isError, error, isSuccess } = useQuery({ queryKey: ["friend-requests"], queryFn: getFriendRequests });
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.mainHeaderText}>Social</Text>
      <Text style={styles.headerText}>Train with friends , stay consistent</Text>
      <SocialMainCard />
      <FriendRequestSection />
      <FriendsList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    paddingTop: 50,
    paddingHorizontal: 10,
    gap: 20,
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
