import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { useCardType } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

// Home screen card that shows either a "create workout" prompt or existing workout details
// depending on whether an unfinished workout is found in the DB (workoutState: "create" | "edit")

type WorkoutDetails = {
  type: string;
  duration: string;
  completion: string;
  status: string;
};
export default function WorkOutCard() {
  const router = useRouter();
  const { workoutState, workoutMetaData } = useCardType();
  const nextWorkout = useWorkoutStore((state) => state.workout);
  const setWorkoutState = useWorkoutStore((state) => state.setWorkout);
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails>({
    type: nextWorkout.workoutType,
    duration: "60 minutes",
    completion: "Workout No. 3 / 5",
    status: "Not started",
  });
  function navigateToEdit() {
    router.replace(`/home/editWorkoutScreen?screenType=${workoutState}`);
  }
  function startWorkout() {
    const startedAt = new Date();
    const tempWorkoutState = { ...nextWorkout };
    tempWorkoutState.startedAt = startedAt;
    setWorkoutState({ startedAt: startedAt });
    updateWorkout(tempWorkoutState);
    router.replace("/(tabs)/workout");
  }

  return (
    <ImageBackground source={require("@/assets/images/create-workout-card.png")} imageStyle={{ borderRadius: 24 }} style={styles.cardContainer}>
      <Pressable onPress={navigateToEdit} style={{ paddingHorizontal: 10, gap: 10 }}>
        <Text style={[styles.cardTitle, fontStyles.semibold]}>Next Workout</Text>
        {workoutState == "edit" && (
          <View style={{ gap: 10, width: "100%" }}>
            <View style={styles.rowContainr}>
              <Text numberOfLines={1} style={[styles.workoutName, styles.rowTextLeft, fontStyles.medium]}>
                {workoutDetails.type} Day
              </Text>
              <Text numberOfLines={1} style={[styles.cardText, styles.rowTextRight, fontStyles.regular]}>
                {workoutDetails.completion}
              </Text>
            </View>
            {/* <View style={styles.rowContainr}>
              <Text numberOfLines={1} style={[styles.cardText, styles.rowTextLeft, fontStyles.regular]}>
                {workoutDetails.duration}
              </Text>
              <Text numberOfLines={1} style={[styles.cardText, styles.rowTextRight, fontStyles.regular]}>
                {workoutDetails.status}
              </Text>
            </View> */}
          </View>
        )}
        {workoutState == "create" && <Text style={[styles.createWorkoutMessage, fontStyles.semibold]}>What Should We Train Today?</Text>}
        <Pressable style={styles.startButton} onPress={startWorkout}>
          <Text style={[styles.startText, fontStyles.semibold]}>Start Workout</Text>
        </Pressable>
      </Pressable>
    </ImageBackground>
  );
}

function WorkoutMetaInfo() {
  return;
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: appStyle.colors.primaryTintColor,
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    gap: 5,
  },
  rowContainr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTextLeft: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: 8,
  },
  rowTextRight: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    textAlign: "right",
  },
  cardTitle: {
    color: appStyle.text.lightColor,
    fontSize: fontSizes.cardTitle,
    alignSelf: "center",
  },
  workoutName: {
    color: appStyle.text.lightColor,
    fontSize: fontSizes.cardSubTitle,
  },
  cardText: {
    color: appStyle.text.lightColor,
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
