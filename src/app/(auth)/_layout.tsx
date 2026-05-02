import { Stack } from "expo-router";
import { appStyle } from "../constants/theme";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.pageBg } }}>
      <Stack.Screen name="index" options={{ title: "login" }} />
      <Stack.Screen name="register" options={{ title: "register" }} />
    </Stack>
  );
}
