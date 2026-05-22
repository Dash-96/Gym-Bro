import { Pressable, StyleSheet, Text, View } from "react-native";
import { appStyle, fontSizes, fontStyles } from "../../constants/theme";
import SimpleCard from "../sharedComponents/simpleCard";
import UserCircle from "../sharedComponents/userCircle";

type Props = {
  cardNumber: number;
  friendName: string;
};
export default function FriendCard({ cardNumber = 0, friendName = "" }: Props) {
  return (
    <SimpleCard customStyle={styles.cardContainer}>
      <View style={styles.circleWraper}>
        <UserCircle circleNumber={cardNumber} userSymbol={friendName.slice(0, 1)}></UserCircle>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.nameText}>{friendName}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.challangeButton}>
            <Text style={styles.challangeText}>Challange</Text>
          </Pressable>
          <Pressable style={styles.messageButton}>
            <Text style={styles.messageText}>Message</Text>
          </Pressable>
        </View>
      </View>
    </SimpleCard>
  );
}

const sharedStyles = StyleSheet.create({
  actionButton: {
    width: "40%",
    height: 30,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
  },
  actionText: {
    // flex: 1,
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: appStyle.colors.secondaryColor,
    gap: 10,
  },

  circleWraper: {
    width: 50,
    height: 50,
  },
  cardBody: {
    alignItems: "flex-start",
    gap: 5,
  },
  nameText: {
    fontSize: fontSizes.cardTitle,
    paddingStart: 10,
    ...fontStyles.semibold,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
  },

  challangeButton: {
    ...sharedStyles.actionButton,
    borderColor: appStyle.colors.accentColor,
  },
  challangeText: {
    ...sharedStyles.actionText,
    color: appStyle.colors.accentColor,
  },
  messageButton: {
    ...sharedStyles.actionButton,
    borderColor: appStyle.colors.primaryColor,
  },
  messageText: {
    ...sharedStyles.actionText,
    color: appStyle.colors.primaryColor,
  },
});
