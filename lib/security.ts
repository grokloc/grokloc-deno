import { crypto } from "https://deno.land/std/crypto/crypto.ts";
import { toHashString } from "https://deno.land/std/crypto/to_hash_string.ts";
import { stringToBytes } from "textras/mod.ts";

const sha256Hex = async (s: string): Promise<string> =>
  toHashString(await crypto.subtle.digest("SHA-256", stringToBytes(s)));

export { sha256Hex };
