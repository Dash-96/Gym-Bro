import WorkoutTrackerContext from "@/src/app/components/workoutComponents/excerciseCountContext";
import WorkoutHeader from "@/src/app/components/workoutComponents/wokoutHeader";
import WorkoutExerciseCardList from "@/src/app/components/workoutComponents/workoutExerciseCardList";
import WorkoutScreenFooter from "@/src/app/components/workoutComponents/workoutScreenFooter";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { Text, View } from "react-native";
import ProgressBar from "../../components/workoutComponents/progressBar";
import StartWorkoutCard from "../../components/workoutComponents/startWorkoutCard";

export default function WorkoutScreen() {
  const workout = useWorkoutStore((state) => state.workout);
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
          <View style={{ alignItems: "center" }}>
            <WorkoutHeader />
            <ProgressBar />
            <WorkoutExerciseCardList />
            <WorkoutScreenFooter />
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
