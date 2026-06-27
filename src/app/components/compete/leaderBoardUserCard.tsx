import { LeaderBoardFriend } from "@/src/models/competeModel";
import { leaderBoardTabValue } from "@/src/utils/competeUtils";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { appStyle } from "../../constants/theme";
import CustomText from "../sharedComponents/customText";
import SimpleCard from "../sharedComponents/simpleCard";
import UserCircle from "../sharedComponents/userCircle";

type Props = {
  cardIndex: number;
  friend: LeaderBoardFriend;
  leaderBoardType: leaderBoardTabValue;
};
export default function LeaderBoardUserCard({ cardIndex, friend, leaderBoardType }: Props) {
  const [cardData, setCardData] = useState<string>("");
  useEffect(() => {
    leaderBoardData();
  }, [leaderBoardType]);
  function leaderBoardData() {
    let data = 0;
    switch (leaderBoardType) {
      case "Workouts":
        data = friend.workouts.length;
        setCardData(data.toString() + " workouts");
        break;
      case "Volume":
        friend.workouts.forEach((workout) => {
          console.log(workout);
          workout.exercises.forEach((exercise) => {
            exercise.sets.forEach((set) => (data += set.reps * set.weight));
          });
        });
        setCardData(data.toString() + " kg");
        break;
      case "R.Volume":
        break;
    }
  }
  return (
    <SimpleCard customStyle={styles.cardContainer}>
      <UserCircle customWidth={50} customHeight={50} circleNumber={cardIndex} userSymbol={friend.userName.slice(0, 1)} />
      <View style={styles.contentWraper}>
        <CustomText variant="cardSubTitle" style={styles.userName}>
          {friend.userName}
        </CustomText>
        <CustomText variant="cardSubTitle" color="secondary">
          {cardData}
        </CustomText>
      </View>
    </SimpleCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: appStyle.colors.primaryTintColor,
    gap: 10,
    paddingInline: 10,
  },
  contentWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  userName: {
    fontWeight: 700,
  },
});
