import { appStyle } from "@/app/constants/theme";
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.secondaryColor } }}>
      <Stack.Screen name="index" options={{ title: "Home" }}></Stack.Screen>
      <Stack.Screen name="screens/editWorkoutScreen" options={{ title: "edit" }}></Stack.Screen>
    </Stack>
  );
}
