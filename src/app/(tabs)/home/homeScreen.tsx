import WorkOutDetailsCard from "@/src/app/components/homeComponents/workoutDetailsCard";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { testConnection } from "@/src/web-socket/socketNotifications";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  // useQuery result is declared but currently unused — direct call below is active instead
  // const { data: workoutDetails, isLoading, isError, error } = useQuery({ queryKey: ["workouts"], queryFn: getWorkouts });
  const setWorkout = useWorkoutStore((state) => state.setWorkout);
  const workout = useWorkoutStore((state) => state.workout);

  // useFocusEffect(() => {
  //   (async () => {
  //     let nextWorkout = await getNextWorkout();
  //     if (nextWorkout) {
  //       setWorkout(nextWorkout);
  //     } else {
  //       setWorkout({ id: 0 });
  //     }
  //     console.log("next workout hook executed", nextWorkout);
  //   })();
  // });

  return (
    <View style={styles.screenContainer}>
      <WorkOutDetailsCard />
      <Pressable onPress={testConnection} style={({ pressed }) => [pressed && { opacity: 0.4 }, { backgroundColor: "orange", padding: 20, marginTop: 50 }]}>
        <Text>Test signalR connection</Text>
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
