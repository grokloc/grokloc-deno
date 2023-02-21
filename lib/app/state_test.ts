import { assertExists, assertThrows } from "std/testing/asserts.ts";
import { Level } from "../env.ts";
import { State } from "./state.ts"

Deno.test("db connect string env var", () => {
	assertExists(Deno.env.get("POSTGRES_APP_URL"));
});

// these document unsupported levels, remove test lines as level supported added
Deno.test("unsupported levels", () => {
	assertThrows(() => new State(Level.DEV), Deno.errors.NotSupported);
	assertThrows(() => new State(Level.STAGE), Deno.errors.NotSupported);
	assertThrows(() => new State(Level.PROD), Deno.errors.NotSupported);
});
