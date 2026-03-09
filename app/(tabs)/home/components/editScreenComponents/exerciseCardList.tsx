import { useEffect, useMemo } from "react";
import { Animated, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useWorkoutStore } from "../../store/workoutStore";
import ExerciseCard from "./exerciseCard";

export default function ExerciseCardList() {
  const activeIndex = useSharedValue<number | null>(null);
  const dragY = useSharedValue(0);
  const workoutData = useWorkoutStore((state) => state.workout);
  const orderList = useWorkoutStore((state) => state.exerciseOrderList);
  const setOrderList = useWorkoutStore((state) => state.setExerciseOrderList);
  //= Currently the order Index property is being used both as an order index and as a unique identifier to ensure proper animation
  //! may need to add another property specifaclly for ordering with the drag and drop in order to make the ordering logic more readable
  //= in any case need to add logic later that will change the ordering index according to the ordering list
  useEffect(() => {
    const list: number[] = [];
    workoutData.exercises.forEach((exercise) => list.push(exercise.orderIndex));
    setOrderList(list);
  }, [workoutData.exercises]);

  // Build a map of orderIndex -> exercise so each card can look up its data from the order list
  const exerciseIdMap = useMemo(() => {
    const map = new Map();
    workoutData.exercises.forEach((ex) => map.set(ex.orderIndex, ex));
    return map;
  }, [workoutData.exercises]);

  return (
    <Animated.ScrollView style={styles.listContainer}>
      {orderList.map((orderKey, index) => (
        <ExerciseCard key={orderKey} index={index} excerciseData={exerciseIdMap.get(orderKey)} activeIndex={activeIndex} dragY={dragY} />
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    borderRadius: 20,
  },
});
