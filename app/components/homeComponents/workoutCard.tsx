import { appStyle, fontSizes, fontStyles } from "@/app/constants/theme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCardType } from "@/app/hooks/homeHooks/editWorkoutHooks";
import { useWorkoutStore } from "@/app/stateStore/workoutStore/workoutStore";

// Home screen card that shows either a "create workout" prompt or existing workout details
// depending on whether an unfinished workout is found in the DB (workoutState: "create" | "edit")
export default function WorkOutCard() {
  const router = useRouter();
  const { workoutState, workoutMetaData } = useCardType();
  const nextWorkout = useWorkoutStore((state) => state.workout);
  function navigateToEdit() {
    router.push(`/home/screens/editWorkoutScreen?cardType=${workoutState}`);
  }

  return (
    <Pressable style={styles.cardContainer} onPress={navigateToEdit}>
      <Text style={[styles.cardTitle, fontStyles.semibold]}>Next Workout</Text>
      {workoutState == "edit" && (
        <View style={{ gap: 10 }}>
          <View style={styles.rowContainr}>
            <Text style={[styles.workoutName, fontStyles.medium]}>{nextWorkout.workoutType}</Text>
            <Text style={[styles.cardText, fontStyles.regular]}>Workout No. 3 / 5</Text>
          </View>
          <View style={styles.rowContainr}>
            <Text style={[styles.cardText, fontStyles.regular]}>Duration: 60 min</Text>
            <Text style={[styles.cardText, fontStyles.regular]}>Status: Not started</Text>
          </View>
        </View>
      )}
      {workoutState == "create" && <Text style={[styles.createWorkoutMessage, fontStyles.semibold]}>What Should We Train Today?</Text>}
      <Pressable style={styles.startButton}>
        <Text style={[styles.startText, fontStyles.semibold]}>Start Workout !</Text>
      </Pressable>
    </Pressable>
  );
}

function WorkoutMetaInfo() {
  return;
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: appStyle.colors.primaryTintColor,
    flex: 0.2,
    width: "90%",
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
  rowContainr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: appStyle.text.textColor,
    fontSize: fontSizes.cardTitle,
    alignSelf: "center",
  },
  workoutName: {
    color: appStyle.colors.primaryColor,
    fontSize: fontSizes.cardSubTitle,
  },
  cardText: {
    color: appStyle.text.textColor,
    fontSize: fontSizes.bodyText,
  },
  startButton: {
    width: "50%",
    height: 30,
    backgroundColor: appStyle.colors.primaryColor,
    marginTop: "auto",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  startText: {
    color: appStyle.colors.secondaryColor,
  },
  createWorkoutMessage: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
    color: appStyle.colors.primaryColor,
  },
});
