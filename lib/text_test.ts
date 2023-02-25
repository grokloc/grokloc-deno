import { assertEquals } from "std/testing/asserts.ts";
import {
  bytesToHex,
  bytesToString,
  hexToBytes,
  stringToBytes,
} from "./text.ts";

Deno.test("round trip hex value", () => {
  const s = "hello world";
  const h = bytesToHex(stringToBytes(s));
  assertEquals(h, "68656c6c6f20776f726c64");
  assertEquals(bytesToString(hexToBytes(h)), s);
});
