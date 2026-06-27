import { getFriendsList } from "@/src/api/socialApi";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { fontSizes, fontStyles } from "../../constants/theme";
import Button from "../sharedComponents/button";
import FriendCard from "./friendCard";

export default function FriendsList() {
  const { data: friendsList, isSuccess } = useQuery({ queryKey: ["friendsList"], queryFn: getFriendsList });

  if (isSuccess) {
    console.log(friendsList);
    return (
      <View>
        <View style={styles.headerWraper}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <Button
            onPress={() => {
              router.push("/(tabs)/social/addFriendsScreen");
            }}
            text="Add Friends"
          ></Button>
        </View>
        {friendsList.map((friend, index) => (
          <FriendCard key={index} cardNumber={index} friendName={friend.userName} variant="friend"></FriendCard>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: fontSizes.sectionHeader,
    ...fontStyles.medium,
  },

  headerWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
