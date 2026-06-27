import { Stack } from "expo-router";

export default function CompeteLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Compete", headerShown: false }} />
    </Stack>
  );
}
