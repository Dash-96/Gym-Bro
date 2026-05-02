import { getTokenAsync, setTokenAsync } from "./secureStore";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function Register(displayName: string, password: string, phone: string) {
  console.log(apiUrl + "/auth");
  try {
    const result = await fetch(apiUrl + "/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, password, phone }),
    });
    const token = await result.text();
    await setTokenAsync(token);

    const tokenFromStore = await getTokenAsync();
    console.log("token: ", tokenFromStore);
    const authResult = await fetch(apiUrl + "/auth", {
      method: "GET",
      headers: { Authorization: `Bearer ${tokenFromStore}` },
    });
    const authResponse = await authResult.text();
    console.log("auth response: ", authResponse);
  } catch (error) {
    console.log(error);
  }
}

export async function Login(displayName: string, password: string) {
  try {
    const response = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, password }),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function SignIn() {
  const response = await fetch(apiUrl + "/");
}
