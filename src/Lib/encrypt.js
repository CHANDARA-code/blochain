import CryptoJS from "crypto-js";
import { KEY, BaseURL, IV} from "../env";
export const encrypt = (param) => {
  let key = CryptoJS.enc.Utf8.parse(KEY);
  let iv = CryptoJS.enc.Utf8.parse(IV);
  let data = CryptoJS.AES.encrypt(param, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return data.toString()
};