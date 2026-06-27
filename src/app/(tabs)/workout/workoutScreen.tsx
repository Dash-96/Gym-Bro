import WorkoutExerciseCardList from "@/src/app/components/workoutComponents/workoutExerciseCardList";
import WorkoutTrackerContext from "@/src/app/components/workoutComponents/workoutTrackrContext";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { Text, View } from "react-native";
import StartWorkoutCard from "../../components/workoutComponents/startWorkoutCard";
import { WorkoutControlCard } from "../../components/workoutComponents/workoutControl/workoutControlCard";

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
          <View style={{ alignItems: "center", flex: 1 }}>
            <WorkoutControlCard />
            <WorkoutExerciseCardList />
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
