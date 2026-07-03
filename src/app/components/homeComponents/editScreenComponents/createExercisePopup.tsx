import { getExerciseMetaData } from "@/src/api/workoutAPI";
import { appStyle } from "@/src/app/constants/theme";
import { useEditSet, useExerciseDropDown } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { Exercise, ExerciseMeta, ExerciseMuscleGroup } from "@/src/models/workoutModel";
import { insertExercise } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Dot, Plus } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import CategoriesBar from "../../sharedComponents/categoriesBar";
import SearchBar from "../../sharedComponents/searchBar";

interface CreateExercisePopupProps {
  visible: boolean;
  // setVisibility: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  //   onSave: (exercise: Omit<Exercise, "id">) => void;
  orderIndex: number;
}
export function CreateExercisePopup({ visible, onClose }: CreateExercisePopupProps) {
  type MuscleGroupCategoryItem = { text: string; value: string };
  const { data: exerciseMetaData, isSuccess: hasExerciesData } = useQuery<Record<ExerciseMuscleGroup, ExerciseMeta[]>>({
    queryKey: ["excercie-meta"],
    queryFn: getExerciseMetaData,
  });
  const muscleGroupCategoryItems: MuscleGroupCategoryItem[] = [
    { text: "All", value: "all" },
    { text: "Chest", value: "chest" },
    { text: "Back", value: "back" },
    { text: "Legs", value: "legs" },
    { text: "Shoulders", value: "shoulders" },
    { text: "Biceps", value: "biceps" },
    { text: "Triceps", value: "triceps" },
  ];
  const modalRef = useRef<BottomSheetModal>(null);
  const workoutState = useWorkoutStore((state) => state.workout);
  const isUpdatingWorkout = workoutState.id ?? false;
  const setWorkoutState = useWorkoutStore((state) => state.setWorkout);
  const [searchBarValue, setSearchBarValue] = useState("");
  const { exercises } = useExerciseDropDown();
  const { sets, handleSetCountChange, handleSetChange } = useEditSet();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseMeta>();
  useEffect(() => {
    if (visible) {
      modalRef.current?.present();
    }
  }, [visible]);
  const excerciseCountRef = useRef(0);
  function handleExerciseSelect(exercise: ExerciseMeta) {
    setSelectedExercise(exercise);
  }

  /// Validates inputs, builds the Exercise object, and appends it to the workout store
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
    /// Saving Exercise to local db upon creation if the workout already exists there , if not the exercise will be saved on workout insert;
    if (isUpdatingWorkout) {
      if (workoutState.id) {
        insertExercise([createdExercise], workoutState.id);
      }
    }
    ToastAndroid.show("Exercise Added", ToastAndroid.SHORT);
    onClose();
  };

  return (
    // <Modal visible={visible} transparent animationType="slide">

    <BottomSheetModal
      ref={modalRef}
      onDismiss={() => onClose()}
      enableDynamicSizing={false}
      snapPoints={["80%"]}
      backdropComponent={() => <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill}></BlurView>}
    >
      <View style={styles.modalWraper}>
        <View>
          <Text style={styles.modalTitle}>Select Exercise</Text>
          <Text>Choose Exercises to add to your workout</Text>
        </View>
        <SearchBar
          value={searchBarValue}
          onChangeText={(text) => setSearchBarValue(text)}
          style={{ backgroundColor: appStyle.colors.primaryTintColor }}
          placeholder="Search by exercise name"
        />
        <CategoriesBar<MuscleGroupCategoryItem> list={muscleGroupCategoryItems} onSelect={(item: MuscleGroupCategoryItem) => console.log(item.value)} />
      </View>
      {hasExerciesData && (
        <BottomSheetScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 10, paddingHorizontal: 20, paddingBottom: 20 }}>
          {Object.entries(exerciseMetaData).map(([title, items]) => (
            <React.Fragment key={title}>
              <Text>{title}</Text>
              {items.map((item) => (
                <View key={item.exerciseKey} style={styles.modalExerciseCard}>
                  <View style={styles.cardTextWraper}>
                    <Text>{item.exerciseName}</Text>
                    <Dot size={24} color="#000000cc" />
                    <Text>{item.targetMuscleGroup}</Text>
                  </View>
                  <Pressable>
                    <Plus size={24} color={appStyle.colors.primaryColor} />
                  </Pressable>
                </View>
              ))}
            </React.Fragment>
          ))}
        </BottomSheetScrollView>
      )}
      {/* <View style={{ flex: 1, justifyContent: "center", backgroundColor: appStyle.colors.secondaryColor }}>
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
              <Pressable
                onPress={handleSave}
                style={({ pressed }) => [{ padding: 10, backgroundColor: "#007AFF", borderRadius: 5, opacity: pressed ? 0.6 : 1 }]}
              >
                <Text style={{ color: "white" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View> */}
    </BottomSheetModal>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  modalWraper: {
    gap: 20,
    padding: 20,
  },
  headerWraper: {},
  modalTitle: {
    fontFamily: appStyle.fontStyles.semibold,
    color: appStyle.colors.primaryColor,
    fontSize: appStyle.fontSizes.large,
  },
  modalSubTitle: {
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
  },

  modalExerciseCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appStyle.colors.primaryColor,
    boxShadow: "4px 4px 10px  #0000001e",
    padding: 10,
  },

  cardTextWraper: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    flexWrap: "wrap",
  },
});

// const styles = StyleSheet.create({
//   inputField: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   dropdownWraper: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   setCountRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 15,
//     marginBottom: 8,
//   },
//   label: {
//     ...fontStyles.medium,
//     fontSize: fontSizes.bodyText,
//     color: appStyle.text.textColor,
//   },
//   setCountInput: {
//     ...fontStyles.regular,
//     fontSize: fontSizes.bodyText,
//     borderWidth: 1,
//     borderColor: appStyle.colors.primaryTintColor,
//     backgroundColor: appStyle.colors.inputBg,
//     borderRadius: 5,
//     padding: 6,
//     width: 60,
//     textAlign: "center",
//   },
//   setHeader: {
//     flexDirection: "row",
//     marginBottom: 4,
//     paddingHorizontal: 4,
//   },
//   headerCell: {
//     ...fontStyles.semibold,
//     fontSize: fontSizes.metaText,
//     color: appStyle.text.secondaryTextColor,
//     textAlign: "center",
//   },
//   setRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 8,
//   },
//   setNumber: {
//     ...fontStyles.semibold,
//     fontSize: fontSizes.bodyText,
//     textAlign: "center",
//     color: appStyle.text.secondaryTextColor,
//   },
//   setInput: {
//     ...fontStyles.regular,
//     fontSize: fontSizes.bodyText,
//     borderWidth: 1,
//     borderColor: appStyle.colors.primaryTintColor,
//     backgroundColor: appStyle.colors.inputBg,
//     padding: 8,
//     borderRadius: 5,
//     textAlign: "center",
//   },
// });
