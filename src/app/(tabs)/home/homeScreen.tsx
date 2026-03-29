import WorkOutCard from "@/src/app/components/homeComponents/workoutCard";
import { getNextWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
export default function HomeScreen() {
  // useQuery result is declared but currently unused — direct call below is active instead
  // const { data: workoutDetails, isLoading, isError, error } = useQuery({ queryKey: ["workouts"], queryFn: getWorkouts });
  const setWorkout = useWorkoutStore((state) => state.setWorkout);
  const workout = useWorkoutStore((state) => state.workout);

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
