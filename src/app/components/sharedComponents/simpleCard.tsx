import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { cardStyles } from "../../constants/theme";
type Props = {
  customStyle?: object;
};

type CardProps = PropsWithChildren<Props>;
export default function SimpleCard({ children, customStyle }: CardProps) {
  return <View style={[styles.cardContainer, customStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    ...cardStyles,
    padding: 20,
    alignItems: "center",
  },
});
