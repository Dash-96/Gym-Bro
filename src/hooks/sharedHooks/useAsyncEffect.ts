import { useEffect } from "react";

export default function useAsyncEffect(effectFunction: Function, dependcencyArray?: []) {
  useEffect(() => {
    effectFunction();
  }, dependcencyArray);
}
