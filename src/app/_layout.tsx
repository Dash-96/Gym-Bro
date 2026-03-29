import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCustomFonts } from "../hooks/sharedHooks/useCustomFonts";
import { useOnlineManagaer } from "../hooks/sharedHooks/useOnlineManager";
import { useSqlite } from "../hooks/sharedHooks/useSqlite";
import { persister, queryClient } from "../serverStateStore/queryClient";
import { appStyle } from "./constants/theme";

// Keep the splash screen visible until fonts finish loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useSqlite();
  useCustomFonts();
  useOnlineManagaer();
  return (
    <GestureHandlerRootView>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={() => {
          queryClient.resumePausedMutations();
        }}
      >
        <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.pageBg } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}
