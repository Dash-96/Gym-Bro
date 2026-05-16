import { getFriendRequests } from "@/src/api/notificationApi";
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { appStyle, fontSizes, fontStyles } from "../../constants/theme";
import SimpleCard from "../sharedComponents/simpleCard";
import UserCircle from "../sharedComponents/userCircle";

export default function FriendRequestsCard() {
  const { data: requests, isLoading, isError, error, isSuccess } = useQuery({ queryKey: ["friend-requests"], queryFn: getFriendRequests });
  if (isSuccess) {
    const firstRequest = requests[0];
    return (
      <SimpleCard customStyle={styles.cardStyle}>
        <View style={styles.detailsSection}>
          <View style={styles.userCircleWraper}>
            <UserCircle userSymbol={firstRequest.senderName.slice(0, 1)} />
          </View>
          <View>
            <Text style={styles.nameText}>{firstRequest.senderName}</Text>
            <Text>{firstRequest.message}</Text>
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <Pressable style={styles.acceptButton}>
            <Check color={"white"} />
          </Pressable>
          <Pressable style={styles.denyButton}>
            <X />
          </Pressable>
        </View>
      </SimpleCard>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  detailsSection: {
    flexDirection: "row",
    width: "60%",
    gap: 10,
  },

  nameText: {
    fontSize: fontSizes.cardTitle,
    ...fontStyles.semibold,
  },

  userCircleWraper: {
    width: 50,
    height: 50,
  },

  buttonsSection: {
    flexDirection: "row",
    width: "30%",
    gap: 10,
  },
  acceptButton: {
    alignItems: "center",
    width: "50%",
    backgroundColor: appStyle.colors.primaryColor,
    borderRadius: 20,
    paddingVertical: 2,
  },
  denyButton: {
    alignItems: "center",
    width: "50%",
    backgroundColor: appStyle.colors.inputBg,
    borderRadius: 20,
    paddingVertical: 2,
    borderColor: "black",
    borderWidth: 1,
  },
});
