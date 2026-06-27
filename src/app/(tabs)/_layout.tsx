import { removeTokens } from "@/src/api/secureStore";
import { getUserDetails } from "@/src/api/userApi";
import { useWebSocket } from "@/src/web-socket/useWebSocket";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router, Tabs } from "expo-router";
import { ChartNoAxesCombined, Dumbbell, Handshake, Swords } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/sharedComponents/button";
import { appStyle } from "../constants/theme";

export default function TabsLayout() {
  useWebSocket();
  const { data: userDetails } = useQuery<{ userName: string }>({ queryKey: ["user-details"], queryFn: getUserDetails });
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            onPress={() => {
              removeTokens();
              router.replace("/(auth)");
            }}
            text="logout"
          ></Button>
          <Text
            style={{ backgroundColor: appStyle.colors.primaryColor, color: "white", borderRadius: 20, textAlignVertical: "center", paddingHorizontal: 5 }}
          >{`Hello ${userDetails?.userName}`}</Text>
        </View>
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
          <Tabs.Screen name="compete" options={{ headerShown: false, tabBarIcon: ({ color }) => <Swords color={color} /> }}></Tabs.Screen>
          <Tabs.Screen name="social" options={{ headerShown: false, tabBarIcon: ({ color, focused }) => <Handshake color={color} /> }} />
          <Tabs.Screen
            name="stats"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, focused }) => <ChartNoAxesCombined size={24} color={color} />,
            }}
          />

          {/* Prevent expo-router from exposing this nested screen as a tab */}
          {/* <Tabs.Screen name="home/screens/homeScreen" options={{ href: null }} /> */}
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
