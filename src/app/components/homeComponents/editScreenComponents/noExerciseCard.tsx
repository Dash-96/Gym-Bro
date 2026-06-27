import { appStyle, cardStyles } from "@/src/app/constants/theme";
import CustomText from "@/src/app/components/sharedComponents/customText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

export default function NoExerciseCard() {
  return (
    <View style={[cardStyles, styles.cardContainer]}>
      <View style={styles.iconWraper}>
        <Ionicons name="barbell" size={40} color={appStyle.colors.primaryColor} style={styles.barberllIcon} />
      </View>
      <CustomText variant="cardSubTitle">No exercises yet</CustomText>
      <CustomText variant="body" color="muted" style={{ textAlign: "center" }}>
        Add your dirst exercise to start building {"\n"} your workout plan
      </CustomText>
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
