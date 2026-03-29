import { appStyle } from "@/src/app/constants/theme";
import { getExcerciseProgress } from "@/src/repositories/workoutRepo";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

export default function ExerciseProgress() {
  const [exerciseProgressData, setExerciseProgressData] = useState<lineDataItem[]>([]);
  const [maxValue, setMaxValue] = useState(200);
  const [minValue, setMinValue] = useState(0);
  useEffect(() => {
    (async () => {
      const data = await getExcerciseProgress("chest_bench_press_barbell");
      if (data) {
        const lineData: lineDataItem[] = [];
        data.forEach((setEntry) => lineData.push({ value: setEntry.weight, dataPointText: setEntry.weight.toString(), label: setEntry.createdAt }));
        setMaxValue(Math.max(...data.map((set) => set.weight)));
        setMinValue(Math.min(...data.map((set) => set.weight)));
        setExerciseProgressData(lineData);
      }
    })();
  }, []);

  return (
    <View style={{ paddingTop: 100 }}>
      <LineChart data={exerciseProgressData} color={appStyle.colors.primaryColor} hideRules hideYAxisText showVerticalLines yAxisOffset={minValue} />
    </View>
  );
}
