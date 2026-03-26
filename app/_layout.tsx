import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { appStyle } from "./constants/theme";
import { migrate } from "./db/migrate";
// Keep the splash screen visible until fonts finish loading
SplashScreen.preventAutoHideAsync();
// Sync DB instance required by the Drizzle Studio dev plugin
const expoDb = SQLite.openDatabaseSync("GymBro.db");
export default function RootLayout() {
  useDrizzleStudio(expoDb);
  // Run CREATE TABLE IF NOT EXISTS migrations on every app start
  migrate();
  // React Query client for caching async state
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.pageBg } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
