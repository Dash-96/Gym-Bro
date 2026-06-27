import { useEffect } from "react";
import { startSocketConnection, terminateConnection } from "./webSocket";

export function useWebSocket() {
  useEffect(() => {
    (async () => {
      startSocketConnection();
    })();

    return () => {
      terminateConnection();
    };
  }, []);
}
