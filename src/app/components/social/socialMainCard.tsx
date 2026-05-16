import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { appStyle, fontSizes, fontStyles } from "../../constants/theme";
import SimpleCard from "../sharedComponents/simpleCard";
import UserCircle from "../sharedComponents/userCircle";

export default function SocialMainCard() {
  //! Mock friends list , later will be fetched from DB
  const users = ["Nethanel", "Alice", "Carol"];
  return (
    <SimpleCard customStyle={styles.cardContainer}>
      <LinearGradient style={styles.gradientContainer} colors={["#DBEAFE", "#BFDBFE"]}>
        <Text style={styles.cardHeader}>3 friends trained today</Text>
        <Text>Join them and keep your streak alive</Text>
        <View style={styles.userCirclesSection}>
          {users.map((user, index) => (
            <View key={index} style={[styles.userCircleWraper]}>
              <UserCircle withOutline={true} circleNumber={index} userSymbol={user.slice(0, 1)} />
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.startButton}>
            <Text style={styles.startText}>Start Workout</Text>
          </Pressable>
          <Pressable style={styles.viewButton}>
            <Text style={styles.viewText}>View activity</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SimpleCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
  },

  gradientContainer: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 15,
  },

  cardHeader: {
    fontSize: fontSizes.cardTitle,
    ...fontStyles.semibold,
  },
  userCirclesSection: {
    flexDirection: "row",
  },

  userCircleWraper: {
    width: 50,
    height: 50,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  startButton: {
    backgroundColor: appStyle.colors.primaryColor,
    paddingVertical: 10,
    width: "60%",
    borderRadius: 20,
  },

  startText: {
    flex: 1,
    textAlign: "center",
    color: appStyle.colors.secondaryColor,
    fontSize: fontSizes.buttonText,
    ...fontStyles.semibold,
  },

  viewButton: {
    width: "30%",
    paddingVertical: 10,
  },

  viewText: {
    textAlign: "center",
    color: appStyle.colors.primaryColor,
  },
});
