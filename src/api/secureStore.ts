import * as SecureStore from "expo-secure-store";
export async function getTokenAsync() {
  return await SecureStore.getItemAsync("accessToken");
}
export async function getRefreshTokenAsync() {
  return await SecureStore.getItemAsync("refreshToken");
}

export async function setTokenAsync(token: string) {
  await SecureStore.setItemAsync("accessToken", token);
}
export async function setRefreshTokenAsync(token: string) {
  await SecureStore.setItemAsync("refreshToken", token);
}

export async function removeTokens() {
  await SecureStore.setItemAsync("accessToken", "");
  await SecureStore.setItemAsync("refreshToken", "");
}
