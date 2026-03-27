import { migrate } from "@/app/db/migrate";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";

const expoDb = SQLite.openDatabaseSync("GymBro.db");
export function useSqlite() {
  useDrizzleStudio(expoDb);
  // Run CREATE TABLE IF NOT EXISTS migrations on every app start
  migrate();
}
