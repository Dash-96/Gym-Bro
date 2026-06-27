import { Pressable, StyleSheet, Text } from "react-native";
import { appStyle } from "../../constants/theme";
type ButtonProps = {
  onPress?: Function;
  text?: string;
};
export default function Button({ text, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={() => {
        if (onPress) onPress();
      }}
      style={styles.button}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: appStyle.colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    backgroundColor: appStyle.colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: "white",
  },
});
