import { appStyle, fontSizes, fontStyles } from "@/app/constants/theme";
import { Redo2, Undo2 } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTimerTicker } from "@/app/hooks/workoutHooks/customHooks";

interface timerProps {
  cutomRest?: string;
}

export default function Timer({ cutomRest }: timerProps) {
  const { restDuration, alterTime } = useTimerTicker(cutomRest);

  return (
    <View style={styles.timerContainer}>
      <Pressable style={styles.timeArrow} onPress={() => alterTime(15)}>
        <Undo2 size={24} color={"white"} />
        <Text style={{ color: "white" }}>-15</Text>
      </Pressable>
      <View style={styles.timerWraper}>
        <Text style={styles.tickerDigits}>{restDuration.hours} : </Text>
        <Text style={styles.tickerDigits}>{restDuration.minutes} :</Text>
        <Text style={styles.tickerDigits}>{restDuration.seconds}</Text>
      </View>
      <Pressable style={styles.timeArrow} onPress={() => alterTime(-15)}>
        <Redo2 size={24} color={"white"} />
        <Text style={{ color: "white" }}>+15</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: "row",
    gap: 15,
  },
  timerWraper: {
    flexDirection: "row",
    backgroundColor: appStyle.colors.primaryColor,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },

  tickerDigits: {
    ...fontStyles.semibold,
    color: "white",
    fontSize: fontSizes.cardTitle,
  },

  timeArrow: {
    backgroundColor: appStyle.colors.primaryColor,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 50,
    width: 50,
  },
});
