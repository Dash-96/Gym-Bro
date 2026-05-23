import { useEffect } from "react";
import { startSocketConnection } from "./webSocket";

export function useWebSocket() {
  useEffect(() => {
    startSocketConnection();
  }, []);
}
