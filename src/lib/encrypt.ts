import CryptoES from "crypto-es";
import { Buffer } from "buffer";

export function encryptPassword(value: string) {
  return CryptoES.AES.encrypt(value, "93921832187238319317392").toString();
}

export function decryptPassword(value: string) {
  return CryptoES.AES.decrypt(value, "93921832187238319317392").toString(
    CryptoES.enc.Utf8
  );
}

export function encrypt(value: string, key: string) {
  return CryptoES.AES.encrypt(value, key).toString();
}

export function decrypt(value: string, key: string) {
  if (!value) {
    return "";
  }

  if (!key) {
    return value ?? "";
  }

  return CryptoES.AES.decrypt(value, key).toString(CryptoES.enc.Utf8);
}

export function encryptToBase64(value: string) {
  return Buffer.from(value).toString("base64");
}

export function decryptBase64(value: string) {
  return Buffer.from(value, "base64").toString("utf8");
}
