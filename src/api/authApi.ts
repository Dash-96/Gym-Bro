import { authClient } from "@/src/api/clients/authClient";
import { router } from "expo-router";
import { httpClient } from "./clients/httpClient";
import { getRefreshTokenAsync, setRefreshTokenAsync, setTokenAsync } from "./secureStore";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function Register(displayName: string, password: string, phone: string) {
  console.log(apiUrl + "/auth");
  try {
    const response = await authClient.post("/register", { displayName, password, phone });
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    await setTokenAsync(accessToken);
    await setRefreshTokenAsync(refreshToken);
    if (response.status === 200) {
      router.replace("/(tabs)/home");
    }

    // const tokenFromStore = await getTokenAsync();
    // console.log("token: ", tokenFromStore);
    // const authResult = await fetch(apiUrl + "/auth", {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${tokenFromStore}` },
    // });
    // const authResponse = await authResult.text();
    // console.log("auth response: ", authResponse);
  } catch (error) {
    console.log(error);
  }
}

export async function Login(displayName: string, password: string) {
  try {
    // console.log("enreted function");
    const response = await authClient.post("/login", { displayName, password });
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    console.log("access", accessToken);
    console.log("refresh", refreshToken);
    await setTokenAsync(accessToken);
    await setRefreshTokenAsync(refreshToken);
    if (response.status === 200) {
      router.replace("/(tabs)/home");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function refreshAccess(): Promise<string | undefined> {
  console.log("called refresh function");
  try {
    const refreshToken = await getRefreshTokenAsync();
    console.log("refresh function: ", refreshToken);
    const response = await authClient.get("/refresh", { headers: { Authorization: `Bearer ${refreshToken}` } });
    if (response.status === 200) {
      const newAccessToken = response.data;
      setTokenAsync(newAccessToken);
      return newAccessToken;
    }
  } catch (err) {
    console.log("===" + err);
    throw err;
  }
}

export async function signIn() {
  try {
    const response = await httpClient.get("/auth");
    return response.data;
  } catch (err) {
    throw err;
  }
  // console.log(response.data);
}
