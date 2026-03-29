import { useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import WorkoutExerciseCard, { CardRef } from "./workoutExerciseCard";

export default function WorkoutExerciseCardList() {
  const workoutExercises = useWorkoutStore((state) => state.workout).exercises;
  const cardsRefs = useRef<CardRef[]>([]);

  function focusCard(cardIndex: number) {
    cardsRefs.current.forEach((cardRef, index) => {
      if (cardRef.isExpanded && index !== cardIndex - 1) {
        cardRef.rotateArrow();
        cardRef.changeCardSize();
      }

      cardsRefs.current[cardIndex - 1].rotateArrow();
      cardsRefs.current[cardIndex - 1].changeCardSize();
    });
  }
  return (
    <ScrollView style={styles.listConatiner} contentContainerStyle={{ alignItems: "center", gap: 10 }}>
      {workoutExercises.map((exercise, index) => (
        <WorkoutExerciseCard
          ref={(cardRef: CardRef) => {
            cardsRefs.current[index] = cardRef;
          }}
          key={exercise.id}
          exerciseData={exercise}
          onCardFocus={focusCard}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listConatiner: { width: "90%", height: "70%", paddingTop: 20 },
});
