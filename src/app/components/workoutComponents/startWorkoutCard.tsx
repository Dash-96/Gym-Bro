import { updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { CirclePlay } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import SimpleCard from "../sharedComponents/simpleCard";

export default function StartWorkoutCard() {
  const workoutState = useWorkoutStore((state) => state.workout);
  const setWorkoutState = useWorkoutStore((state) => state.setWorkout);
  function startWorkout() {
    const startedAt = new Date();
    const tempWorkoutState = { ...workoutState };
    tempWorkoutState.startedAt = startedAt;
    setWorkoutState({ startedAt: startedAt });
    updateWorkout(tempWorkoutState);
  }
  return (
    <SimpleCard>
      <Pressable onPress={startWorkout}>
        <CirclePlay size={36}></CirclePlay>
      </Pressable>
      <Text>Start Workout!</Text>
    </SimpleCard>
  );
}
