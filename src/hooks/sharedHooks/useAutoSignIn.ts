import { signIn } from "@/src/api/authApi";
import { RefreshError } from "@/src/utils/customError";
import { router } from "expo-router";
import { RefObject, useEffect } from "react";

export function useAutoSignIn(logedIn: RefObject<boolean>) {
  useEffect(() => {
    (async () => {
      try {
        let signInResponse = await signIn();
        console.log("auto sign in ", signInResponse);
        if (signInResponse === "authorized") {
          router.replace("/(tabs)/home");
          if (logedIn) {
            logedIn.current = true;
          }
        } else {
          if (logedIn) {
            logedIn.current = false;
          }
        }
      } catch (err) {
        if (err instanceof RefreshError) {
          router.replace("/(auth)");
        }
      }
    })();
  });
}
