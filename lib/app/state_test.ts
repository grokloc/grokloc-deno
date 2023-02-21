import { assertExists } from "std/testing/asserts.ts";
// import { Level } from "./state.ts"

Deno.test("db connect string", () => {
	assertExists(Deno.env.get("POSTGRES_APP_URL"));
});
