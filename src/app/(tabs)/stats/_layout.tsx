import { appStyle } from "@/src/app/constants/theme";
import { Stack } from "expo-router";

export default function StatsLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.secondaryColor } }}>
      <Stack.Screen name="index" options={{ title: "Stats" }} />
    </Stack>
  );
}
