import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text } from "react-native";

type Props = {
  withOutline?: boolean;
  circleNumber?: number;
  userSymbol?: string;
};

export default function UserCircle({ withOutline, circleNumber = 0, userSymbol }: Props) {
  const [fontSize, setFontSize] = useState(1);
  function getDimensions(event: LayoutChangeEvent) {
    const height = event.nativeEvent.layout.height;
    const width = event.nativeEvent.layout.width;
    let fontSize = width - width / 2;
    if (fontSize > 0) {
      setFontSize(fontSize);
    }
  }
  return (
    <LinearGradient
      onLayout={(event) => getDimensions(event)}
      style={[styles.gradientContainer, withOutline && styles.circleOutline]}
      colors={[circleColors[circleNumber].fromColor, circleColors[circleNumber].toColor]}
    >
      <Text style={[styles.userSymbol, { fontSize: fontSize }]}>{userSymbol}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 100,
  },

  circleOutline: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 100,
  },

  userSymbol: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const circleColors = [
  { fromColor: "#C084FC", toColor: "#9333EA" },
  { fromColor: "#60A5FA", toColor: "#2563EB" },
  { fromColor: "#4ADE80", toColor: "#16A34A" },
  { fromColor: "#FB923C", toColor: "#EA580C" },
];
