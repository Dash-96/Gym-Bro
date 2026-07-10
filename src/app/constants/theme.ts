export const appStyle = {
  colors: {
    // primaryColor: "#1E3A8A",
    primaryColor: "#1E5ED8",
    secondaryColor: "#FFFFFF",
    // accentColor: "#14B8A6",
    accentColor: "#F28C28",
    primaryTintColor: "#EFF6FF",
    pageBg: "#F6F7FB",
    inputBg: "#F2F4F8",
  },
  card: {
    cardBackground: "white",
    cardBorderColor: "#E2E8F0",
    cardShadow: "0px 1px 3px rgba(0,0,0,0.15)",
    darkCardBackGround: "#F6F7FB",
  },

  text: {
    textColor: "#0F172A",
    lightColor: "white",
    mutedTextColor: "#64748b8e",
    secondaryTextColor: "#475569",
  },

  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    huge: 30,
  },

  fontStyles: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
  },

  // amber: "#F59E0B ",
};

export const cardStyles = {
  backgroundColor: appStyle.card.cardBackground,
  borderColor: appStyle.card.cardBorderColor,
  boxShadow: appStyle.card.cardShadow,
  borderRadius: 10,
};

// Color tokens for the workout control card (light theme).
export const workoutControlStyle = {
  cardBg: appStyle.colors.secondaryColor,
  cardBorder: appStyle.card.cardBorderColor,
  cardShadow: appStyle.card.cardShadow,
  durationBadgeBg: appStyle.colors.inputBg,
  restCardBg: appStyle.colors.primaryTintColor,
  restCardBorder: appStyle.card.cardBorderColor,
  iconCircleBg: appStyle.colors.primaryColor,
  onAccent: appStyle.text.lightColor,
  title: appStyle.text.textColor,
  subtitle: appStyle.text.secondaryTextColor,
  label: appStyle.text.secondaryTextColor,
  muted: appStyle.text.mutedTextColor,
  finishButtonBg: appStyle.colors.accentColor,
};

export const fontSizes = {
  screenTitle: 26,
  cardTitle: 20,
  cardSubTitle: 16,
  sectionHeader: 22,
  bodyText: 14,
  metaText: 12,
  buttonText: 16,
};

export const fontStyles = {
  regular: {
    fontFamily: "Inter_400Regular",
  },
  medium: {
    fontFamily: "Inter_500Medium",
  },
  semibold: {
    fontFamily: "Inter_600SemiBold",
  },
};

// export const textStyles = {
//   screenTitle: {
//     ...typography.semibold,
//     fontSize: 24,
//     lineHeight: 28,
//   },
//   cardTitle: {
//     ...typography.semibold,
//     fontSize: 18,
//     lineHeight: 22,
//   },
//   body: {
//     ...typography.regular,
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   meta: {
//     ...typography.regular,
//     fontSize: 12,
//     lineHeight: 16,
//   },
//   button: {
//     ...typography.semibold,
//     fontSize: 16,
//     lineHeight: 20,
//   },
// };
