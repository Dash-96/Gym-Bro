import DropDown from "@/src/app/components/sharedComponents/dropdown";
import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { useEditSet, useExerciseDropDown } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { Exercise, ExerciseMeta } from "@/src/models/workoutModel";
import { insertExercise } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import React, { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";

interface CreateExercisePopupProps {
  visible: boolean;
  onClose: () => void;
  //   onSave: (exercise: Omit<Exercise, "id">) => void;
  orderIndex: number;
}
export function CreateExercisePopup({ visible, onClose }: CreateExercisePopupProps) {
  const workoutState = useWorkoutStore((state) => state.workout);
  const isUpdatingWorkout = workoutState.id ?? false;
  const setWorkoutState = useWorkoutStore((state) => state.setWorkout);
  // const [excerciseKey, setExcerciseKey] = useState("");
  // const [excerciseName, setExcerciseName] = useState("");
  const { exercises } = useExerciseDropDown();
  const { sets, handleSetCountChange, handleSetChange } = useEditSet();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseMeta>();
  const excerciseCountRef = useRef(0);
  function handleExerciseSelect(exercise: ExerciseMeta) {
    setSelectedExercise(exercise);
  }

  // Validates inputs, builds the Exercise object, and appends it to the workout store
  const handleSave = () => {
    if (sets.length === 0) {
      alert("Exercise needs at least one set.\n\nDon't be lazy");
      return;
    }
    sets.forEach((set) => {
      if (parseInt(set.reps) == 0 || !set.reps) {
        alert("You have to to at least one set, come on...");
        return;
      }
    });
    if (!selectedExercise) {
      alert("Can't train without an exercise");
      return;
    }
    let createdExercise: Omit<Exercise, "id"> = {
      orderIndex: workoutState.exercises.length + 1,
      excerciseKey: selectedExercise.exerciseKey,
      excerciseName: selectedExercise.exerciseName,
      sets: sets.map((set, index) => {
        return { setNumber: index + 1, reps: parseInt(set.reps), weight: parseFloat(set.weight) };
      }),
    };

    let updatedExerciseList = [...workoutState.exercises];
    updatedExerciseList.push(createdExercise);
    setWorkoutState({ exercises: updatedExerciseList });
    /// Persisting to db upon creation if the workout already exists there , if not the exercise will be saved on workout insert;
    if (isUpdatingWorkout) {
      if (workoutState.id) {
        insertExercise([createdExercise], workoutState.id);
      }
    }
    ToastAndroid.show("Exercise Added", ToastAndroid.SHORT);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "white", margin: 20, padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>Create Exercise</Text>
          <DropDown
            list={exercises}
            getKey={(item: ExerciseMeta) => item.exerciseKey}
            getValue={(item: ExerciseMeta) => item.exerciseName}
            onSelect={handleExerciseSelect}
          />

          <View style={styles.setCountRow}>
            <Text style={styles.label}>Sets</Text>
            <TextInput style={styles.setCountInput} keyboardType="numeric" value={String(sets.length)} onChangeText={handleSetCountChange} />
          </View>

          <View style={styles.setHeader}>
            <Text style={[styles.headerCell, { flex: 0.5 }]}>#</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Reps</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Weight (kg)</Text>
          </View>

          <ScrollView style={{ maxHeight: 180 }}>
            {sets.map((s, i) => (
              <View key={i} style={styles.setRow}>
                <Text style={[styles.setNumber, { flex: 0.5 }]}>{i + 1}</Text>
                <TextInput
                  style={[styles.setInput, { flex: 1 }]}
                  keyboardType="numeric"
                  placeholder="0"
                  value={s.reps}
                  onChangeText={(v) => handleSetChange(i, "reps", v)}
                />
                <TextInput
                  style={[styles.setInput, { flex: 1 }]}
                  keyboardType="numeric"
                  placeholder="0"
                  value={s.weight}
                  onChangeText={(v) => handleSetChange(i, "weight", v)}
                />
              </View>
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
            <Pressable onPress={onClose} style={({ pressed }) => [{ padding: 10, backgroundColor: "#ccc", borderRadius: 5, opacity: pressed ? 0.6 : 1 }]}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={({ pressed }) => [{ padding: 10, backgroundColor: "#007AFF", borderRadius: 5, opacity: pressed ? 0.6 : 1 }]}>
              <Text style={{ color: "white" }}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dropdownWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setCountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 8,
  },
  label: {
    ...fontStyles.medium,
    fontSize: fontSizes.bodyText,
    color: appStyle.text.textColor,
  },
  setCountInput: {
    ...fontStyles.regular,
    fontSize: fontSizes.bodyText,
    borderWidth: 1,
    borderColor: appStyle.colors.primaryTintColor,
    backgroundColor: appStyle.colors.inputBg,
    borderRadius: 5,
    padding: 6,
    width: 60,
    textAlign: "center",
  },
  setHeader: {
    flexDirection: "row",
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  headerCell: {
    ...fontStyles.semibold,
    fontSize: fontSizes.metaText,
    color: appStyle.text.secondaryTextColor,
    textAlign: "center",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  setNumber: {
    ...fontStyles.semibold,
    fontSize: fontSizes.bodyText,
    textAlign: "center",
    color: appStyle.text.secondaryTextColor,
  },
  setInput: {
    ...fontStyles.regular,
    fontSize: fontSizes.bodyText,
    borderWidth: 1,
    borderColor: appStyle.colors.primaryTintColor,
    backgroundColor: appStyle.colors.inputBg,
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
  },
});
