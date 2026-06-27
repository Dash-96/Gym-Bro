import { Stack } from "expo-router";
import { appStyle } from "../constants/theme";

export default function AuthLayout() {
  // useEffect(() => {
  //   terminateConnection();
  // }, []);
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.pageBg } }}>
      <Stack.Screen name="index" options={{ title: "login", headerShown: false }} />
      <Stack.Screen name="register" options={{ title: "register", headerShown: false }} />
    </Stack>
  );
}
