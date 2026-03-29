import * as SQLite from "expo-sqlite";
const DB_NAME = process.env.EXPO_PUBLIC_DB_NAME ?? "";
// Async DB instance — must be awaited before executing queries
export const db = SQLite.openDatabaseAsync(DB_NAME);
