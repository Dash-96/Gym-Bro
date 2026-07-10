import { getExerciseMetaData } from "@/src/api/workoutAPI";
import { appStyle } from "@/src/app/constants/theme";
import { useEditSet, useExerciseDropDown } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { Exercise, ExerciseMeta, ExerciseMuscleGroup } from "@/src/models/workoutModel";
import { insertExercise } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Copy, CopyCheck, CopyPlus, Dot, Minus, Plus } from "lucide-react-native";
import React, { Activity, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
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
  // const [isExerciseSelectedState, setIsExerciseSelectedState] = useState<boolean>(false);
  const workoutState = useWorkoutStore((state) => state.workout);
  const isUpdatingWorkout = workoutState.id ?? false;
  const setWorkoutState = useWorkoutStore((state) => state.setWorkout);
  const [searchBarValue, setSearchBarValue] = useState("");
  const { exercises } = useExerciseDropDown();
  const { sets, handleSetCountChange, handleSetChange, duplicateLastSet, applyFirstSetToEmpty } = useEditSet();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseMeta | undefined>();
  const [setCountState, setSetCountState] = useState(1);
  useEffect(() => {
    if (visible) {
      modalRef.current?.present();
    }
  }, [visible]);
  useEffect(() => {
    handleSetCountChange(String(setCountState));
  }, [setCountState]);
  const excerciseCountRef = useRef(0);
  function handleExerciseSelect(exercise: ExerciseMeta) {
    setSelectedExercise(exercise);
  }

  function handleCopyPreviousSet(index: number) {
    const previousSet = sets[index - 1];
    handleSetChange(index, "weight", previousSet.weight);
    handleSetChange(index, "reps", previousSet.reps);
  }

  function handleDuplicateLastSet() {
    duplicateLastSet();
    setSetCountState((prev) => prev + 1);
  }

  /// Validates inputs, builds the Exercise object, and appends it to the workout store
  const handleSave = () => {
    if (sets.length === 0) {
      alert("Exercise needs at least one set.\n\nDon't be lazy");
      return;
    }
    const hasInvalidSet = sets.some((set) => parseInt(set.reps) == 0 || !set.reps);
    if (hasInvalidSet) {
      alert("You have to to at least one set, come on...");
      return;
    }
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
    <BottomSheetModal
      ref={modalRef}
      onDismiss={() => onClose()}
      enableDynamicSizing={false}
      snapPoints={["80%"]}
      backdropComponent={() => <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill}></BlurView>}
    >
      <Activity mode={selectedExercise ? "hidden" : "visible"}>
        <View style={{ flex: 1 }}>
          <View style={exerciseSelectStyles.modalWraper}>
            <View>
              <Text style={exerciseSelectStyles.modalTitle}>Select Exercise</Text>
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
                    <View key={item.exerciseKey} style={exerciseSelectStyles.modalExerciseCard}>
                      <View style={exerciseSelectStyles.cardTextWraper}>
                        <Text>{item.exerciseName}</Text>
                        <Dot size={24} color="#000000cc" />
                        <Text>{item.targetMuscleGroup}</Text>
                      </View>
                      <Pressable style={exerciseSelectStyles.addButton} onPress={() => handleExerciseSelect(item)}>
                        <Plus size={24} color={appStyle.colors.primaryColor} />
                      </Pressable>
                    </View>
                  ))}
                </React.Fragment>
              ))}
            </BottomSheetScrollView>
          )}
        </View>
      </Activity>

      {selectedExercise && (
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={exerciseEditstyles.modalTitle}>{selectedExercise.exerciseName}</Text>
          <Text style={exerciseEditstyles.modalSubTitle}>{selectedExercise.targetMuscleGroup}</Text>
          <View style={counterStyles.row}>
            <Text style={counterStyles.label}>Number of Sets</Text>
            <View style={counterStyles.stepper}>
              <Pressable onPress={() => setSetCountState((prev) => Math.max(1, prev - 1))} style={counterStyles.iconButton}>
                <Minus size={18} color={appStyle.colors.primaryColor} />
              </Pressable>
              <Text style={counterStyles.countText}>{setCountState}</Text>
              <Pressable onPress={() => setSetCountState((prev) => prev + 1)} style={counterStyles.iconButton}>
                <Plus size={18} color={appStyle.colors.primaryColor} />
              </Pressable>
            </View>
          </View>
          <View style={setListStyles.header}>
            <Text style={[setListStyles.headerCell, setListStyles.setNumberCell]}>Set</Text>
            <Text style={setListStyles.headerCell}>kg</Text>
            <Text style={setListStyles.headerCell}>Reps</Text>
            <View style={setListStyles.copyButtonPlaceholder} />
          </View>
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {sets.map((set, index) => (
              <View key={index} style={setListStyles.row}>
                <Text style={setListStyles.setNumberText}>{index + 1}</Text>
                <TextInput
                  style={setListStyles.input}
                  keyboardType="numeric"
                  placeholder="- -"
                  placeholderTextColor={appStyle.text.mutedTextColor}
                  value={set.weight}
                  onChangeText={(value) => handleSetChange(index, "weight", value)}
                />
                <TextInput
                  style={setListStyles.input}
                  keyboardType="numeric"
                  placeholder="- -"
                  placeholderTextColor={appStyle.text.mutedTextColor}
                  value={set.reps}
                  onChangeText={(value) => handleSetChange(index, "reps", value)}
                />
                {index > 0 ? (
                  <Pressable style={setListStyles.copyButton} onPress={() => handleCopyPreviousSet(index)}>
                    <Copy size={18} color={appStyle.colors.primaryColor} />
                  </Pressable>
                ) : (
                  <View style={setListStyles.copyButtonPlaceholder} />
                )}
              </View>
            ))}
          </BottomSheetScrollView>
          <View style={bottomActionStyles.container}>
            <Pressable style={bottomActionStyles.button} onPress={handleDuplicateLastSet}>
              <CopyPlus size={18} color={appStyle.colors.primaryColor} />
              <Text style={bottomActionStyles.buttonText}>Duplicate Last Set</Text>
            </Pressable>
            <Pressable style={bottomActionStyles.button} onPress={applyFirstSetToEmpty}>
              <CopyCheck size={18} color={appStyle.colors.primaryColor} />
              <Text style={bottomActionStyles.buttonText}>Apply First Set to All Empty</Text>
            </Pressable>
            <Pressable style={bottomActionStyles.primaryButton} onPress={handleSave}>
              <Text style={bottomActionStyles.primaryButtonText}>Add {selectedExercise.exerciseName}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </BottomSheetModal>
  );
}

