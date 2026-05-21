import { useEffect } from "react";
import { registerSocketNotifications } from "./socketNotifications";
import { startSocketConnection } from "./webSocket";

export function useWebSocket() {
  useEffect(() => {
    startSocketConnection();
    registerSocketNotifications();
  }, []);
}
