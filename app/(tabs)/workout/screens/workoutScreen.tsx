import { useHiddenTabBar } from "@/app/hooks/sharedHooks/useHiddenTabBar";
import { View } from "react-native";
import ExerciseCountContext from "../components/excerciseCountContext";
import WorkoutHeader from "../components/wokoutHeader";
import WorkoutExerciseCardList from "../components/workoutExerciseCardList";
import WorkoutScreenFooter from "../components/workoutScreenFooter";
import WorkoutScreenHeader from "../components/workoutScrennHeader";

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