const sharedStyles = StyleSheet.create({
  modalTitle: {
    fontFamily: appStyle.fontStyles.semibold,
    color: appStyle.colors.primaryColor,
    fontSize: appStyle.fontSizes.large,
  },
  modalSubTitle: {
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
  },
});

const exerciseSelectStyles = StyleSheet.create({
  modalWraper: {
    gap: 20,
    padding: 20,
  },
  headerWraper: {},
  modalTitle: {
    ...sharedStyles.modalTitle,
  },
  modalSubTitle: {
    ...sharedStyles.modalSubTitle,
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

  addButton: {
    borderRadius: 100,
    borderColor: appStyle.colors.primaryColor,
    borderWidth: 1,
  },
});

const exerciseEditstyles = StyleSheet.create({
  modalTitle: {
    ...sharedStyles.modalTitle,
  },
  modalSubTitle: {
    ...sharedStyles.modalSubTitle,
    backgroundColor: appStyle.colors.primaryTintColor,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 10,
    borderColor: appStyle.colors.primaryColor,
    borderWidth: 1,
  },
});

const counterStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontFamily: appStyle.fontStyles.medium,
    fontSize: appStyle.fontSizes.medium,
    color: appStyle.text.textColor,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appStyle.colors.primaryTintColor,
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 14,
  },
  iconButton: {
    padding: 4,
  },
  countText: {
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
    color: appStyle.text.textColor,
    minWidth: 20,
    textAlign: "center",
  },
});

const setListStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 4,
    gap: 10,
  },
  headerCell: {
    flex: 1,
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.small,
    color: appStyle.text.secondaryTextColor,
    textAlign: "center",
  },
  setNumberCell: {
    flex: 0.5,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appStyle.colors.primaryTintColor,
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    gap: 10,
  },
  setNumberText: {
    flex: 0.5,
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
    color: appStyle.text.textColor,
    textAlign: "left",
  },
  input: {
    flex: 1,
    backgroundColor: appStyle.colors.secondaryColor,
    borderRadius: 10,
    paddingVertical: 10,
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
    color: appStyle.text.textColor,
    textAlign: "center",
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appStyle.colors.secondaryColor,
  },
  copyButtonPlaceholder: {
    width: 40,
    height: 40,
  },
});

const bottomActionStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appStyle.card.cardBorderColor,
    backgroundColor: appStyle.colors.secondaryColor,
    paddingVertical: 12,
  },
  buttonText: {
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
    color: appStyle.colors.primaryColor,
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: appStyle.colors.primaryColor,
    paddingVertical: 14,
  },
  primaryButtonText: {
    fontFamily: appStyle.fontStyles.semibold,
    fontSize: appStyle.fontSizes.medium,
    color: appStyle.text.lightColor,
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
