import { appStyle } from "@/src/app/constants/theme";
import { useExercieProgressDropDown } from "@/src/hooks/statsHooks.ts/quickStatsHooks";
import { getExcerciseProgress } from "@/src/repositories/statsRepository";
import { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import Animated from "react-native-reanimated";
import DropDown from "../sharedComponents/dropdown";

export default function ExerciseProgress() {
  const [exerciseProgressData, setExerciseProgressData] = useState<lineDataItem[]>([]);
  const [maxValue, setMaxValue] = useState(200);
  const [minValue, setMinValue] = useState(0);
  const exerciseItems = useExercieProgressDropDown();
  const [viewedExercise, setViewedExercise] = useState("");
  // const chartProgressionData = useProgressionData();
  const { width: screenWidth } = useWindowDimensions();
  const chartWidth = screenWidth * 0.8; // 80% of screen, centered by parent
  useEffect(() => {
    (async () => {
      if (viewedExercise == "") return;
      const data = await getExcerciseProgress(viewedExercise);
      if (data) {
        const lineData: lineDataItem[] = [];
        data.forEach((setEntry) =>
          lineData.push({
            value: setEntry.weight,
            label: setEntry.createdAt.slice(2, 10),
            dataPointLabelComponent: () => <Text style={{ fontWeight: "bold", transform: [{ translateY: -10 }] }}>{setEntry.weight.toString()}</Text>,
          }),
        );
        setMaxValue(Math.max(...data.map((set) => set.weight)));
        setMinValue(Math.min(...data.map((set) => set.weight)));
        setExerciseProgressData(lineData);
      }
    })();
  }, [viewedExercise]);

  function changeProgressionDisplay(exerciseName: string, exerciseKey: string) {
    setViewedExercise(exerciseKey);
  }

  return (
    <Animated.View style={styles.cardContainer}>
      <DropDown
        list={exerciseItems}
        getKey={(item) => item.exerciseKey}
        getValue={(item) => item.exerciseName}
        onSelect={(item) => changeProgressionDisplay(item.exerciseName, item.exerciseKey)}
      />
      {chartWidth > 0 && exerciseProgressData.length > 0 && (
        <LineChart
          data={exerciseProgressData}
          color={appStyle.colors.primaryColor}
          dataPointsColor1={appStyle.colors.primaryColor}
          hideRules
          hideYAxisText
          spacing={chartWidth / exerciseProgressData.length}
          yAxisOffset={minValue}
          isAnimated
          thickness={3}
          adjustToWidth
          width={chartWidth}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 100,
    gap: 50,
  },
});
