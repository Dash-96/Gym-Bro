import ExerciseCountContext from "@/src/app/components/workoutComponents/excerciseCountContext";
import WorkoutHeader from "@/src/app/components/workoutComponents/wokoutHeader";
import WorkoutExerciseCardList from "@/src/app/components/workoutComponents/workoutExerciseCardList";
import WorkoutScreenFooter from "@/src/app/components/workoutComponents/workoutScreenFooter";
import WorkoutScreenHeader from "@/src/app/components/workoutComponents/workoutScrennHeader";
import { useHiddenTabBar } from "@/src/hooks/sharedHooks/useHiddenTabBar";
import { View } from "react-native";

export default function WorkoutScreen() {
  useHiddenTabBar();

  return (
    <ExerciseCountContext>
      <View style={{ alignItems: "center" }}>
        <WorkoutHeader />
        <WorkoutScreenHeader />
        <WorkoutExerciseCardList />
        <WorkoutScreenFooter />
      </View>
    </ExerciseCountContext>
  );
}
