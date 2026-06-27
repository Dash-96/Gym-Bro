import CustomText from "@/src/app/components/sharedComponents/customText";
import { appStyle, cardStyles, fontStyles } from "@/src/app/constants/theme";
import { StyleSheet, TextInput, View } from "react-native";

export default function NotesCard() {
  return (
    <View style={[cardStyles, styles.cardContainer]}>
      <CustomText variant="cardSubTitle">Notes</CustomText>
      <TextInput
        placeholder="Add cues, goals, or reminders..."
        placeholderTextColor={appStyle.text.secondaryTextColor}
        style={[styles.input, fontStyles.regular]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 20,
    gap: 10,
    borderRadius: 10,
  },
  input: {
    display: "flex",
    backgroundColor: appStyle.colors.pageBg,
    height: 200,
    textAlignVertical: "top",
    borderRadius: 10,
  },
});
