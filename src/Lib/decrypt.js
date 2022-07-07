import CryptoJS from "crypto-js";
import { IV,KEY} from "../env";
// // console.log("haha;",key)
export function decrypt(ciphertext) {
  var key = KEY;
  var iv = IV;
  let keyWA = CryptoJS.enc.Utf8.parse(key);
  let ivWA = CryptoJS.enc.Utf8.parse(iv); 
  const bytes = CryptoJS.AES.decrypt(ciphertext, keyWA, {
      iv: ivWA,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
  });
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
 return originalText;
}