import { createWorkout } from "@/src/api/workoutAPI";
import { CreateExercisePopup } from "@/src/app/components/homeComponents/editScreenComponents/createExercisePopup";
import EditHeaderCard from "@/src/app/components/homeComponents/editScreenComponents/editHeaderCard";
import ExerciseCardList from "@/src/app/components/homeComponents/editScreenComponents/exerciseCardList";
import NoExerciseCard from "@/src/app/components/homeComponents/editScreenComponents/noExerciseCard";
import NotesCard from "@/src/app/components/homeComponents/editScreenComponents/notesCard";
import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { useHiddenTabBar } from "@/src/hooks/sharedHooks/useHiddenTabBar";
import { insertWorkout, updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, ToastAndroid } from "react-native";

export default function EditWorkoutScreen() {
  const workoutData = useWorkoutStore((state) => state.workout);
  const isExistingWorkout = workoutData.id ?? true;
  const hasExercises = (workoutData.exercises?.length ?? 0) > 0;
  const { workoutState } = useLocalSearchParams<{ workoutState: string }>();
  const [isModalVisible, setModalVisisble] = useState(false);
  useHiddenTabBar();
  const router = useRouter();
  const workoutMutation = useMutation({ mutationKey: ["createWorkout"], mutationFn: createWorkout, retry: 3 });

  // Persists the workout to SQLite, shows a toast, then navigates back to home
  function saveWorkout(action: string) {
    if (action == "save") {
      insertWorkout(workoutData);
      ToastAndroid.show("Your workout has been created", ToastAndroid.SHORT);
      workoutMutation.mutate(workoutData);
    } else if (action == "update") {
      updateWorkout(workoutData);
      workoutMutation.mutate(workoutData);
    }

    setTimeout(() => {
      // router.push("/home");
      router.replace("/(tabs)/home/homeScreen");
    }, 500);
  }

  // console.log(`!!!!first item is: ${workoutData.workoutDetails[0].excerciseName} ||| second item is: ${workoutData.workoutDetails[1].excerciseName}`);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}>
      <ScrollView style={styles.pageContainer} contentContainerStyle={styles.pageContainerContent} keyboardShouldPersistTaps="handled">
        <EditHeaderCard />
        {/* Show exercise list if exercises exist, otherwise show the empty state card */}
        {hasExercises ? <ExerciseCardList /> : <NoExerciseCard />}
        {isModalVisible && <CreateExercisePopup visible={true} onClose={() => setModalVisisble(false)} orderIndex={1} />}
        <Pressable style={styles.addExerciseButton} onPress={() => setModalVisisble(true)}>
          <AntDesign name="plus" size={16} color="white" />
          <Text style={(fontStyles.semibold, { fontSize: fontSizes.buttonText, color: "white", fontWeight: "bold" })}>Add Exercise</Text>
        </Pressable>
        <NotesCard />
        <Pressable style={styles.saveButton} onPress={() => saveWorkout(`${isExistingWorkout ? "update" : "save"}`)}>
          <AntDesign name="save" size={24} color="white" />
          <Text style={(fontStyles.semibold, { fontSize: fontSizes.buttonText, color: "white", fontWeight: "bold" })}>
            {isExistingWorkout ? "Update Workout" : "Save Workout"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: appStyle.colors.pageBg,
    flex: 1,
  },
  pageContainerContent: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 20,
    flexGrow: 1,
  },
  addExerciseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appStyle.colors.primaryColor,
    width: "100%",
    gap: 10,
    height: 40,
    borderRadius: 10,
  },

  saveButton: {
    backgroundColor: appStyle.colors.primaryColor,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "50%",
    borderRadius: 10,
  },
});
