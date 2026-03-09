import { appStyle, cardStyles, fontSizes, fontStyles } from "@/app/constants/theme";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function NotesCard() {
  return (
    <View style={[cardStyles, styles.cardContainer]}>
      <Text style={[fontStyles.medium, { fontSize: fontSizes.cardSubTitle }]}>Notes</Text>
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
