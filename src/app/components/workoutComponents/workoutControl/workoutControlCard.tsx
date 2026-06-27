import { createWorkout } from "@/src/api/workoutAPI";
import { workoutControlStyle } from "@/src/app/constants/theme";
import { updateWorkout } from "@/src/repositories/workoutRepo";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../sharedComponents/customText";
import { useWorkoutTrackerContext } from "../workoutTrackrContext";
import ProgressBar from "./progressBar";
import { StopWatch } from "./stopWatch";
import Timer from "./timer";

type WorkoutControlCardProps = {
  workoutName?: string;
  status?: string;
  restTime?: string;
  restLabel?: string;
};

export function WorkoutControlCard({ workoutName, status = "Workout in progress", restTime, restLabel = "Rest between sets" }: WorkoutControlCardProps) {
  const { count: exerciseCount } = useWorkoutTrackerContext();
  const resetWorkoutState = useWorkoutStore((state) => state.resetWorkout);
  const workoutState = useWorkoutStore((state) => state.workout);
  const exercises = workoutState.exercises;
  const router = useRouter();

  const displayName = workoutName ?? workoutState.workoutAlias;

  useEffect(() => {
    if (exercises.length > 0 && exerciseCount === exercises.length) {
      finishWorkout();
    }
  }, [exerciseCount]);

  async function finishWorkout() {
    const finishTime = new Date();
    const tempWorkoutState = { ...workoutState };
    tempWorkoutState.finishedAt = finishTime;
    /// Saves workout to local DB
    await updateWorkout(tempWorkoutState);
    /// Save the workout to remote DB
    createWorkout(tempWorkoutState);
    resetWorkoutState();
    router.replace("/(tabs)/home");
  }

  return (
    <View style={styles.card}>
      {/* Header: workout title + duration (StopWatch) */}
      <View style={styles.header}>
        <View style={styles.headerTitleGroup}>
          <CustomText variant="screenTitle" style={styles.title}>
            {displayName} Day
          </CustomText>
          {/* <CustomText variant="cardSubTitle" style={styles.status}>
            {status}
          </CustomText> */}
        </View>
        <View style={styles.durationBadge}>
          {/* <CustomText variant="meta" style={styles.durationLabel}>
            DURATION
            </CustomText> */}
          <ProgressBar />
          <StopWatch />
        </View>
      </View>

      {/* Rest timer */}
      {/* <View style={styles.restCard}>
        <View style={styles.restHeaderRow}>
          <View style={styles.restIconCircle}>
            <TimerIcon size={22} color={workoutControlStyle.onAccent} />
          </View>
          <View style={styles.restTextGroup}>
            <CustomText variant="meta" style={styles.restLabel}>
              REST TIMER
            </CustomText>
            <CustomText variant="meta" style={styles.restSubLabel}>
              {restLabel}
            </CustomText>
          </View>
        </View>
        <Timer cutomRest={restTime} />
      </View> */}

      {/* Progress */}
      {/* <ProgressBar /> */}
      <Timer cutomRest={restTime} />

      {/* Finish */}
      <Pressable onPress={finishWorkout} style={({ pressed }) => [styles.finishButton, pressed && { opacity: 0.85 }]}>
        <CustomText variant="button" style={styles.finishButtonText}>
          Finish Workout
        </CustomText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    alignItems: "center",
    backgroundColor: workoutControlStyle.cardBg,
    borderRadius: 20,
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: workoutControlStyle.cardBorder,
    boxShadow: workoutControlStyle.cardShadow,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitleGroup: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: workoutControlStyle.title,
  },
  status: {
    color: workoutControlStyle.subtitle,
  },
  durationBadge: {
    backgroundColor: workoutControlStyle.durationBadgeBg,
    borderRadius: 16,
    paddingVertical: 10,
    // paddingHorizontal: 10,
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  durationLabel: {
    color: workoutControlStyle.label,
    letterSpacing: 1.2,
  },
  restCard: {
    gap: 14,
    backgroundColor: workoutControlStyle.restCardBg,
    borderWidth: 1,
    borderColor: workoutControlStyle.restCardBorder,
    borderRadius: 16,
    padding: 16,
  },
  restHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  restIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: workoutControlStyle.iconCircleBg,
    alignItems: "center",
    justifyContent: "center",
  },
  restTextGroup: {
    flex: 1,
    gap: 2,
  },
  restLabel: {
    color: workoutControlStyle.label,
    letterSpacing: 1.2,
  },
  restSubLabel: {
    color: workoutControlStyle.muted,
  },
  finishButton: {
    backgroundColor: workoutControlStyle.finishButtonBg,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  finishButtonText: {
    color: workoutControlStyle.onAccent,
  },
});
