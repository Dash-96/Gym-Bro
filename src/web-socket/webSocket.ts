import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const socketUrl = process.env.EXPO_SOCKET_CONNECTION ?? "http://10.44.25.241:5276/notificationHub";
// console.log("socket url: ", socketUrl);
const socketConnection = new HubConnectionBuilder().withUrl(socketUrl!).configureLogging(LogLevel.Information).build();

export async function startSocketConnection() {
  try {
    await socketConnection.start();
    console.log("signalR Connected...");
  } catch (error) {
    console.log(error);
    setTimeout(startSocketConnection, 5000);
  }
}

socketConnection.onclose(async () => {
  await startSocketConnection();
});

export { socketConnection };

