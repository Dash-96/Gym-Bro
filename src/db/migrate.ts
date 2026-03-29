import { db } from "./db";
import { schema } from "./schema";

// Executes the raw SQL schema string (CREATE TABLE IF NOT EXISTS) on app startup
export async function migrate() {
  await (await db).execAsync(schema);
}
