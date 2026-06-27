import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ColorValue, DimensionValue, LayoutChangeEvent, StyleSheet, Text } from "react-native";

type Props = {
  withOutline?: boolean;
  circleNumber?: number;
  userSymbol?: string;
  customText?: string;
  customColors?: [ColorValue, ColorValue, ...ColorValue[]];
  customFont?: number;
  customWidth?: DimensionValue;
  customHeight?: DimensionValue;
};

export default function UserCircle({ withOutline, circleNumber = 0, userSymbol, customText, customColors, customFont = 0, customWidth, customHeight }: Props) {
  const [fontSize, setFontSize] = useState(1);
  const haveCustomFontSize = customFont != 0 ? true : false;
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
      style={[styles.gradientContainer, withOutline && styles.circleOutline, { width: customWidth, height: customHeight }]}
      colors={
        customColors ? customColors : [circleColors[circleNumber % circleColors.length].fromColor, circleColors[circleNumber % circleColors.length].toColor]
      }
    >
      <Text style={[styles.userSymbol, { fontSize: fontSize }, haveCustomFontSize && { fontSize: customFont }]}>{customText ? customText : userSymbol}</Text>
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
  { fromColor: "#FB923C", toColor: "#EA580C" },
];
