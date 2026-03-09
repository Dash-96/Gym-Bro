import { useHiddenTabBar } from "@/app/appHooks/hooks";
import { appStyle, fontSizes, fontStyles } from "@/app/constants/theme";
import { insertWorkout } from "@/app/repositories/workoutRepo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, ToastAndroid } from "react-native";
import { CreateExercisePopup } from "../components/editScreenComponents/createExercisePopup";
import EditHeaderCard from "../components/editScreenComponents/editHeaderCard";
import ExerciseCardList from "../components/editScreenComponents/exerciseCardList";
import NoExerciseCard from "../components/editScreenComponents/noExerciseCard";
import NotesCard from "../components/editScreenComponents/notesCard";
import { useWorkoutStore } from "../store/workoutStore";

export default function EditWorkoutScreen() {
  const workoutData = useWorkoutStore((state) => state.workout);
  const hasExercises = (workoutData.exercises?.length ?? 0) > 0;
  const { workoutState } = useLocalSearchParams<{ workoutState: string }>();
  const [isModalVisible, setModalVisisble] = useState(false);
  useHiddenTabBar();
  const router = useRouter();

  // Persists the workout to SQLite, shows a toast, then navigates back to home
  function saveWorkout() {
    insertWorkout(workoutData);
    ToastAndroid.show("Your workout has been created", ToastAndroid.SHORT);

    setTimeout(() => {
      router.push("/home/screens/homeScreen");
    }, 500);
  }

  // console.log(`!!!!first item is: ${workoutData.workoutDetails[0].excerciseName} ||| second item is: ${workoutData.workoutDetails[1].excerciseName}`);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
        <Pressable style={styles.saveButton} onPress={saveWorkout}>
          <AntDesign name="save" size={24} color="white" />
          <Text style={(fontStyles.semibold, { fontSize: fontSizes.buttonText, color: "white", fontWeight: "bold" })}>Save Workout</Text>
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
    paddingVertical: 20,
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
