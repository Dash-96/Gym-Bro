import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";
import CustomText from "@/src/app/components/sharedComponents/customText";
import { getNextWorkout, updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

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
          <CustomText variant="cardTitle" color="light" style={{ alignSelf: "center" }}>Next Workout</CustomText>
          {cardType == "edit" && (
            <View style={{ gap: 10, width: "100%" }}>
              <View style={styles.rowContainr}>
                <CustomText numberOfLines={1} variant="cardSubTitle" color="light" style={styles.text}>
                  {workoutDetails.type} Day
                </CustomText>
              </View>
              <View style={styles.rowContainr}>
                <CustomText variant="cardSubTitle" color="light" style={styles.text}>{workoutDetails.exerciseCount} exercises </CustomText>
                <CustomText variant="cardSubTitle" color="light" style={styles.text}>{workoutDetails.setsCount} sets </CustomText>
                <CustomText variant="cardSubTitle" color="light" style={styles.text}>~ {workoutDetails.duration} min</CustomText>
              </View>
            </View>
          )}
          {cardType == "create" && <CustomText style={[styles.createWorkoutMessage, fontStyles.semibold]}>What Should We Train Today?</CustomText>}
          <StartButton />
        </Pressable>
      </View>
    </ImageBackground>
  );

  function StartButton() {
    return (
      <Pressable style={styles.startButton} onPress={startWorkout}>
        <CustomText color="light" style={[styles.text, fontStyles.semibold]}>{buttonTextRef.current}</CustomText>
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
  createWorkoutMessage: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
    color: appStyle.colors.primaryColor,
  },
});
