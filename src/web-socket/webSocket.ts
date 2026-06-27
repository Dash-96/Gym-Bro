import { HubConnectionState, type HubConnection } from "@microsoft/signalr";
import { getTokenAsync } from "../api/secureStore";

const socketUrl = process.env.EXPO_PUBLIC_SOCKET_CONNECTION ?? "http://10.223.146.241:5276/notificationHub";

let socketConnection: HubConnection | null = null;

export function getSocketConnection(): HubConnection {
  if (socketConnection) return socketConnection;
  const { HubConnectionBuilder, LogLevel } = require("@microsoft/signalr");
  socketConnection = new HubConnectionBuilder()
    .withUrl(socketUrl, { accessTokenFactory: async () => await getTokenAsync() })
    .configureLogging(LogLevel.Information)
    .build();

  socketConnection!.onclose(async () => {
    // await startSocketConnection();
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
    console.log("failed to connect===", error);
    setTimeout(startSocketConnection, 5000);
  }
}

export async function terminateConnection() {
  try {
    socketConnection?.stop();
    console.log(`signalR disconnected`);
  } catch (err) {
    console.log(err);
  }
}
