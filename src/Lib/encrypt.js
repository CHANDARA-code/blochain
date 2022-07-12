import CryptoJS from "crypto-js";
import { KEY, BaseURL, IV, PUBLICKEY, PRIVATEKEY } from "../env";
import { JSEncrypt } from "jsencrypt";
let encrypt = new JSEncrypt();
export const EncryptLib = (param) => {
  encrypt.setPrivateKey(PRIVATEKEY);
  let encrypted = encrypt.encrypt(param)
  // let encrypted_Base64 = CryptoJS.enc.Base64.stringify(encrypted).toString();
  let encrypted_Base64 = encrypted.toString("base64");
  return encrypted_Base64;
  // encrypt.setPublicKey(PUBLICKEY);
  // let encrypted = encrypt.encrypt(param);
  // let encrypted_Base64 = encrypted.toString("base64");
  // return encrypted_Base64;
};
