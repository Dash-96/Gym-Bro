# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — start the Expo dev server (Metro). `npm run android` / `npm run ios` / `npm run web` run platform-specific launchers (`expo run:*`).
- `npm run lint` — `expo lint` (ESLint 9 flat config, `eslint-config-expo`). There is **no test runner** configured in this repo; do not attempt `npm test`.
- `npm run reset-project` — destructive starter-template script (`scripts/reset-project.js`). Don't run unless explicitly asked.

Path alias: `@/*` resolves to the repo root (so imports look like `@/src/models/workoutModel`).

Required env vars (read via `process.env` at runtime, no `.env` is committed):
- `EXPO_PUBLIC_API_URL` — backend base URL
- `EXPO_PUBLIC_DB_NAME` — SQLite filename opened in [src/db/db.ts](src/db/db.ts)
- `EXPO_PUBLIC_TOKEN` — temporary hard-coded bearer used by [src/api/userApi.ts](src/api/userApi.ts) and the SignalR hub. The real token lives in SecureStore (see [src/api/secureStore.ts](src/api/secureStore.ts)); the `EXPO_PUBLIC_TOKEN` usages are placeholders to be removed as auth wiring lands.
- `EXPO_SOCKET_CONNECTION` — SignalR hub URL

## Architecture

This is an **Expo SDK 55 / React 19 / Expo Router** app (file-based routing rooted at [src/app/](src/app/), configured in [app.json](app.json)). The `experiments` flags `typedRoutes` and `reactCompiler` are both **on** — keep that in mind before disabling them or introducing patterns the compiler dislikes.

### Navigation layout
- [src/app/_layout.tsx](src/app/_layout.tsx) is the root: it boots SQLite, fonts, NetInfo, and the SignalR socket, then wraps everything in `PersistQueryClientProvider` + `SocketProvider` + a `Stack` with two route groups.
- `(tabs)` — main app: `home`, `workout`, `compete`, `social`, `stats` (see [src/app/(tabs)/_layout.tsx](src/app/(tabs)/_layout.tsx)).
- `(auth)` — `index` (login) and `register`.

### State management — three layers
1. **Server state**: TanStack Query, persisted to AsyncStorage with a 24h `gcTime`/`maxAge` so the app works offline. Mutation defaults (e.g. `createWorkout`) are registered on the client in [src/serverStateStore/queryClient.ts](src/serverStateStore/queryClient.ts). Network status is wired to `onlineManager` via NetInfo in [src/hooks/sharedHooks/useOnlineManager.ts](src/hooks/sharedHooks/useOnlineManager.ts), so paused mutations resume automatically when the device comes back online.
2. **Client state**: Zustand stores under [src/stateStore/](src/stateStore/) — currently the active workout + drag-reorder state ([workoutStore.ts](src/stateStore/workoutStore/workoutStore.ts)) and notifications.
3. **Local persistence**: `expo-sqlite` (async API) in [src/db/db.ts](src/db/db.ts). Schema is raw SQL in [src/db/schema.ts](src/db/schema.ts) and applied on startup via [src/db/migrate.ts](src/db/migrate.ts) (`CREATE TABLE IF NOT EXISTS`). **Drizzle is in `package.json` but not wired up** — [drizzle.config.ts](drizzle.config.ts) is entirely commented out, and queries go through hand-written `prepareAsync` statements in [src/repositories/workoutRepo.ts](src/repositories/workoutRepo.ts). Don't assume Drizzle works.

### Data flow: DB ↔ UI
The SQLite schema uses snake_case (and has a couple of frozen typos like `excercise_name`/`excerciseKey`/`excerciseName` — preserve them, repo code depends on the spelling). UI/domain types in [src/models/workoutModel.ts](src/models/workoutModel.ts) are camelCase. Conversion happens in [src/db/mapper.ts](src/db/mapper.ts) — `DbModel → UI` is live; `UI → DbModel` mappers are commented out because inserts/updates currently inline the field mapping in SQL parameters.

### Networking & auth
- API helpers are thin `fetch` wrappers in [src/api/](src/api/) (one file per resource). Token comes from `expo-secure-store` via `getTokenAsync`/`setTokenAsync` ([secureStore.ts](src/api/secureStore.ts)).
- [src/api/httpClient.ts](src/api/httpClient.ts) is a **work-in-progress** `HttpClient` class that will centralize requests and implement the 401 → refresh-token → retry-or-redirect flow. It's not yet used by the rest of the API layer.

### Realtime (SignalR)
- Connection singleton + auto-reconnect in [src/web-socket/webSocket.ts](src/web-socket/webSocket.ts). `getSocketConnection()` lazy-builds, `startSocketConnection()` is called once from [useWebSocket.ts](src/web-socket/useWebSocket.ts) in the root layout.
- **Global** socket listeners (toasts, query invalidation) live in [src/app/socketProvider.tsx](src/app/socketProvider.tsx) and [src/web-socket/socketNotifications.ts](src/web-socket/socketNotifications.ts) — these fire regardless of the screen the user is on. Screen-local socket handlers should be registered inside the screen's hook, not here.
- **Web platform quirk**: `@microsoft/signalr`'s default entrypoint doesn't work in the Metro web bundle, so [metro.config.js](metro.config.js) has a `resolveRequest` override that redirects the import to the browser bundle when `platform === 'web'`. Don't remove it.

### Styling
Centralized design tokens in [src/app/constants/theme.ts](src/app/constants/theme.ts): `appStyle` (colors), `cardStyles`, `fontSizes`, `fontStyles` (Inter via `@expo-google-fonts/inter`, loaded in [useCustomFonts.ts](src/hooks/sharedHooks/useCustomFonts.ts) — splash screen is held until fonts resolve). Use these instead of hardcoding hex values or font families.

### Build-time quirks
- [babel.config.js](babel.config.js) registers `babel-plugin-inline-import` for `.sql` files, and [metro.config.js](metro.config.js) adds `sql` to `sourceExts` and `wasm` to `assetExts`. SQL files can be imported as strings.

## Gotchas

- **`src/hooks/statsHooks.ts/` is a directory, not a file** (the `.ts` suffix is part of the folder name). It contains [quickStatsHooks.ts](src/hooks/statsHooks.ts/quickStatsHooks.ts). When adding stats hooks, put them inside that folder; don't try to import `statsHooks.ts` as a module.
- The `_legacy/drizzle-experiment` folder is dead code from an earlier Drizzle prototype — don't reference it.
- `models` is a directory (`src/models/`) — Read it via Glob/listing, not by reading the path as a file.
- `expo-router` `typedRoutes` is enabled; route strings are validated at build time. If you add a new route, the generated `.expo/types` need to refresh before unrelated files will type-check.
