import { useQuickStats } from "@/src/hooks/statsHooks.ts/quickStatsHooks";
import { Activity, Clock2, Dumbbell, Flame, TrendingDown, TrendingUp } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { appStyle, cardStyles, fontStyles } from "../../constants/theme";

export default function QuickStatsCard() {
  const { quickstats } = useQuickStats();
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.rowWraper}>
          <Dumbbell size={16} />
          <Text style={styles.title}>Workouts</Text>
        </View>
        <Text style={styles.stat}>{quickstats?.workoutStats.currentAmount}</Text>
        <View style={styles.rowWraper}>
          {quickstats?.workoutStats.change == "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <Text style={styles.change}>{`${quickstats?.workoutStats.percent}% ${quickstats?.workoutStats.change == "up" ? "more" : "less"} workouts`}</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.rowWraper}>
          <Activity size={16} />
          <Text style={styles.title}>Total Sets</Text>
        </View>
        <Text style={styles.stat}>the stat</Text>
        <View style={styles.rowWraper}>
          <TrendingUp size={16} />
          <Text style={styles.change}>the change</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.rowWraper}>
          <Flame size={16} />
          <Text style={styles.title}>Total Volume</Text>
        </View>
        <Text style={styles.stat}>the stat</Text>
        <View style={styles.rowWraper}>
          <TrendingUp size={16} />
          <Text style={styles.change}>the change</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.rowWraper}>
          <Clock2 size={16} />
          <Text style={styles.title}>Avg Duration</Text>
        </View>
        <Text style={styles.stat}>the stat</Text>
        <View style={styles.rowWraper}>
          <TrendingDown size={16} />
          <Text style={styles.change}>the change</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    padding: 10,
  },
  cardContainer: {
    ...cardStyles,
    width: "48%",
    height: 100,
    backgroundColor: appStyle.card.darkCardBackGround,
    justifyContent: "space-around",
    padding: 10,
  },

  rowWraper: {
    flexDirection: "row",
    gap: 10,
  },

  title: {
    color: appStyle.text.textColor,
  },
  stat: {
    ...fontStyles.semibold,
    fontSize: 30,
  },
  change: {
    color: appStyle.colors.primaryColor,
  },
});
