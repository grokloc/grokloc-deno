import {
  assertEquals,
  assertExists,
  assertThrows,
} from "std/testing/asserts.ts";
import { Level } from "../env.ts";
import { State } from "./state.ts";

Deno.test("db connect string env var", () => {
  assertExists(Deno.env.get("POSTGRES_APP_URL"));
});

// these document unsupported levels, remove test lines as level supported added
Deno.test("unsupported levels", () => {
  assertThrows(() => new State(Level.DEV), Deno.errors.NotSupported);
  assertThrows(() => new State(Level.STAGE), Deno.errors.NotSupported);
  assertThrows(() => new State(Level.PROD), Deno.errors.NotSupported);
});

Deno.test("basic query", async () => {
  let st: State;
  try {
    st = new State(Level.UNIT);
  } catch {
    throw new Error("new unit state");
  }
  const client = await st.master.connect();
  interface userCount {
    count: number;
  }
  const result = await client.queryObject<userCount>(
    "select count(*) from users",
  );
  assertEquals(result.rows.length, 1);
  assertExists(result.rows[0].count);
  await client.end();
  await client.release();
});
