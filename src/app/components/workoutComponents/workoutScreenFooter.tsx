import { appStyle } from "@/src/app/constants/theme";

import { StyleSheet, View } from "react-native";
import Timer from "./timer";

export default function WorkoutScreenFooter() {
  return (
    <View style={styles.footerContainer}>
      <Timer cutomRest="00:02:00"></Timer>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appStyle.colors.secondaryColor,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: "auto",
    flexDirection: "row",
    justifyContent: "center",
  },
});
