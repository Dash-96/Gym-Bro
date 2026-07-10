import WorkoutExerciseCardList from "@/src/app/components/workoutComponents/workoutExerciseCardList";
import WorkoutTrackerContext from "@/src/app/components/workoutComponents/workoutTrackrContext";
import { useFinishWorkout } from "@/src/hooks/workoutHooks/workoutHooks";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomText from "../../components/sharedComponents/customText";
import StartWorkoutCard from "../../components/workoutComponents/startWorkoutCard";
import { WorkoutControlCard } from "../../components/workoutComponents/workoutControl/workoutControlCard";
import { appStyle } from "../../constants/theme";

export default function WorkoutScreen() {
  const workout = useWorkoutStore((state) => state.workout);
  const finishWorkout = useFinishWorkout(workout);
  const workoutExists = workout.id != 0;
  if (workoutExists) {
    // useHiddenTabBar();
  }

  console.log(workout.startedAt);

  if (!workout.startedAt && workoutExists) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <StartWorkoutCard />
      </View>
    );
  } else {
    return (
      <WorkoutTrackerContext>
        {workoutExists && (
          <View style={{ alignItems: "center", flex: 1 }}>
            <WorkoutControlCard />
            <WorkoutExerciseCardList />
            <Pressable onPress={finishWorkout} style={({ pressed }) => [finishButtonStyles.finishButton, pressed && { opacity: 0.85 }]}>
              <CustomText variant="button" style={finishButtonStyles.finishButtonText}>
                Finish Workout
              </CustomText>
            </Pressable>
          </View>
        )}

        {!workoutExists && (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text>No Workout created yet</Text>
          </View>
        )}
      </WorkoutTrackerContext>
    );
  }
}

const finishButtonStyles = StyleSheet.create({
  finishButton: {
    backgroundColor: appStyle.colors.accentColor,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  finishButtonText: {
    color: appStyle.colors.secondaryColor,
  },
});
