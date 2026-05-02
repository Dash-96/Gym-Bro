import * as SecureStore from "expo-secure-store";
export async function getTokenAsync() {
  return await SecureStore.getItemAsync("token");
}

export async function setTokenAsync(token: string) {
  await SecureStore.setItemAsync("token", token);
}
