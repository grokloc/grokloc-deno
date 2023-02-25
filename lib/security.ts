// import { crypto } from "https://deno.land/std/crypto/crypto.ts";
// import { toHashString } from "https://deno.land/std/crypto/to_hash_string.ts"
import {
  decode as hexDecode,
  encode as hexEncode,
} from "https://deno.land/std/encoding/hex.ts";

/**
 * convert a string to its byte array representation
 * @param {string} s - the input string
 * @returns {Uint8Array} the byte array representation of s
 */
const textEncode = (s: string): Uint8Array => new TextEncoder().encode(s);

/**
 * convert a byte array to its string representation
 * @param {Uint8Array} d - the input byte array
 * @returns {string} the string representation of s
 */
const textDecode = (d: Uint8Array): string => new TextDecoder().decode(d);

/**
 * convert a byte array to its hex string encoding
 * @param {Uint8Array} d - the input byte array
 * @returns {string} the hex string encoding of d
 */
const bytes2Hex = (d: Uint8Array): string => textDecode(hexEncode(d));

/**
 * convert a hex string to its byte array representation
 * @param {string} s - the input hex string
 * @returns {Uint8Array} the hex-decoded byte array representation of s
 */
const hex2Bytes = (s: string): Uint8Array => hexDecode(textEncode(s));

export { bytes2Hex, hex2Bytes, textDecode, textEncode };
