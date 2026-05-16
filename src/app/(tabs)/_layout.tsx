import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { ChartNoAxesCombined, Dumbbell, Handshake } from "lucide-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { appStyle } from "../constants/theme";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        <Tabs screenOptions={{ tabBarActiveTintColor: appStyle.colors.primaryColor }}>
          <Tabs.Screen
            name="home"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />,
            }}
          />
          <Tabs.Screen
            name="workout"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, focused }) => <Dumbbell size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="stats"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, focused }) => <ChartNoAxesCombined size={24} color={color} />,
            }}
          />
          <Tabs.Screen name="social" options={{ headerShown: false, tabBarIcon: ({ color, focused }) => <Handshake color={color} /> }} />
          {/* Prevent expo-router from exposing this nested screen as a tab */}
          {/* <Tabs.Screen name="home/screens/homeScreen" options={{ href: null }} /> */}
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
