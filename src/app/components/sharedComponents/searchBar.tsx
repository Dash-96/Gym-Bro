import { appStyle, cardStyles, fontStyles } from "@/src/app/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  style?: object;
};

export default function SearchBar({ value, onChangeText, onClear, placeholder = "Search by name or username", style }: SearchBarProps) {
  return (
    <View style={[styles.container, style ?? {}]}>
      <Ionicons name="search" size={20} color={appStyle.text.secondaryTextColor} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={appStyle.text.secondaryTextColor}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      <Pressable onPress={() => (onClear ? onClear() : onChangeText(""))} hitSlop={8}>
        <Ionicons name="close" size={20} color={appStyle.text.secondaryTextColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...cardStyles,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: appStyle.card.cardBackground,
  },
  input: {
    ...fontStyles.regular,
    flex: 1,
    fontSize: 16,
    color: appStyle.text.textColor,
  },
});
