import { useExercieProgressDropDown } from "@/src/hooks/statsHooks.ts/quickStatsHooks";
import { getExcerciseProgress } from "@/src/repositories/statsRepository";
import { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { lineDataItem } from "react-native-gifted-charts";
import Animated from "react-native-reanimated";
import Chart from "../sharedComponents/chart";
import DropDown from "../sharedComponents/dropdown";

export default function ExerciseProgress() {
  const [exerciseProgressData, setExerciseProgressData] = useState<lineDataItem[]>([]);
  const [maxValue, setMaxValue] = useState(200);
  const [minValue, setMinValue] = useState(0);
  const exerciseItems = useExercieProgressDropDown();
  const [viewedExercise, setViewedExercise] = useState("");
  // const chartProgressionData = useProgressionData();
  const { width: screenWidth } = useWindowDimensions();
  const chartWidth = screenWidth * 1; // 80% of screen, centered by parent
  const dataPointsSpacing = exerciseProgressData.length * 20;
  useEffect(() => {
    (async () => {
      if (viewedExercise == "") return;
      const data = await getExcerciseProgress(viewedExercise);
      if (data) {
        const lineData: lineDataItem[] = [];
        data.forEach((setEntry) =>
          lineData.push({
            value: setEntry.weight,
            label: formattDate(setEntry.createdAt),
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

  function formattDate(date: string) {
    console.log(date);
    const dateParts = date.split(" ")[0].split("-");
    const format = `${dateParts[2]}/${dateParts[1]}`;
    return format;
  }

  return (
    <Animated.View style={styles.cardContainer}>
      <DropDown
        list={exerciseItems}
        getKey={(item) => item.exerciseKey}
        getValue={(item) => item.exerciseName}
        onSelect={(item) => changeProgressionDisplay(item.exerciseName, item.exerciseKey)}
      />

      <View style={{ height: 300, width: 300 }}>
        <Chart />
      </View>

      {/* {chartWidth > 0 && exerciseProgressData.length > 0 && (
        <LineChart
          key={viewedExercise}
          areaChart
          isAnimated
          animationDuration={1000}
          animateOnDataChange
          onDataChangeAnimationDuration={500}
          data={exerciseProgressData}
          color={appStyle.colors.primaryColor}
          dataPointsColor1={appStyle.colors.primaryColor}
          // hideRules
          // hideYAxisText
          // spacing={chartWidth / exerciseProgressData.length}
          spacing={dataPointsSpacing}
          yAxisOffset={minValue - 10}
          thickness={3}
          adjustToWidth
          width={chartWidth}
          // initialSpacing={23}
          // endSpacing={dataPointsSpacing > chartWidth ? 30 : 0}
          endSpacing={21}
          startFillColor={appStyle.colors.primaryColor}
          startOpacity={0.8}
          endFillColor={appStyle.colors.primaryTintColor}
          endOpacity={0.8}
          xAxisLabelTextStyle={{ fontSize: 12 }}
        />
      )} */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 100,
    gap: 50,
  },
});
