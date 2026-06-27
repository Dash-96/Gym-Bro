import { appStyle, fontStyles } from "@/src/app/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export function StopWatch() {
  const [startTime] = useState(new Date().getTime());
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
    setTimer({
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });
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
