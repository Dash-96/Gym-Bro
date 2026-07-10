import { LeaderBoardData } from "@/src/models/competeModel";
import { leaderBoardTabValue } from "@/src/utils/competeUtils";
import { StyleSheet, Text, View } from "react-native";
import { appStyle } from "../../constants/theme";
import CustomText from "../sharedComponents/customText";
import SimpleCard from "../sharedComponents/simpleCard";

type Props = {
  cardIndex: number;
  leaderBoardEntry: LeaderBoardData;
  leaderBoardType: leaderBoardTabValue;
};
export default function LeaderBoardUserCard({ cardIndex, leaderBoardEntry: friend, leaderBoardType }: Props) {
  // const [cardData, setCardData] = useState<string>("");

  function setCardData() {
    switch (leaderBoardType) {
      case "Workouts":
        return friend.workoutsCount;
      case "Volume":
        return friend.totalVolume;
      case "R.Volume":
        return friend.rVolume;
    }
  }
  console.log(friend);

  return (
    <SimpleCard customStyle={styles.cardContainer}>
      {/* <UserCircle customWidth={50} customHeight={50} circleNumber={cardIndex} userSymbol={friend.userName.slice(0, 1)} /> */}
      <Text style={styles.rank}>#{cardIndex + 1}</Text>
      <View style={styles.contentWraper}>
        <CustomText variant="cardSubTitle" style={styles.userName}>
          {friend.userName}
        </CustomText>
        <CustomText variant="cardSubTitle" color="secondary">
          {setCardData()}
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
  rank: {
    fontFamily: appStyle.fontStyles.semibold,
    color: appStyle.colors.primaryColor,
    fontSize: appStyle.fontSizes.medium,
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
