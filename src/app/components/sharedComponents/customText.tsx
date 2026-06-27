import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { appStyle, fontSizes, fontStyles } from "@/src/app/constants/theme";

type TextVariant =
  | "screenTitle"
  | "sectionHeader"
  | "cardTitle"
  | "cardSubTitle"
  | "button"
  | "body"
  | "meta";

type TextColor = "default" | "light" | "muted" | "secondary";

type CustomTextProps = TextProps & {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
};

export default function CustomText({
  variant = "body",
  color = "default",
  style,
  children,
  ...rest
}: CustomTextProps) {
  return (
    <Text style={[styles[variant], colorStyles[color], style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    ...fontStyles.semibold,
    fontSize: fontSizes.screenTitle,
  },
  sectionHeader: {
    ...fontStyles.semibold,
    fontSize: fontSizes.sectionHeader,
  },
  cardTitle: {
    ...fontStyles.semibold,
    fontSize: fontSizes.cardTitle,
  },
  cardSubTitle: {
    ...fontStyles.medium,
    fontSize: fontSizes.cardSubTitle,
  },
  button: {
    ...fontStyles.semibold,
    fontSize: fontSizes.buttonText,
  },
  body: {
    ...fontStyles.regular,
    fontSize: fontSizes.bodyText,
  },
  meta: {
    ...fontStyles.regular,
    fontSize: fontSizes.metaText,
  },
});

const colorStyles = StyleSheet.create({
  default: { color: appStyle.text.textColor },
  light: { color: appStyle.text.lightColor },
  muted: { color: appStyle.text.mutedTextColor },
  secondary: { color: appStyle.text.secondaryTextColor },
});
