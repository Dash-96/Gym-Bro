import { Stack } from "expo-router";

export default function SocialLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="addFriendsScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
