import { getFriendsList } from "@/src/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { fontSizes, fontStyles } from "../../constants/theme";
import FriendCard from "./friendCard";

export default function FriendsList() {
  const { data: friendsList, isSuccess } = useQuery({ queryKey: ["friendsList"], queryFn: getFriendsList });

  if (isSuccess) {
    console.log(friendsList);
    return (
      <View>
        <Text style={styles.sectionTitle}>Friends</Text>
        {friendsList.map((friend, index) => (
          <FriendCard key={index} cardNumber={index} friendName={friend.userName}></FriendCard>
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
});
