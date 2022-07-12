import CryptoJS from "crypto-js";
import { KEY, BaseURL, IV, PUBLICKEY, PRIVATEKEY } from "../env";
import { JSEncrypt } from "jsencrypt";
var decrypt = new JSEncrypt();
export const DecryptLib = (ciphertext) => {
  var encrypted = ciphertext
  // Decrypt with the private key...
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(PRIVATEKEY);
  var uncrypted = decrypt.decrypt(encrypted);
  return uncrypted;
};
