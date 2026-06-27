import { sendFriendRequest } from "@/src/api/notificationApi";
import { useMutation } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { appStyle, fontSizes, fontStyles } from "../../constants/theme";
import SimpleCard from "../sharedComponents/simpleCard";
import UserCircle from "../sharedComponents/userCircle";

type Props = {
  cardNumber: number;
  friendName: string;
  friendId?: number;
  variant: "friend" | "addFriend";
};
export default function FriendCard({ cardNumber = 0, friendName = "", variant = "friend", friendId }: Props) {
  const { mutate: sendRequest } = useMutation({ mutationKey: ["friend-request"], mutationFn: (id: number) => sendFriendRequest(id) });
  return (
    <SimpleCard customStyle={styles.cardContainer}>
      <UserCircle circleNumber={cardNumber} userSymbol={friendName.slice(0, 1).toUpperCase()} customWidth={50} customHeight={50}></UserCircle>
      <View style={styles.cardBody}>
        <Text style={styles.nameText}>{friendName}</Text>
        <View style={styles.buttonsContainer}>
          {variant === "friend" && (
            <>
              <Pressable style={styles.challangeButton}>
                <Text style={styles.challangeText}>Challange</Text>
              </Pressable>
              <Pressable style={styles.messageButton}>
                <Text style={styles.messageText}>Message</Text>
              </Pressable>
            </>
          )}

          {variant === "addFriend" && (
            <Pressable style={styles.addButton} onPress={() => sendRequest(friendId ?? 0)}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SimpleCard>
  );
}

const sharedStyles = StyleSheet.create({
  actionButton: {
    height: 30,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  actionText: {
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: appStyle.colors.secondaryColor,
    gap: 10,
    // paddingRight: 0,
  },

  circleWraper: {
    width: 50,
    height: 50,
  },
  cardBody: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    // backgroundColor: "red",
  },
  nameText: {
    fontSize: fontSizes.cardTitle,
    paddingStart: 10,
    flex: 1,
    ...fontStyles.semibold,
  },
  buttonsContainer: {
    justifyContent: "center",
    gap: 10,
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

  addButton: {
    ...sharedStyles.actionButton,
    borderColor: appStyle.colors.primaryColor,
  },
  addText: {
    ...sharedStyles.actionText,
    color: appStyle.colors.primaryColor,
  },
});
