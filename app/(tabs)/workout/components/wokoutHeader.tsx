import { useWorkoutStore } from "@/app/(tabs)/home/store/workoutStore";
import { appStyle, fontStyles } from "@/app/constants/theme";
import { useRouter } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WorkoutHeader() {
  const workoutAlias = useWorkoutStore((s) => s.workout.workoutType);
  return (
    <View style={headerStyles.headerContainer}>
      <BackButton />
      <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
        <Text style={headerStyles.workoutName}>{workoutAlias}</Text>
        <StopWatch />
      </View>
      <FinishButton />
    </View>
  );
}

function FinishButton() {
  return (
    <Pressable style={({ pressed }) => [finishButtonStyle.finishButtonContainer, pressed && { opacity: 0.8 }]}>
      <Text style={finishButtonStyle.finishButtonText}>Finish</Text>
    </Pressable>
  );
}

function BackButton() {
  const router = useRouter();
  function navigateBack() {
    router.push("/(tabs)/home");
  }
  return (
    <Pressable style={({ pressed }) => [backButtonStyle.buttonContainer, pressed && { opacity: 0.7 }]} onPress={navigateBack}>
      <MoveLeft size={22} color={appStyle.colors.primaryColor} />
    </Pressable>
  );
}

function StopWatch() {
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [timer, setTimer] = useState({ hours: "00", minutes: "00", seconds: "00" });

  // Note: setInterval runs on every render — should be inside a useEffect to avoid leaks
  setInterval(() => {
    ticker();
  }, 1000);
  function ticker() {
    let timeNow = new Date().getTime();
    let diff = (timeNow - startTime) / 1000;
    let seconds = Math.floor(diff % 60);
    let minutes = Math.floor((diff % 3600) / 60);
    let hours = Math.floor(diff / 3600);
    setTimer({ hours: String(hours).padStart(2, "0"), minutes: String(minutes).padStart(2, "0"), seconds: String(seconds).padStart(2, "0") });
  }
  return (
    <View style={timerStyles.timer}>
      <Text>
        <Text style={timerStyles.timerDigits}>{timer.hours} : </Text>
        <Text style={timerStyles.timerDigits}>{timer.minutes} : </Text>
        <Text style={timerStyles.timerDigits}>{timer.seconds}</Text>
      </Text>
    </View>
  );
}
const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: appStyle.colors.secondaryColor,
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  workoutName: {
    color: appStyle.text.secondaryTextColor,
    ...fontStyles.semibold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
});
const timerStyles = StyleSheet.create({
  timer: {
    flexDirection: "row",
    backgroundColor: appStyle.colors.primaryColor,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  timerDigits: {
    color: appStyle.colors.secondaryColor,
    ...fontStyles.semibold,
    fontSize: 15,
    letterSpacing: 1,
  },
});
const finishButtonStyle = StyleSheet.create({
  finishButtonContainer: {
    backgroundColor: appStyle.colors.accentColor,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  finishButtonText: {
    color: appStyle.colors.secondaryColor,
    ...fontStyles.semibold,
    fontSize: 14,
  },
});
const backButtonStyle = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appStyle.colors.primaryTintColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
