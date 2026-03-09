import { StyleSheet, View } from "react-native";
import ProgressBar from "./progressBar";

export default function WorkoutScreenHeader() {
  return (
    <View style={styles.headerContainer}>
      <ProgressBar />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
  },
});
