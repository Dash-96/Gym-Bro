import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, timeOut: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, timeOut);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
}
