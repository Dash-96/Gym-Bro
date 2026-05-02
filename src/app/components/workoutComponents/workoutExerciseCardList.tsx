import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import WorkoutExerciseCard, { CardRef } from "./workoutExerciseCard";

export default function WorkoutExerciseCardList() {
  const workoutExercises = useWorkoutStore((state) => state.workout).exercises;
  const cardsRefs = useRef<CardRef[]>([]);

  function focusCard(cardOrder: number) {
    cardsRefs.current.forEach((cardRef, index) => {
      /// Close any other open card
      console.log(`card number ${index + 1} , expanded: ${cardRef.isExpanded}`);
      if (cardRef.isExpanded && index !== cardOrder - 1) {
        cardRef.rotateArrow();
        cardRef.changeCardSize();
      }
    });

    cardsRefs.current[cardOrder - 1].rotateArrow();
    cardsRefs.current[cardOrder - 1].changeCardSize();
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
