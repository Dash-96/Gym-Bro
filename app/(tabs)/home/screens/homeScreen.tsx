import { getNextWorkout } from "@/app/repositories/workoutRepo";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useWorkoutStore } from "../../../stateStore/workoutStore/workoutStore";
import WorkOutCard from "@/app/components/homeComponents/workoutCard";
export default function HomeScreen() {
  // useQuery result is declared but currently unused — direct call below is active instead
  // const { data: workoutDetails, isLoading, isError, error } = useQuery({ queryKey: ["workouts"], queryFn: getWorkouts });
  const setWorkout = useWorkoutStore((state) => state.setWorkout);
  const workout = useWorkoutStore((state) => state.workout);
  const workoutMutation = useQueryClient().getMutationDefaults(["createWorkout"]);

  useEffect(() => {
    (async () => {
      let nextWorkout = await getNextWorkout();
      if (nextWorkout) {
        setWorkout(nextWorkout);
      }
    })();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <WorkOutCard />
      <Pressable onPress={() => workoutMutation.mutationFn ?? workout}>
        <Text>invoke mutatuion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
