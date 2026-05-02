import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { createWorkout } from "../api/workoutAPI";

export const queryClient = new QueryClient({ defaultOptions: { queries: { gcTime: 1000 * 60 * 60 * 24 }, mutations: { gcTime: 1000 * 60 * 60 * 24 } } });

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

queryClient.setMutationDefaults(["createWorkout"], {
  mutationFn: createWorkout,
});
