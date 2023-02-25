import { assertEquals } from "std/testing/asserts.ts";
import { bytes2Hex, hex2Bytes, textEncode } from "./security.ts";

Deno.test("round trip hex value", () => {
  const s = "hello world";
  const h = bytes2Hex(textEncode(s));
  assertEquals(h, "68656c6c6f20776f726c64");
  assertEquals(hex2Bytes(h), textEncode(s));
});
