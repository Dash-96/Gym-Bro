import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SplashScreen, Stack } from "expo-router";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAutoSignIn } from "../hooks/sharedHooks/useAutoSignIn";
import { useCustomFonts } from "../hooks/sharedHooks/useCustomFonts";
import { useOnlineManagaer } from "../hooks/sharedHooks/useOnlineManager";
import { useSqlite } from "../hooks/sharedHooks/useSqlite";
import { persister, queryClient } from "../serverStateStore/queryClient";
import { appStyle } from "./constants/theme";
import SocketProvider from "./socketProvider";

// Keep the splash screen visible until fonts finish loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isSignedIn = useRef<boolean>(false);
  useSqlite();
  useCustomFonts();
  useOnlineManagaer();
  //  useWebSocket();
  useAutoSignIn(isSignedIn);
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
          <BottomSheetModalProvider>
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{
                persister,
                maxAge: 1000 * 60 * 60 * 24,
                dehydrateOptions: { shouldDehydrateMutation: (m) => m.state.isPaused || m.state.status === "error" },
              }}
              onSuccess={() => {
                queryClient.resumePausedMutations();
              }}
            >
              <SocketProvider>
                <Stack screenOptions={{ contentStyle: { backgroundColor: appStyle.colors.pageBg }, headerShown: false }}>
                  {!isSignedIn.current && <Stack.Screen name="(auth)" options={{ headerShown: false }} />}
                  {isSignedIn.current && <Stack.Screen name="(tabs)" options={{ headerShown: false }} />}
                </Stack>
              </SocketProvider>
            </PersistQueryClientProvider>
          </BottomSheetModalProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
