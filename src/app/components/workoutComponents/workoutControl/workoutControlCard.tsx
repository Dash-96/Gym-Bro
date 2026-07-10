import { workoutControlStyle } from "@/src/app/constants/theme";
import { useFinishWorkout } from "@/src/hooks/workoutHooks/workoutHooks";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
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

  const workoutState = useWorkoutStore((state) => state.workout);
  // console.log(workoutState);
  const finishWorkout = useFinishWorkout(workoutState);
  const exercises = workoutState.exercises;

  const workoutDisplayName = workoutState.workoutAlias === "" ? workoutState.workoutType : workoutState.workoutAlias;

  useEffect(() => {
    if (exercises.length > 0 && exerciseCount === exercises.length) {
      finishWorkout();
    }
  }, [exerciseCount]);

  return (
    <View style={styles.card}>
      {/*//. Header: workout title + duration (StopWatch) */}
      <CustomText variant="screenTitle" style={styles.title}>
        {workoutDisplayName} Day
      </CustomText>
      <View style={styles.header}>
        <View style={styles.durationBadge}>
          <StopWatch />
          <ProgressBar />
        </View>
      </View>
      <Timer cutomRest={restTime} />
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
    flexDirection: "row",
    justifyContent: "space-around",
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
});
