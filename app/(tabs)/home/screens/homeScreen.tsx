import { getNextWorkout } from "@/app/repositories/workoutRepo";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import WorkOutCard from "../components/workoutCard";
import { useWorkoutStore } from "../store/workoutStore";
export default function HomeScreen() {
  // useQuery result is declared but currently unused — direct call below is active instead
  const { data: workoutDetails, isLoading, isError, error } = useQuery({ queryKey: ["next-workout"], queryFn: getNextWorkout });
  const setWorkout = useWorkoutStore((state) => state.setWorkout);
  // const { syncWorkout } = useWorkoutDb();
  // useEffect(() => {
  //   setWorkout(workoutDetails);
  //   // syncWorkout(workoutDetails);
  // }, [workoutDetails]);

  // Load the next unfinished workout from SQLite into the global store on mount
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
