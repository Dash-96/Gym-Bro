import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useWorkoutStore } from "../../home/store/workoutStore";
import WorkoutExerciseCard from "../components/workoutExerciseCard";

export default function WorkoutExerciseCardList() {
  const workoutExercises = useWorkoutStore((state) => state.workout).exercises;
  return (
    <ScrollView style={styles.listConatiner} contentContainerStyle={{ alignItems: "center", gap: 10 }}>
      {workoutExercises.map((exercise) => (
        <WorkoutExerciseCard key={exercise.id} exerciseData={exercise} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listConatiner: { width: "90%" },
});
