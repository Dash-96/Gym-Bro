import { getFriendsLeaderBoardData } from "@/src/api/socialApi";
import { LeaderBoardData } from "@/src/models/competeModel";
import { calculateLiftingScore, leaderBoardTabValue } from "@/src/utils/competeUtils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../sharedComponents/customText";
import SimpleCard from "../sharedComponents/simpleCard";
import SortingHeader from "../sharedComponents/sortingHeader";
import LeaderBoardUserCard from "./leaderBoardUserCard";

export default function FriendsLeaderBoard() {
  const { data: friends, isError, error, isPending, isSuccess } = useQuery({ queryKey: ["friend-leaderboard"], queryFn: getFriendsLeaderBoardData });
  const [selectedTab, setSelectedTab] = useState<leaderBoardTabValue>("Workouts");
  const [leaderBoardDataState, setLeaderBoardDataState] = useState<LeaderBoardData[]>([]);

  useEffect(() => {
    if (!friends) return;
    const leaderBoardData: LeaderBoardData[] = friends.map((friend) => {
      let userName = friend.userName;
      let workoutsCount = friend.workouts.length;
      let totalVolume = 0;
      friend.workouts.forEach((workout) => {
        console.log(workout);
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => (totalVolume += set.reps * set.weight));
        });
      });
      let rVolume = calculateLiftingScore(totalVolume, 78, "man");
      return { userName, workoutsCount, totalVolume, rVolume };
    });
    setLeaderBoardDataState(leaderBoardData);

    // console.log(leaderBoardData);
  }, [isSuccess]);

  console.log(leaderBoardDataState);

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
          {/* <LeaderBoardtabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> */}
          {leaderBoardDataState.length > 0 && (
            <SortingHeader<LeaderBoardData>
              headersList={[
                { text: "Workouts", value: "workoutsCount" },
                { text: "Volume", value: "totalVolume" },
                { text: "R.Volume", value: "rVolume" },
              ]}
              dataList={leaderBoardDataState}
              setDataList={setLeaderBoardDataState}
            />
          )}
          {leaderBoardDataState.map((friend, index) => (
            <LeaderBoardUserCard key={index} cardIndex={index} leaderBoardEntry={friend} leaderBoardType={selectedTab} />
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
