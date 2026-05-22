import { HubConnectionState, type HubConnection } from "@microsoft/signalr";

const socketUrl = process.env.EXPO_SOCKET_CONNECTION ?? "http://10.175.61.241:5276/notificationHub";
const token = process.env.EXPO_PUBLIC_TOKEN;

let socketConnection: HubConnection | null = null;

export function getSocketConnection(): HubConnection {
  if (socketConnection) return socketConnection;
  const { HubConnectionBuilder, LogLevel } = require("@microsoft/signalr");
  socketConnection = new HubConnectionBuilder()
    .withUrl(socketUrl, { accessTokenFactory: () => token })
    .configureLogging(LogLevel.Information)
    .build();

  socketConnection!.onclose(async () => {
    await startSocketConnection();
  });
  return socketConnection!;
}

export async function startSocketConnection() {
  try {
    let socekt = getSocketConnection();
    if (socekt.state == HubConnectionState.Disconnected) {
      await socekt.start();
      console.log("signalR Connected...");
    }
  } catch (error) {
    console.log(error);
    setTimeout(startSocketConnection, 5000);
  }
}
