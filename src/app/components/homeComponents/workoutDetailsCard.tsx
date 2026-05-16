import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { getNextWorkout, updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

// Home screen card that shows either a "create workout" prompt or existing workout details
// depending on whether an unfinished workout is found in the DB (workoutState: "create" | "edit")

type WorkoutDetails = {
  type: string;
  duration: number;
  exerciseCount: number;
  setsCount: number;
};
export default function WorkOutDetailsCard() {
  const router = useRouter();
  const buttonTextRef = useRef("Create Workout");
  // const { workoutState, workoutMetaData } = useCardType();
  const currentWorkoutState = useWorkoutStore((state) => state.workout);
  const cardType: "edit" | "create" = currentWorkoutState.id === 0 ? "create" : "edit";
  if (cardType == "edit") buttonTextRef.current = "Start Workout";
  const setWorkoutState = useWorkoutStore((state) => state.setWorkout);
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails>({
    type: currentWorkoutState.workoutType,
    duration: 0,
    exerciseCount: 0,
    setsCount: 0,
  });

  //= Set The State of the workout to the most recent workout not yet completed
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const persistedWorkout = await getNextWorkout();
        if (persistedWorkout) {
          setWorkoutState(persistedWorkout);
        }
      })();
    }, []),
  );

  //= Set the workout details upon loading the next workout into workout state
  useEffect(() => {
    let type = currentWorkoutState.workoutType;
    let exerciseCount = currentWorkoutState.exercises.length;
    let setsCount = 0;
    currentWorkoutState.exercises.forEach((exercise) => (setsCount += exercise.sets.length));
    let duration = Math.floor(setsCount * 2.5);
    setWorkoutDetails({ type, exerciseCount, setsCount, duration });
  }, [currentWorkoutState.id]);

  function navigateToEdit() {
    router.push(`/home/editWorkoutScreen?screenType=${cardType}`);
  }

  //=
  function startWorkout() {
    const startedAt = new Date();
    const tempWorkoutState = { ...currentWorkoutState };
    tempWorkoutState.startedAt = startedAt;
    setWorkoutState({ startedAt: startedAt });
    updateWorkout(tempWorkoutState);
    router.push("/(tabs)/workout");
  }

  return (
    <ImageBackground source={require("@/assets/images/create-workout-card.png")} imageStyle={{ borderRadius: 24 }} style={styles.cardContainer}>
      <View style={{ paddingHorizontal: 10, gap: 10 }}>
        <Pressable onPress={navigateToEdit}>
          <Text style={[styles.cardTitle, fontStyles.semibold]}>Next Workout</Text>
          {cardType == "edit" && (
            <View style={{ gap: 10, width: "100%" }}>
              <View style={styles.rowContainr}>
                <Text numberOfLines={1} style={[styles.workoutName, styles.text, fontStyles.medium]}>
                  {workoutDetails.type} Day
                </Text>
              </View>
              <View style={styles.rowContainr}>
                <Text style={[styles.workoutName, styles.text, fontStyles.medium]}>{workoutDetails.exerciseCount} exercises </Text>
                <Text style={[styles.workoutName, styles.text, fontStyles.medium]}>{workoutDetails.setsCount} sets </Text>
                <Text style={[styles.workoutName, styles.text, fontStyles.medium]}>~ {workoutDetails.duration} min</Text>
              </View>
            </View>
          )}
          {cardType == "create" && <Text style={[styles.createWorkoutMessage, , fontStyles.semibold]}>What Should We Train Today?</Text>}
          <StartButton />
        </Pressable>
      </View>
    </ImageBackground>
  );

  function StartButton() {
    return (
      <Pressable style={styles.startButton} onPress={startWorkout}>
        <Text style={[styles.startText, styles.text, fontStyles.semibold]}>{buttonTextRef.current}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: appStyle.colors.primaryTintColor,
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    gap: 5,
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
  rowContainr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    flexDirection: "row",
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
