import { getFriendsLeaderBoardData } from "@/src/api/socialApi";
import { leaderBoardTabValue } from "@/src/utils/competeUtils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../sharedComponents/customText";
import SimpleCard from "../sharedComponents/simpleCard";
import { LeaderBoardtabs } from "./leaderBoardTabs";
import LeaderBoardUserCard from "./leaderBoardUserCard";

export default function FriendsLeaderBoard() {
  const { data: friends, isError, error, isPending } = useQuery({ queryKey: ["friend-leaderboard"], queryFn: getFriendsLeaderBoardData });
  const [selectedTab, setSelectedTab] = useState<leaderBoardTabValue>("Workouts");

  if (isError)
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  if (isPending)
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  return (
    <View>
      <View>
        <CustomText color="default" variant="sectionHeader">
          Friends LeaderBoard
        </CustomText>
        <SimpleCard customStyle={styles.leaderBoardCard}>
          <LeaderBoardtabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {friends?.map((friend, index) => (
            <LeaderBoardUserCard key={index} cardIndex={index} friend={friend} leaderBoardType={selectedTab} />
          ))}
        </SimpleCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderBoardCard: {
    gap: 15,
  },
});
