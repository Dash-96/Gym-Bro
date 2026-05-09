import { socketConnection } from "./webSocket";
export async function testConnection() {
  try {
    await socketConnection.invoke("RTest", "Message from react client");
  } catch (error) {
    console.log(error);
  }
}
