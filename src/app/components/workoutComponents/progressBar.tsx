import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { Activity } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import { useExerciseCountContext } from "./excerciseCountContext";

export default function ProgressBar() {
  const { count: current } = useExerciseCountContext();
  const total = useWorkoutStore((state) => state.workout.exercises.length);
  const progress = useSharedValue(0);
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  useEffect(() => {
    progress.value = withTiming(total > 0 ? current / total : 0, { duration: 400 });
  }, [current, total]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Activity size={18} color={appStyle.colors.primaryColor} />
        <Text style={styles.exerciseText}>
          {current}/{total} exercises
        </Text>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  exerciseText: {
    flex: 1,
    fontSize: fontSizes.metaText,
    ...fontStyles.medium,
    color: appStyle.text.secondaryTextColor,
  },
  percentageText: {
    fontSize: fontSizes.metaText,
    ...fontStyles.semibold,
    color: appStyle.colors.primaryColor,
  },
  track: {
    width: "100%",
    height: 8,
    backgroundColor: appStyle.colors.primaryTintColor,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: appStyle.colors.primaryColor,
    borderRadius: 4,
  },
});
