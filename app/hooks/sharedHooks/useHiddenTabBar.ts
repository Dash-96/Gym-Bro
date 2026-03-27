import { useNavigation } from "expo-router";
import { useEffect } from "react";

// Hides the bottom tab bar when a screen mounts and restores it on unmount.
// Used by full-screen flows like editWorkoutScreen.
export function useHiddenTabBar() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);
}
