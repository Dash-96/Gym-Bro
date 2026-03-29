import { appStyle, cardStyles, fontSizes, fontStyles } from "@/src/app/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function NoExerciseCard() {
  return (
    <View style={[cardStyles, styles.cardContainer]}>
      <View style={styles.iconWraper}>
        <Ionicons name="barbell" size={40} color={appStyle.colors.primaryColor} style={styles.barberllIcon} />
      </View>
      <Text style={[fontStyles.medium, { fontSize: fontSizes.cardSubTitle }]}>No exercises yet</Text>
      <Text style={[fontStyles.regular, { color: appStyle.text.mutedTextColor, textAlign: "center", fontSize: fontSizes.bodyText }]}>
        Add your dirst exercise to start building {"\n"} your workout plan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    // flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  iconWraper: {
    backgroundColor: appStyle.colors.primaryTintColor,
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  barberllIcon: {
    transform: [{ rotateZ: "45deg" }],
  },
});
