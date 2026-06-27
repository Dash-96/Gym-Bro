import { getWeightRivalCompetiton } from "@/src/api/socialApi";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { fontSizes, fontStyles } from "../../constants/theme";
import SimpleCard from "../sharedComponents/simpleCard";
import UserCircle from "../sharedComponents/userCircle";

export default function CompeteMainCard() {
  const { data: weightsData, isSuccess } = useQuery({ queryKey: ["compete"], queryFn: () => getWeightRivalCompetiton(36) });
  if (!weightsData) {
    return (
      <View>
        <Text>Error Occured</Text>
      </View>
    );
  }
  const myVolume = weightsData.userTotalWeightLifted;
  const openentVolume = weightsData.rivalTotalWeightLifted;
  const progression = (myVolume * 100) / (myVolume + openentVolume);
  function leadingSentence() {
    if (myVolume > openentVolume) {
      return `You're ahead by ${myVolume - openentVolume} kg`;
    } else {
      return `Netanel isahead by ${openentVolume - myVolume} kg`;
    }
  }
  return (
    <SimpleCard customStyle={styles.cardContainer}>
      <LinearGradient style={styles.gradientContainer} colors={["#2563EB", "#F97316"]} start={{ x: 0.1, y: 0.1 }} end={{ x: 0.8, y: 0.8 }}>
        <View style={styles.metaSection}>
          <Text style={styles.headerText}>Weekly Battle</Text>
          <Text style={styles.openentText}>You vs Netanel</Text>
        </View>
        <VsSection rivalName={weightsData.rivalName} />
        <FightingCard rivalName={weightsData.rivalName} />
      </LinearGradient>
    </SimpleCard>
  );

  type VsSectionProps = {
    rivalName: string;
  };
  function VsSection({ rivalName }: VsSectionProps) {
    return (
      <View style={styles.vsSection}>
        <View style={styles.userCircleWraper}>
          <UserCircle customText="You" withOutline={true} customColors={[colors.transparent1, colors.transparent1]} customFont={28} />
        </View>
        <View style={styles.vsCircleWraper}>
          <UserCircle customText="VS" customColors={[colors.transparent2, colors.transparent2]} customFont={22} />
        </View>
        <View style={styles.userCircleWraper}>
          <UserCircle
            customText={rivalName.slice(0, 1).toUpperCase()}
            customColors={[colors.transparent1, colors.transparent1]}
            withOutline={true}
            customFont={28}
          />
        </View>
      </View>
    );
  }

  type FightingCardProps = {
    rivalName: string;
  };
  function FightingCard({ rivalName }: FightingCardProps) {
    return (
      <SimpleCard customStyle={fightingCardStyles.cardWraper}>
        <Text style={fightingCardStyles.cardHeader}>Total Volume</Text>
        <View style={fightingCardStyles.fightStatsSection}>
          <View style={fightingCardStyles.fighterstats}>
            <Text style={fightingCardStyles.fighterText}>You</Text>
            <Text style={fightingCardStyles.fighterVolumeText}>{myVolume.toLocaleString()} kg</Text>
          </View>
          <View style={fightingCardStyles.fighterstats}>
            <Text style={[fightingCardStyles.fighterText, { alignSelf: "flex-end" }]}>{rivalName}</Text>
            <Text style={fightingCardStyles.fighterVolumeText}>{openentVolume.toLocaleString()} kg</Text>
          </View>
        </View>
        <View style={fightingCardStyles.progressBar}>
          <View style={[fightingCardStyles.progressionLine, { width: `${progression}%` }]}></View>
        </View>
        <Text style={fightingCardStyles.leadertext}>{leadingSentence()}</Text>
      </SimpleCard>
    );
  }
}

const colors = {
  transparent1: "#ffffff33",
  transparent2: "#ffffff4d",
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 0,
    borderRadius: 20,
  },
  gradientContainer: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 30,
  },
  metaSection: {
    gap: 10,
  },
  headerText: {
    fontSize: fontSizes.cardTitle,
    ...fontStyles.medium,
    color: "white",
  },
  openentText: {
    fontSize: fontSizes.bodyText,
    ...fontStyles.regular,
    color: "white",
  },
  vsSection: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  userCircleWraper: {
    width: 80,
    height: 80,
  },
  vsCircleWraper: {
    width: 50,
    height: 50,
  },
});

const fightingCardStyles = StyleSheet.create({
  cardWraper: {
    backgroundColor: colors.transparent1,
    gap: 15,
  },
  cardHeader: {
    fontSize: fontSizes.bodyText,
    ...fontStyles.regular,
    color: "white",
    alignSelf: "flex-start",
  },
  fightStatsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  fighterstats: {
    gap: 5,
  },
  fighterText: {
    fontSize: fontSizes.bodyText,
    ...fontStyles.regular,
    color: "white",
  },
  fighterVolumeText: {
    ...fontStyles.semibold,
    fontSize: fontSizes.screenTitle,
    color: "white",
  },

  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: colors.transparent2,
    borderRadius: 20,
  },
  progressionLine: {
    height: "100%",
    width: "0%",
    borderRadius: 20,
    backgroundColor: "white",
  },

  leadertext: {
    ...fontStyles.semibold,
    fontSize: fontSizes.bodyText,
    color: "white",
  },
});
