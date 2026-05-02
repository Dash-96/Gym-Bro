import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ExerciseProgress from "../../components/statsComponents/exerciseProgress";
import QuickStatsCard from "../../components/statsComponents/quickStatsCard";

export default function StatsScreen() {
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <QuickStatsCard />
      <ExerciseProgress />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
  },
});
