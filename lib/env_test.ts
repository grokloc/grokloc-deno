import { assertExists } from "std/testing/asserts.ts";
import { Level } from "./env.ts";

Deno.test("valid Level", () => {
  assertExists(Level["UNIT"]);
});
